import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiMic, FiImage, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

const vendedores = [
  { id: 1, nome: "João", empresa: "Loja X", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 2, nome: "Maria", empresa: "Varejo Center", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 3, nome: "Carlos", empresa: "Carlos Eletrônicos", avatar: "https://i.pravatar.cc/150?img=8" },
  { id: 4, nome: "Fernanda", empresa: "Estilo Fashion", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 5, nome: "Ricardo", empresa: "Games House", avatar: "https://i.pravatar.cc/150?img=15" },
];

export default function ContactPage() {
  const [vendedorSelecionado, setVendedorSelecionado] = useState(vendedores[0]);
  const [mensagem, setMensagem] = useState("");
  const [conversas, setConversas] = useState({});
  const [digitando, setDigitando] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const chatRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const handleEnviar = () => {
    if (!mensagem.trim()) return;
    enviarMensagem("texto", mensagem);
    setMensagem("");
  };

  const enviarMensagem = (tipo, conteudo) => {
    const novaMensagem = {
      tipo,
      conteudo,
      remetente: "usuario",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setConversas((prev) => {
      const atual = prev[vendedorSelecionado.id] || [];
      return {
        ...prev,
        [vendedorSelecionado.id]: [...atual, novaMensagem],
      };
    });

    simulateRespostaAutomatica();
  };

  const simulateRespostaAutomatica = () => {
    setDigitando(true);
    setTimeout(() => {
      const resposta = {
        tipo: "texto",
        conteudo: "Assim que possível irei resolver isso e entrar em contato 😊",
        remetente: "vendedor",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setConversas((prev) => {
        const atual = prev[vendedorSelecionado.id] || [];
        return {
          ...prev,
          [vendedorSelecionado.id]: [...atual, resposta],
        };
      });

      setDigitando(false);
    }, 1800);
  };

  const handleImagem = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        enviarMensagem("imagem", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const iniciarGravacao = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        enviarMensagem("audio", url);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Erro ao gravar áudio:", err);
    }
  };

  const pararGravacao = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const limparConversa = () => {
    setConversas((prev) => ({
      ...prev,
      [vendedorSelecionado.id]: [],
    }));
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversas, digitando]);

  return (
    <div className="flex h-screen bg-zinc-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white border-r shadow-lg flex flex-col overflow-y-auto">
        <div className="px-4 py-4 border-b">
          <h2 className="text-lg font-bold text-indigo-600">Vendedores</h2>
        </div>

        {vendedores.map((v) => {
          const isSelected = vendedorSelecionado.id === v.id;
          const ultimasMsgs = conversas[v.id] || [];
          const ultimaMsg = ultimasMsgs[ultimasMsgs.length - 1];
          const preview = ultimaMsg?.tipo === "texto"
            ? ultimaMsg.conteudo.slice(0, 22) + (ultimaMsg.conteudo.length > 22 ? "..." : "")
            : ultimaMsg?.tipo === "imagem"
            ? "[Imagem]"
            : ultimaMsg?.tipo === "audio"
            ? "[Áudio]"
            : "Nenhuma mensagem ainda";

          const online = v.id % 2 === 0; // Simula status online

          return (
            <div
              key={v.id}
              onClick={() => setVendedorSelecionado(v)}
              className={`flex items-center px-4 py-3 gap-3 cursor-pointer transition-all hover:bg-zinc-100 ${
                isSelected ? "bg-zinc-100" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={v.avatar}
                  alt={v.nome}
                  className={`w-12 h-12 rounded-full border-2 ${
                    isSelected ? "border-indigo-500" : "border-transparent"
                  }`}
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    online ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm truncate text-gray-800">{v.nome}</h4>
                  <span className="text-[10px] text-gray-400">
                    {ultimaMsg?.timestamp || ""}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">{preview}</p>
                <p className="text-[11px] text-indigo-400 font-medium">{v.empresa}</p>
              </div>
            </div>
          );
        })}
      </aside>

      {/* Chat principal */}
      <main className="flex-1 flex flex-col bg-white rounded-xl shadow-xl overflow-hidden relative">
        {/* Topo */}
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <div className="flex items-center gap-3">
            <img src={vendedorSelecionado.avatar} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-bold">{vendedorSelecionado.nome}</h3>
              <span className="text-sm text-indigo-500">{vendedorSelecionado.empresa}</span>
            </div>
          </div>
          <button
            onClick={limparConversa}
            className="text-gray-400 hover:text-red-500 transition"
            title="Limpar conversa"
          >
            <FiTrash2 size={20} />
          </button>
        </div>

        {/* Mensagens */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-5 py-4 bg-zinc-50 space-y-4">
          {(conversas[vendedorSelecionado.id] || []).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.remetente === "usuario" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
                  msg.remetente === "usuario"
                    ? "bg-indigo-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.tipo === "texto" && <p>{msg.conteudo}</p>}
                {msg.tipo === "imagem" && (
                  <img src={msg.conteudo} className="rounded-md mt-1 max-h-60 object-cover" />
                )}
                {msg.tipo === "audio" && (
                  <audio controls src={msg.conteudo} className="w-full mt-1" />
                )}
                <div className="text-[10px] text-gray-300 mt-1 text-right">{msg.timestamp}</div>
              </div>
            </motion.div>
          ))}
          {digitando && <p className="italic text-sm text-gray-400">Digitando...</p>}
        </div>

        {/* Caixa de entrada */}
        <div className="p-3 border-t flex items-center gap-2 bg-white">
          <input
            id="imagemInput"
            type="file"
            accept="image/*"
            onChange={handleImagem}
            className="hidden"
          />
          <label htmlFor="imagemInput" className="text-gray-500 hover:text-indigo-500 cursor-pointer">
            <FiImage size={20} />
          </label>

          <button
            onClick={isRecording ? pararGravacao : iniciarGravacao}
            className={`text-gray-500 hover:text-red-500 transition ${
              isRecording ? "animate-pulse" : ""
            }`}
          >
            <FiMic size={20} />
          </button>

          <input
            type="text"
            placeholder="Digite uma mensagem..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEnviar()}
            className="flex-1 px-4 py-2 rounded-full bg-zinc-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />

          <button
            onClick={handleEnviar}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full transition"
          >
            <FiSend size={18} />
          </button>
        </div>
      </main>
    </div>
  );
}
