import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // ✅ hook de navegação

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email: emailOrPhone,
          senha: password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/account"); // Redireciona após login
    } catch (err) {
      if (err.response?.status === 401) {
        setMsg("Credenciais inválidas.");
      } else {
        setMsg("Erro ao conectar ao servidor.");
      }
    }
  };

  return (
    <main className="flex-1 bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src="https://exxacta.com.br/wp-content/uploads/2023/11/apoie-o-conceito-de-negocio-local_52683-41530.jpg"
            alt="Login Visual"
            className="w-full rounded-lg"
          />
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-4">
            Insira os detalhes da conta
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email ou Número de celular
              </label>
              <input
                id="email"
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Entrar na Conta
            </button>
          </form>
          {msg && <p className="text-red-600 mt-4">{msg}</p>}
          <div className="mt-6">
            <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Entrar com o Google
            </button>
          </div>
          <p className="text-center text-gray-600 mt-6">
            Não possui uma conta?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Fazer Signup
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
