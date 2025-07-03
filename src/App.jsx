import "./App.css";
import { Routes, Route } from "react-router-dom";

import ContactSellerPage from "./Pages/ContactSellerPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ProductPage from "./Pages/ProductPage";
import SellerPage from "./Pages/SellerPage";
import AccountManagerPage from "./Pages/AccountManagerPage";
import AboutPage from "./Pages/AboutPage";
import CompareProductPage from "./Pages/CompareProductPage";
import ProductSearchPage from "./Pages/ProductSearchPage";
import CommercePage from "./Pages/CommercePage";
import CommerceSearchPage from "./Pages/CommerceSearchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/contact" element={<ContactSellerPage />} />
      <Route path="/accountmanager" element={<AccountManagerPage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      <Route path="/produto/:id" element={<ProductPage />} />
      <Route path="/seller" element={<SellerPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/comparar/:codigo" element={<CompareProductPage />} />
      <Route path="/search" element={<ProductSearchPage />} />
      <Route path="/commerce/:id" element={<CommercePage />} />
      <Route path="/commerces/search" element={<CommerceSearchPage />} />
    </Routes>
  );
}

export default App;
