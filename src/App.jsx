import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProductPage from "./Components/ProductPage/ProductPage";

import AccountManager from "./Components/AccountManager/AccountManager";
import LoginPage from "./Pages/LoginPage.jsx";
import SignUp from "./Components/Signup";
import LogIn from "./Components/Login";
import Saller from "./Components/Seller";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <Header />
      <SignUp />
      <Footer />
    </>
  );
}

export default App;
