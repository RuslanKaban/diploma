import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import Cart from "./pages/Cart/Cart";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import CategoryProductsPage from "./pages/CategoryProduct/categoryProduct";
import Product from "./pages/Product/Product";

import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="category/:gender/:slug" element={<CategoryProductsPage />} />
          <Route path="categories/:gender" element={<CategoriesPage />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;