import React, { useState } from "react";
import {
  FaStore,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaArrowLeft,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Seller = ({ goBackToLogin }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nomeComercio: "",
    email: "",
    endereco: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.senha !== form.confirmarSenha) {
      return alert("As senhas não coincidem.");
    }

    try {
      await axios.post("http://localhost:4000/api/commerces/signup", {
        nome: form.nomeComercio,
        email: form.email,
        senha: form.senha,
        endereco: form.endereco,
        telefone: form.telefone,
      });

      alert("Comércio cadastrado com sucesso!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erro ao cadastrar comércio.");
    }
  };

  const handleReset = () => {
    document.getElementById("vendedorForm").reset();
    setForm({
      nomeComercio: "",
      email: "",
      endereco: "",
      telefone: "",
      senha: "",
      confirmarSenha: "",
    });
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 via-blue-50 to-gray-100 py-16 px-6">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-10 border border-[#43444F] relative">
        <button
          onClick={() => navigate("/login")}
          className="absolute top-5 left-5 text-sm flex items-center text-[#282933] hover:text-[#43444F] transition"
        >
          <FaArrowLeft className="mr-2" /> Voltar para login
        </button>
        <h2 className="text-4xl font-bold text-red-600 mb-2 text-center">
          Cadastro de Comércio
        </h2>
        <p className="text-[#43444F] mb-10 text-center text-lg">
          Insira os dados do seu comércio para se tornar parceiro ShopHere.
        </p>

        <form
          id="vendedorForm"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Nome do Comércio */}
          <div className="flex flex-col md:col-span-2">
            <label
              htmlFor="nomeComercio"
              className="text-sm font-medium text-[#43444F] mb-1"
            >
              Nome do Comércio
            </label>
            <div className="relative">
              <FaStore className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                id="nomeComercio"
                name="nomeComercio"
                placeholder="Ex: Loja ABC"
                required
                value={form.nomeComercio}
                onChange={handleChange}
                className="w-full pl-10 border border-[#43444F] rounded-lg p-3 focus:ring-2 focus:ring-[#282933]"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#43444F] mb-1"
            >
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@exemplo.com"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 border border-[#43444F] rounded-lg p-3 focus:ring-2 focus:ring-[#282933]"
              />
            </div>
          </div>

          {/* Endereço */}
          <div className="flex flex-col">
            <label
              htmlFor="endereco"
              className="text-sm font-medium text-[#43444F] mb-1"
            >
              Endereço
            </label>
            <div className="relative">
              <FaStore className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                id="endereco"
                name="endereco"
                placeholder="Rua, Número, Bairro"
                required
                value={form.endereco}
                onChange={handleChange}
                className="w-full pl-10 border border-[#43444F] rounded-lg p-3 focus:ring-2 focus:ring-[#282933]"
              />
            </div>
          </div>

          {/* Telefone */}
          <div className="flex flex-col">
            <label
              htmlFor="telefone"
              className="text-sm font-medium text-[#43444F] mb-1"
            >
              Telefone
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="(99) 99999-9999"
                required
                value={form.telefone}
                onChange={handleChange}
                className="w-full pl-10 border border-[#43444F] rounded-lg p-3 focus:ring-2 focus:ring-[#282933]"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="flex flex-col">
            <label
              htmlFor="senha"
              className="text-sm font-medium text-[#43444F] mb-1"
            >
              Criar Senha
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Digite uma senha"
                required
                value={form.senha}
                onChange={handleChange}
                className="w-full pl-10 border border-[#43444F] rounded-lg p-3 focus:ring-2 focus:ring-[#282933]"
              />
            </div>
          </div>

          {/* Confirmar senha */}
          <div className="flex flex-col">
            <label
              htmlFor="confirmarSenha"
              className="text-sm font-medium text-[#43444F] mb-1"
            >
              Confirmar Senha
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                placeholder="Confirme a senha"
                required
                value={form.confirmarSenha}
                onChange={handleChange}
                className="w-full pl-10 border border-[#43444F] rounded-lg p-3 focus:ring-2 focus:ring-[#282933]"
              />
            </div>
          </div>

          {/* Ações */}
          <div className="md:col-span-2 flex justify-between mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="text-[#43444F] hover:text-[#282933] font-medium"
            >
              Limpar Campos
            </button>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold shadow transition"
            >
              Criar Comércio
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Seller;
