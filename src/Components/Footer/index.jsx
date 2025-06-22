import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Fique de Olho */}
        <div>
          <h4 className="text-white font-semibold mb-3">Fique de Olho</h4>
          <p className="mb-4">Inscreva-se</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Digite seu Email"
              className="w-full px-3 py-2 rounded-l bg-gray-800 border border-gray-700 focus:outline-none"
            />
            <button className="px-4 bg-green-500 rounded-r hover:bg-green-600 transition">
              →
            </button>
          </div>
        </div>
        {/* Ajuda */}
        <div>
          <h4 className="text-white font-semibold mb-3">Ajuda</h4>
          <ul className="space-y-2">
            <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh</li>
            <li>shopherecompany1@gmail.com</li>
            <li>19993588498</li>
          </ul>
        </div>
        {/* Conta */}
        <div>
          <h4 className="text-white font-semibold mb-3">Conta</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Minha Conta
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Login / Signup
              </a>
            </li>
          </ul>
        </div>
        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Termos de Uso
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contato
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
