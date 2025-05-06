import React from "react";

// Head Component
export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="text-green-600">SHOP</span>
          <span className="text-gray-800">HERE</span>
        </div>
        {/* Nav */}
        <nav className="space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Página Inicial
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Contato
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Sobre
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 underline">
            Sign Up
          </a>
        </nav>
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="O que está procurando"
            className="border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            🔍
          </button>
        </div>
      </div>
    </header>
  );
}
