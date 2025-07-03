import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import ProductCard from "../ProductCard"; // ajuste o caminho conforme seu projeto

const CompareProduct = () => {
  const { codigo } = useParams(); // Espera /comparar/:codigo
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!codigo) return;

    axios
      .get(`/api/products/barcode/${codigo}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos por código de barras:", err);
      })
      .finally(() => setLoading(false));
  }, [codigo]);

  const produtoPrincipal = products[0];

  return (
    <div className="min-h-screen text-gray-900 font-inter px-6 py-10">
      <div className="max-w-7xl mx-auto bg-gradient-to-b from-green-100 to-white rounded-3xl p-8 shadow-xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-yellow-600 hover:text-yellow-700 transition font-semibold mb-8"
        >
          <FiArrowLeft className="mr-2" size={20} /> Voltar
        </button>

        {produtoPrincipal && (
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white rounded-2xl p-8 shadow-inner mb-10">
            <img
              src={produtoPrincipal.mainImage || "/assets/placeholder.png"}
              alt={produtoPrincipal.name}
              className="w-64 h-64 object-contain rounded-xl"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                {produtoPrincipal.name}
              </h1>
              <p className="text-gray-700 text-lg">
                Comparando o mesmo produto em diferentes comércios!
              </p>
            </div>
          </div>
        )}

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            🛍️ Preços em diferentes lojas
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Carregando...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CompareProduct;
