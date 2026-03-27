"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type Role = "assistant" | "user";

type Suggestion = {
  label: string;
  query: string;
};

type Message = {
  role: Role;
  content: string;
  links?: { label: string; href: string }[];
};

/* ── RÉPONSES FACTICES ──────────────────────────────── */
const responses: {
  keywords: string[];
  content: string;
  links: { label: string; href: string }[];
}[] = [
  {
    keywords: ["énergie", "energetique", "énergétique", "précarité", "renovation", "rénovation", "isolation", "chauffage"],
    content:
      "La transition énergétique est un levier majeur pour les collectivités. Notre fiche dédiée détaille comment embarquer tous les ménages, y compris les plus précaires, dans la rénovation. Le guide CEREMA sur les contrats de performance énergétique va encore plus loin.",
    links: [
      { label: "Fiche – Transition énergétique juste", href: "/fiches/transition-energetique" },
      { label: "Guide – Contrats de performance énergétique", href: "/ressources/contrat-performance-energetique" },
    ],
  },
  {
    keywords: ["agriculture", "agroecologie", "agroécologie", "alimentation", "nourriture", "circuits courts", "epci"],
    content:
      "Les EPCI disposent de leviers puissants pour soutenir la transition agricole. Notre fiche sur l'agroécologie et notre rapport sur la renaturation des territoires vous donnent des pistes concrètes.",
    links: [
      { label: "Fiche – Agroécologie & alimentation durable", href: "/fiches/agroecologie" },
      { label: "Rapport – Comment renaturer les territoires ?", href: "/ressources/renaturer-territoires" },
    ],
  },
  {
    keywords: ["mobilite", "mobilité", "vélo", "velo", "transport", "voiture", "déplacement"],
    content:
      "Sortir du tout-voiture est possible ! Les Réseaux Express Vélo sont une solution rapide à déployer. Notre collection dédiée rassemble tout ce qu'il faut savoir.",
    links: [
      { label: "Étude – Réseaux Express Vélo", href: "/ressources/reseaux-express-velo" },
      { label: "Collection – Sortir du tout-voiture", href: "/collections/mobilite-douce" },
    ],
  },
  {
    keywords: ["budget", "finances", "financement", "argent", "argent", "coût", "cout", "dépense"],
    content:
      "La transition ne coûte pas forcément cher ! Notre fiche sur les finances et le rapport I4CE montrent comment réallouer les dépenses existantes vers des investissements verts.",
    links: [
      { label: "Fiche – Mettre les finances au service de la transition", href: "/fiches/finances-transition" },
      { label: "Analyse – Dépenses locales vertes (I4CE)", href: "/ressources/depenses-locales-vertes" },
    ],
  },
  {
    keywords: ["mandat", "maire", "élu", "commune", "municipal", "élection", "100 premiers jours"],
    content:
      "Les 100 premiers jours sont cruciaux ! Notre guide « Maire, pourquoi faire ? » et la fiche sur la vision systémique vous aideront à poser une stratégie solide dès le départ.",
    links: [
      { label: "Guide – Maire, pourquoi faire ?", href: "/ressources/maire-pourquoi-faire" },
      { label: "Fiche – Vision systémique", href: "/fiches/vision-systemique" },
      { label: "Collection – 100 premiers jours", href: "/collections/100-premiers-jours" },
    ],
  },
  {
    keywords: ["biodiversite", "biodiversité", "nature", "faune", "flore", "espaces verts", "renaturation"],
    content:
      "Les solutions fondées sur la nature sont de puissants outils pour les collectivités. Notre fiche biodiversité et les rapports de l'OFB et du CEREMA vous donnent méthodes et exemples.",
    links: [
      { label: "Fiche – Biodiversité locale", href: "/fiches/biodiversite-locale" },
      { label: "Étude – Solutions fondées sur la nature", href: "/ressources/solutions-fondees-nature" },
    ],
  },
  {
    keywords: ["ecolieu", "écolieu", "habitat", "logement", "rural", "petite commune"],
    content:
      "Les écolieux sont en plein essor et les collectivités ont un rôle clé à jouer. Consultez notre fiche dédiée et la collection « Petites communes » pour des exemples adaptés à votre échelle.",
    links: [
      { label: "Fiche – Soutenir les écolieux", href: "/fiches/ecolieux" },
      { label: "Collection – Petites communes", href: "/collections/petites-communes" },
    ],
  },
  {
    keywords: ["emploi", "travail", "chômage", "economie", "économie", "développement économique"],
    content:
      "La transition crée des emplois ! Le rapport Réseau Action Climat chiffre le potentiel. Notre fiche sur le développement économique montre comment conjuguer enjeux environnementaux et prospérité locale.",
    links: [
      { label: "Rapport – Transition & emplois", href: "/ressources/transition-ecologique-emplois" },
      { label: "Fiche – Développement économique durable", href: "/fiches/developpement-economique" },
    ],
  },
  {
    keywords: ["legal", "légal", "loi", "réglementation", "reglementation", "obligation", "juridique"],
    content:
      "Le cadre légal est vaste mais offre de vraies opportunités ! Notre fiche fait le tour des obligations et leviers juridiques pour les collectivités en matière de transition.",
    links: [
      { label: "Fiche – Cadre légal de la transition", href: "/fiches/cadre-legal" },
    ],
  },
  {
    keywords: ["prestataire", "marché public", "consultant", "bureau d'études"],
    content:
      "Travailler avec des prestataires privés demande méthode et vigilance. Notre fiche détaille les bonnes pratiques pour des partenariats réussis au service de la transition.",
    links: [
      { label: "Fiche – Mobiliser un prestataire privé", href: "/fiches/prestataire-prive" },
    ],
  },
];

