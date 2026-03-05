"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, MessageSquare, Users, ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const faqs = [
  {
    question: "Qu'est-ce que Solutions Transitions ?",
    answer:
      "Solutions Transitions est une boîte à outils pensée pour les agents, élus et acteurs locaux qui veulent agir concrètement en faveur de la transition écologique et solidaire. Le projet est porté par Le Lierre, en partenariat avec une vingtaine d'organisations impliquées dans la transition.",
  },
  {
    question: "Qui peut utiliser les fiches pratiques ?",
    answer:
      "Les fiches sont conçues pour tous les acteurs de la transition locale : élus municipaux et intercommunaux, agents territoriaux (DGS, directeurs, chargés de mission), associations, citoyens engagés, et tout professionnel impliqué dans les politiques publiques locales.",
  },
  {
    question: "Les contenus sont-ils gratuits ?",
    answer:
      "Oui, l'ensemble des fiches pratiques et des ressources est accessible gratuitement. Solutions Transitions a vocation à diffuser le plus largement possible les outils nécessaires à la transition écologique des territoires.",
  },
  {
    question: "Comment puis-je contribuer au projet ?",
    answer:
      "Vous pouvez contribuer de plusieurs façons : proposer des corrections ou compléments aux fiches existantes, partager des retours d'expérience de votre territoire, suggérer de nouvelles ressources, ou rejoindre Le Lierre pour participer activement au réseau. Utilisez le formulaire de contact pour nous faire part de vos propositions.",
  },
  {
    question: "Qu'est-ce que Le Lierre ?",
    answer:
      "Le Lierre est un réseau professionnel qui rassemble des agents publics, élus et acteurs engagés pour accélérer la transition écologique et solidaire. C'est l'organisation qui porte le projet Solutions Transitions et anime la coalition de partenaires.",
  },
  {
    question: "Comment rejoindre Le Lierre ?",
    answer:
      "Vous pouvez rejoindre Le Lierre directement via leur site web le-lierre.fr. L'adhésion vous donne accès au réseau, aux événements, et vous permet de contribuer activement aux projets comme Solutions Transitions.",
  },
  {
    question: "À quelle fréquence de nouvelles fiches sont-elles publiées ?",
    answer:
      "De nouvelles fiches sont publiées régulièrement, avec un rythme accéléré en vue des élections municipales de mars 2026. Inscrivez-vous à la newsletter (1 mail mensuel maximum) pour être informé des dernières publications.",
  },
  {
    question: "Comment fonctionne l'Assistant IA ?",
    answer:
      "L'Assistant IA est un outil basé sur l'intelligence artificielle qui vous permet de poser des questions sur le contenu des fiches et ressources de Solutions Transitions. Il peut vous aider à trouver rapidement l'information pertinente ou à comprendre un sujet complexe.",
  },
];

function FaqItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <AnimatedSection delay={index * 0.05}>
      <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white card-hover">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-6 text-left"
        >
          <span className="font-bold text-slate-900 pr-4">{faq.question}</span>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 flex-none transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 text-slate-600 leading-relaxed text-[15px]">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-[10%] w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6">
              Questions <span className="gradient-text">fréquentes</span>
            </h1>
            <p className="text-xl text-slate-500">
              Tout ce que vous devez savoir sur Solutions Transitions.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <div className="mt-16 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-10 text-center text-white">
              <MessageSquare className="w-10 h-10 mx-auto mb-4 text-emerald-200" />
              <h2 className="text-2xl font-bold mb-3">
                Vous ne trouvez pas votre réponse ?
              </h2>
              <p className="text-emerald-100 mb-6">
                Contactez-nous ou essayez notre assistant IA.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-emerald-700 font-bold rounded-xl hover:shadow-lg transition-all"
                >
                  Nous contacter
                </Link>
                <Link
                  href="/assistant"
                  className="px-6 py-3 text-white font-bold border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all"
                >
                  Assistant IA
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
