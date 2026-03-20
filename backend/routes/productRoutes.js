const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Middlewares ko import karein
const auth = require('../middleware/authMiddleware'); 
const admin = require('../middleware/adminMiddleware'); 

// 1. Saare products dekhne ke liye (ISE KOI BHI DEKH SAKTA HAI)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Naya product add karne ke liye (SIRF ADMIN)
// Rasta: auth (Login?) -> admin (Power?) -> logic
router.post('/add', auth, admin, async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 3. Product EDIT karne ke liye (SIRF ADMIN)
router.put('/:id', auth, admin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Product DELETE karne ke liye (SIRF ADMIN)
router.delete('/:id', auth, admin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: "Product Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;