const fallback: Message = {
  role: "assistant",
  content:
    "Je n'ai pas trouvé de contenu précis sur ce sujet dans notre bibliothèque. Explorez toutes nos fiches pratiques et ressources, ou posez-moi une autre question !",
  links: [
    { label: "Toutes les fiches & ressources", href: "/fiches" },
  ],
};

const suggestions: Suggestion[] = [
  { label: "⚡ Précarité énergétique", query: "Comment lutter contre la précarité énergétique ?" },
  { label: "🏛️ Débuter un mandat", query: "Par où commencer les 100 premiers jours de mandat ?" },
  { label: "🌾 Agroécologie", query: "Quels leviers pour la transition agroécologique dans mon EPCI ?" },
  { label: "💰 Financer la transition", query: "Comment financer la transition avec un petit budget ?" },
];

function getResponse(input: string): Message {
  const normalized = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  for (const r of responses) {
    if (r.keywords.some((kw) => normalized.includes(kw.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))) {
      return { role: "assistant", content: r.content, links: r.links };
    }
  }
  return fallback;
}

/* ── COMPONENT ──────────────────────────────────────── */

export default function ChatbotBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Bonjour 👋 Je suis l'assistant de Solutions Transitions. Posez-moi une question sur la transition écologique — je vous orienterai vers les bonnes fiches et ressources.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
    }
  }, [open, messages]);

  const send = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setTyping(true);
    setTimeout(() => {
      const reply = getResponse(msg);
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
      if (!open) setUnread((n) => n + 1);
    }, 900 + Math.random() * 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-[350px] sm:w-[390px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 flex flex-col bg-white"
            style={{ maxHeight: "calc(100vh - 120px)", height: 520 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-none">Assistant Solutions Transitions</p>
                <p className="text-[11px] text-emerald-100 mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" />
                  En ligne – répond instantanément
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50/60">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                  {m.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                  )}
                  <div className={`flex flex-col gap-2 max-w-[82%] ${m.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-emerald-600 text-white rounded-br-sm"
                          : "bg-white text-slate-800 shadow-[0_1px_4px_rgba(0,0,0,0.08)] border border-slate-100 rounded-bl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                    {m.links && m.links.length > 0 && (
                      <div className="flex flex-col gap-1.5 w-full">
                        {m.links.map((lk) => (
                          <Link
                            key={lk.href}
                            href={lk.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-[12px] font-semibold hover:bg-emerald-100 transition-colors group"
                          >
                            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                            <span className="line-clamp-1">{lk.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="bg-white border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.08)] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-1.5 h-1.5 rounded-full bg-slate-400 block"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-3 pt-2 pb-1 flex gap-2 overflow-x-auto flex-shrink-0 bg-white border-t border-slate-100 scrollbar-hide">
                {suggestions.map((s) => (
                  <button
                    key={s.query}
                    onClick={() => send(s.query)}
                    className="flex-shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 border border-slate-200 transition-colors whitespace-nowrap"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 border-t border-slate-100 bg-white flex-shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Posez votre question…"
                className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || typing}
                className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bubble Button ── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-shadow"
        aria-label="Ouvrir l'assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {unread > 0 && !open && (
            <motion.span
              key="badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow"
            >
              {unread}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
