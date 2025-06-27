import React, { useState } from "react";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { LuArrowLeft } from "react-icons/lu"; // Ícone minimalista e moderno
import { useNavigate } from "react-router-dom";

export default function ForgotPassword({ goBackToLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    setLoading(true);
    setMsg("");

    setTimeout(() => {
      setLoading(false);
      setMsg(
        "✅ Se este email estiver cadastrado, você receberá o link em breve."
      );
      setEmail("");
    }, 2000);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-white px-4 py-12 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl p-10 rounded-3xl max-w-md w-full border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
          Recuperar Senha
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Digite seu e-mail para receber um link de redefinição de senha.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (msg) setMsg("");
                if (!isValid) setIsValid(true);
              }}
              required
              placeholder="seuemail@exemplo.com"
              className={`w-full pl-10 border px-4 py-2 rounded-lg focus:outline-none transition focus:ring-2 ${
                isValid
                  ? "border-gray-300 focus:ring-green-400"
                  : "border-red-400 focus:ring-red-300"
              }`}
            />
            {!isValid && (
              <p className="text-red-500 text-xs mt-1 ml-1">Email inválido.</p>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  className="w-4 h-4 rounded-full bg-white"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                />
                <span>Enviando...</span>
              </div>
            ) : (
              "Enviar link de recuperação"
            )}
          </motion.button>
        </form>

        {msg && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-green-600 mt-4 text-sm font-medium flex items-center justify-center gap-2"
          >
            <FaCheckCircle /> {msg}
          </motion.p>
        )}

        <div className="text-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05, x: -3 }}
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition font-medium"
          >
            <LuArrowLeft className="text-lg" />
            Voltar para o login
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
