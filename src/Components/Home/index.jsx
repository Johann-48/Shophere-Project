import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import ProductCard from "../ProductCard";
import CommerceCard from "../CommerceCard";

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // <-- Novo estado
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [commerces, setCommerces] = useState([]);

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [resCat, resComm, resAllProducts] = await Promise.all([
          axios.get("/api/categories"),
          axios.get("/api/commerces"),
          axios.get("/api/products"),
        ]);

        setCategories([{ id: null, nome: "Todos" }, ...(resCat.data || [])]);
        setCommerces(resComm.data.commerces || resComm.data);

        const allData = Array.isArray(resAllProducts.data)
          ? resAllProducts.data
          : resAllProducts.data.products;
        setAllProducts(allData || []);
        setProducts(allData || []);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar dados iniciais");
      }
    }

    fetchInitialData();
  }, []);

  useEffect(() => {
    async function fetchProductsByCategory() {
      if (selectedCategory === null) {
        setProducts(allProducts);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `/api/products/categoria/${selectedCategory}`
        );
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.products;
        setProducts(data || []);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os produtos da categoria");
      } finally {
        setLoading(false);
      }
    }

    fetchProductsByCategory();
  }, [selectedCategory, allProducts]);

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
  };

  const handleProductClick = (id) => {
    navigate(`/produto/${id}`);
  };

  return (
    <div
      className="min-h-screen font-sans text-gray-900"
      style={{ background: "linear-gradient(to bottom, #7eaafc, #ffffff)" }}
    >
      {/* Banner */}
      <div
        className="w-full h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("/your-banner-image.jpg")' }}
      >
        <div className="bg-black bg-opacity-70 p-10 rounded-3xl text-white text-center shadow-2xl backdrop-blur-md">
          <h1 className="text-5xl font-extrabold mb-3">
            🛍️ Bem-vindo à <span className="text-blue-400">ShopHere</span>
          </h1>
          <p className="text-lg">
            Ofertas imperdíveis e novidades semanais para você!
          </p>
        </div>
      </div>

      {/* Loading & Error */}
      {loading && (
        <div className="p-6 text-center text-gray-700">
          Carregando produtos...
        </div>
      )}
      {error && <div className="p-6 text-center text-red-500">{error}</div>}

      {/* Comércios */}
      <section className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-blue-500">🏬 Comércios</h2>
          <Link
            to="/commerces/search"
            className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition"
          >
            Pesquisar Comércio
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {commerces.map((c) => (
            <CommerceCard key={c.id} commerce={c} />
          ))}
        </div>
      </section>

      {/* Categorias */}
      <section className="p-6" style={{ background: "#e3f2fd" }}>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          🗂️ Navegue por Categorias
        </h2>
        <div className="flex overflow-x-auto gap-4 pb-4 px-1 hide-scrollbar">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="min-w-[140px] rounded-xl shadow-md flex flex-col items-center justify-center text-center px-4 py-5 text-sm font-semibold cursor-pointer border border-gray-300 bg-white text-gray-900"
              initial={false}
              animate={{
                scale: selectedCategory === cat.id ? 1.05 : 1,
                backgroundColor:
                  selectedCategory === cat.id ? "#dbeafe" : "#FFF",
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <div className="text-3xl mb-2">🗂️</div>
              {cat.nome}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-blue-500">
            ✨ Produtos em Destaque
          </h2>
          <Link
            to="/search"
            className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition"
          >
            Pesquisar
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 10).map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleProductClick(product.id)}
              className="cursor-pointer"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ProductCard
                product={product}
                isLiked={liked.includes(product.id)}
                onToggleLike={toggleLike}
                onAddToCart={addToCart}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mais Vendidos */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          🔥 Mais Vendidos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {allProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={`maisvendido-${product.id}`}
              product={product}
              isLiked={liked.includes(product.id)}
              onToggleLike={toggleLike}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* Carrinho */}
      {cart.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-4 right-4 bg-white shadow p-4 rounded-xl w-80 z-50"
        >
          <h4 className="font-bold mb-2 text-gray-900">🛒 Carrinho</h4>
          <ul className="max-h-48 overflow-y-auto divide-y divide-gray-200">
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center text-sm py-2"
              >
                <div>
                  <p className="font-medium">{item.title || item.name}</p>
                  {item.price && (
                    <span className="text-gray-500 text-xs">
                      {typeof item.price === "string"
                        ? item.price
                        : `R$ ${parseFloat(item.price).toFixed(2)}`}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => removeFromCart(idx)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
          <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Finalizar Compra
          </button>
        </motion.div>
      )}
    </div>
  );
}
