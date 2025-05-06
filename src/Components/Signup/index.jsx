import React from "react";

export default function Signup() {
  return (
    <main className="flex-1 bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Illustration */}
        <div>
          <img
            src="https://via.placeholder.com/600x400"
            alt="Shop Illustration"
            className="w-full rounded-lg"
          />
        </div>
        {/* Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-4">Criar Uma conta</h2>
          <p className="text-gray-600 mb-6">Insira os detalhes da conta</p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="email">
                Email ou Número de telefone
              </label>
              <input
                id="email"
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Criar Conta
            </button>
          </form>
          <div className="mt-6 space-y-3">
            <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Entrar com o Google
            </button>
            <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/303128/apple-logo.svg"
                alt="Apple"
                className="w-5 h-5 mr-2"
              />
              Entrar com Apple
            </button>
          </div>
          <p className="text-center text-gray-600 mt-6">
            Já possui uma conta?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Fazer Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
