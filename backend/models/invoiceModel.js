const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      rate: Number,
    },
  ],
});

module.exports = mongoose.model("Invoice", invoiceSchema);
