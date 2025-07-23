import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FiSend, FiCamera, FiMic, FiX } from "react-icons/fi";

export default function ContatoLoja() {
  // 1) Estado para lojas e seleção
  const [lojas, setLojas] = useState([]);
  const [lojaSelecionada, setLojaSelecionada] = useState(null);

  // 2) Chats e mensagens
  const [chatId, setChatId] = useState(null);
  const [mensagensPorLoja, setMensagensPorLoja] = useState({});

  // 3) Input e gravação
  const [novaMensagem, setNovaMensagem] = useState("");
  const [gravando, setGravando] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const chatRef = useRef(null);

  // id da loja atual
  const idLoja = lojaSelecionada?.id;

  // Carrega as lojas ao montar
  useEffect(() => {
    async function fetchChatsDoUsuario() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const clienteId = user?.id;
        if (!clienteId) return;

        const res = await axios.get(`/api/chats/user/${clienteId}`);
        const lojasComChat = res.data.map((chat) => ({
          id: chat.loja_id,
          nome: chat.loja_nome,
          imagem: chat.loja_foto, // <<< aqui
        }));

        setLojas(lojasComChat);
        if (lojasComChat.length) setLojaSelecionada(lojasComChat[0]);
      } catch (err) {
        console.error("Erro ao buscar chats do usuário:", err);
      }
    }

    fetchChatsDoUsuario();
  }, []);

  // Abre/cria chat quando troca de loja
  useEffect(() => {
    if (!idLoja) return;
    async function getOrCreate() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const clienteId = user?.id;
        const res = await axios.get("/api/chats", {
          params: { clienteId, lojaId: idLoja },
        });
        setChatId(res.data.id);
        fetchMensagens(res.data.id);
      } catch (err) {
        console.error("Erro ao obter/criar chat:", err);
      }
    }
    getOrCreate();
  }, [idLoja]);

  // Função para buscar mensagens de um chat
  async function fetchMensagens(id) {
    try {
      const res = await axios.get(`/api/chats/${id}/mensagens`);
      setMensagensPorLoja((prev) => ({ ...prev, [id]: res.data }));
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err);
    }
  }

  // Atualiza localmente mensagens
  function atualizarMensagens(novas) {
    if (!chatId) return;
    setMensagensPorLoja((prev) => ({ ...prev, [chatId]: novas }));
  }

  const mensagensAtuais = chatId ? mensagensPorLoja[chatId] || [] : [];

  // Envio de texto
  async function enviarTexto(e) {
    e.preventDefault();
    if (!novaMensagem.trim() || !chatId) return;
    const payload = {
      remetente: "cliente",
      tipo: "texto",
      conteudo: novaMensagem.trim(),
    };
    try {
      await axios.post(`/api/chats/${chatId}/mensagens`, payload);
      fetchMensagens(chatId);
      setNovaMensagem("");
    } catch (err) {
      console.error("Erro ao enviar texto:", err);
    }
  }

  // Envio de imagem
  async function enviarImagem(e) {
    const file = e.target.files[0];
    if (!file || !chatId) return;
    // 1) faz upload para o servidor
    const formData = new FormData();
    formData.append("imagem", file);
    const uploadRes = await axios.post("/api/upload/image/imagem", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const caminho = uploadRes.data.caminho; // ex: "/uploads/imagens/img_123.png"
    // 2) envia a mensagem com o caminho salvo
    const payload = { remetente: "cliente", tipo: "imagem", conteudo: caminho };
    try {
      await axios.post(`/api/chats/${chatId}/mensagens`, payload);
      fetchMensagens(chatId);
    } catch (err) {
      console.error("Erro ao enviar imagem:", err);
    }
    e.target.value = null;
  }

  // Gravação de áudio
  async function iniciarGravacao() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) =>
        chunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = [];

        const formData = new FormData();
        formData.append("audio", blob, "audio.webm");

        try {
          const upload = await axios.post(`/api/upload/audio`, formData);
          const caminho = upload.data.caminho; // ex: "audio_123.webm"

          const payload = {
            remetente: "cliente",
            tipo: "audio",
            conteudo: caminho,
          };

          await axios.post(`/api/chats/${chatId}/mensagens`, payload);
          fetchMensagens(chatId);
          setGravando(false);
        } catch (err) {
          console.error("Erro ao enviar áudio:", err);
        }
      };

      mediaRecorderRef.current.start();
      setGravando(true);
    } catch {
      alert("Erro ao acessar microfone.");
    }
  }

  function pararGravacao() {
    if (mediaRecorderRef.current && gravando) mediaRecorderRef.current.stop();
  }

  return (
    <div className="flex h-[600px] max-w-6xl mx-auto bg-gray-50 shadow rounded overflow-hidden mt-[40px] mb-[40px]">
      {/* Lista de Lojas */}
      <aside className="w-1/4 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-3">Lojas Disponíveis</h2>
        {lojas.length === 0 ? (
          <p>Carregando lojas…</p>
        ) : (
          <ul className="space-y-3">
            {lojas.map((loja) => (
              <li
                key={loja.id}
                onClick={() => setLojaSelecionada(loja)}
                className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                  lojaSelecionada?.id === loja.id
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {/* Faz fallback para placeholder caso não venha nada */}
                {(() => {
                  const img = loja.imagem || "";
                  const src = img.startsWith("http")
                    ? img
                    : img.startsWith("/") // se já começa com slash, só junta host + caminho
                    ? `http://localhost:4000${img}`
                    : // senão assume que é apenas um filename genérico
                      `http://localhost:4000/uploads/${img}`;

                  return (
                    <img
                      src={src}
                      alt={loja.nome}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  );
                })()}

                {loja.nome}
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Área de Chat */}
      <div className="flex-1 flex flex-col p-4">
        {lojaSelecionada && (
          <>
            <div className="flex items-center gap-3 mb-2">
              {/* Mesmo tratamento para a logo selecionada */}
              {(() => {
                const img = lojaSelecionada.imagem || "";
                const src = img.startsWith("http")
                  ? img
                  : img.startsWith("/")
                  ? `http://localhost:4000${img}`
                  : `http://localhost:4000/uploads/${img}`;

                return (
                  <img
                    src={src}
                    alt={lojaSelecionada.nome}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                );
              })()}

              <h2 className="text-xl font-bold text-blue-800">
                Contato com {lojaSelecionada.nome}
              </h2>
            </div>

            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto space-y-4 p-4 bg-white rounded shadow-inner"
            >
              {mensagensAtuais.map((msg) => {
                const isCliente = msg.remetente === "cliente";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      isCliente ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-xl max-w-[75%] shadow transition-all ${
                        isCliente
                          ? "bg-green-100 text-gray-800 rounded-bl-none"
                          : "bg-blue-500 text-white rounded-br-none"
                      }`}
                    >
                      {msg.tipo === "texto" && <span>{msg.conteudo}</span>}
                      {msg.tipo === "imagem" && (
                        <img
                          src={
                            msg.conteudo.startsWith("http")
                              ? msg.conteudo
                              : `http://localhost:4000${msg.conteudo}`
                          }
                        />
                      )}
                      {msg.tipo === "audio" && (
                        <audio
                          controls
                          src={
                            // 1) blob URLs (temporárias no navegador) devem ser usadas “in-loco”
                            msg.conteudo.startsWith("blob:")
                              ? msg.conteudo
                              : // 2) caminhos vindos do seu backend já começam com “/uploads”
                              msg.conteudo.startsWith("/")
                              ? `http://localhost:4000${msg.conteudo}`
                              : // 3) casos “exóticos”, aceita direto
                                msg.conteudo
                          }
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={enviarTexto} className="mt-4 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  disabled={!novaMensagem.trim()}
                  className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  <FiSend size={20} />
                </button>
              </div>
              <div className="flex gap-3 items-center">
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-1 cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded"
                  title="Enviar imagem"
                >
                  <FiCamera size={18} />
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={enviarImagem}
                    className="hidden"
                  />
                </label>
                {!gravando ? (
                  <button
                    type="button"
                    onClick={iniciarGravacao}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                  >
                    <FiMic size={18} />
                    Gravar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={pararGravacao}
                    className="flex items-center gap-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 rounded"
                  >
                    <FiX size={18} />
                    Parar
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
