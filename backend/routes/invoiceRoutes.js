const express = require("express");
const router = express.Router();
const Invoice = require("../models/invoiceModel");
const Product = require("../models/productModel");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Generate Invoice & Download PDF
router.post("/generate", async (req, res) => {
  try {
    const { customer, products } = req.body;

    // Fetch product details from DB
    const selectedProducts = await Product.find({ _id: { $in: products } });

    // Create Invoice in DB (optional, if storing)
    const newInvoice = new Invoice({
      customer,
      products: selectedProducts.map((p) => ({
        product: p._id,
        quantity: p.quantity,
        rate: p.rate,
      })),
    });
    await newInvoice.save();

    // Generate PDF
    const doc = new PDFDocument();
    const pdfPath = path.join(__dirname, "../invoices", `${newInvoice._id}.pdf`);
    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(20).text("Invoice", { align: "center" }).moveDown();
    doc.fontSize(12).text(`Customer Name: ${customer.name}`);
    doc.text(`Email: ${customer.email}`);
    doc.text(`Phone: ${customer.phone}`);
    doc.text(`Address: ${customer.address}`).moveDown();

    doc.text("Products:");
    selectedProducts.forEach((p) => {
      doc.text(`- ${p.productName} | Qty: ${p.quantity} | Rate: ${p.rate}`);
    });

    doc.end();

    // Send PDF to client
    doc.on("finish", () => {
      res.download(pdfPath, "invoice.pdf", (err) => {
        if (err) console.error("Failed to send invoice:", err);
        fs.unlinkSync(pdfPath); // Clean up after sending
      });
    });
  } catch (err) {
    console.error("Error generating invoice:", err);
    res.status(500).json({ message: "Failed to generate invoice." });
  }
});

module.exports = router;
