 import { useState } from "react";
import "./App.css";


import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import AccountManager from "./Components/AccountManager/AccountManager";
import SignUp from "./Components/Signup";
import Seller from "./Components/Seller"; // novo componente


function App() {
  const [currentPage, setCurrentPage] = useState("login");


  return (
    <>
      <Header />


      {currentPage === "login" && (
        <Login
          goToForgotPassword={() => setCurrentPage("forgot")}
          goToSignUp={() => setCurrentPage("signup")}
          goToSeller={() => setCurrentPage("seller")} // novo
        />
      )}


      {currentPage === "forgot" && (
        <ForgotPassword goBackToLogin={() => setCurrentPage("login")} />
      )}


      {currentPage === "signup" && (
        <SignUp goBackToLogin={() => setCurrentPage("login")} />
      )}


      {currentPage === "seller" && (
        <Seller goBackToLogin={() => setCurrentPage("login")} />
      )}


      <Footer />
    </>
  );
}


export default App;



