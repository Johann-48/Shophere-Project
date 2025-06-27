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
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:4000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setUser(data);
        setFormData({
          nome: data.nome || "",
          email: data.email || "",
          telefone: data.telefone || "",
        });
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:4000/api/auth/me",
        {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaved(true);
      setUser((prev) => ({ ...prev, ...formData }));
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Erro ao salvar alterações:", err);
    }
  };

  if (!user) {
    return (
      <div className="p-8 text-gray-600 animate-pulse">
        Carregando perfil...
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      {/* Sidebar */}
      <aside
        className={`w-64 p-6 shadow-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        } transition-all`}
      >
        <div className="flex items-center gap-4 mb-8">
          <img
            src={user.avatar || "https://via.placeholder.com/48"}
            alt="Perfil"
            className="rounded-full w-12 h-12 ring-2 ring-blue-500"
          />
          <div>
            <h2 className="text-lg font-bold">{user.nome}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {user.email}
            </p>
          </div>
        </div>
        <nav className="space-y-3">
          <SidebarButton icon={<FiUser />} label="Meu Perfil" />
          <SidebarButton
            icon={<FiSettings />}
            label="Configurações"
            onClick={() => setShowSettings(true)}
          />
          <SidebarButton
            icon={<FiMoon />}
            label="Modo Escuro"
            rightText={darkMode ? "Desativar" : "Ativar"}
            onClick={() => setDarkMode(!darkMode)}
          />
          <SidebarButton
            icon={<FiBell />}
            label="Notificação"
            rightText={notifications ? "Ativado" : "Desativado"}
            onClick={() => setNotifications(!notifications)}
          />
          <SidebarButton
            icon={<FiLogOut />}
            label="Sair"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        <div
          className={`max-w-xl mx-auto rounded-2xl shadow-xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-6 transition-colors`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="relative group">
              <img
                src={user.avatar || "https://via.placeholder.com/64"}
                alt="Perfil"
                className="rounded-full w-16 h-16"
              />
              <span className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full text-xs cursor-pointer transition hover:bg-blue-700">
                ✎
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{user.nome}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {user.email}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="text-xl hover:text-red-500 transition"
            >
              <FiX />
            </button>
          </div>

          <form className="space-y-4">
            <FormRow
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
            <FormRow
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormRow
              label="Telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
            <div className="flex justify-between py-2">
              <span>Localização</span>
              <span className="font-medium">Brasil</span>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-5 rounded-lg"
              onClick={handleSave}
              type="button"
            >
              Salvar Alteração
            </button>
            {saved && (
              <p className="text-green-500 mt-2 transition-opacity animate-fade-in">
                Alterações salvas com sucesso!
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div
            className={`bg-white dark:bg-gray-800 p-6 rounded-2xl w-80 shadow-lg`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Configurações</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-xl hover:text-red-500 transition"
              >
                <FiX />
              </button>
            </div>
            <div className="space-y-4">
              <SettingsSelect label="Tema" options={["Claro", "Escuro"]} />
              <SettingsSelect label="Língua" options={["PT-BR", "EN-US"]} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarButton({ icon, label, onClick, rightText }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition"
      type="button"
    >
      <span className="flex items-center gap-2">
        {icon} {label}
      </span>
      {rightText ? (
        <span className="text-sm text-gray-500">{rightText}</span>
      ) : (
        <FiChevronRight />
      )}
    </button>
  );
}

function FormRow({ label, name, value, type = "text", onChange }) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <span>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="text-right w-2/3 bg-transparent focus:outline-none border-b border-transparent focus:border-blue-500 transition"
      />
    </div>
  );
}

function SettingsSelect({ label, options }) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <select className="bg-transparent border-b border-gray-300 focus:outline-none">
        {options.map((opt) => (
          <option key={opt} value={opt.toLowerCase()}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
