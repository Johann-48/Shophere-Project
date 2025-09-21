import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Começa com modo escuro (atual)

  // Carrega o tema salvo do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Salva o tema no localStorage quando muda
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    // Cores para modo escuro (atual)
    dark: {
      background: 'bg-gradient-to-br from-gray-800 via-blue-50 to-gray-100',
      header: 'bg-black',
      footer: 'bg-gray-900',
      text: 'text-gray-300',
      textPrimary: 'text-white',
      card: 'bg-white/80',
    },
    // Cores para modo claro (novo)
    light: {
      background: 'bg-gradient-to-br from-green-100 via-white to-green-50',
      header: 'bg-white',
      footer: 'bg-gray-100',
      text: 'text-gray-700',
      textPrimary: 'text-gray-900',
      card: 'bg-white',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};