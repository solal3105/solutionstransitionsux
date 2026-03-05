"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Search,
  Compass,
  X,
  ArrowRight,
  Lightbulb,
  Zap,
  Heart,
  Newspaper,
  Calendar,
  Bot,
  Users,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  HelpCircle,
  Target,
} from "lucide-react";

const journeys = [
  {
    title: "Comprendre",
    subtitle: "Les fondamentaux de la transition",
    description: "Cadre légal, leviers d'action, enjeux territoriaux — tout ce qu'il faut savoir pour démarrer.",
    href: "/fiches?category=comprendre",
    icon: Lightbulb,
    color: "from-sky-400 to-blue-600",
    shadowColor: "shadow-sky-500/30",
    accent: "text-sky-400",
    count: "8 fiches",
  },
  {
    title: "Organiser",
    subtitle: "Structurer votre action",
    description: "Projet de mandat, pilotage, finances — méthodologie pour passer à l'échelle.",
    href: "/fiches?category=organiser",
    icon: Target,
    color: "from-amber-400 to-orange-600",
    shadowColor: "shadow-amber-500/30",
    accent: "text-amber-400",
    count: "6 fiches",
  },
  {
    title: "Agir",
    subtitle: "Déployer concrètement",
    description: "Politiques publiques, dispositifs, acteurs — les clés pour l'action terrain.",
    href: "/fiches?category=agir",
    icon: Zap,
    color: "from-rose-400 to-pink-600",
    shadowColor: "shadow-rose-500/30",
    accent: "text-rose-400",
    count: "12 fiches",
  },
  {
    title: "S'inspirer",
    subtitle: "Ressources & retours d'expérience",
    description: "Rapports, études, podcasts, guides — le meilleur de la veille sélectionné pour vous.",
    href: "/ressources",
    icon: Sparkles,
    color: "from-violet-400 to-purple-600",
    shadowColor: "shadow-violet-500/30",
    accent: "text-violet-400",
    count: "50+ ressources",
  },
  {
    title: "Actualités",
    subtitle: "Le fil de la transition",
    description: "Dernières publications, événements à venir, agenda des rencontres.",
    href: "/actualites",
    icon: Newspaper,
    color: "from-emerald-400 to-teal-600",
    shadowColor: "shadow-emerald-500/30",
    accent: "text-emerald-400",
    count: "Agenda & news",
  },
  {
    title: "S'engager",
    subtitle: "Rejoindre le mouvement",
    description: "Intégrez le réseau Le Lierre, contribuez aux contenus, participez aux événements.",
    href: "/rejoindre",
    icon: Heart,
    color: "from-pink-400 to-rose-600",
    shadowColor: "shadow-pink-500/30",
    accent: "text-pink-400",
    count: "1500+ membres",
  },
];

