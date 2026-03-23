const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/authMiddleware'); 
const admin = require('../middleware/adminMiddleware'); 

// 1. ZAROORI: Iske bina Home page par products nahi dikhenge
router.get('/', async (req, res) => {
    try {
        const { search } = req.query; // URL se search parameter nikalna
        let filter = {};

        if (search) {
            // Agar search query hai, toh Name ya Category mein dhoondo
            filter = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },      // 'i' means small/capital letter ka farq nahi
                    { category: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// 2. Single product (Isse rehne do, koi nuksan nahi hai)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Add Product (Admin)
router.post('/add', auth, admin, async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4. Update Product
router.put('/:id', auth, admin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Delete Product
router.delete('/:id', auth, admin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: "Product Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
