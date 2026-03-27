#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys

content = '''\
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ArrowRight, X, FileText, Library, Bike, Sprout, Banknote, Scale,
  Home, Zap, TreePine, LayoutGrid, Clock, Headphones, BarChart3, BookOpen,
  ChevronRight, Sparkles,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

// ─── Types ───────────────────────────────────────────────────────────────────
type ContentType = "fiche" | "ressource";
type FormatType = "Rapport" | "Guide" | "\\u00c9tude" | "Podcast" | "Analyse";
type TypeFilter = "tout" | ContentType;

type ContentItem = {
  id: string;
  title: string;
  type: ContentType;
  theme: string;
  description: string;
  tags: string[];
  readTime?: string;
  icon: string;
  source?: string;
  date?: string;
  format?: FormatType;
  featured?: boolean;
};

// ─── Data ────────────────────────────────────────────────────────────────────
const allContent: ContentItem[] = [
  // ── Fiches ──────────────────────────────────────────────────────────────
  {
    id: "transition-energetique",
    title: "Embarquer tous les m\\u00e9nages dans une transition \\u00e9nerg\\u00e9tique juste",
    type: "fiche",
    theme: "\\u00c9nergie",
    description: "Pourquoi et comment mobiliser les leviers \\u00e0 la main des collectivit\\u00e9s pour lutter contre la pr\\u00e9carit\\u00e9 \\u00e9nerg\\u00e9tique.",
    tags: ["\\u00c9nergie", "Justice sociale", "R\\u00e9novation"],
    readTime: "12 min",
    icon: "\\u26a1",
    featured: true,
  },
  {
    id: "vision-systemique",
    title: "Comment d\\u00e9ployer une vision syst\\u00e9mique dans un projet de politique publique\\u00a0?",
    type: "fiche",
    theme: "Pilotage & m\\u00e9thode",
    description: "Int\\u00e9grer la pens\\u00e9e syst\\u00e9mique pour des politiques publiques plus coh\\u00e9rentes et efficaces.",
    tags: ["Syst\\u00e9mique", "M\\u00e9thodologie", "Pilotage"],
    readTime: "10 min",
    icon: "\\ud83d\\udd04",
  },
  {
    id: "agroecologie",
    title: "Leviers d\\u2019un EPCI pour la transition agro\\u00e9cologique et l\\u2019alimentation durable",
    type: "fiche",
    theme: "Agriculture & alimentation",
    description: "Quels leviers pour agir en faveur de la transition agro\\u00e9cologique \\u00e0 l\\u2019\\u00e9chelle intercommunale.",
    tags: ["Agriculture", "Alimentation", "EPCI"],
    readTime: "15 min",
    icon: "\\ud83c\\udf3e",
  },
  {
    id: "ecolieux",
    title: "Pourquoi et comment soutenir le d\\u00e9veloppement d\\u2019\\u00e9colieux",
    type: "fiche",
    theme: "Habitat & urbanisme",
    description: "Les collectivit\\u00e9s ont un r\\u00f4le cl\\u00e9 pour faciliter l\\u2019\\u00e9mergence et la p\\u00e9rennit\\u00e9 des \\u00e9colieux.",
    tags: ["Habitat", "Innovation", "Territoire"],
    readTime: "8 min",
    icon: "\\ud83c\\udfe1",
  },
  {
    id: "developpement-economique",
    title: "Prendre en compte les enjeux environnementaux dans le d\\u00e9veloppement \\u00e9conomique",
    type: "fiche",
    theme: "\\u00c9conomie & finances",
    description: "Comment int\\u00e9grer la dimension environnementale dans les politiques de d\\u00e9veloppement \\u00e9conomique local.",
    tags: ["\\u00c9conomie", "Environnement", "Strat\\u00e9gie"],
    readTime: "11 min",
    icon: "\\ud83d\\udcca",
  },
  {
    id: "prestataire-prive",
    title: "Mobiliser efficacement un prestataire priv\\u00e9 pour ses politiques de transition",
    type: "fiche",
    theme: "Pilotage & m\\u00e9thode",
    description: "Les cl\\u00e9s pour une collaboration r\\u00e9ussie entre collectivit\\u00e9s et prestataires priv\\u00e9s.",
    tags: ["March\\u00e9s publics", "Partenariat", "Efficacit\\u00e9"],
    readTime: "9 min",
    icon: "\\ud83e\\udd1d",
  },
  {
    id: "cadre-legal",
    title: "Le cadre l\\u00e9gal de la transition \\u00e9cologique pour les collectivit\\u00e9s",
    type: "fiche",
    theme: "Cadre l\\u00e9gal",
    description: "Panorama des obligations et opportunit\\u00e9s l\\u00e9gales pour les collectivit\\u00e9s en mati\\u00e8re de transition.",
    tags: ["L\\u00e9gislation", "Obligations", "Cadre juridique"],
    readTime: "14 min",
    icon: "\\u2696\\ufe0f",
  },
  {
    id: "finances-transition",
    title: "Mettre les finances au service de la transition \\u00e9cologique",
    type: "fiche",
    theme: "\\u00c9conomie & finances",
    description: "Comment r\\u00e9orienter les budgets locaux pour acc\\u00e9l\\u00e9rer la transition sans grever les finances.",
    tags: ["Budget", "Finances", "Investissement"],
    readTime: "13 min",
    icon: "\\ud83d\\udcb0",
  },
  {
    id: "biodiversite-locale",
    title: "Prot\\u00e9ger et restaurer la biodiversit\\u00e9 \\u00e0 l\\u2019\\u00e9chelle locale",
    type: "fiche",
    theme: "Biodiversit\\u00e9 & nature",
    description: "Les outils et dispositifs pour une politique locale ambitieuse en faveur de la biodiversit\\u00e9.",
    tags: ["Biodiversit\\u00e9", "Nature", "Renaturation"],
    readTime: "10 min",
    icon: "\\ud83e\\udd8b",
  },
  // ── Ressources ──────────────────────────────────────────────────────────
  {
    id: "transition-ecologique-emplois",
    title: "La transition \\u00e9cologique, cr\\u00e9atrice d\\u2019emplois dans les territoires ruraux",
    type: "ressource",
    theme: "\\u00c9conomie & finances",
    description: "\\u00c0 l\\u2019horizon 2030 la transition \\u00e9cologique pourrait cr\\u00e9er pr\\u00e8s de 500\\u202f000 emplois suppl\\u00e9mentaires en France.",
    tags: ["Emploi", "Territoires ruraux", "Planification"],
    icon: "\\ud83d\\udcc4",
    source: "R\\u00e9seau Action Climat",
    date: "Janv. 2026",
    format: "Rapport",
  },
  {
    id: "maire-pourquoi-faire",
    title: "Municipales 2026\\u00a0: Maire, pourquoi faire\\u00a0?",
    type: "ressource",
    theme: "Pilotage & m\\u00e9thode",
    description: "Un guide pour comprendre les enjeux du mandat municipal 2026\\u20132032 et les leviers d\\u2019action pour la transition.",
    tags: ["Municipales", "Mandat", "\\u00c9lections"],
    icon: "\\ud83d\\udcd8",
    source: "Le Lierre",
    date: "F\\u00e9vr. 2026",
    format: "Guide",
  },
  {
    id: "reseaux-express-velo",
    title: "R\\u00e9seaux Express V\\u00e9lo\\u00a0: la solution imm\\u00e9diate pour la mobilit\\u00e9 durable",
    type: "ressource",
    theme: "Mobilit\\u00e9",
    description: "Comment les REV peuvent am\\u00e9liorer la sant\\u00e9, le pouvoir d\\u2019achat et la qualit\\u00e9 de vie.",
    tags: ["Mobilit\\u00e9", "V\\u00e9lo", "Urbanisme"],
    icon: "\\ud83d\\udeb2",
    source: "FUB",
    date: "D\\u00e9c. 2025",
    format: "\\u00c9tude",
  },
  {
    id: "depenses-locales-vertes",
    title: "Moins de brun, plus de vert\\u00a0: la n\\u00e9cessaire redirection des d\\u00e9penses locales",
    type: "ressource",
    theme: "\\u00c9conomie & finances",
    description: "Analyse de la n\\u00e9cessit\\u00e9 de r\\u00e9orienter les d\\u00e9penses locales vers des investissements verts et durables.",
    tags: ["Finances", "Budget vert", "Investissement"],
    icon: "\\ud83d\\udcb0",
    source: "I4CE",
    date: "Nov. 2025",
    format: "Analyse",
  },
  {
    id: "abecedaire-politiques",
    title: "L\\u2019ab\\u00e9c\\u00e9daire des politiques publiques de transition",
    type: "ressource",
    theme: "Pilotage & m\\u00e9thode",
    description: "R\\u00e9f\\u00e9rence exhaustive des concepts, outils et dispositifs pour piloter des politiques de transition \\u00e9cologique.",
    tags: ["Politique publique", "Guide", "R\\u00e9f\\u00e9rence"],
    icon: "\\ud83d\\udcda",
    source: "Solutions Transitions",
    date: "Oct. 2025",
    format: "Guide",
  },
  {
    id: "podcast-fabrique",
    title: "Le Podcast de la Fabrique des Transitions",
    type: "ressource",
    theme: "Pilotage & m\\u00e9thode",
    description: "Des \\u00e9changes inspirants avec les acteurs de terrain qui font avancer la transition \\u00e9cologique.",
    tags: ["Podcast", "T\\u00e9moignages", "Inspiration"],
    icon: "\\ud83c\\udf99\\ufe0f",
    source: "La Fabrique des Transitions",
    date: "Continu",
    format: "Podcast",
  },
  {
    id: "contrat-performance-energetique",
    title: "Guide m\\u00e9thodologique\\u00a0: Contrats de Performance \\u00c9nerg\\u00e9tique",
    type: "ressource",
    theme: "\\u00c9nergie",
    description: "M\\u00e9thodologie compl\\u00e8te pour la mise en place de CPE dans les collectivit\\u00e9s territoriales.",
    tags: ["\\u00c9nergie", "Contrat", "Performance"],
    icon: "\\ud83d\\udccb",
    source: "CEREMA",
    date: "Sept. 2025",
    format: "Guide",
  },
  {
    id: "renaturer-territoires",
    title: "Comment renaturer les territoires\\u00a0?",
    type: "ressource",
    theme: "Biodiversit\\u00e9 & nature",
    description: "M\\u00e9thodes et retours d\\u2019exp\\u00e9rience pour la renaturation des espaces artificialis\\u00e9s.",
    tags: ["Renaturation", "ZAN", "Biodiversit\\u00e9"],
    icon: "\\ud83c\\udf3f",
    source: "CEREMA",
    date: "Ao\\u00fbt 2025",
    format: "Rapport",
  },
  {
    id: "solutions-fondees-nature",
    title: "Place aux Solutions Fond\\u00e9es sur la Nature",
    type: "ressource",
    theme: "Biodiversit\\u00e9 & nature",
    description: "Explorer les Solutions Fond\\u00e9es sur la Nature comme levier d\\u2019adaptation au changement climatique.",
    tags: ["Nature", "Adaptation", "Climat"],
    icon: "\\ud83c\\udf33",
    source: "OFB",
    date: "Juil. 2025",
    format: "\\u00c9tude",
  },
];

// ─── Theme config ─────────────────────────────────────────────────────────────
const themes = [
  { name: "\\u00c9nergie",                   icon: Zap,        gradient: "from-amber-500 to-orange-500",   bg: "bg-amber-500",   activeBg: "bg-amber-500",   text: "text-amber-600" },
  { name: "Mobilit\\u00e9",                  icon: Bike,       gradient: "from-sky-500 to-blue-500",      bg: "bg-sky-500",     activeBg: "bg-sky-500",     text: "text-sky-600" },
  { name: "Agriculture & alimentation",     icon: Sprout,     gradient: "from-lime-500 to-green-500",    bg: "bg-lime-500",    activeBg: "bg-lime-500",    text: "text-lime-600" },
  { name: "Biodiversit\\u00e9 & nature",     icon: TreePine,   gradient: "from-emerald-500 to-teal-500",  bg: "bg-emerald-500", activeBg: "bg-emerald-500", text: "text-emerald-600" },
  { name: "\\u00c9conomie & finances",       icon: Banknote,   gradient: "from-violet-500 to-purple-500", bg: "bg-violet-500",  activeBg: "bg-violet-500",  text: "text-violet-600" },
  { name: "Habitat & urbanisme",            icon: Home,       gradient: "from-rose-500 to-pink-500",     bg: "bg-rose-500",    activeBg: "bg-rose-500",    text: "text-rose-600" },
  { name: "Cadre l\\u00e9gal",              icon: Scale,      gradient: "from-slate-500 to-slate-600",   bg: "bg-slate-500",   activeBg: "bg-slate-500",   text: "text-slate-600" },
  { name: "Pilotage & m\\u00e9thode",       icon: LayoutGrid, gradient: "from-teal-500 to-cyan-500",     bg: "bg-teal-500",    activeBg: "bg-teal-500",    text: "text-teal-600" },
] as const;

type ThemeConfig = (typeof themes)[number];
const themeMap = new Map<string, ThemeConfig>(themes.map((t) => [t.name, t]));

// ─── Format config ────────────────────────────────────────────────────────────
const formatList = [
  { key: "Rapport" as FormatType,   icon: FileText,  bg: "bg-blue-100",   text: "text-blue-700" },
  { key: "Guide" as FormatType,     icon: BookOpen,  bg: "bg-emerald-100",text: "text-emerald-700" },
  { key: "\\u00c9tude" as FormatType, icon: BarChart3, bg: "bg-violet-100", text: "text-violet-700" },
  { key: "Podcast" as FormatType,   icon: Headphones,bg: "bg-rose-100",   text: "text-rose-700" },
  { key: "Analyse" as FormatType,   icon: BarChart3, bg: "bg-amber-100",  text: "text-amber-700" },
];
const formatMap = new Map(formatList.map((f) => [f.key, f]));

// ─── Featured Spotlight ───────────────────────────────────────────────────────
function FeaturedSpotlight({ item }: { item: ContentItem }) {
  const theme = themeMap.get(item.theme);
  return (
    <section className="relative overflow-hidden bg-slate-950 min-h-[420px] flex items-end">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_20%_50%,rgba(16,185,129,0.12)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_80%_30%,rgba(99,102,241,0.08)_0%,transparent_70%)]" />
      {/* Gradient bar at top */}
      {theme && (
        <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${theme.gradient}`} />
      )}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-[1fr_180px] gap-10 items-center"
        >
          <div>
            {/* Badges */}
            <div className="flex items-center flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full">
                <Sparkles className="w-3 h-3" />\\u00c0 la une
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                Fiche pratique
              </span>
              {item.theme && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                  {item.theme}
                </span>
              )}
            </div>
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5 max-w-3xl">
              {item.title}
            </h1>
            {/* Description */}
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-7 max-w-2xl">
              {item.description}
            </p>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-7">
              {item.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/8 text-slate-300 text-xs font-medium rounded-full border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
            {/* CTA */}
            <div className="flex items-center gap-5">
              <Link
                href={`/fiches/${item.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                Lire la fiche <ArrowRight className="w-4 h-4" />
              </Link>
              {item.readTime && (
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />{item.readTime} de lecture
                </span>
              )}
            </div>
          </div>
          {/* Big icon */}
          <div className="hidden lg:flex items-center justify-center">
            <span className="select-none text-[9rem] opacity-20 hover:opacity-40 transition-opacity duration-500 leading-none">
              {item.icon}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Content Card ─────────────────────────────────────────────────────────────
function ContentCard({ item }: { item: ContentItem }) {
  const href = item.type === "fiche" ? `/fiches/${item.id}` : `/ressources/${item.id}`;
  const theme = themeMap.get(item.theme);
  const isFiche = item.type === "fiche";
  const fmt = item.format ? formatMap.get(item.format) : null;

  return (
    <Link href={href} className="block h-full group outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-2xl">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="bg-white rounded-2xl border border-slate-100 overflow-hidden h-full flex flex-col shadow-sm hover:shadow-xl hover:shadow-slate-900/8 transition-shadow duration-300"
      >
        {/* Thumbnail */}
        <div
          className={`relative h-32 overflow-hidden flex-shrink-0 bg-gradient-to-br ${theme?.gradient ?? "from-slate-400 to-slate-500"}`}
        >
          {/* Bg icon (large, faded) */}
          <span className="absolute inset-0 flex items-end justify-end pr-4 pb-1 text-7xl opacity-15 select-none leading-none translate-x-2 translate-y-2">
            {item.icon}
          </span>
          {/* Fg icon */}
          <span className="absolute bottom-3 left-4 text-3xl leading-none select-none drop-shadow-sm">
            {item.icon}
          </span>
          {/* Type / format badge */}
          <div className="absolute top-2.5 right-2.5">
            {isFiche ? (
              <span className="text-[9px] font-bold uppercase tracking-wider bg-white/90 text-emerald-700 px-2 py-0.5 rounded-full shadow-sm">
                Fiche
              </span>
            ) : fmt ? (
              <span className={`text-[9px] font-bold uppercase tracking-wider ${fmt.bg} ${fmt.text} px-2 py-0.5 rounded-full shadow-sm`}>
                {item.format}
              </span>
            ) : (
              <span className="text-[9px] font-bold uppercase tracking-wider bg-white/90 text-violet-700 px-2 py-0.5 rounded-full shadow-sm">
                Ressource
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-emerald-700 transition-colors duration-200">
            {item.title}
          </h3>

          {/* Description reveals on hover */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out">
            <div className="overflow-hidden">
              <p className="text-xs text-slate-500 leading-relaxed pb-2">{item.description}</p>
            </div>
          </div>

          <div className="flex-1" />

          {/* Meta row */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 mb-2.5">
            <span>
              {item.readTime
                ? <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5 inline" />{" "}{item.readTime}</span>
                : item.date ?? ""}
            </span>
            {item.source && (
              <span className="font-medium text-slate-500 truncate max-w-[90px] text-right">
                {item.source}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex gap-1 flex-wrap mb-3">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA link */}
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {isFiche ? "Lire la fiche" : "Voir la ressource"}
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// ─── Theme Row ────────────────────────────────────────────────────────────────
function ThemeRow({
  theme,
  items,
  onViewAll,
}: {
  theme: ThemeConfig;
  items: ContentItem[];
  onViewAll: () => void;
}) {
  return (
    <AnimatedSection>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${theme.bg} flex items-center justify-center shadow-sm flex-shrink-0`}>
            <theme.icon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-none">{theme.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {items.length} contenu{items.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-sm font-semibold text-slate-400 hover:text-emerald-600 transition-colors"
        >
          Voir tout <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </AnimatedSection>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-24"
    >
      <div className="text-6xl mb-4 select-none">\\ud83d\\udd0d</div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">Aucun contenu trouv\\u00e9</h3>
      <p className="text-slate-500 mb-8 max-w-sm mx-auto">
        Essayez de modifier vos crit\\u00e8res de recherche ou r\\u00e9initialisez les filtres.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
      >
        <X className="w-4 h-4" /> R\\u00e9initialiser
      </button>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FichesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("tout");
  const [themeFilter, setThemeFilter] = useState("");
  const [formatFilter, setFormatFilter] = useState<string>("");

  // Hydrate from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("type");
    if (t === "fiche" || t === "ressource") setTypeFilter(t);
    const th = params.get("theme");
    if (th) setThemeFilter(decodeURIComponent(th));
    const q = params.get("q");
    if (q) setSearch(decodeURIComponent(q));
    const f = params.get("format");
    if (f) setFormatFilter(decodeURIComponent(f));
  }, []);

  // Keep URL in sync (shareable links, back-button)
  useEffect(() => {
    const params = new URLSearchParams();
    if (typeFilter !== "tout") params.set("type", typeFilter);
    if (themeFilter) params.set("theme", themeFilter);
    if (search) params.set("q", search);
    if (formatFilter) params.set("format", formatFilter);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `/fiches?${qs}` : "/fiches");
  }, [typeFilter, themeFilter, search, formatFilter]);

  const isFiltered = !!(search || typeFilter !== "tout" || themeFilter || formatFilter);
  const featured = allContent.find((i) => i.featured) ?? allContent[0];

  const filtered = useMemo(() => {
    return allContent.filter((item) => {
      if (typeFilter !== "tout" && item.type !== typeFilter) return false;
      if (themeFilter && item.theme !== themeFilter) return false;
      if (formatFilter && item.format !== formatFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)) ||
          item.theme.toLowerCase().includes(q) ||
          (item.source ?? "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [typeFilter, themeFilter, formatFilter, search]);

  const ficheCount = filtered.filter((i) => i.type === "fiche").length;
  const ressourceCount = filtered.filter((i) => i.type === "ressource").length;

  const resetAll = () => {
    setSearch("");
    setTypeFilter("tout");
    setThemeFilter("");
    setFormatFilter("");
  };

  const handleTypeChange = (t: TypeFilter) => {
    setTypeFilter(t);
    if (t !== "ressource") setFormatFilter("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Featured spotlight (browse mode only) ─── */}
      <AnimatePresence>
        {!isFiltered && (
          <motion.div
            key="spotlight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FeaturedSpotlight item={featured} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sticky filter bar ───────────────────────────────────────────────── */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white/92 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-2.5">
          {/* Row 1 : search + type toggle */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher par titre, th\\u00e8me, mot-cl\\u00e9\\u2026"
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* Type toggle */}
            <div className="flex bg-slate-100 rounded-xl p-1 shrink-0 self-start sm:self-auto">
              {(
                [
                  { key: "tout" as const,      label: "Tout",       icon: BookOpen },
                  { key: "fiche" as const,     label: "Fiches",     icon: FileText },
                  { key: "ressource" as const, label: "Ressources", icon: Library },
                ] as const
              ).map((t) => (
                <button
                  key={t.key}
                  onClick={() => handleTypeChange(t.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    typeFilter === t.key
                      ? "bg-white text-emerald-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <t.icon className="w-3.5 h-3.5" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2 : format sub-pills + theme chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
            {/* Format pills – only visible for Ressources filter */}
            {typeFilter === "ressource" && (
              <>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                  Format
                </span>
                {formatList.map(({ key, icon: Icon, bg, text }) => {
                  const active = formatFilter === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setFormatFilter(active ? "" : key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 border ${
                        active
                          ? `${bg} ${text} border-transparent shadow-sm`
                          : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {key}
                    </button>
                  );
                })}
                <div className="w-px h-4 bg-slate-200 shrink-0 mx-0.5" />
              </>
            )}

            {/* "All themes" pill */}
            <button
              onClick={() => setThemeFilter("")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 border ${
                !themeFilter
                  ? "bg-emerald-600 text-white border-transparent shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-800"
              }`}
            >
              Toutes les th\\u00e9matiques
            </button>

            {/* Per-theme pills */}
            {themes.map((theme) => {
              const count = allContent.filter(
                (i) => i.theme === theme.name && (typeFilter === "tout" || i.type === typeFilter)
              ).length;
              const active = themeFilter === theme.name;
              return (
                <button
                  key={theme.name}
                  onClick={() => setThemeFilter(active ? "" : theme.name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 border ${
                    active
                      ? `${theme.bg} text-white border-transparent shadow-md`
                      : `bg-white ${theme.text} border-slate-200 hover:border-slate-300`
                  }`}
                >
                  <theme.icon className="w-3 h-3" />
                  {theme.name}
                  <span className={`text-[9px] ${active ? "text-white/70" : "text-slate-400"}`}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Active filter summary line */}
          {isFiltered && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-500 font-medium">
                {filtered.length} r\\u00e9sultat{filtered.length > 1 ? "s" : ""}
                {ficheCount > 0 && ressourceCount > 0 && (
                  <span className="text-slate-400 ml-1">
                    \\u00b7 {ficheCount} fiche{ficheCount > 1 ? "s" : ""},\\u00a0
                    {ressourceCount} ressource{ressourceCount > 1 ? "s" : ""}
                  </span>
                )}
              </span>
              <div className="flex-1" />
              {/* Active chips */}
              {typeFilter !== "tout" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-semibold">
                  {typeFilter === "fiche" ? "Fiches" : "Ressources"}
                  <button onClick={() => handleTypeChange("tout")} className="hover:text-emerald-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {themeFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full font-semibold">
                  {themeFilter}
                  <button onClick={() => setThemeFilter("")} className="hover:text-slate-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {formatFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full font-semibold">
                  {formatFilter}
                  <button onClick={() => setFormatFilter("")} className="hover:text-slate-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full font-semibold">
                  \\u201c{search}\\u201d
                  <button onClick={() => setSearch("")} className="hover:text-slate-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={resetAll}
                className="text-slate-400 hover:text-slate-600 font-semibold transition-colors ml-1"
              >
                Tout effacer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Content area ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          {/* ── Browse mode: Netflix thematic rows ─── */}
          {!isFiltered ? (
            <motion.div
              key="browse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-14"
            >
              {themes.map((theme) => {
                const items = allContent.filter((i) => i.theme === theme.name);
                if (!items.length) return null;
                return (
                  <ThemeRow
                    key={theme.name}
                    theme={theme}
                    items={items}
                    onViewAll={() => setThemeFilter(theme.name)}
                  />
                );
              })}
            </motion.div>

          ) : filtered.length === 0 ? (
            /* ── Empty state ─── */
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyState onReset={resetAll} />
            </motion.div>

          ) : (
            /* ── Filtered grid ─── */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filtered.map((item, i) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.04, duration: 0.25 } }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                    >
                      <ContentCard item={item} />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
'''

path = "/Users/solalgendrin/CascadeProjects/solutionstransitionsux/src/app/fiches/page.tsx"
with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print(f"OK — {len(content)} chars written to {path}")
