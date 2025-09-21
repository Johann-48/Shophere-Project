import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    (async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(res.data.nome);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.clear();
        } else {
          console.error("Erro ao buscar perfil:", err);
        }
      }
    })();
  }, []);

  const defaultLinks = [
    { to: "/", label: "Página Inicial" },
    { to: "/contact", label: "Contato" },
    { to: "/about", label: "Sobre" },
  ];

  const authLinks = [
    { to: "/accountmanager", label: userName || "Perfil", underline: true },
    { to: "/lojadashboard", label: "Dashboard", underline: false },
    {
      to: "/",
      label: "Logout",
      action: () => {
        localStorage.clear();
        setUserName(null);
        navigate("/login");
      },
    },
  ];

  const guestLinks = [
    { to: "/seller", label: "Sign Up Seller" },
    { to: "/signup", label: "Sign Up", underline: true },
    { to: "/login", label: "Login" },
  ];

  const navLinks = userName
    ? [...defaultLinks, ...authLinks]
    : [...defaultLinks, ...guestLinks];

  // Define as cores baseadas no tema
  const headerBg = isDarkMode ? 'bg-black shadow-md' : 'bg-white shadow-lg';
  const logoColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const linkColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const iconColor = isDarkMode ? 'text-white' : 'text-gray-700';

  return (
    <header className={`w-full ${headerBg}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-wide">
          <Link to="/">
            <span className={logoColor}>SHOP</span>
            <span className="text-[#0D47A1]">HERE</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.action ? (
                <button
                  onClick={link.action}
                  className={`${linkColor} hover:text-[#0D47A1] transition-all duration-200 ${
                    link.underline ? "underline font-semibold" : ""
                  }`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={link.to}
                  className={`${linkColor} hover:text-[#0D47A1] transition-all duration-200 ${
                    link.underline ? "underline font-semibold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </motion.div>
          ))}
          
          {/* Theme Toggle */}
          <ThemeToggle />
        </nav>

        {/* Search */}
        <div className="relative hidden md:block w-64">
          {/*<input
            type="text"
            placeholder="O que está procurando?"
                        className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#0D47A1] cursor-pointer" />
          */}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} className={iconColor} /> : <FiMenu size={24} className={iconColor} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`md:hidden ${isDarkMode ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} border-t px-6 py-4 space-y-3`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navLinks.map((link, idx) => (
              <div key={idx}>
                {link.action ? (
                  <button
                    onClick={() => {
                      link.action();
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left ${linkColor} hover:text-[#0D47A1] transition-all duration-200 ${
                      link.underline ? "underline font-semibold" : ""
                    }`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`block ${linkColor} hover:text-[#0D47A1] transition-all duration-200 ${
                      link.underline ? "underline font-semibold" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            {/* Search mobile */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full mt-2 border border-gray-600 rounded-full py-2 pl-4 pr-10 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#0D47A1] cursor-pointer" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
