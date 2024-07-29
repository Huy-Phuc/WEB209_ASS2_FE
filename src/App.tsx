// import { useState } from 'react'
import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Footer from "./components/layouts/Footer";
// import Login from './pages/Login'
// import Register from './pages/Register'
import NotFound from "./pages/NotFound";
// import Header from './components/layouts/Header'
import ProductComponent from "./pages/Product";
import FormProduct from "./pages/FormProduct";
import AuthForm from "./pages/AuthForm";
import CategoryComponent from "./pages/Category";
import CategoryForm from "./pages/FormCategory";
// import CategoryForm from "./pages/FormCategoty";
// import axios from 'axios'
// import {User } from './interfaces/User'

function App() {
  return (
    <>
      {/* <Header /> */}

      <main id="main">
        <Routes>
          <Route index element={<ProductComponent />} />
          <Route path="/category" element={<CategoryComponent />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<AuthForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/add" element={<FormProduct />} />
          <Route path="/edit/:id" element={<FormProduct />} />
          <Route path="/add-cate" element={<CategoryForm />} />
          <Route path="/edit-cate/:id" element={<CategoryForm />} />
        </Routes>
      </main>

      {/* <Footer /> */}
    </>
  );
}

export default App;
