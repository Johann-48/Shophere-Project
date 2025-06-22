import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Componentes
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProductPage from "./Components/ProductPage/ProductPage";

// Outros (não usados aqui, mas deixei importados caso use depois)
import AccountManager from "./Components/AccountManager/AccountManager";
import LoginPage from "./Pages/LoginPage.jsx";
import SignUp from "./Components/Signup";
import LogIn from "./Components/Login";
import Saller from "./Components/Seller";

function App() {
  return (
    <>
      <Header />
      <ProductPage />
      <Footer />
    </>
  );
}

export default App;
