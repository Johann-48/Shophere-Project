import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CommerceCard({ commerce }) {
  return (
    <Link to={`/commerce/${commerce.id}`}>
      {" "}
      {/* página de detalhes futura */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:ring-2 hover:ring-red-300 transition"
      >
        <img
          src={commerce.logoUrl || "/assets/placeholder-store.png"}
          alt={commerce.name}
          className="w-20 h-20 object-contain mb-4 rounded-full"
        />
        <h3 className="text-lg font-semibold mb-1">{commerce.name}</h3>
        {commerce.description && (
          <p className="text-sm text-gray-500 mb-3">{commerce.description}</p>
        )}
      </motion.div>
    </Link>
  );
}
