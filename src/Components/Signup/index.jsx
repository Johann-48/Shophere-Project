import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Signup() {
  return (
    <main className="flex-1 min-h-screen bg-gradient-to-r from-green-100 to-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Ilustração */}
        <div className="hidden md:block">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Shop Illustration"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        {/* Formulário */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200 transition-all">
          <h2 className="text-4xl font-bold text-red-600 mb-3">Criar Conta</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Preencha os campos abaixo para se cadastrar
          </p>

          <form className="space-y-6">
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
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Email ou telefone */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email ou Número de telefone
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  id="email"
                  type="text"
                  placeholder="email@exemplo.com ou (99) 99999-9999"
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
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Botão de Criar Conta */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition"
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
                Entrar com o Google
              </button>
              <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
                <img
                  src="https://www.svgrepo.com/show/303128/apple-logo.svg"
                  alt="Apple"
                  className="w-5 h-5 mr-2"
                />
                Entrar com Apple
              </button>
            </div>
          </div>

          {/* Link para login */}
          <p className="text-center text-gray-600 mt-6">
            Já possui uma conta?{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Fazer Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
