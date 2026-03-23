const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();


app.use(cors({
  origin: ["https://saini-store.vercel.app", "http://localhost:3000"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- 2. Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch(err => console.error(" MongoDB Connection Error:", err));

// --- 3. Nodemailer Setup ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s+/g, '')
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log("Transporter error:", error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

// Models & Middleware Import
const User = require('./models/User'); 
const authMiddleware = require('./middleware/authMiddleware');

// --- 4. Routes ---

// Order Notification Route
app.post('/api/order-notify', async (req, res) => {
    try {
        // Frontend se jo bhi aa raha hai sab yahan pakad lo
        const { productName, productPrice, customerName, customerAddress, customerPhone, customerEmail } = req.body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `🔥 Naya Order: ${productName}`,
            html: `
                <div style="font-family: Arial; border: 1px solid #ddd; padding: 20px;">
                    <h2>Naya Order Details</h2>
                    <p><strong>Product:</strong> ${productName} (₹${productPrice})</p>
                    <hr/>
                    <p><strong>Name:</strong> ${customerName}</p>
                    <p><strong>Email:</strong> ${customerEmail || 'N/A'}</p>
                    <p><strong>Phone:</strong> ${customerPhone}</p>
                    <p><strong>Address:</strong> ${customerAddress}</p>
                </div>`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: "Email Sent!" });
    } catch (err) {
        console.error("Nodemailer Error:", err);
        res.status(500).json({ msg: "Backend mein error hai", error: err.message });
    }
});

// Main Routes (User aur Product ke liye)
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Test route
app.get('/', (req, res) => {
    res.send("<h1>Saini Store Backend is Running!</h1>");
});

// --- 5. Port Setting (Dynamic from .env) ---
const PORT = process.env.PORT || 5000; 
app.listen(PORT, '0.0.0.0', () => {
    console.log(` Server is running on Port: ${PORT}`);
});
