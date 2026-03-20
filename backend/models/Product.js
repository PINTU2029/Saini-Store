const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Product name is required"],
        trim: true 
    },
    description: { 
        type: String, 
        required: [true, "Product description is required"] 
    },
    price: { 
        type: Number, 
        required: [true, "Price is required"] 
    },
    image: { 
        type: String, 
        required: [true, "Image URL is required"] 
    },
    category: { 
        type: String, 
        required: true 
    },
    upiId: { 
        type: String, 
        default: "your-vpa@upi", // Aapka default UPI ID payment ke liye
        required: true
    },
    inStock: { 
        type: Boolean, 
        default: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Product', productSchema);