import React, { useState } from "react";
import api from "@/api/axios";
import { useDispatch } from "react-redux";
import { addProduct } from "@/store/productSlice";
import { useNavigate } from "react-router-dom";

function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(""); // ✅ Quantity field
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/products", {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      });

      dispatch(addProduct(response.data)); // ✅ Save to Redux
      alert("Product added successfully");
      navigate("/invoice"); // ✅ Redirect after adding
    } catch (error) {
      console.error("Error adding product", error);
      alert("Error adding product");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
