import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaUsers, FaHeartbeat } from "react-icons/fa";

export default function About() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-green-100 to-white py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white p-10 rounded-3xl shadow-xl border border-gray-200"
      >
        <h1 className="text-5xl font-bold text-green-600 mb-6 text-center">
          Sobre o ShopHere
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          <strong>ShopHere</strong> nasceu com a missão de conectar consumidores
          a comércios locais, oferecendo uma plataforma intuitiva e moderna onde
          você encontra de tudo, desde produtos artesanais até serviços
          especializados. Nosso foco é valorizar o comércio de bairro,
          impulsionando a economia local e criando uma experiência de compra
          única e personalizada.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-4">
            <FaUsers size={48} className="text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Comunidade</h3>
            <p className="text-gray-600 text-sm">
              Fortalecemos o elo entre você e os vizinhos, valorizando produtos
              e serviços da sua região.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <FaShoppingCart size={48} className="text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Variedade</h3>
            <p className="text-gray-600 text-sm">
              Explore categorias diversificadas e encontre ofertas imperdíveis
              em um só lugar.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <FaHeartbeat size={48} className="text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Confiança</h3>
            <p className="text-gray-600 text-sm">
              Garantimos segurança e transparência em cada transação, para você
              comprar com tranquilidade.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-green-600 transition"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Voltar ao Topo
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
