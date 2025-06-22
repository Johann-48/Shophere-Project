import React from 'react';
import { FaUser, FaEnvelope, FaStore, FaLock } from 'react-icons/fa';

const Main = () => {
  const handleReset = () => {
    document.getElementById("vendedorForm").reset();
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-white py-16 px-6">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-10 border border-gray-200">
        <h2 className="text-4xl font-bold text-red-600 mb-2">Cadastro de Vendedor</h2>
        <p className="text-gray-600 mb-10 text-lg">
          Complete os dados abaixo para criar sua conta como parceiro do ShopHere.
        </p>

        <form id="vendedorForm" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nome */}
          <div className="flex flex-col">
            <label htmlFor="nome" className="text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Digite seu nome"
                required
                title="Digite seu primeiro nome"
                className="w-full pl-10 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-300 transition"
              />
            </div>
          </div>

          {/* Sobrenome */}
          <div className="flex flex-col">
            <label htmlFor="sobrenome" className="text-sm font-medium text-gray-700 mb-1">
              Sobrenome
            </label>
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              placeholder="Digite seu sobrenome"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-300 transition"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
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
                className="w-full pl-10 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-300 transition"
              />
            </div>
          </div>

          {/* Endereço */}
          <div className="flex flex-col">
            <label htmlFor="endereco" className="text-sm font-medium text-gray-700 mb-1">
              Endereço do Comércio
            </label>
            <div className="relative">
              <FaStore className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                id="endereco"
                name="endereco"
                placeholder="Rua, Número, Bairro"
                required
                className="w-full pl-10 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-300 transition"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="flex flex-col md:col-span-1">
            <label htmlFor="senha" className="text-sm font-medium text-gray-700 mb-1">
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
                className="w-full pl-10 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-300 transition"
              />
            </div>
          </div>

          {/* Confirmar Senha */}
          <div className="flex flex-col md:col-span-1">
            <label htmlFor="confirmarSenha" className="text-sm font-medium text-gray-700 mb-1">
              Confirmar Senha
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="confirmarSenha"
                placeholder="Confirme a senha"
                required
                className="w-full pl-10 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-300 transition"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="md:col-span-2">
            <hr className="my-6 border-gray-300" />
          </div>

          {/* Botões */}
          <div className="md:col-span-2 flex justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-gray-600 hover:text-gray-900 transition font-medium"
            >
              Limpar Campos
            </button>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold shadow transition"
            >
              Criar Conta de Vendedor
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Main;
