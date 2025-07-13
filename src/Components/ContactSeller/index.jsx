import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiCamera, FiMic, FiX } from "react-icons/fi";

const lojas = [
  { id: 1, nome: "Loja Centro", imagem: "https://via.placeholder.com/40" },
  { id: 2, nome: "Loja Norte", imagem: "https://via.placeholder.com/40" },
  { id: 3, nome: "Loja Sul", imagem: "https://via.placeholder.com/40" },
];

function ContatoLoja() {
  const [lojaSelecionada, setLojaSelecionada] = useState(lojas[0]);
  const [mensagensPorLoja, setMensagensPorLoja] = useState({});
  const [novaMensagem, setNovaMensagem] = useState("");
  const [gravando, setGravando] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const chatRef = useRef(null);

  const idLoja = lojaSelecionada.id;

  useEffect(() => {
    const salvo = localStorage.getItem("mensagensPorLoja");
    if (salvo) {
      setMensagensPorLoja(JSON.parse(salvo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mensagensPorLoja", JSON.stringify(mensagensPorLoja));
  }, [mensagensPorLoja]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensagensPorLoja, idLoja]);

  const mensagensAtuais = mensagensPorLoja[idLoja] || [];

  function atualizarMensagens(novas) {
    setMensagensPorLoja((prev) => ({
      ...prev,
      [idLoja]: novas,
    }));
  }

  function enviarTexto(e) {
    e.preventDefault();
    if (!novaMensagem.trim()) return;

    const novaMsg = {
      id: Date.now(),
      tipo: "texto",
      texto: novaMensagem.trim(),
      deCliente: true,
    };

    atualizarMensagens([...mensagensAtuais, novaMsg]);
    setNovaMensagem("");
  }

  function enviarImagem(e) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    const novaMsg = {
      id: Date.now(),
      tipo: "imagem",
      imagemURL: url,
      file,
      deCliente: true,
    };

    atualizarMensagens([...mensagensAtuais, novaMsg]);
    e.target.value = null;
  }

  async function iniciarGravacao() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = [];
        const url = URL.createObjectURL(blob);

        const novaMsg = {
          id: Date.now(),
          tipo: "audio",
          audioBlob: blob,
          audioURL: url,
          deCliente: true,
        };

        atualizarMensagens([...mensagensAtuais, novaMsg]);
        setGravando(false);
      };

      mediaRecorderRef.current.start();
      setGravando(true);
    } catch {
      alert("Erro ao acessar microfone.");
    }
  }

  function pararGravacao() {
    if (mediaRecorderRef.current && gravando) {
      mediaRecorderRef.current.stop();
    }
  }

  return (
    <div className="flex h-[600px] max-w-6xl mx-auto bg-gray-50 shadow rounded overflow-hidden mt-[40px] mb-[40px]">
      {/* Lista de Lojas */}
      <aside className="w-1/4 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-3">Lojas Disponíveis</h2>
        <ul className="space-y-3">
          {lojas.map((loja) => (
            <li
              key={loja.id}
              onClick={() => setLojaSelecionada(loja)}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                lojaSelecionada.id === loja.id
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <img
                src={loja.imagem}
                alt={loja.nome}
                className="w-10 h-10 rounded-full object-cover border"
              />
              {loja.nome}
            </li>
          ))}
        </ul>
      </aside>

      {/* Área de Chat */}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={lojaSelecionada.imagem}
            alt={lojaSelecionada.nome}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <h2 className="text-xl font-bold text-blue-800">
            Contato com {lojaSelecionada.nome}
          </h2>
        </div>

        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto space-y-4 p-4 bg-white rounded shadow-inner"
        >
          {mensagensAtuais.map((msg) => {
            const isCliente = msg.deCliente;
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
                  {msg.tipo === "texto" && <span>{msg.texto}</span>}
                  {msg.tipo === "imagem" && (
                    <img
                      src={msg.imagemURL}
                      alt="imagem"
                      className="rounded max-w-full cursor-pointer hover:brightness-90"
                      onClick={() => window.open(msg.imagemURL, "_blank")}
                    />
                  )}
                  {msg.tipo === "audio" && (
                    <audio
                      controls
                      src={msg.audioURL}
                      className="w-full mt-1"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Formulário */}
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
              <span>Imagem</span>
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
      </div>
    </div>
  );
}

export default ContatoLoja;
