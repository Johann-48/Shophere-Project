import React from 'react';

const Main = () => {
  return (
    <main className="flex justify-center items-center py-12 bg-white min-h-screen">
      <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-md">
        <h2 className="text-red-600 text-lg font-semibold mb-6">Vendedor</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Seu nome"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Sobrenome */}
          <div>
            <label htmlFor="sobrenome" className="block text-sm font-medium text-gray-700">Sobrenome</label>
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              placeholder="Seu sobrenome"
              defaultValue="Rimel"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue="shophere111@gmail.com"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Endereço do Comércio */}
          <div>
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço do Comércio</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              defaultValue="Walter Borges 8653"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Criar Senha */}
          <div className="md:col-span-2">
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Criar Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Criar Senha"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 mb-4"
            />

            <input
              type="password"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Botões */}
          <div className="md:col-span-2 flex justify-between mt-6">
            <button type="button" className="text-gray-600">Cancelar</button>
            <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Criar Senha</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Main;
