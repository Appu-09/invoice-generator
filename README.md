Invoice Generator App

This is a **full-stack Invoice Generator** web application built with:
- **React + Vite + Redux Toolkit** (Frontend)
- **Node.js + Express + MongoDB** (Backend)

It allows users to:
- Register & Login  
- Add Products (Name, Price, Quantity)  
- View All Added Products  
- Generate Invoices with PDF Download

---

## 📦 Technologies Used

### Frontend:
- React
- Vite
- Redux Toolkit
- Axios
- React Router DOM
- Tailwind CSS (optional for styling)

### Backend:
- Node.js
- Express
- MongoDB (via Mongoose)
- JWT (Authentication)
- bcryptjs (Password hashing)
- pdfkit (PDF Invoice generation)

  API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	User Registration
POST	/api/auth/login	User Login (JWT Token)
POST	/api/products	Add Product
GET	/api/products	Get All Products
POST	/api/invoice	Generate Invoice PDF

🚀 Features
User Authentication with JWT

Product CRUD (Add Product)

Generate Invoice (PDF Download)

Modern React (Redux Toolkit + Vite + React Router)

