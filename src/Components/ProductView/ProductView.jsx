import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiHeart, FiTruck, FiCheckCircle } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (location.state && location.state.product) {
      setProduct(location.state.product);
    }
  }, [location.state]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-xl text-gray-600">
        Produto não encontrado.
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-500 hover:underline mb-6 text-lg"
      >
        <FiArrowLeft className="mr-2" /> Voltar
      </button>

      <motion.div
        className="flex flex-col lg:flex-row gap-10 bg-white shadow-xl rounded-3xl p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full lg:w-1/2 h-[420px] object-cover rounded-2xl shadow"
        />

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
              <motion.div
                whileTap={{ scale: 1.2 }}
                onClick={() => setLiked(!liked)}
                className="cursor-pointer"
              >
                <FiHeart
                  className={`text-3xl transition-colors ${
                    liked ? "text-red-500" : "text-gray-400"
                  }`}
                />
              </motion.div>
            </div>

            <p className="text-2xl text-blue-600 font-semibold mb-3">
              R$ {product.price.toFixed(2)}
            </p>

            <div className="flex items-center gap-1 text-yellow-500 mb-4">
              <span className="text-xl">⭐</span>
              <span className="text-xl">⭐</span>
              <span className="text-xl">⭐</span>
              <span className="text-xl text-gray-300">☆</span>
              <span className="text-xl text-gray-300">☆</span>
              <span className="text-gray-600 text-sm ml-2">(123 avaliações)</span>
            </div>

            <div className="flex flex-wrap gap-2 text-sm font-medium mb-6">
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
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full flex items-center gap-1">
                <FiTruck className="text-sm" /> Entrega rápida
              </span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Este item está disponível em nosso catálogo. Explore suas características
              e veja se ele se encaixa no que você procura. Ideal para comparar com outras opções semelhantes.
            </p>

            <ul className="mb-6 text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" /> Informações atualizadas
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" /> Dados coletados de várias lojas
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" /> Preço sujeito a alteração
              </li>
            </ul>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            className="w-full md:w-auto px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition"
          >
            Fechar visualização
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
