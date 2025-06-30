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
    </Routes>
  );
}

export default App;
