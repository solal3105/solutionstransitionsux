"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Target,
  Zap,
  Clock,
  Tag,
  X,
  SlidersHorizontal,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const allFiches = [
  {
    id: "transition-energetique",
    title: "Embarquer tous les ménages dans une transition énergétique juste",
    category: "Agir",
    categoryColor: "bg-rose-500",
    description:
      "Pourquoi et comment mobiliser les leviers à la main des collectivités pour lutter contre la précarité énergétique.",
    tags: ["Énergie", "Justice sociale", "Rénovation"],
    readTime: "12 min",
    icon: "⚡",
  },
  {
    id: "vision-systemique",
    title:
      "Comment déployer une vision systémique dans un projet de politique publique ?",
    category: "Organiser",
    categoryColor: "bg-amber-500",
    description:
      "Intégrer la pensée systémique pour des politiques publiques plus cohérentes et efficaces.",
    tags: ["Systémique", "Méthodologie", "Pilotage"],
    readTime: "10 min",
    icon: "🔄",
  },
  {
    id: "agroecologie",
    title:
      "Leviers d'un EPCI pour la transition agroécologique et l'alimentation durable",
    category: "Agir",
    categoryColor: "bg-rose-500",
    description:
      "Quels leviers pour agir en faveur de la transition agroécologique à l'échelle intercommunale.",
    tags: ["Agriculture", "Alimentation", "EPCI"],
    readTime: "15 min",
    icon: "🌾",
  },
  {
    id: "ecolieux",
    title: "Pourquoi et comment soutenir le développement d'écolieux",
    category: "Agir",
    categoryColor: "bg-rose-500",
    description:
      "Les collectivités ont un rôle clé pour faciliter l'émergence et la pérennité des écolieux.",
    tags: ["Habitat", "Innovation", "Territoire"],
    readTime: "8 min",
    icon: "🏡",
  },
  {
    id: "developpement-economique",
    title:
      "Prendre en compte les enjeux environnementaux dans le développement économique",
    category: "Comprendre",
    categoryColor: "bg-sky-500",
    description:
      "Comment intégrer la dimension environnementale dans les politiques de développement économique local.",
    tags: ["Économie", "Environnement", "Stratégie"],
    readTime: "11 min",
    icon: "📊",
  },
  {
    id: "prestataire-prive",
    title:
      "Mobiliser efficacement un prestataire privé pour ses politiques de transition",
    category: "Organiser",
    categoryColor: "bg-amber-500",
    description:
      "Les clés pour une collaboration réussie entre collectivités et prestataires privés.",
    tags: ["Marchés publics", "Partenariat", "Efficacité"],
    readTime: "9 min",
    icon: "🤝",
  },
  {
    id: "cadre-legal",
    title: "Le cadre légal de la transition écologique pour les collectivités",
    category: "Comprendre",
    categoryColor: "bg-sky-500",
    description:
      "Panorama des obligations et opportunités légales pour les collectivités en matière de transition.",
    tags: ["Législation", "Obligations", "Cadre juridique"],
    readTime: "14 min",
    icon: "⚖️",
  },
  {
    id: "finances-transition",
    title: "Mettre les finances au service de la transition écologique",
    category: "Organiser",
    categoryColor: "bg-amber-500",
    description:
      "Comment réorienter les budgets locaux pour accélérer la transition sans grever les finances.",
    tags: ["Budget", "Finances", "Investissement"],
    readTime: "13 min",
    icon: "💰",
  },
  {
    id: "biodiversite-locale",
    title: "Protéger et restaurer la biodiversité à l'échelle locale",
    category: "Agir",
    categoryColor: "bg-rose-500",
    description:
      "Les outils et dispositifs pour une politique locale ambitieuse en faveur de la biodiversité.",
    tags: ["Biodiversité", "Nature", "Renaturation"],
    readTime: "10 min",
    icon: "🦋",
  },
];

const categoryFilters = [
  { name: "Tout", icon: BookOpen, color: "bg-emerald-500" },
  { name: "Comprendre", icon: Lightbulb, color: "bg-sky-500" },
  { name: "Organiser", icon: Target, color: "bg-amber-500" },
  { name: "Agir", icon: Zap, color: "bg-rose-500" },
];

export default function FichesPage() {
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFiches = allFiches.filter((fiche) => {
    const matchesCategory =
      activeCategory === "Tout" || fiche.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      fiche.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fiche.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fiche.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-12 bg-gradient-to-b from-emerald-50/80 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-[10%] w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-[15%] w-96 h-96 bg-teal-100/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              {allFiches.length} fiches disponibles
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6">
              Nos fiches <span className="gradient-text">pratiques</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Conçues pour accompagner concrètement votre action locale en faveur de
              la transition écologique et solidaire.
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
                placeholder="Rechercher une fiche par titre, thème, mot-clé..."
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

            <div className="flex items-center justify-center gap-3 flex-wrap">
              {categoryFilters.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat.name
                      ? `${cat.color} text-white shadow-lg`
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.name}
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
              <span className="font-semibold text-slate-900">
                {filteredFiches.length}
              </span>{" "}
              {filteredFiches.length > 1 ? "fiches trouvées" : "fiche trouvée"}
            </p>
          </div>

          <AnimatePresence mode="popLayout">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFiches.map((fiche, i) => (
                <motion.div
                  key={fiche.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link href={`/fiches/${fiche.id}`}>
                    <div className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover h-full">
                      <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-sky-500" />
                      <div className="p-7">
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`${fiche.categoryColor} text-white text-xs font-bold px-3 py-1 rounded-full`}
                          >
                            {fiche.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Clock className="w-3 h-3" />
                            {fiche.readTime}
                          </span>
                        </div>

                        <div className="text-3xl mb-3">{fiche.icon}</div>

                        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors leading-snug">
                          {fiche.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-5">
                          {fiche.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-5">
                          {fiche.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center text-sm font-semibold text-emerald-600 group-hover:gap-2 gap-1 transition-all">
                          Lire la fiche{" "}
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filteredFiches.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Aucune fiche trouvée
              </h3>
              <p className="text-slate-500 mb-6">
                Essayez de modifier vos critères de recherche.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("Tout");
                  setSearchQuery("");
                }}
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
