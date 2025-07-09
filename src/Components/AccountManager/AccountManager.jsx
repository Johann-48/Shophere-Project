import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AccountManagerPage() {
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const { data } = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
        setFormData({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          cidade: data.cidade,
        });
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("/api/auth/me", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser((u) => ({ ...u, ...formData }));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Erro ao salvar alterações:", err);
      alert("Não foi possível salvar. Tente novamente.");
    }
  };

  if (!user) return <p>Carregando perfil...</p>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Meu Perfil</h1>
      <label className="block mb-2">
        Nome
        <input
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>
      <label className="block mb-2">
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>
      <label className="block mb-2">
        Telefone
        <input
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>
      <label className="block mb-4">
        Cidade
        <input
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Salvar Alterações
      </button>
      {saved && <p className="text-green-600 mt-2">Salvo com sucesso!</p>}
    </div>
  );
}
