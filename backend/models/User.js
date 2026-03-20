const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Please enter your name"] 
    },
    email: { 
        type: String, 
        required: [true, "Please enter an email"], 
        unique: true,
        lowercase: true 
    },
    password: { 
        type: String, 
        required: [true, "Please enter a password"],
        minlength: 6 
    },
  
    phone: {
        type: String,
        required: [true, "Please enter your 10-digit phone number"],
        minlength: [10, "Phone number must be 10 digits"]
    },
    address: {
        type: String,
        required: [true, "Please enter your full delivery address"]
    },
    // ------------------------------------
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },

    isAdmin: { 
        type: Boolean,
     default: false }
});

module.exports = mongoose.model('User', userSchema);