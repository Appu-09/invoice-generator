const express = require("express");
const router = express.Router();

// Temporary in-memory product storage (you can later replace this with DB)
let products = [];

// POST /api/products - Add product
router.post("/", (req, res) => {
  const { name, price, quantity } = req.body;
  if (!name || !price || !quantity) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const product = {
    id: products.length + 1,
    name,
    price,
    quantity,
  };
  products.push(product);
  res.status(201).json({ message: "Product added successfully", product });
});

// GET /api/products - Get all products
router.get("/", (req, res) => {
  res.json(products);
});

module.exports = router;
