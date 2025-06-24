import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Página Inicial" },
    { to: "/contato", label: "Contato" },
    { to: "/sobre", label: "Sobre" },
    { to: "/signup-seller", label: "Sign Up Seller" },
    { to: "/signup", label: "Sign Up", underline: true },
  ];

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-wide">
          <Link to="/">
            <span className="text-green-500">SHOP</span>
            <span className="text-gray-800">HERE</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.to}
                className={`text-gray-600 hover:text-green-600 transition-all duration-200 ${
                  link.underline ? "underline font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Search */}
        <div className="relative hidden md:block w-64">
          <input
            type="text"
            placeholder="O que está procurando?"
            className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow"
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block text-gray-700 hover:text-green-600 transition-all duration-200 ${
                  link.underline ? "underline font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full mt-2 border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
