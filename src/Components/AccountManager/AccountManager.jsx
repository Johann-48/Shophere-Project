import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiSettings,
  FiMoon,
  FiBell,
  FiLogOut,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import axios from "axios";

export default function AccountManager() {
  const [user, setUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:4000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div className="p-8">Carregando perfil...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white p-6">
        <div className="flex items-center gap-4 mb-8">
          <img
            src="https://via.placeholder.com/48"
            alt="Perfil"
            className="rounded-full w-12 h-12"
          />
          <div>
            <h2 className="text-lg font-semibold">{user.nome}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <nav className="space-y-4">
          <button className="w-full flex items-center justify-between py-2">
            <span className="flex items-center gap-2">
              <FiUser /> Meu Perfil
            </span>
            <FiChevronRight />
          </button>
          <button
            className="w-full flex items-center justify-between py-2"
            onClick={() => setShowSettings(true)}
          >
            <span className="flex items-center gap-2">
              <FiSettings /> Configurações
            </span>
            <FiChevronRight />
          </button>
          <button
            className="w-full flex items-center justify-between py-2"
            onClick={() => setDarkMode(!darkMode)}
          >
            <span className="flex items-center gap-2">
              <FiMoon /> Modo Escuro
            </span>
            <span>{darkMode ? "Desativar" : "Ativar"}</span>
          </button>
          <button
            className="w-full flex items-center justify-between py-2"
            onClick={() => setNotifications(!notifications)}
          >
            <span className="flex items-center gap-2">
              <FiBell /> Notificação
            </span>
            <span>{notifications ? "Ativado" : "Desativado"}</span>
          </button>
          <button
            className="w-full flex items-center gap-2 py-2"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            <FiLogOut /> Sair
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="max-w-xl bg-white p-6 rounded-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img
                src="https://via.placeholder.com/64"
                alt="Perfil"
                className="rounded-full w-16 h-16"
              />
              <span className="absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs cursor-pointer">
                ✎
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.nome}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button className="ml-auto text-xl">
              <FiX />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span>Nome</span>
              <input
                type="text"
                defaultValue={user.nome}
                className="text-right w-2/3 focus:outline-none"
              />
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Conta de Email</span>
              <input
                type="email"
                defaultValue={user.email}
                className="text-right w-2/3 focus:outline-none"
              />
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Numero De Telefone</span>
              <input
                type="text"
                defaultValue={user.telefone || ""}
                className="text-right w-2/3 focus:outline-none"
              />
            </div>
            <div className="flex justify-between pb-2">
              <span>Localização</span>
              <span>Brasil</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg">
              Salvar Alteração
            </button>
          </div>
        </div>
      </main>

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-xl"
              >
                <FiX />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Tema</span>
                <select className="focus:outline-none">
                  <option value="claro">claro</option>
                  <option value="escuro">escuro</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span>Língua</span>
                <select className="focus:outline-none">
                  <option value="pt-br">PTBR</option>
                  <option value="en-us">ENUS</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
