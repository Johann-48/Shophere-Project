import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (formData.senha !== formData.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/auth/signup", {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
      });

      setSucesso("Conta criada com sucesso! Você pode fazer login.");
      setFormData({ nome: "", email: "", senha: "", confirmarSenha: "" });
    } catch (err) {
      if (err.response?.data?.message) {
        setErro(err.response.data.message);
      } else {
        setErro("Erro ao criar conta. Tente novamente.");
      }
    }
  };

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
          <p className="text-gray-600 mb-6 text-lg">
            Preencha os campos abaixo para se cadastrar
          </p>

          {/* Mensagens */}
          {erro && <div className="text-red-600 mb-4">{erro}</div>}
          {sucesso && <div className="text-green-600 mb-4">{sucesso}</div>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Nome */}
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  id="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@exemplo.com"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="senha"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Criar Senha
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  id="senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Digite sua senha"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Confirmar senha */}
            <div>
              <label
                htmlFor="confirmarSenha"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmar Senha
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  id="confirmarSenha"
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  placeholder="Confirme sua senha"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition"
            >
              Criar Conta
            </button>
          </form>

          {/* Social login (estático por enquanto) */}
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
            <a
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Fazer Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
