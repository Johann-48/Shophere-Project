import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiTrendingUp, FiTrendingDown, FiTrash2, FiMoreVertical } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "Celulares", "Moda", "Casa", "Esportes", "Beleza", "Eletrônicos",
  "Brinquedos", "Alimentos", "Papelaria", "Pets", "Automotivo",
  "Ferramentas", "Livros", "Outros",
];

const fakeProducts = Array.from({ length: 8 }, (_, i) => {
  const price = parseFloat((Math.random() * 300 + 50).toFixed(2));
  const oldPrice = Math.random() > 0.5 ? parseFloat((price + (Math.random() * 50 - 25)).toFixed(2)) : null;
  return {
    id: i + 1,
    name: `Produto ${i + 1}`,
    price,
    oldPrice,
    description: "Descrição curta do produto",
    image: `/assets/produto${(i % 4) + 1}.png`,
  };
});

export default function HomePage() {
  const [liked, setLiked] = useState([]);
  const [cart, setCart] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

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
              className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
            >
              <ul className="text-sm text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Perfil</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Configurações</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sair</li>
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
          <h1 className="text-5xl font-extrabold mb-3">🛍️ Bem-vindo à <span className="text-red-400">ShopHere</span></h1>
          <p className="text-lg">Ofertas imperdíveis, categorias exclusivas e novidades semanais para você!</p>
        </div>
      </div>

     <section className="p-6">
  <h2 className="text-2xl font-bold mb-4">🗂️ Navegue por Categorias</h2>
  <div className="relative">
    <div className="flex overflow-x-auto gap-4 pb-4 px-1 scroll-smooth hide-scrollbar">
      {categories.map((cat, i) => (
        <motion.div
          whileHover={{ scale: 1.07 }}
          key={i}
          className="min-w-[130px] bg-white rounded-xl shadow-sm flex flex-col items-center justify-center text-center px-4 py-5 text-sm font-semibold hover:bg-red-100 transition cursor-pointer"
        >
          <div className="text-3xl mb-2">
            {/* Ícones representativos (padrão, mas pode personalizar por categoria depois) */}
            🗂️
          </div>
          {cat}
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Produtos em Destaque */}
      <section className="p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">✨ Produtos em Destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fakeProducts.map((prod) => {
            const priceTrend = prod.oldPrice
              ? prod.price > prod.oldPrice
                ? "up"
                : "down"
              : null;

            return (
              <Link to={`/produto/${prod.id}`} key={prod.id} target="_blank">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-lg p-4 relative flex flex-col hover:ring-2 hover:ring-red-300 transition"
                >
                  <img src={prod.image} alt={prod.name} className="w-full h-32 object-contain mb-3" />
                  <h3 className="text-lg font-semibold mb-1">{prod.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{prod.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-500 font-bold">R$ {prod.price.toFixed(2)}</span>
                    {prod.oldPrice && (
                      <span className="text-xs line-through text-gray-400">R$ {prod.oldPrice.toFixed(2)}</span>
                    )}
                    {priceTrend === "up" && <FiTrendingUp className="text-orange-500" />}
                    {priceTrend === "down" && <FiTrendingDown className="text-green-500" />}
                  </div>
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
                      <FiHeart className={liked.includes(prod.id) ? "fill-red-500" : "stroke-2"} />
                    </button>
                  </div>
                </motion.div>
              </Link>
            );
          })}
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
              <p className="text-red-600 font-bold text-sm mt-1">R$ {prod.price.toFixed(2)}</p>
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
          className="fixed bottom-4 right-4 bg-white shadow-2xl p-4 rounded-xl w-80 z-50"
        >
          <h4 className="font-bold mb-2">🛒 Carrinho</h4>
          <ul className="max-h-48 overflow-y-auto divide-y divide-gray-200">
            {cart.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center text-sm py-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <span className="text-gray-500 text-xs">R$ {item.price.toFixed(2)}</span>
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

      {/* Footer */}
      <footer className="mt-16 p-6 bg-gray-800 text-white text-center">
        <p className="text-sm">© 2025 ShopHere. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
