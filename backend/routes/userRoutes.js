const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

// 1. Register Route (Updated with Phone and Address)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ msg: "All fields (including phone & address) are required" });
        }

        
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
    
    
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            phone, 
            address 
        });

        await newUser.save();
        res.json({ message: "User Registered Successfully" });

    } catch (err) {
        console.error("Registration Error:", err.message);
        res.status(500).json({ msg: "Server Error" });
    }
});

// 2. Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        // Token generate karna
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
      res.json({ 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                isAdmin: user.isAdmin 
            } 
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;