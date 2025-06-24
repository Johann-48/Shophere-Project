import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";

const categories = [
  "Celulares", "Moda", "Casa", "Esportes", "Beleza", "Eletrônicos",
  "Brinquedos", "Alimentos", "Papelaria", "Pets", "Automotivo",
  "Ferramentas", "Livros", "Outros",
];

const fakeProducts = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Produto ${i + 1}`,
  price: `R$ ${(Math.random() * 300 + 50).toFixed(2)}`,
  description: "Descrição curta do produto",
  image: `/assets/produto${(i % 4) + 1}.png`,
}));

export default function HomePage() {
  const [liked, setLiked] = useState([]);
  const [cart, setCart] = useState([]);

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 min-h-screen font-sans">
      {/* Banner Principal */}
      <div
        className="w-full h-[300px] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: 'url("/your-banner-image.jpg")' }}
      >
        <div className="bg-black bg-opacity-70 p-10 rounded-3xl text-white text-center shadow-2xl backdrop-blur-md">
          <h1 className="text-5xl font-extrabold mb-3 tracking-wide">
            🛍️ Bem-vindo à <span className="text-red-400">ShopHere</span>
          </h1>
          <p className="text-lg">Ofertas imperdíveis, categorias exclusivas e novidades semanais para você!</p>
        </div>
      </div>

      {/* Categorias */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">🗂️ Navegue por Categorias</h2>
        <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
          {categories.map((cat, i) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={i}
              className="min-w-[120px] h-28 bg-white rounded-xl shadow-md flex items-center justify-center text-center px-4 py-2 text-sm font-semibold hover:bg-red-100 cursor-pointer"
            >
              {cat}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">✨ Produtos em Destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fakeProducts.map((prod) => (
            <Link
              to={`/produto/${prod.id}`}
              target="_blank"
              rel="noopener noreferrer"
              key={prod.id}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-lg p-4 relative flex flex-col hover:ring-2 hover:ring-red-300 transition"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-32 object-contain mb-3"
                />
                <h3 className="text-lg font-semibold mb-1">{prod.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{prod.description}</p>
                <span className="text-red-500 font-bold mb-3">{prod.price}</span>
                <div className="mt-auto flex justify-between items-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(prod);
                    }}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                  >
                    Comprar
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(prod.id);
                    }}
                    className="text-red-500"
                  >
                    <FiHeart
                      className={
                        liked.includes(prod.id) ? "fill-red-500" : "stroke-2"
                      }
                    />
                  </button>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mais Vendidos */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">🔥 Mais Vendidos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {fakeProducts.slice(0, 4).map((prod) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              key={`maisvendido-${prod.id}`}
              className="bg-white rounded-xl shadow-md p-4"
            >
              <img src={prod.image} alt={prod.name} className="h-24 w-full object-contain mb-2" />
              <h4 className="text-sm font-medium">{prod.name}</h4>
              <p className="text-xs text-gray-500">{prod.description}</p>
              <p className="text-red-600 font-bold text-sm mt-1">{prod.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vitrine de Novidades */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">🆕 Vitrine de Novidades</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[0, 1].map((i) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              key={`novidade-${i}`}
              className="bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-lg p-4"
            >
              <img
                src={`/assets/novidade${(i % 2) + 1}.png`}
                alt={`Novo Produto ${i + 1}`}
                className="w-full h-32 object-contain mb-2"
              />
              <p className="text-sm font-medium">Novo Produto {i + 1}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Banner Promocional */}
      <section className="p-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-2xl flex justify-between items-center shadow-xl"
        >
          <div>
            <h3 className="text-xl font-bold">Oferta Relâmpago 🔥</h3>
            <p className="text-sm">Só hoje: 50% OFF em eletrônicos</p>
          </div>
          <img
            src="/assets/banner-box.png"
            alt="Promo"
            className="h-20 hidden sm:block"
          />
        </motion.div>
      </section>

      {/* Carrinho Flutuante */}
      {cart.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-4 right-4 bg-white shadow-2xl p-4 rounded-xl w-72 z-50"
        >
          <h4 className="font-bold mb-2">🛒 Carrinho</h4>
          <ul className="max-h-40 overflow-y-auto">
            {cart.map((item, idx) => (
              <li key={idx} className="flex justify-between text-sm border-b py-1">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
          <button className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            Finalizar Compra
          </button>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="mt-16 p-6 bg-gray-800 text-white text-center">
        <p className="text-sm">© 2025 ShopHere. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
