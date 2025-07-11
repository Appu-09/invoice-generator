import React, { useEffect, useState } from "react";
import axios from "axios";

const InvoicePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const downloadInvoice = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products }),
      });

      if (!response.ok) throw new Error("Failed to download invoice");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Failed to download invoice:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Invoice</h2>
      {products.length === 0 ? (
        <p>No products added.</p>
      ) : (
        <ul className="mb-4">
          {products.map((product, index) => (
            <li key={index}>
              {product.name} - ₹{product.price} (Qty: {product.quantity})
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={downloadInvoice}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download Invoice PDF
      </button>
    </div>
  );
};

export default InvoicePage;
