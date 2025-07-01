import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../ProductCard";
import CommerceCard from "../CommerceCard";

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState([]);
  const [cart, setCart] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
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

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const url = selectedCategory
          ? `/api/products/categoria/${selectedCategory}`
          : `/api/products`;
        const response = await axios.get(url);
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.products;
        setProducts(data || []);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Não foi possível carregar produtos");
        setProducts([]);
      } finally {
        setLoading(false);
      }
      try {
        const resCat = await axios.get("/api/categories");
        setCategories([{ id: null, nome: "Todos" }, ...(resCat.data || [])]);
      } catch (e) {
        console.error("Erro ao buscar categorias:", e);
      }
      const resComm = await axios.get("/api/commerces");
      setCommerces(resComm.data.commerces || resComm.data);
    }
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900 min-h-screen font-sans relative">
      {/* Menu 3 Pontos */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-gray-700 hover:text-black p-2 rounded-full hover:bg-gray-200 transition"
        >
          <FiMoreVertical size={22} />
        </button>
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200"
            >
              <ul className="text-sm text-gray-700">
                <Link to="/accountmanager">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Perfil
                  </li>
                </Link>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Configurações
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 font-medium"
                >
                  Sair
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Banner */}
      <div
        className="w-full h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("/your-banner-image.jpg")' }}
      >
        <div className="bg-black bg-opacity-70 p-10 rounded-3xl text-white text-center shadow-2xl backdrop-blur-md">
          <h1 className="text-5xl font-extrabold mb-3">
            🛍️ Bem-vindo à <span className="text-red-400">ShopHere</span>
          </h1>
          <p className="text-lg">
            Ofertas imperdíveis, categorias exclusivas e novidades semanais para
            você!
          </p>
        </div>
      </div>

      {loading && <div className="p-6 text-center">Carregando produtos...</div>}
      {error && <div className="p-6 text-center text-red-500">{error}</div>}

      {!loading && !error && (
        <>
          {/* Seções de categorias */}
          <section className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              🗂️ Navegue por Categorias
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4 px-1 hide-scrollbar">
              {categories.map((cat) => (
                <motion.div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`min-w-[130px] bg-white rounded-xl shadow-sm flex flex-col items-center justify-center text-center px-4 py-5 text-sm font-semibold hover:bg-red-100 transition cursor-pointer border ${
                    selectedCategory === cat.id
                      ? "bg-red-100 border-red-400 shadow-lg scale-105"
                      : "border-gray-200"
                  }`}
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
              <h2 className="text-2xl font-bold text-red-600">
                ✨ Produtos em Destaque
              </h2>
              <Link
                to="/search"
                className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition"
              >
                Pesquisar
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 10).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isLiked={liked.includes(product.id)}
                  onToggleLike={toggleLike}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </section>

          {/* Mais Vendidos */}
          <section className="p-6">
            <h2 className="text-2xl font-bold mb-4">🔥 Mais Vendidos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
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

          {/* Comercios */}
          <section className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-red-600">🏬 Comércios</h2>
              <Link
                to="/commerces/search"
                className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition"
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

          {/* Carrinho Flutuante */}
          {cart.length > 0 && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="fixed bottom-4 right-4 bg-white shadow-2xl p-4 rounded-xl w-80 z-50"
            >
              <h4 className="font-bold mb-2">🛒 Carrinho</h4>
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
              <button className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                Finalizar Compra
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
