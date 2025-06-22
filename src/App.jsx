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
  // Estado que controla o produto selecionado
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Exemplo: lista de IDs disponíveis ou botões para selecionar
  const productList = [
    { id: 1, title: "Produto 1" },
    { id: 2, title: "Produto 2" },
    { id: 3, title: "Produto 3" },
  ];

  return (
    <div>
      <Header />
<<<<<<< HEAD
      <h1 className="text-2xl font-bold p-4">Loja Exemplo</h1>
      {!selectedProductId ? (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {productList.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProductId(p.id)}
              className="border p-4 rounded hover:shadow cursor-pointer"
            >
              {p.title}
            </button>
          ))}
        </div>
      ) : (
        <ProductPage
          productId={selectedProductId}
          onBack={() => setSelectedProductId(null)}
        />
      )}
=======
      <Login/>
>>>>>>> a2fd9139fc00f136ec490d77d5844b9ca8e9264a
      <Footer />
    </div>
  );
}

export default App;
