import React, { useState } from "react";
import { motion } from "framer-motion";

const Sobre = () => {
  const cards = [
    {
      title: "🌟 Missão",
      text: "Conectar pessoas aos melhores produtos do mercado, com uma experiência de busca intuitiva, ágil e moderna.",
      icon: "🚀",
      detail:
        "Nossa missão é garantir que cada busca seja relevante e personalizada, colocando o usuário sempre em primeiro lugar.",
    },
    {
      title: "🚀 Visão",
      text: "Ser a principal plataforma de descoberta de produtos na América Latina, reconhecida pela inovação e design.",
      icon: "🌍",
      detail:
        "Expandir continuamente nosso alcance e impactar positivamente milhares de pessoas com tecnologia e design de ponta.",
    },
    {
      title: "❤️ Valores",
      text: "Transparência, acessibilidade, performance e compromisso com a experiência do usuário.",
      icon: "🤝",
      detail:
        "Acreditamos que confiança e ética são a base para relacionamentos duradouros com nossos clientes e parceiros.",
    },
  ];

  const equipe = [
    {
      nome: "Gabriel Silva",
      cargo: "Fundador & CEO",
      imagem: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Apaixonado por tecnologia e empreendedorismo, lidera a visão estratégica da ShopHere.",
      linkedin: "https://linkedin.com/in/gabrielsilva",
    },
    {
      nome: "Larissa Costa",
      cargo: "Desenvolvedora Front-End",
      imagem: "https://randomuser.me/api/portraits/women/65.jpg",
      bio: "Especialista em React e design responsivo, cria interfaces modernas e funcionais.",
      linkedin: "https://linkedin.com/in/larissacosta",
    },
    {
      nome: "Pedro Almeida",
      cargo: "Designer UI/UX",
      imagem: "https://randomuser.me/api/portraits/men/75.jpg",
      bio: "Designer dedicado a criar experiências incríveis e intuitivas para os usuários.",
      linkedin: "https://linkedin.com/in/pedroalmeida",
    },
  ];

  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-16 px-4 sm:px-6 lg:px-8 select-none font-inter">
      <div className="max-w-7xl mx-auto">

        {/* Título principal com efeito interativo */}
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold text-center text-green-900 mb-12 tracking-tight relative cursor-pointer select-none"
          initial={{ opacity: 0, y: -30, textShadow: "0px 0px 0px rgba(72, 187, 120, 0)" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{
            textShadow: "0 0 8px rgba(72, 187, 120, 0.9), 0 0 20px rgba(72, 187, 120, 0.7)",
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
        >
          Sobre Nós <span role="img" aria-label="sacola">🛍️</span>
        </motion.h1>

        {/* Introdução */}
        <motion.p
          className="max-w-3xl mx-auto text-center text-lg sm:text-xl text-green-800 font-serif italic leading-relaxed mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Bem-vindo ao <strong className="font-black text-green-900">ShopHere</strong>, a plataforma feita para você descobrir produtos incríveis, comparar tendências e explorar as melhores oportunidades de forma moderna e eficiente. Aqui, você não compra — você descobre.
        </motion.p>

        {/* Cards Missão, Visão, Valores */}
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 mb-28">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              onClick={() => setActiveCard(index === activeCard ? null : index)}
              className={`relative cursor-pointer bg-white rounded-2xl shadow-md p-8 border border-transparent
                transition-all duration-300
                hover:shadow-lg hover:border-green-300
                ${activeCard === index ? "border-green-500 shadow-xl scale-105 z-10" : ""}
              `}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              layout
              aria-expanded={activeCard === index}
            >
              <div className="flex items-center space-x-5 mb-4">
                <div className="text-6xl">{card.icon}</div>
                <h3 className="text-2xl font-extrabold text-green-700">{card.title}</h3>
              </div>
              <p className="text-green-800 text-base font-medium leading-relaxed">{card.text}</p>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={
                  activeCard === index
                    ? { opacity: 1, height: "auto", marginTop: 20 }
                    : { opacity: 0, height: 0, marginTop: 0 }
                }
                transition={{ duration: 0.4 }}
                className="text-green-700 text-sm font-normal overflow-hidden"
              >
                {card.detail}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Título da equipe */}
        <motion.h2
          className="text-3xl sm:text-4xl font-semibold text-center text-green-800 mb-16 border-b-4 border-green-300 pb-3 max-w-max mx-auto cursor-default select-none tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          Nossa Equipe <span role="img" aria-label="pasta">💼</span>
        </motion.h2>

        {/* Cards da equipe */}
        <div className="grid gap-14 sm:grid-cols-2 md:grid-cols-3">
          {equipe.map((membro, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-3xl border border-green-100 p-8 shadow-md cursor-pointer overflow-hidden group transition-shadow duration-300 hover:shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.15 }}
              viewport={{ once: true }}
            >
              <img
                src={membro.imagem}
                alt={membro.nome}
                className="w-28 h-28 rounded-full mx-auto mb-6 object-cover ring-4 ring-green-300 transition-transform duration-500 group-hover:scale-110"
              />
              <h4 className="text-center text-2xl font-extrabold text-green-900">{membro.nome}</h4>
              <p className="text-center text-sm text-green-600 font-semibold mb-6">{membro.cargo}</p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl p-6 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto flex flex-col justify-center items-center text-center"
              >
                <p className="text-green-800 text-sm mb-4 font-medium">{membro.bio}</p>
                <a
                  href={membro.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
                  aria-label={`LinkedIn de ${membro.nome}`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.75 0-5 2.25-5 5v14c0 2.75 2.25 5 5 5h14c2.75 0 5-2.25 5-5v-14c0-2.75-2.25-5-5-5zm-11.5 19h-3v-10h3v10zm-1.5-11.5c-.967 0-1.75-.78-1.75-1.75 0-.967.783-1.75 1.75-1.75s1.75.783 1.75 1.75c0 .967-.783 1.75-1.75 1.75zm13 11.5h-3v-5c0-1.25-.5-2-1.75-2s-2 .75-2 2v5h-3v-10h3v1.4c.9-1.3 2.75-1.4 3.75-1.4 2.3 0 3.25 1.5 3.25 3.75v6.25z" />
                  </svg>
                  LinkedIn
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-28 text-center text-green-700 text-sm border-t border-green-200 pt-6 select-text font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          © {new Date().getFullYear()} ShopHere — Todos os direitos reservados.
        </motion.footer>
      </div>
    </div>
  );
};

export default Sobre;

