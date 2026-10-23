"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  Clock,
  ExternalLink,
  GraduationCap,
  Landmark,
  Zap,
  TreePine,
  Bike,
  Layers,
  Sparkles,
  BookOpen,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

// ── Types ─────────────────────────────────────────────────────────────
interface CollectionItem {
  type: "fiche" | "ressource";
  id: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
  tagColor: string;
  readTime?: string;
}

interface Collection {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  gradient: string;
  gradientLight: string;
  borderColor: string;
  LucideIcon: React.ComponentType<{ className?: string }>;
  items: CollectionItem[];
}

// ── Data ──────────────────────────────────────────────────────────────
const collections: Collection[] = [
  {
    id: "premiers-pas",
    emoji: "🎓",
    title: "Mes premiers pas d'élu",
    subtitle: "Le kit de démarrage essentiel pour aborder sereinement votre mandat 2026-2032.",
    gradient: "from-violet-500 to-indigo-600",
    gradientLight: "from-violet-50 to-indigo-50",
    borderColor: "border-violet-200 hover:border-violet-300",
    LucideIcon: GraduationCap,
    items: [
      { type: "ressource", id: "maire-pourquoi-faire", title: "Municipales 2026 : Maire, pourquoi faire ?", description: "Comprendre les enjeux du mandat 2026-2032", icon: "📘", tag: "Guide", tagColor: "bg-violet-500" },
      { type: "fiche", id: "cadre-legal", title: "Le cadre légal de la transition écologique", description: "Panorama des obligations et opportunités légales", icon: "⚖️", tag: "Comprendre", tagColor: "bg-sky-500", readTime: "14 min" },
      { type: "fiche", id: "vision-systemique", title: "Déployer une vision systémique en politique publique", description: "Pensée systémique pour des politiques plus cohérentes", icon: "🔄", tag: "Organiser", tagColor: "bg-amber-500", readTime: "10 min" },
      { type: "ressource", id: "abecedaire-politiques", title: "L'abécédaire des politiques publiques locales", description: "Guide de A à Z pour la transition écologique", icon: "📖", tag: "Guide", tagColor: "bg-violet-500" },
      { type: "fiche", id: "prestataire-prive", title: "Mobiliser un prestataire privé pour la transition", description: "Clés pour une collaboration réussie", icon: "🤝", tag: "Organiser", tagColor: "bg-amber-500", readTime: "9 min" },
    ],
  },
  {
    id: "finances-locales",
    emoji: "💰",
    title: "Finances locales & transition",
    subtitle: "Tout comprendre sur les budgets verts, les aides et le financement de la transition.",
    gradient: "from-amber-500 to-orange-600",
    gradientLight: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200 hover:border-amber-300",
    LucideIcon: Landmark,
    items: [
      { type: "fiche", id: "finances-transition", title: "Mettre les finances au service de la transition", description: "Réorienter les budgets locaux pour accélérer", icon: "💰", tag: "Organiser", tagColor: "bg-amber-500", readTime: "13 min" },
      { type: "ressource", id: "depenses-locales-vertes", title: "Moins de brun, plus de vert", description: "Redirection nécessaire des dépenses locales", icon: "💰", tag: "Analyse", tagColor: "bg-sky-500" },
      { type: "fiche", id: "developpement-economique", title: "Enjeux environnementaux & développement économique", description: "Intégrer l'environnement dans l'économie locale", icon: "📊", tag: "Comprendre", tagColor: "bg-sky-500", readTime: "11 min" },
      { type: "ressource", id: "transition-ecologique-emplois", title: "Transition écologique, créatrice d'emplois", description: "500 000 emplois supplémentaires d'ici 2030", icon: "📄", tag: "Rapport", tagColor: "bg-emerald-500" },
    ],
  },
  {
    id: "energie-renovation",
    emoji: "⚡",
    title: "Énergie & rénovation",
    subtitle: "Transition énergétique, rénovation thermique et lutte contre la précarité.",
    gradient: "from-sky-500 to-cyan-600",
    gradientLight: "from-sky-50 to-cyan-50",
    borderColor: "border-sky-200 hover:border-sky-300",
    LucideIcon: Zap,
    items: [
      { type: "fiche", id: "transition-energetique", title: "Embarquer tous les ménages dans la transition énergétique", description: "Lutter contre la précarité énergétique", icon: "⚡", tag: "Agir", tagColor: "bg-rose-500", readTime: "12 min" },
      { type: "ressource", id: "contrat-performance-energetique", title: "Guide du Contrat de Performance Énergétique", description: "Mise en place d'un CPE dans les collectivités", icon: "📋", tag: "Guide", tagColor: "bg-violet-500" },
      { type: "fiche", id: "ecolieux", title: "Soutenir le développement d'écolieux", description: "Faciliter l'émergence de lieux de vie durables", icon: "🏡", tag: "Agir", tagColor: "bg-rose-500", readTime: "8 min" },
    ],
  },
  {
    id: "nature-biodiversite",
    emoji: "🦋",
    title: "Nature & biodiversité",
    subtitle: "Protéger le vivant, renaturer les espaces et adapter le territoire au climat.",
    gradient: "from-emerald-500 to-green-600",
    gradientLight: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200 hover:border-emerald-300",
    LucideIcon: TreePine,
    items: [
      { type: "fiche", id: "biodiversite-locale", title: "Protéger et restaurer la biodiversité locale", description: "Politique locale ambitieuse pour la biodiversité", icon: "🦋", tag: "Agir", tagColor: "bg-rose-500", readTime: "10 min" },
      { type: "ressource", id: "renaturer-territoires", title: "Comment renaturer les territoires ?", description: "Méthodes de renaturation des espaces artificialisés", icon: "🌿", tag: "Rapport", tagColor: "bg-emerald-500" },
      { type: "ressource", id: "solutions-fondees-nature", title: "Solutions Fondées sur la Nature", description: "Levier d'adaptation au changement climatique", icon: "🌳", tag: "Étude", tagColor: "bg-sky-500" },
    ],
  },
  {
    id: "mobilite-alimentation",
    emoji: "🚲",
    title: "Mobilité & alimentation",
    subtitle: "Se déplacer autrement et nourrir durablement son territoire.",
    gradient: "from-rose-500 to-pink-600",
    gradientLight: "from-rose-50 to-pink-50",
    borderColor: "border-rose-200 hover:border-rose-300",
    LucideIcon: Bike,
    items: [
      { type: "ressource", id: "reseaux-express-velo", title: "Réseaux Express Vélo pour la mobilité durable", description: "Améliorer santé et qualité de vie", icon: "🚲", tag: "Étude", tagColor: "bg-sky-500" },
      { type: "fiche", id: "agroecologie", title: "Transition agroécologique & alimentation durable", description: "Leviers d'un EPCI pour l'alimentation durable", icon: "🌾", tag: "Agir", tagColor: "bg-rose-500", readTime: "15 min" },
      { type: "ressource", id: "podcast-fabrique", title: "Podcast de la Fabrique des Transitions", description: "Échanges inspirants avec les acteurs de terrain", icon: "🎙️", tag: "Podcast", tagColor: "bg-amber-500" },
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────
export default function CollectionsSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeCollection = activeId ? collections.find((c) => c.id === activeId) : null;

  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-slate-50/80 to-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[8%] w-80 h-80 bg-violet-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-medium mb-4">
            <Layers className="w-4 h-4" />
            Collections thématiques
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4">
            Votre <span className="gradient-text">boîte à outils</span> par thématique
          </h2>
          <p className="text-xl text-slate-500 mt-6 max-w-2xl mx-auto">
            Des sélections de fiches et ressources prêtes à l&apos;emploi pour chaque enjeu de votre mandat.
          </p>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          {activeCollection ? (
            /* ═══════════ DETAIL VIEW ═══════════ */
            <motion.div
              key={`detail-${activeCollection.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              className="max-w-5xl mx-auto"
            >
              {/* Back link */}
              <button
                onClick={() => setActiveId(null)}
                className="group flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-colors mb-8"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-semibold">Retour aux collections</span>
              </button>

              {/* Collection hero banner */}
              <div className={`relative rounded-3xl bg-gradient-to-br ${activeCollection.gradient} p-8 sm:p-10 overflow-hidden mb-10`}>
                <div className="absolute -right-8 -top-8 text-[120px] opacity-10 select-none pointer-events-none leading-none">
                  {activeCollection.emoji}
                </div>
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="collGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#collGrid)" />
                  </svg>
                </div>
                <div className="relative flex items-center gap-5">
                  <span className="text-5xl sm:text-6xl">{activeCollection.emoji}</span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{activeCollection.title}</h3>
                    <p className="text-white/70 text-base sm:text-lg mt-2 max-w-lg">{activeCollection.subtitle}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-white/90 text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                        {activeCollection.items.length} contenus
                      </span>
                      <span className="text-white/60 text-sm">
                        {activeCollection.items.filter((i) => i.type === "fiche").length} fiches · {activeCollection.items.filter((i) => i.type === "ressource").length} ressources
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {activeCollection.items.map((item, idx) => {
                  const href = item.type === "fiche" ? `/fiches/${item.id}` : `/ressources/${item.id}`;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 * idx, duration: 0.35 }}
                    >
                      <Link
                        href={href}
                        className="group flex gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10 transition-all hover:-translate-y-0.5 h-full"
                      >
                        <span className="text-3xl flex-none">{item.icon}</span>
                        <div className="flex-grow min-w-0">
                          <p className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug">
                            {item.title}
                          </p>
                          <p className="text-sm text-slate-400 mt-1 leading-snug">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-md ${item.tagColor}`}>
                              {item.tag}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded-md bg-slate-100">
                              {item.type === "fiche" ? "Fiche pratique" : "Ressource"}
                            </span>
                            {item.readTime && (
                              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                                <Clock className="w-3 h-3" />
                                {item.readTime}
                              </span>
                            )}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 flex-none mt-1 group-hover:text-emerald-500 transition-colors" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mt-10"
              >
                <button
                  onClick={() => setActiveId(null)}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  Explorer les autres collections
                </button>
              </motion.div>
            </motion.div>
          ) : (
            /* ═══════════ CARDS GRID ═══════════ */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((col, idx) => (
                  <AnimatedSection key={col.id} delay={idx * 0.08}>
                    <motion.button
                      whileHover={{ y: -6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveId(col.id)}
                      className={`group w-full text-left rounded-3xl border-2 ${col.borderColor} bg-white overflow-hidden transition-shadow hover:shadow-2xl hover:shadow-slate-200/60 cursor-pointer`}
                    >
                      {/* Gradient header */}
                      <div className={`relative bg-gradient-to-br ${col.gradient} px-6 py-5 overflow-hidden`}>
                        <div className="absolute -right-4 -top-4 text-[80px] opacity-15 select-none pointer-events-none leading-none">
                          {col.emoji}
                        </div>
                        <div className="absolute inset-0 opacity-10">
                          <svg width="100%" height="100%">
                            <defs>
                              <pattern id={`pat-${col.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="1" cy="1" r="0.8" fill="white" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#pat-${col.id})`} />
                          </svg>
                        </div>
                        <div className="relative flex items-center gap-3">
                          <span className="text-4xl">{col.emoji}</span>
                          <div>
                            <span className="text-white/90 text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">
                              {col.items.length} contenus
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="px-6 py-5">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight">
                          {col.title}
                        </h3>
                        <p className="text-sm text-slate-400 mt-2 leading-relaxed line-clamp-2">
                          {col.subtitle}
                        </p>

                        {/* Mini icons preview */}
                        <div className="flex items-center gap-1.5 mt-4">
                          {col.items.slice(0, 4).map((item) => (
                            <span
                              key={item.id}
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-sm border border-slate-100"
                              title={item.title}
                            >
                              {item.icon}
                            </span>
                          ))}
                          {col.items.length > 4 && (
                            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-[10px] font-bold text-slate-400 border border-slate-100">
                              +{col.items.length - 4}
                            </span>
                          )}
                          <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                            Découvrir
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  </AnimatedSection>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
