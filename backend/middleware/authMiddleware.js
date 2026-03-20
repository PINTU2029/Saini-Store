const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User model zaroori hai

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // YE LINE SABSE ZAROORI HAI: 
        // Database se user ka data nikalna taaki 'isAdmin' mil sake
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ msg: "User nahi mila" });
        }

        req.user = user; // Ab req.user mein 'isAdmin' ki value aa gayi hai
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = auth;