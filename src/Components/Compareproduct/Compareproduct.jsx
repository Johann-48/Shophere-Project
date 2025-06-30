import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiArrowLeft,
  FiMail,
  FiShoppingBag,
  FiZap,
} from "react-icons/fi";

const mockProduto = {
  id: 1,
  nome: 'Smart TV Samsung 65" Crystal UHD 4K',
  imagem:
    "https://images.samsung.com/is/image/samsung/p6pim/br/qn65q60aaafxzd/gallery/br-qled-q60a-qa65q60aaafxzd-415748677?$650_519_PNG$",
};

const mockLojas = [
  {
    nome: "FastShop",
    preco: "R$ 3.399,00",
    cashback: "10%",
    imagem:
      "https://logodownload.org/wp-content/uploads/2019/11/fast-shop-logo.png",
    local: "Av. Paulista, SP",
    contato: "contato@fastshop.com.br",
  },
  {
    nome: "Magazine Luiza",
    preco: "R$ 3.499,00",
    cashback: "8%",
    imagem:
      "https://logodownload.org/wp-content/uploads/2019/05/magalu-logo.png",
    local: "Rua dos Andradas, SP",
    contato: "vendas@magalu.com.br",
  },
  {
    nome: "Americanas",
    preco: "R$ 3.599,00",
    cashback: "5%",
    imagem:
      "https://logodownload.org/wp-content/uploads/2019/07/americanas-logo.png",
    local: "Centro, RJ",
    contato: "sac@americanas.com.br",
  },
];

const CompararProdutoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-gray-900 font-inter px-6 py-10">
      <div className="max-w-7xl mx-auto bg-gradient-to-b from-green-100 to-white rounded-3xl p-8 shadow-xl">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-yellow-600 hover:text-yellow-700 transition font-semibold mb-8"
        >
          <FiArrowLeft className="mr-2" size={20} /> Voltar
        </button>

        {/* Produto */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white rounded-2xl p-8 shadow-inner mb-10">
          <img
            src={mockProduto.imagem}
            alt={mockProduto.nome}
            className="w-64 h-64 object-contain rounded-xl"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{mockProduto.nome}</h1>
            <p className="text-gray-700 text-lg">
              Compare preços entre lojas físicas e online com cashback incluso!
            </p>
          </div>
        </div>

        {/* Comparação de Lojas */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">🛍️ Lojas com este produto</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockLojas.map((loja, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <div>
                  <img
                    src={loja.imagem}
                    alt={loja.nome}
                    className="w-36 h-20 object-contain mb-6 mx-auto"
                  />
                  <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                    {loja.nome}
                  </h3>
                  <div className="border-t pt-4 space-y-3 text-gray-700 text-base">
                    <p className="flex items-center gap-2 font-semibold text-green-600">
                      <FiShoppingBag size={20} /> {loja.preco}
                    </p>
                    <p className="flex items-center gap-2 font-semibold text-yellow-600">
                      <FiZap size={20} /> Cashback: {loja.cashback}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiMapPin size={18} /> {loja.local}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiMail size={18} /> {loja.contato}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert(`Entrar em contato com ${loja.nome}`)}
                  className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full shadow-md transition w-full text-lg"
                >
                  Falar com a loja
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompararProdutoPage;
