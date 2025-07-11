import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/api/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface Product {
  _id: string;
  productName: string;
  quantity: number;
  rate: number;
}

function GenerateInvoicePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products/list", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/invoices/generate",
        {
          customer,
          products: selectedProductIds,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // for PDF download
        }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf";
      link.click();
      alert("Invoice generated and downloaded!");
    } catch (err) {
      console.error("Failed to generate invoice:", err);
      alert("Failed to generate invoice.");
    }
  };

  const toggleProductSelection = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Generate Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Details */}
        <div className="grid gap-4">
          <Input
            placeholder="Customer Name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            required
          />
          <Input
            placeholder="Email"
            type="email"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            required
          />
          <Input
            placeholder="Phone"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            required
          />
          <Input
            placeholder="Address"
            value={customer.address}
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
            required
          />
        </div>

        {/* Product Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Select Products:</h3>
          <div className="flex flex-col gap-2">
            {products.map((product) => (
              <label key={product._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedProductIds.includes(product._id)}
                  onChange={() => toggleProductSelection(product._id)}
                />
                <span>{product.productName}</span>
              </label>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Generate Invoice
        </Button>
      </form>
    </div>
  );
}

export default GenerateInvoicePage;
