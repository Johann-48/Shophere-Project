import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FiArrowLeft,
  FiHeart,
  FiTrendingUp,
  FiTrendingDown,
  FiTrash2,
} from "react-icons/fi";
import { motion } from "framer-motion";
import ProductCard from "../ProductCard";

export default function Commerce() {
  const { id } = useParams();
  const [commerce, setCommerce] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCommerce() {
      try {
        setLoading(true);
        // Busca dados do comércio
        const resComm = await axios.get(`/api/commerces/${id}`);
        setCommerce(resComm.data.commerce || resComm.data);
        // Busca produtos do comércio
        const resProd = await axios.get(`/api/products/commerce/${id}`);
        const data = resProd.data.products || resProd.data;
        setProducts(data);
      } catch (err) {
        console.error("Erro ao carregar comércio ou produtos:", err);
        setError("Não foi possível carregar os dados");
      } finally {
        setLoading(false);
      }
    }
    fetchCommerce();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Carregando...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Navegação de volta */}
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <FiArrowLeft className="mr-2" /> Voltar
      </Link>

      {/* Info do Comércio */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <img
          src={commerce.logoUrl || "/assets/placeholder-store.png"}
          alt={commerce.name}
          className="w-32 h-32 object-contain rounded-full shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-extrabold mb-2">{commerce.name}</h1>
          {commerce.description && (
            <p className="text-gray-600 mb-4">{commerce.description}</p>
          )}
        </div>
      </div>

      {/* Produtos do Comércio */}
      <section>
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Produtos de {commerce.name}
        </h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isLiked={false}
                onToggleLike={() => {}}
                onAddToCart={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Nenhum produto encontrado 😕
          </div>
        )}
      </section>
    </div>
  );
}
