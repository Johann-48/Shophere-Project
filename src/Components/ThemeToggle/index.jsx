import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-12 h-6 rounded-full transition-all duration-300 ${
        isDarkMode ? 'bg-gray-700' : 'bg-blue-200'
      }`}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {/* Toggle circle */}
      <motion.div
        className={`absolute w-5 h-5 rounded-full shadow-md flex items-center justify-center ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}
        animate={{
          x: isDarkMode ? -12 : 12,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {isDarkMode ? (
          <FiMoon className="w-3 h-3 text-yellow-400" />
        ) : (
          <FiSun className="w-3 h-3 text-yellow-500" />
        )}
      </motion.div>
      
      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1">
        <FiSun className={`w-3 h-3 transition-opacity ${isDarkMode ? 'opacity-30' : 'opacity-60'} text-yellow-500`} />
        <FiMoon className={`w-3 h-3 transition-opacity ${isDarkMode ? 'opacity-60' : 'opacity-30'} text-gray-400`} />
      </div>
    </motion.button>
  );
}