import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AddProductPage from "@/pages/AddProductPage";
import InvoicePage from "@/pages/InvoicePage";
import GenerateInvoicePage from "@/pages/GenerateInvoicePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/products/add" element={<AddProductPage />} />
      <Route path="/invoice" element={<InvoicePage />} />
      <Route path="/generate-invoice" element={<GenerateInvoicePage />} />
    </Routes>
  );
}

export default App;
