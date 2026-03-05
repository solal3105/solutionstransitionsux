"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  FileText,
  Library,
  Lightbulb,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

const suggestions = [
  {
    icon: "⚡",
    text: "Comment lutter contre la précarité énergétique dans ma commune ?",
  },
  {
    icon: "🌾",
    text: "Quels leviers pour la transition agroécologique d'un EPCI ?",
  },
  {
    icon: "📊",
    text: "Comment intégrer l'environnement dans le développement économique ?",
  },
  {
    icon: "🏡",
    text: "Comment soutenir les écolieux sur mon territoire ?",
  },
];

const fakeConversation = [
  {
    role: "assistant",
    content:
      "Bonjour ! Je suis l'assistant IA de Solutions Transitions. Je peux vous aider à naviguer dans nos fiches pratiques et ressources. Que souhaitez-vous savoir ?",
  },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState(fakeConversation);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Merci pour votre question ! Sur ce sujet, je vous recommande de consulter notre fiche \"Embarquer tous les ménages dans une transition énergétique juste\" qui détaille les leviers à la main des collectivités. Vous y trouverez notamment le programme Slime et des exemples concrets de territoires engagés.\n\nPar ailleurs, notre ressource sur la transition écologique créatrice d'emplois dans les territoires ruraux peut compléter cette lecture avec des données chiffrées sur l'impact économique.\n\nSouhaitez-vous en savoir plus sur un point particulier ?",
        },
      ]);
    }, 1500);
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-32 pb-8 bg-gradient-to-b from-violet-50/50 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-[10%] w-80 h-80 bg-violet-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-[20%] w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-6">
              <Bot className="w-4 h-4" />
              Alimenté par l&apos;IA
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
              Assistant <span className="gradient-text">IA</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Posez vos questions sur la transition écologique locale et trouvez
              rapidement les ressources pertinentes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Chat container */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/50 overflow-hidden">
            {/* Messages */}
            <div className="p-6 space-y-6 min-h-[400px] max-h-[500px] overflow-y-auto">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                        : "bg-slate-50 text-slate-700 border border-slate-100"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-emerald-600">
                          Assistant ST
                        </span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {msg.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-6 pb-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Suggestions
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestion(s.text)}
                      className="flex items-start gap-2 p-3 text-left text-sm text-slate-600 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-slate-100"
                    >
                      <span className="text-base flex-none">{s.icon}</span>
                      <span className="leading-snug">{s.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-slate-100">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Posez votre question..."
                  className="flex-grow px-5 py-3.5 rounded-xl border-2 border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="flex-none px-5 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center">
                L&apos;assistant peut faire des erreurs. Vérifiez les informations dans les fiches originales.
              </p>
            </div>
          </div>

          {/* Related content */}
          <AnimatedSection delay={0.2}>
            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              <Link href="/fiches">
                <div className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                  <FileText className="w-8 h-8 text-emerald-600 mb-3" />
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    Explorer les fiches
                  </h3>
                  <p className="text-sm text-slate-500">
                    Parcourez l&apos;ensemble de nos fiches pratiques par thématique.
                  </p>
                </div>
              </Link>
              <Link href="/ressources">
                <div className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                  <Library className="w-8 h-8 text-violet-600 mb-3" />
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    Voir les ressources
                  </h3>
                  <p className="text-sm text-slate-500">
                    Des rapports, guides et analyses sélectionnés pour vous.
                  </p>
                </div>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
