const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const { productName, quantity, rate } = req.body;

    const total = quantity * rate;
    const gst = total * 0.18;

    const product = new Product({
      userId: req.userId,
      productName,
      quantity,
      rate,
      total,
      gst
    });

    await product.save();

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
};
