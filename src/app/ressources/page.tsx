"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Library,
  FileText,
  Headphones,
  BarChart3,
  BookOpen,
  ExternalLink,
  X,
  Download,
  Clock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const allResources = [
  {
    id: "transition-ecologique-emplois",
    title: "La transition écologique, créatrice d'emplois dans les territoires ruraux",
    type: "Rapport",
    source: "Réseau Action Climat",
    description:
      "À l'horizon 2030, la transition écologique pourrait créer près de 500 000 emplois supplémentaires en France. Cette étude décrit les bénéfices pour les territoires ruraux.",
    icon: "📄",
    date: "Janvier 2026",
    tags: ["Emploi", "Territoires ruraux", "Planification"],
  },
  {
    id: "maire-pourquoi-faire",
    title: "Municipales 2026 : Maire, pourquoi faire ?",
    type: "Guide",
    source: "Le Lierre",
    description:
      "Un guide pour comprendre les enjeux du mandat municipal 2026-2032 et les leviers d'action pour la transition.",
    icon: "📘",
    date: "Février 2026",
    tags: ["Municipales", "Mandat", "Élections"],
  },
  {
    id: "reseaux-express-velo",
    title: "Réseaux Express Vélo : la solution immédiate pour la mobilité durable",
    type: "Étude",
    source: "FUB",
    description:
      "Comment les Réseaux Express Vélo peuvent améliorer la santé, le pouvoir d'achat et la qualité de vie dans les villes.",
    icon: "🚲",
    date: "Décembre 2025",
    tags: ["Mobilité", "Vélo", "Urbanisme"],
  },
  {
    id: "depenses-locales-vertes",
    title: "Moins de brun, plus de vert : la nécessaire redirection des dépenses locales",
    type: "Analyse",
    source: "I4CE",
    description:
      "Analyse de la nécessité de réorienter les dépenses locales vers des investissements verts et durables.",
    icon: "💰",
    date: "Novembre 2025",
    tags: ["Finances", "Budget vert", "Investissement"],
  },
  {
    id: "abecedaire-politiques",
    title: "L'abécédaire des politiques publiques locales liées à la transition écologique",
    type: "Guide",
    source: "Solutions Transitions",
    description:
      "Un guide complet de A à Z des politiques publiques locales pour la transition écologique.",
    icon: "📖",
    date: "Octobre 2025",
    tags: ["Politique publique", "Guide", "Référence"],
  },
  {
    id: "podcast-fabrique",
    title: "Le Podcast de la Fabrique des Transitions",
    type: "Podcast",
    source: "La Fabrique des Transitions",
    description:
      "Des échanges inspirants avec les acteurs de terrain qui font avancer la transition écologique.",
    icon: "🎙️",
    date: "Continu",
    tags: ["Podcast", "Témoignages", "Inspiration"],
  },
  {
    id: "contrat-performance-energetique",
    title: "Guide méthodologique pour un Contrat de Performance Énergétique",
    type: "Guide",
    source: "CEREMA",
    description:
      "Un guide complet pour la mise en place d'un contrat de performance énergétique dans les collectivités.",
    icon: "📋",
    date: "Septembre 2025",
    tags: ["Énergie", "Contrat", "Performance"],
  },
  {
    id: "renaturer-territoires",
    title: "Comment renaturer les territoires ?",
    type: "Rapport",
    source: "CEREMA",
    description:
      "Méthodes et retours d'expérience pour la renaturation des espaces artificialisés.",
    icon: "🌿",
    date: "Août 2025",
    tags: ["Renaturation", "ZAN", "Biodiversité"],
  },
  {
    id: "solutions-fondees-nature",
    title: "Place aux Solutions Fondées sur la Nature",
    type: "Étude",
    source: "OFB",
    description:
      "Explorer les Solutions Fondées sur la Nature comme levier d'adaptation au changement climatique.",
    icon: "🌳",
    date: "Juillet 2025",
    tags: ["Nature", "Adaptation", "Climat"],
  },
];

const typeFilters = [
  { name: "Tout", icon: Library },
  { name: "Rapport", icon: FileText },
  { name: "Guide", icon: BookOpen },
  { name: "Étude", icon: BarChart3 },
  { name: "Podcast", icon: Headphones },
  { name: "Analyse", icon: BarChart3 },
];

export default function RessourcesPage() {
  const [activeType, setActiveType] = useState("Tout");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allResources.filter((res) => {
    const matchesType = activeType === "Tout" || res.type === activeType;
    const matchesSearch =
      searchQuery === "" ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-12 bg-gradient-to-b from-violet-50/60 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-[10%] w-80 h-80 bg-violet-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-[15%] w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-6">
              <Library className="w-4 h-4" />
              {allResources.length} ressources disponibles
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6">
              Les <span className="gradient-text">ressources</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Des contenus fiables, sélectionnés et synthétisés par nos experts pour
              accélérer votre montée en compétences.
            </p>
          </motion.div>

          {/* Search + Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative mb-8">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher une ressource..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-12 py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 flex-wrap">
              {typeFilters.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setActiveType(t.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeType === t.name
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  {t.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
              {filtered.length > 1 ? "ressources trouvées" : "ressource trouvée"}
            </p>
          </div>

          <AnimatePresence mode="popLayout">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((res, i) => (
                <motion.div
                  key={res.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link href={`/ressources/${res.id}`}>
                    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover h-full">
                      <div className="h-2 bg-gradient-to-r from-violet-400 via-emerald-500 to-teal-500" />
                      <div className="p-7">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                            {res.type}
                          </span>
                          <span className="text-xs text-slate-400">{res.date}</span>
                        </div>

                        <div className="text-3xl mb-3">{res.icon}</div>

                        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors leading-snug">
                          {res.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">
                          {res.description}
                        </p>

                        <p className="text-xs text-slate-400 mb-5">
                          Source : <span className="font-medium text-slate-600">{res.source}</span>
                        </p>

                        <div className="flex flex-wrap gap-2 mb-5">
                          {res.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center text-sm font-semibold text-emerald-600 group-hover:gap-2 gap-1 transition-all">
                          Voir la ressource <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Aucune ressource trouvée</h3>
              <p className="text-slate-500 mb-6">Essayez de modifier vos critères de recherche.</p>
              <button
                onClick={() => { setActiveType("Tout"); setSearchQuery(""); }}
                className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
