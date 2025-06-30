import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiInfo, FiSearch } from "react-icons/fi";

const LojaPage = () => {
  const loja = {
    nome: "Shophere",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    cashbackInfo: "Compare preços e ganhe até 10% de volta!",
    cashbackDetalhes: [
      { tipo: "Ofertas especiais", valor: "10%" },
      { tipo: "Outros produtos", valor: "0.5%" },
    ],
    avisoCashback: "Cashback não é válido via app.",
    contato: "contato@shophere.com.br",
  };

  const produtos = [
    {
      id: 1,
      nome: 'Smart TV Samsung 65" Crystal UHD 4K',
      preco: "R$ 3.399,00",
      imagem:
        "https://images.samsung.com/is/image/samsung/p6pim/br/qn65q60aaafxzd/gallery/br-qled-q60a-qa65q60aaafxzd-415748677?$650_519_PNG$",
      cashback: "10%",
      destaque: true,
      categoria: "TVs",
    },
    {
      id: 2,
      nome: 'Smart TV Samsung AI Neo QLED 55"',
      preco: "R$ 3.699,00",
      imagem:
        "https://images.samsung.com/is/image/samsung/p6pim/br/qn55qn85daafxzd/gallery/br-neo-qled-qn55qn85daafxzd-534038578?$650_519_PNG$",
      cashback: "10%",
      destaque: true,
      categoria: "TVs",
    },
    {
      id: 3,
      nome: "Caixa de Som JBL PartyBox Encore",
      preco: "R$ 1.849,00",
      imagem:
        "https://www.jbl.com.br/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwd3506821/images/HiFi_PartyBox_Encore/HiFi_PartyBox_Encore_Black_1600x1600px.png",
      cashback: "5%",
      destaque: false,
      categoria: "Áudio",
    },
    {
      id: 4,
      nome: 'Smart TV LG OLED Evo 55"',
      preco: "R$ 5.399,00",
      imagem: "https://www.lg.com/br/images/tv/md07543701/gallery/medium01.jpg",
      cashback: "10%",
      destaque: true,
      categoria: "TVs",
    },
    {
      id: 5,
      nome: "Headset Gamer HyperX",
      preco: "R$ 499,00",
      imagem:
        "https://cdn.awsli.com.br/600x450/2042/2042600/produto/236861148/hyperx-cloud-core-hx-hscsc-bk-wt-g-dmhsn3.png",
      cashback: "3%",
      destaque: false,
      categoria: "Áudio",
    },
  ];

  const categorias = ["Todas", ...new Set(produtos.map((p) => p.categoria))];

  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const [modalAberto, setModalAberto] = useState(false);

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) => {
      const nomeCond = p.nome.toLowerCase().includes(busca.toLowerCase());
      const categoriaCond =
        categoriaSelecionada === "Todas" || p.categoria === categoriaSelecionada;
      return nomeCond && categoriaCond;
    });
  }, [busca, categoriaSelecionada]);

  return (
    <div className="min-h-screen text-gray-900 font-inter px-6 py-10">
      <div className="max-w-7xl mx-auto bg-gradient-to-b from-green-100 to-white rounded-3xl p-8 shadow-lg">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <motion.img
              src={loja.logoUrl}
              alt="Logo"
              className="w-16 h-16 rounded-full border bg-white p-2 shadow-md"
              whileHover={{ rotate: 10 }}
            />
            <div>
              <h1 className="text-3xl font-extrabold">{loja.nome}</h1>
              <p className="text-yellow-600 font-medium">{loja.cashbackInfo}</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setModalAberto(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full shadow-md transition"
          >
            Ver detalhes do cashback
          </motion.button>
        </header>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
          <div className="relative w-full max-w-md">
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="search"
              placeholder="Buscar produtos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
          >
            {categorias.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Modal Cashback */}
        <AnimatePresence>
          {modalAberto && (
            <motion.div
              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalAberto(false)}
            >
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md relative"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-4">🎁 Detalhes do Cashback</h2>
                <ul className="space-y-3 mb-4">
                  {loja.cashbackDetalhes.map((detalhe, i) => (
                    <li
                      key={i}
                      className="flex justify-between bg-yellow-100 text-yellow-800 p-3 rounded-lg font-medium"
                    >
                      {detalhe.tipo}
                      <span>{detalhe.valor}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <FiInfo /> {loja.avisoCashback}
                </p>
                <button
                  className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
                  onClick={() => setModalAberto(false)}
                >
                  &times;
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contato */}
        <p className="text-center text-sm text-gray-500 mb-10">
          📧 <strong>Contato:</strong> {loja.contato}
        </p>

        {/* Produtos */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8">
            Produtos disponíveis
          </h2>
          {produtosFiltrados.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtosFiltrados.map((produto) => (
                <motion.div
                  key={produto.id}
                  className="bg-white p-5 rounded-xl shadow hover:shadow-xl flex flex-col transition-all relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                >
                  {produto.destaque && (
                    <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      Destaque 🔥
                    </span>
                  )}
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-40 object-contain mb-4 transition-transform group-hover:scale-105"
                  />
                  <h3 className="text-md font-semibold mb-1">{produto.nome}</h3>
                  <p className="text-xl font-bold text-gray-800 mb-2">{produto.preco}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-600 font-medium">
                      💸 {produto.cashback} de volta
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600">
                      {produto.categoria}
                    </span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      alert("Funcionalidade de comparação com outras lojas em breve!")
                    }
                    className="mt-4 text-sm text-blue-600 underline hover:text-blue-800"
                  >
                    Comparar com outras lojas
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default LojaPage;
