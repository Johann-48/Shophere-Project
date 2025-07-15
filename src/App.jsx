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
import LojaDashboardPage from "./Pages/LojaDashboardPage";
import NotFoundPage from "./Pages/NotFoundPage";

import Review from "./Components/Review"; // 👈 Aqui
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/contact" element={<ContactSellerPage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      <Route path="/produto/:id" element={<ProductPage />} />
      <Route path="/seller" element={<SellerPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/comparar/:codigo" element={<CompareProductPage />} />
      <Route path="/compare" element={<CompareProductPage />} />
      <Route path="/search" element={<ProductSearchPage />} />
      <Route path="/commerce/:id" element={<CommercePage />} />
      <Route path="/commerces/search" element={<CommerceSearchPage />} />
      <Route path="/review" element={<Review />} /> {/* 👈 Aqui */}

      {/* rota só para usuários “user” */}
      <Route element={<ProtectedRoute requiredRole="user" />}>
        <Route path="/accountmanager" element={<AccountManagerPage />} />
      </Route>

      {/* rota só para “commerce” */}
      <Route element={<ProtectedRoute requiredRole="commerce" />}>
        <Route path="/lojadashboard" element={<LojaDashboardPage />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
