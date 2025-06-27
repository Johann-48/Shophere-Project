import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProductSearch from "./Components/ProductSearch/ProductSearch";
import ProductView from "./Components/ProductView/ProductView";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<ProductSearch />} />
        <Route path="/produto/:id" element={<ProductView />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
