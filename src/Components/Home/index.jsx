import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiTrash2,
  FiFilter,
  FiDollarSign,
  FiStar,
  FiXCircle,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../ProductCard";
import CommerceCard from "../CommerceCard";
export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [commerces, setCommerces] = useState([]);
  // Filtros
  const [sortOption, setSortOption] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  // Converte “R$ 12,90”, “12,90”, 12.9, undefined…  →  12.9 ou NaN
  const toNumber = (value) => {
    if (typeof value === "number") return value;
    if (!value) return NaN;
    // remove tudo que NÃO é dígito, vírgula, ponto ou sinal
    const cleaned = value
      .toString()
      .replace(/[^\d,.-]/g, "")
      .replace(",", ".");
    return parseFloat(cleaned);
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
        setAllProducts(data || []);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os produtos da categoria");
      } finally {
        setLoading(false);
      }
    }
    fetchProductsByCategory();
  }, [selectedCategory]); // Removida dependência allProducts para nãosobrescrever filtros
  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
  };
  const handleProductClick = (id) => {
    navigate(`/produto/${id}`);
  };
  const toggleFilters = () => setShowFilters((prev) => !prev);
  const applyFilters = () => {
    let filtered = [...allProducts];

    // Categoria primeiro
    if (selectedCategory !== null) {
      filtered = filtered.filter((p) => p.categoria_id === selectedCategory);
    }

    // Preço mínimo e máximo
    if (minPrice)
      filtered = filtered.filter(
        (p) => toNumber(p.price) >= parseFloat(minPrice)
      );
    if (maxPrice)
      filtered = filtered.filter(
        (p) => toNumber(p.price) <= parseFloat(maxPrice)
      );

    // Avaliação mínima
    if (minRating) {
      const min = parseFloat(minRating);
      filtered = filtered.filter((p) => p.avgRating >= min);
    }
    // Ordenação
    if (sortOption === "high") {
      filtered.sort((a, b) => toNumber(b.price) - toNumber(a.price));
    } else if (sortOption === "low") {
      filtered.sort((a, b) => toNumber(a.price) - toNumber(b.price));
    } else if (sortOption === "bestseller") {
      filtered.sort((a, b) => (b.sales || 0) - (a.sales || 0));
    }

    setProducts(filtered);
    setShowFilters(false);
  };

  return (
    <div
      className="min-h-screen font-sans text-gray-900"
      style={{ background: "linear-gradient(to bottom, #7eaafc, #ffffff)" }}
    >
      {/* Banner */}
      <div
        className="w-full h-[300px] bg-cover bg-center flex
items-center justify-center"
        style={{ backgroundImage: 'url("/your-banner-image.jpg")' }}
      >
        <div
          className="bg-black bg-opacity-70 p-10 rounded-3xl
text-white text-center shadow-2xl backdrop-blur-md"
        >
          <h1 className="text-5xl font-extrabold mb-3">
            🛍 Bem-vindo à <span className="text-blue-400">ShopHere</span>
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
      {error && (
        <div
          className="p-6 text-center
text-red-500"
        >
          {error}
        </div>
      )}
      {/* Comércios */}
      <section className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-blue-500">🏬 Comércios</h2>
          <Link
            to="/commerces/search"
            className="text-sm text-white bg-blue-500 hover:bg-blue-600
px-4 py-2 rounded-full transition"
          >
            Pesquisar Comércio
          </Link>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
gap-6"
        >
          {commerces.map((c) => (
            <CommerceCard key={c.id} commerce={c} />
          ))}
        </div>
      </section>
      {/* Categorias */}
      <section className="p-6" style={{ background: "#e3f2fd" }}>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          🗂 Navegue por Categorias
        </h2>
        <div
          className="flex overflow-x-auto gap-4 pb-4 px-1
hide-scrollbar"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="min-w-[140px] rounded-xl shadow-lg flex
flex-col items-center justify-center text-center px-4 py-5 text-sm
font-semibold cursor-pointer border-2 border-transparent
hover:border-blue-400 transition"
              initial={false}
              animate={{
                scale: selectedCategory === cat.id ? 1.05 : 1,
                backgroundColor:
                  selectedCategory === cat.id ? "#dbeafe" : "#FFF",
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <div className="text-3xl mb-2">🗂</div>
              {cat.nome}
            </motion.div>
          ))}
        </div>
      </section>
      {/* Produtos em Destaque */}
      <section className="p-6">
        <div
          className="flex items-center justify-between mb-4
