const express = require("express");
const PDFDocument = require("pdfkit");
const router = express.Router();

router.post("/", (req, res) => {
  const { products } = req.body;

  const doc = new PDFDocument();
  let buffers = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment;filename=invoice.pdf",
    });
    res.end(pdfData);
  });

  doc.fontSize(20).text("Invoice", { align: "center" });
  doc.moveDown();

  let total = 0;
  products.forEach((product) => {
    const line = `${product.name} - ₹${product.price} (Qty: ${product.quantity})`;
    doc.fontSize(14).text(line);
    total += product.price * product.quantity;
  });

  doc.moveDown();
  doc.fontSize(16).text(`Total: ₹${total}`);
  doc.end();
});

module.exports = router;
