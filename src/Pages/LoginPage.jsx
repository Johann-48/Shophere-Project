import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/api/auth/login',
        { email, senha },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/dashboard';
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Credenciais inválidas.');
      } else {
        setError('Erro ao conectar ao servidor.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')] flex items-center justify-center px-4">
      {/* Overlay escuro para melhorar legibilidade */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* Formulário */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
          Acesse sua conta
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-5 py-3 rounded mb-6 text-center text-sm font-semibold shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="mt-1 w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition duration-300 font-bold shadow-md"
          >
            Entrar
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <a href="/signup" className="text-green-600 hover:underline font-semibold">
            Criar agora
          </a>
        </p>
      </div>
    </div>
  );
}
