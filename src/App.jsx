import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Components/Header";
import SignUp from "./Components/Signup";
import Footer from "./Components/Footer";
import LogIn from "./Components/Login";
import Saller from "./Components/Seller";
import LoginPage from "./Pages/LoginPage.jsx";
import AccountManagerPage from "./Pages/AccountManagerPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/account" element={<AccountManagerPage />} />
    </Routes>
  );
}

export default App;
