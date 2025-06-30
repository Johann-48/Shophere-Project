import React, { useState, useEffect } from "react";
import { FiSearch, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const mockProducts = [
  {
    id: 1,
    name: "Tênis Esportivo Xtreme",
    price: 249.99,
    category: "Calçados",
    store: "Loja Esportes",
    image:
      "https://images.unsplash.com/photo-1600185364946-ae7e48cf53c7?auto=format&fit=crop&w=800&q=80",
    isNew: true,
    isOnSale: true,
    priceDrop: true,
  },
  {
    id: 2,
    name: "Jaqueta Masculina Urban",
    price: 199.9,
    category: "Roupas",
    store: "Moda Urbana",
    image:
      "https://images.unsplash.com/photo-1621609778337-57e66f3d8e5c?auto=format&fit=crop&w=800&q=80",
    isNew: false,
    isOnSale: true,
    priceDrop: false,
  },
  {
    id: 3,
    name: "Cadeira Gamer Alpha",
    price: 1199.99,
    category: "Móveis",
    store: "Game World",
    image:
      "https://images.unsplash.com/photo-1616627981819-84d64052bd3d?auto=format&fit=crop&w=800&q=80",
    isNew: false,
    isOnSale: false,
    priceDrop: true,
  },
];

const normalizeText = (text) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [store, setStore] = useState("Todas");
  const [sort, setSort] = useState("Relevância");
  const [favorites, setFavorites] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const navigate = useNavigate();

  useEffect(() => {
    let results = mockProducts.filter((product) =>
      normalizeText(product.name).includes(normalizeText(query))
    );

    if (category !== "Todos") {
      results = results.filter((product) => product.category === category);
    }

    if (store !== "Todas") {
      results = results.filter((product) => product.store === store);
    }

    if (sort === "Menor preço") {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === "Maior preço") {
      results.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(results);
  }, [query, category, store, sort]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      {/* Título */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow-sm"
        >
          🛒 Encontre os Melhores Produtos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-500 text-md md:text-lg mt-2"
        >
          Busque por nome, categoria ou aproveite promoções exclusivas!
        </motion.p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-10 flex-wrap">
        <div className="relative w-full md:w-1/2">
          <FiSearch className="absolute top-3 left-3 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Buscar produto..."
            className="w-full pl-10 pr-4 py-2 border rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-full shadow focus:ring-2 focus:ring-blue-400"
        >
          <option>Todos</option>
          <option>Calçados</option>
          <option>Roupas</option>
          <option>Móveis</option>
        </select>

        <select
          value={store}
          onChange={(e) => setStore(e.target.value)}
          className="px-4 py-2 border rounded-full shadow focus:ring-2 focus:ring-blue-400"
        >
          <option>Todas</option>
          <option>Loja Esportes</option>
          <option>Moda Urbana</option>
          <option>Game World</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 border rounded-full shadow focus:ring-2 focus:ring-blue-400"
        >
          <option>Relevância</option>
          <option>Menor preço</option>
          <option>Maior preço</option>
        </select>
      </div>

      {/* Lista de produtos */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              className="relative bg-white border rounded-3xl p-5 shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover rounded-xl mb-4"
              />

              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 group"
              >
                <FiHeart
                  className={`text-2xl transition-all group-hover:scale-110 ${
                    favorites.includes(product.id)
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                />
              </button>

              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 mb-1">{product.store}</p>
              <p className="text-xl font-bold text-blue-600 mb-2">
                R$ {product.price.toFixed(2)}
              </p>

              <div className="flex flex-wrap gap-2 text-xs font-medium mb-4">
                {product.isOnSale && (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                    🔥 Promoção
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
                    🆕 Novo
                  </span>
                )}
                {product.priceDrop && (
                  <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
                    📉 Preço em queda
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
                  onClick={() =>
                    navigate(`/produto/${product.id}`, { state: { product } })
                  }
                >
                  Visualizar produto
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="text-center text-gray-500 text-lg mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Nenhum produto encontrado 😕
        </motion.div>
      )}
    </div>
  );
}
