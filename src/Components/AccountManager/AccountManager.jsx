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
import { motion, AnimatePresence } from "framer-motion";

export default function AccountManagerPage() {
  const [user, setUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("pt-br");
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  useEffect(() => {
    const storedDark = localStorage.getItem("darkMode");
    const storedLang = localStorage.getItem("language");
    if (storedDark) setDarkMode(storedDark === "true");
    if (storedLang) setLanguage(storedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

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
      <div className="flex justify-center items-center h-screen text-gray-600 dark:text-gray-300">
        Carregando perfil...
      </div>
    );
  }

  const labels = {
    "pt-br": {
      profile: "Meu Perfil",
      settings: "Configurações",
      darkMode: "Modo Escuro",
      notifications: "Notificações",
      logout: "Sair",
      name: "Nome",
      email: "Email",
      phone: "Telefone",
      location: "Localização",
      save: "Salvar Alterações",
      saved: "Alterações salvas com sucesso!",
      settingsTitle: "Configurações",
      theme: "Tema",
      language: "Idioma",
    },
    "en-us": {
      profile: "My Profile",
      settings: "Settings",
      darkMode: "Dark Mode",
      notifications: "Notifications",
      logout: "Logout",
      name: "Name",
      email: "Email",
      phone: "Phone",
      location: "Location",
      save: "Save Changes",
      saved: "Changes saved successfully!",
      settingsTitle: "Settings",
      theme: "Theme",
      language: "Language",
    },
  };

  const t = labels[language] || labels["pt-br"];

  return (
    <div
      className={`flex min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-64 p-6 shadow-lg ${
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
          <SidebarButton icon={<FiUser />} label={t.profile} />
          <SidebarButton icon={<FiSettings />} label={t.settings} onClick={() => setShowSettings(true)} />
          <SidebarButton
            icon={<FiMoon />}
            label={t.darkMode}
            rightText={darkMode ? "On" : "Off"}
            onClick={() => setDarkMode(!darkMode)}
          />
          <SidebarButton
            icon={<FiBell />}
            label={t.notifications}
            rightText={notifications ? "On" : "Off"}
            onClick={() => setNotifications(!notifications)}
          />
          <SidebarButton
            icon={<FiLogOut />}
            label={t.logout}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-xl mx-auto rounded-2xl shadow-2xl backdrop-blur-xl ${
            darkMode ? "bg-gray-800/70" : "bg-white/80"
          } p-8 transition-colors`}
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
              <p className="text-sm text-gray-500 dark:text-gray-300">{user.email}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="text-xl hover:text-red-500 transition"
            >
              <FiX />
            </button>
          </div>

          <form className="space-y-4">
            <FormRow label={t.name} name="nome" value={formData.nome} onChange={handleChange} />
            <FormRow label={t.email} name="email" type="email" value={formData.email} onChange={handleChange} />
            <FormRow label={t.phone} name="telefone" value={formData.telefone} onChange={handleChange} />
            <div className="flex justify-between py-2 border-b">
              <span>{t.location}</span>
              <span className="font-medium">Brasil</span>
            </div>
          </form>

          <div className="mt-6 text-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-6 rounded-lg"
              onClick={handleSave}
              type="button"
            >
              {t.save}
            </motion.button>
            <AnimatePresence>
              {saved && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-green-500 mt-3"
                >
                  {t.saved}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* Modal de Configurações */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-80 shadow-xl transition-colors duration-500"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">{t.settingsTitle}</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-xl hover:text-red-500 transition"
                >
                  <FiX />
                </button>
              </div>
              <div className="space-y-4">
                <SettingsSelect
                  label={t.theme}
                  options={["Claro", "Escuro"]}
                  value={darkMode ? "escuro" : "claro"}
                  onChange={(val) => setDarkMode(val === "escuro")}
                />
                <SettingsSelect
                  label={t.language}
                  options={["PT-BR", "EN-US"]}
                  value={language.toUpperCase()}
                  onChange={(val) => setLanguage(val.toLowerCase())}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Auxiliares

function SidebarButton({ icon, label, onClick, rightText }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition"
      type="button"
    >
      <span className="flex items-center gap-2">{icon} {label}</span>
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
      <span className="font-medium">{label}</span>
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

function SettingsSelect({ label, options, value, onChange }) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <span className="font-medium">{label}</span>
      <select
        className="bg-transparent focus:outline-none text-sm px-2 py-1 rounded-md border dark:border-gray-600 border-gray-300 dark:bg-gray-700"
        value={value.toLowerCase()}
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt.toLowerCase()} className="text-black dark:text-white bg-white dark:bg-gray-700">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
