// src/pages/LoginPage.jsx (exemplo)
import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
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
      // Se deu certo:
      const { token, user } = response.data;
      // Salvar o token, por exemplo, em localStorage:
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirecionar para a página principal, por ex:
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
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;
