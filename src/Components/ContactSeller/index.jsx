import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSend, FiCamera, FiMic, FiX } from "react-icons/fi";

export default function ContatoLoja() {
  const location = useLocation();
  const navigate = useNavigate();

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

  // Fetch chats e pré-seleção via query params
  useEffect(() => {
    async function fetchChatsDoUsuario() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) return;

        // 1) pega params da URL
        const params = new URLSearchParams(location.search);
        const urlLojaId = params.get("lojaId"); // pode ser null ou string
        const preset = params.get("message"); // pode ser null ou string

        console.log("DEBUG ➔ location.search:", location.search);
        console.log("DEBUG ➔ urlLojaId raw:", urlLojaId);

        // 2) busca todos os chats do usuário
        const res = await axios.get(`/api/chats/user/${user.id}`);
        const lojasComChat = res.data.map((chat) => ({
          id: chat.loja_id,
          nome: chat.loja_nome,
          imagem: chat.loja_foto,
        }));

        console.log("DEBUG ➔ lojasComChat:", lojasComChat);

        let selecionada = null;

        // 3) só tenta buscar comércio se urlLojaId for uma string não-vazia E não estiver na lista
        if (urlLojaId) {
          selecionada = lojasComChat.find((l) => String(l.id) === urlLojaId);
          console.log("DEBUG ➔ encontrada na lista:", selecionada);

          if (!selecionada) {
            // **garante que urlLojaId não seja 'undefined' literal**
            if (urlLojaId === "undefined" || urlLojaId.trim() === "") {
              console.warn(
                "WARN ➔ urlLojaId é inválida, pulando fetch externo"
              );
            } else {
              console.log(`DEBUG ➔ buscando /api/commerces/${urlLojaId}`);
              const comRes = await axios.get(`/api/commerces/${urlLojaId}`);
              selecionada = {
                id: comRes.data.id,
                nome: comRes.data.nome,
                imagem: comRes.data.foto,
              };
              lojasComChat.unshift(selecionada);
            }
          }
        }

        // 4) se nada selecionado, pega o primeiro histórico
        if (!selecionada && lojasComChat.length > 0) {
          selecionada = lojasComChat[0];
          console.log("DEBUG ➔ fallback para primeira loja:", selecionada);
        }

        // 5) atualiza estado
        setLojas(lojasComChat);
        setLojaSelecionada(selecionada);

        // 6) define mensagem padrão se existir
        if (preset) {
          setNovaMensagem(decodeURIComponent(preset));
        }
      } catch (err) {
        console.error("Erro ao buscar chats do usuário:", err);
      }
    }

    fetchChatsDoUsuario();
  }, [location.search]);

  // Abre ou cria chat quando troca de loja
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
    const formData = new FormData();
    formData.append("imagem", file);
    try {
      const uploadRes = await axios.post("/api/upload/image/imagem", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const caminho = uploadRes.data.caminho;
      const payload = {
        remetente: "cliente",
        tipo: "imagem",
        conteudo: caminho,
      };
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
          const caminho = upload.data.caminho;
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

  const mensagensAtuais = chatId ? mensagensPorLoja[chatId] || [] : [];

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
                {/* Avatar */}
                {(() => {
                  const img = loja.imagem || "";
                  const src = img.startsWith("http")
                    ? img
                    : img.startsWith("/")
                    ? `http://localhost:4000${img}`
                    : `http://localhost:4000/uploads/${img}`;
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
              {mensagensAtuais.map((msg, index) => {
                const isCliente = msg.remetente === "cliente";

                // Define uma chave segura
                const key =
                  msg.id ??
                  `${msg.tipo}-${msg.conteudo?.slice?.(
                    0,
                    20
                  )}-${index}-${Math.random()}`;

                return (
                  <div
                    key={key}
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
                            msg.conteudo.startsWith("blob:")
                              ? msg.conteudo
                              : msg.conteudo.startsWith("/")
                              ? `http://localhost:4000${msg.conteudo}`
                              : msg.conteudo
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
