// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ProductCard({
  product,
  isLiked,
  onToggleLike,
  onAddToCart,
}) {
  // Extrai priceNum, oldPriceNum e trend igual ao Home
  let priceNum = null;
  let oldPriceNum = null;
  let priceTrend = null;
  if (typeof product.price === "number") {
    priceNum = product.price;
  } else if (typeof product.price === "string") {
    const parsed = parseFloat(
      product.price.replace(/[R$\s]/g, "").replace(",", ".")
    );
    if (!isNaN(parsed)) priceNum = parsed;
  }
  if (product.oldPrice != null) {
    if (typeof product.oldPrice === "number") oldPriceNum = product.oldPrice;
    else {
      const parsedOld = parseFloat(
        product.oldPrice.replace(/[R$\s]/g, "").replace(",", ".")
      );
      if (!isNaN(parsedOld)) oldPriceNum = parsedOld;
    }
  }
  if (priceNum != null && oldPriceNum != null) {
    priceTrend = priceNum > oldPriceNum ? "up" : "down";
  }

  return (
    <Link to={`/produto/${product.id}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-white rounded-2xl shadow-lg p-4 relative flex flex-col hover:ring-2 hover:ring-red-300 transition"
      >
        <img
          src={
            // 1) campo principal que sua API realmente retorna
            product.mainImage ||
            // 2) se houver array de miniaturas, usa a primeira
            (Array.isArray(product.thumbnails) && product.thumbnails[0]) ||
            // 3) se mesmo assim nada existir, placeholder
            "/assets/placeholder.png"
          }
          alt={product.title || product.name}
          className="w-full h-32 object-contain mb-3"
        />
        <h3 className="text-lg font-semibold mb-1">
          {product.title || product.name}
        </h3>

        {product.comercioNome && (
          <p className="text-xs text-gray-500 mb-2">
            Loja: <span className="font-medium">{product.comercioNome}</span>
          </p>
        )}

        {product.description && (
          <p className="text-sm text-gray-500 mb-1">{product.description}</p>
        )}

        <div className="flex items-center gap-2 mb-2">
          {priceNum != null && (
            <span className="text-red-500 font-bold">
              R$ {priceNum.toFixed(2)}
            </span>
          )}
          {oldPriceNum != null && (
            <span className="text-xs line-through text-gray-400">
              R$ {oldPriceNum.toFixed(2)}
            </span>
          )}
          {priceTrend === "up" && <FiTrendingUp className="text-orange-500" />}
          {priceTrend === "down" && (
            <FiTrendingDown className="text-green-500" />
          )}
        </div>

        <div className="mt-auto flex justify-between items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
          >
            Comprar
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
