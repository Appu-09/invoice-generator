const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ GET Products API (for logged-in user)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.userId }).sort({ date: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