const quickLinks = [
  { label: "Le Projet", href: "/projet", icon: Compass },
  { label: "Assistant IA", href: "/assistant", icon: Bot },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
  { label: "Contact", href: "/contact", icon: MessageSquare },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredJourney, setHoveredJourney] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        setMenuOpen(false);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (menuOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  const close = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, []);

  return (
    <>
      {/* ═══ Minimal Top Bar ═══ */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled && !menuOpen
            ? "glass shadow-lg shadow-emerald-500/5"
            : menuOpen
            ? "bg-transparent"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group relative z-[60]" onClick={close}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all group-hover:scale-105">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className={`text-lg font-bold ${menuOpen ? "text-white" : "text-slate-900"} transition-colors`}>
                  Solutions
                </span>
                <span className={`text-lg font-bold ${menuOpen ? "text-emerald-300" : "gradient-text"}`}>
                  {" "}Transitions
                </span>
              </div>
            </Link>

            {/* Right Controls */}
            <div className="flex items-center gap-2 relative z-[60]">
              {/* Search trigger */}
              <button
                onClick={() => { setSearchOpen(true); setMenuOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  menuOpen
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Rechercher</span>
                <kbd className={`hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  menuOpen ? "bg-white/10 text-white/50" : "bg-slate-100 text-slate-400"
                }`}>
                  ⌘K
                </kbd>
              </button>

              {/* Explorer trigger */}
              <button
                onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  menuOpen
                    ? "bg-white text-emerald-700 shadow-lg"
                    : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                }`}
              >
                {menuOpen ? (
                  <>
                    <X className="w-4 h-4" />
                    Fermer
                  </>
                ) : (
                  <>
                    <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                    Explorer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ═══ Full-Screen Immersive Menu ═══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
          >
            {/* Animated background */}
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950"
            >
              <div className="absolute inset-0">
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px]" />
                <div className="absolute top-[50%] left-[50%] w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[80px]" />
              </div>
              <div className="absolute inset-0 opacity-[0.03]">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="navGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#navGrid)" />
                </svg>
              </div>
            </motion.div>

            {/* Content */}
            <div className="relative h-full overflow-y-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                {/* Section Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="mb-10"
                >
                  <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-2">
                    Votre parcours
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    Par où commencer ?
                  </h2>
                </motion.div>

                {/* Journey Cards Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14"
                >
                  {journeys.map((j, i) => (
                    <motion.div key={j.title} variants={itemVariants}>
                      <Link
                        href={j.href}
                        onClick={close}
                        onMouseEnter={() => setHoveredJourney(i)}
                        onMouseLeave={() => setHoveredJourney(null)}
                        className="group block relative"
                      >
                        <div className={`relative rounded-2xl p-6 border transition-all duration-300 overflow-hidden ${
                          hoveredJourney === i
                            ? "bg-white/[0.08] border-white/20 scale-[1.02]"
                            : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]"
                        }`}>
                          {/* Glow on hover */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${j.color} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 rounded-2xl`} />

                          <div className="relative">
                            <div className="flex items-start justify-between mb-4">
                              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${j.color} flex items-center justify-center shadow-lg ${j.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
                                <j.icon className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-[11px] font-semibold text-white/30 bg-white/5 px-2.5 py-1 rounded-full">
                                {j.count}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-0.5 group-hover:text-emerald-300 transition-colors">
                              {j.title}
                            </h3>
                            <p className={`text-xs font-medium ${j.accent} mb-2`}>
                              {j.subtitle}
                            </p>
                            <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                              {j.description}
                            </p>

                            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-white/30 group-hover:text-emerald-400 transition-all group-hover:gap-2.5">
                              Explorer
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Bottom Quick Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-white/[0.06]">
                    <div className="flex flex-wrap items-center gap-2">
                      {quickLinks.map((ql) => (
                        <Link
                          key={ql.label}
                          href={ql.href}
                          onClick={close}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
                        >
                          <ql.icon className="w-4 h-4" />
                          {ql.label}
                        </Link>
                      ))}
                    </div>

                    <a
                      href="https://le-lierre.fr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all hover:-translate-y-0.5 text-sm shrink-0"
                    >
                      <Users className="w-4 h-4" />
                      Rejoindre Le Lierre
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Command Palette / Search Overlay ═══ */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh]"
            onClick={close}
          >
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative w-full max-w-xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-200 overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
                  <Search className="w-5 h-5 text-slate-400 flex-none" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un sujet, une fiche, une ressource..."
                    className="flex-grow text-base text-slate-900 placeholder-slate-400 outline-none bg-transparent"
                  />
                  <kbd className="flex-none px-2 py-1 rounded-md bg-slate-100 text-[10px] font-mono text-slate-400">
                    ESC
                  </kbd>
                </div>

                {/* Quick Results */}
                <div className="p-3 max-h-[50vh] overflow-y-auto">
                  <p className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Accès rapide
                  </p>
                  {[
                    { label: "Transition énergétique juste", href: "/fiches/transition-energetique", tag: "Fiche", icon: "⚡" },
                    { label: "Transition écologique & emplois ruraux", href: "/ressources/transition-ecologique-emplois", tag: "Ressource", icon: "📄" },
                    { label: "Agroécologie et alimentation durable", href: "/fiches/agroecologie", tag: "Fiche", icon: "🌾" },
                    { label: "Agenda des événements", href: "/actualites", tag: "Actualités", icon: "📅" },
                    { label: "Rejoindre Le Lierre", href: "/rejoindre", tag: "Réseau", icon: "💚" },
                  ]
                    .filter(
                      (item) =>
                        searchQuery === "" ||
                        item.label.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={close}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-emerald-50 transition-colors group"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <div className="flex-grow min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate group-hover:text-emerald-700 transition-colors">
                            {item.label}
                          </p>
                        </div>
                        <span className="flex-none text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 flex-none group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
