import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";

export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

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
      navigate("/account");
    } catch (err) {
      if (err.response?.status === 401) {
        setMsg("Credenciais inválidas.");
      } else {
        setMsg("Erro ao conectar ao servidor.");
      }
    }
  };

  return (
    <main className="flex-1 bg-gradient-to-r from-green-100 to-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="hidden md:block">
          <img
            src="https://exxacta.com.br/wp-content/uploads/2023/11/apoie-o-conceito-de-negocio-local_52683-41530.jpg"
            alt="Login Visual"
            className="w-full rounded-3xl shadow-lg"
          />
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200 transition-all">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Bem-vindo de volta!
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Insira seus dados para acessar sua conta
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-gray-600 mb-1">
                Email ou Celular
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  id="email"
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                  className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-600 mb-1">
                Senha
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline float-right mt-1"
              >
                Esqueceu sua senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition text-lg font-semibold"
            >
              Entrar
            </button>
          </form>

          {msg && (
            <p className="text-red-600 text-center mt-4 font-medium">{msg}</p>
          )}

          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-gray-400">ou</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Entrar com o Google
          </button>

          <p className="text-center text-gray-600 mt-6">
            Não possui uma conta?{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
