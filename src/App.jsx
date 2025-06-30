import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import StorePage from "./Components/StorePage/StorePage";
import CompararProdutoPage from "./Components/Compareproduct/Compareproduct";
import HomePage from "./Components/HomePage/HomePage"; //
import Sobre from "./Components/Sobrenos/Sobrenos";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Sobre/>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
