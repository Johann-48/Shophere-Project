import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Signup({ goBackToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cadastro enviado:", form);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-white px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-xl border border-gray-200"
      >
        <h2 className="text-4xl font-bold text-green-600 mb-3 text-center">
          Criar Conta
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Preencha os campos abaixo para se cadastrar
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3.5 text-gray-400" />
              <input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Criar Senha
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Confirmar senha */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Senha
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Botão principal */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition"
          >
            Criar Conta
          </button>
        </form>

        {/* Login com redes sociais */}
        <div className="my-6">
          <div className="flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-400">ou</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="mt-6 space-y-3">
            <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Cadastrar com o Google
            </button>
            <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple"
                className="w-5 h-5 mr-2"
              />
              Cadastrar com Apple
            </button>
          </div>
        </div>

        {/* Voltar ao login */}
        <p className="text-center text-gray-600 mt-6">
          Já possui uma conta?{" "}
          <span
            onClick={goBackToLogin}
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            Fazer Login
          </span>
        </p>
      </motion.div>
    </main>
  );
}
