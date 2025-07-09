import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext"; // ou caminho correto

export default function Login({ goToForgotPassword, goToSignUp, goToSeller }) {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

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

      // Atualiza o contexto em tempo real
      login(token, user.role); // 👈 ESSENCIAL

      // (opcional) se quiser manter esses dados no localStorage:
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);

      navigate("/");
    } catch (err) {
      setMsg(
        err.response?.status === 401
          ? "Credenciais inválidas."
          : "Erro ao conectar ao servidor."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 bg-gradient-to-r from-green-100 to-white py-16 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Imagem lateral */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block"
        >
          <img
            src="https://exxacta.com.br/wp-content/uploads/2023/11/apoie-o-conceito-de-negocio-local_52683-41530.jpg"
            alt="Login Visual"
            className="w-full rounded-3xl shadow-2xl"
          />
        </motion.div>

        {/* Formulário */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200 transition-all"
        >
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
                  placeholder="seuemail@exemplo.com"
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-400"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <span
                onClick={() => navigate("/forgotPassword")}
                className="text-sm text-blue-600 hover:underline float-right mt-1 cursor-pointer"
              >
                Esqueceu sua senha?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-500 text-white py-3 rounded-lg transition text-lg font-semibold ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
              }`}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {msg && (
            <p className="text-red-600 text-center mt-4 font-medium animate-pulse">
              {msg}
            </p>
          )}

          {/* Login Social */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-gray-400">ou</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Entrar com o Google
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple"
                className="w-5 h-5 mr-2"
              />
              Entrar com Apple ID
            </button>
          </div>

          {/* Links para cadastro */}
          <p className="text-center text-gray-600 mt-6">
            Não possui uma conta?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline font-medium cursor-pointer"
            >
              Cadastre-se
            </span>
          </p>

          <p className="text-center text-gray-600 mt-2">
            É vendedor?{" "}
            <span
              onClick={() => navigate("/seller")}
              className="text-red-600 hover:underline font-medium cursor-pointer"
            >
              Criar conta
            </span>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
