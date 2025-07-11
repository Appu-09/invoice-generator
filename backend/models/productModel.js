const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
});

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