flex-wrap gap-4"
        >
          <h2 className="text-2xl font-bold text-blue-500">
            ✨ Produtos em Destaque
          </h2>
          <div className="flex gap-2">
            <button
              onClick={toggleFilters}
              className="flex items-center gap-2 text-sm text-white
bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-full transition"
            >
              <FiFilter /> Filtrar
            </button>
            <Link
              to="/search"
              className="text-sm text-white bg-blue-500
hover:bg-blue-600 px-4 py-2 rounded-full transition"
            >
              🔍 Pesquisar
            </Link>
          </div>
        </div>
        {/* Filtros visíveis apenas se showFilters === true */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border rounded-2xl shadow-lg p-6
mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  🎯 Filtros Avançados
                </h3>
                <button
                  onClick={toggleFilters}
                  className="text-gray-500 hover:text-red-600"
                >
                  <FiXCircle size={20} />
                </button>
              </div>
              <div
                className="grid grid-cols-1 md:grid-cols-2
lg:grid-cols-4 gap-6"
              >
                <div className="flex flex-col">
                  <label
                    className="mb-1 text-sm font-medium
text-gray-600"
                  >
                    Ordenar por
                  </label>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="p-3 border rounded-lg
focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Selecione</option>
                    <option value="high">Mais caro</option>
                    <option value="low">Mais barato</option>
                    <option value="bestseller">Mais vendidos</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label
                    className="mb-1 text-sm font-medium
text-gray-600 flex items-center gap-1"
                  >
                    <FiDollarSign /> Preço mínimo
                  </label>
                  <input
                    type="number"
                    placeholder="R$ 0,00"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="p-3 border rounded-lg
focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="mb-1 text-sm font-medium
text-gray-600 flex items-center gap-1"
                  >
                    <FiDollarSign /> Preço máximo
                  </label>
                  <input
                    type="number"
                    placeholder="R$ 0,00"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="p-3 border rounded-lg
focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="mb-1 text-sm font-medium
text-gray-600 flex items-center gap-1"
                  >
                    <FiStar /> Estrelas mínimas
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="0-5"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="p-3 border rounded-lg
focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 gap-4">
                <button
                  onClick={() => {
                    setSortOption("");
                    setMinPrice("");
                    setMaxPrice("");
                    setMinRating("");
                    setProducts(allProducts);
                    setShowFilters(false);
                  }}
                  className="px-5 py-2 bg-gray-200 text-gray-700
rounded-lg hover:bg-gray-300 transition"
                >
                  Limpar
                </button>
                <button
                  onClick={applyFilters}
                  className="px-5 py-2 bg-blue-500 text-white
rounded-lg hover:bg-blue-600 transition"
                >
                  Aplicar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
gap-6"
        >
          {products.slice(0, 10).map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
          className="fixed bottom-4 right-4 bg-white shadow-xl p-4
rounded-2xl w-80 z-50"
        >
          <h4 className="font-bold mb-2 text-gray-900">🛒 Carrinho</h4>
          <ul
            className="max-h-48 overflow-y-auto divide-y
divide-gray-200"
          >
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center text-sm
py-2"
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
          <button
            className="mt-3 w-full bg-blue-500 text-white py-2
rounded-lg hover:bg-blue-600 transition"
          >
            Finalizar Compra
          </button>
        </motion.div>
      )}
    </div>
  );
}
