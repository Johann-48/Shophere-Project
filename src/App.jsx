import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Components/Header";
import SignUp from "./Components/Signup";
import Footer from "./Components/Footer";

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
