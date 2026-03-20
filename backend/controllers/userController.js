const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==========================
// 1. REGISTER FUNCTION
// ==========================
exports.register = async (req, res) => {
    try {
        console.log("Incoming Registration Data:", req.body);

        const { name, email, password, phone, address } = req.body;

        // Validation
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ msg: "Sabhi fields bharna zaroori hai!" });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User pehle se register hai." });

        user = new User({ name, email, password, phone, address });

        const salt = await bcrypt.getSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        console.log(" User Registered Successfully!");

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ token, user: { id: user.id, name: user.name } });

    } catch (err) {
        console.error(" Registration Error:", err.message);
        if (!res.headersSent) {
            return res.status(500).json({ msg: "Server Error: " + err.message });
        }
    }
};

// ==========================
// 2. LOGIN FUNCTION
// ==========================
exports.login = async (req, res) => {
    try {
        console.log("📥 Incoming Login Data:", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Email aur Password dono bharna zaroori hai!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Ye Email register nahi hai." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Galat Password!" });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

        console.log("User Logged In Successfully!");

        res.json({ 
            token, 
            user: { id: user.id, name: user.name, email: user.email } 
        });

    } catch (err) {
        console.error(" Login Error:", err.message);
        if (!res.headersSent) {
            return res.status(500).json({ msg: "Server Error: Login fail ho gaya" });
        }
    }
};