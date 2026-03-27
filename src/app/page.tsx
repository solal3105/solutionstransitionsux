"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Users,
  ChevronRight,
  Play,
  Sparkles,
  FileText,
  Library,
  ArrowUpRight,
  Building2,
  Globe,
  Heart,
  Volume2,
  VolumeX,
  Search,
  X,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useRef, useState, useEffect } from "react";

const collections = [
  {
    slug: "100-premiers-jours",
    theme: "Pilotage & méthode",
    title: "Les 100 premiers jours du mandat",
    subtitle: "Le guide de survie du nouveau maire face à la transition écologique",
    emoji: "🏛️",
    gradient: "from-emerald-600 via-emerald-700 to-teal-800",
    lightBg: "bg-emerald-50",
    lightText: "text-emerald-700",
    contentCount: { fiches: 5, resources: 3 },
    preview: [
      "Déployer une vision systémique",
      "Maire, pourquoi faire ?",
      "Mobiliser un prestataire privé",
    ],
  },
  {
    slug: "sobriete-energetique",
    theme: "Énergie",
    title: "Sobriété énergétique : par où commencer ?",
    subtitle: "Rénover, isoler, accompagner les ménages",
    emoji: "⚡",
    gradient: "from-amber-500 to-orange-600",
    lightBg: "bg-amber-50",
    lightText: "text-amber-700",
    contentCount: { fiches: 4, resources: 2 },
    preview: [
      "Embarquer les ménages dans la transition énergétique",
      "4 millions de passoires : quels outils locaux ?",
    ],
  },
  {
    slug: "nourrir-territoire",
    theme: "Agriculture & alimentation",
    title: "Nourrir son territoire autrement",
    subtitle: "Agroécologie, circuits courts & alimentation durable",
    emoji: "🌾",
    gradient: "from-lime-500 to-green-600",
    lightBg: "bg-lime-50",
    lightText: "text-lime-700",
    contentCount: { fiches: 3, resources: 4 },
    preview: [
      "Leviers d\'un EPCI pour la transition agroécologique",
      "Projets Alimentaires Territoriaux : mode d\'emploi",
    ],
  },
  {
    slug: "mobilite-douce",
    theme: "Mobilité",
    title: "Sortir du tout-voiture",
    subtitle: "Vélo, transports collectifs & mobilité décarbonée",
    emoji: "🚲",
    gradient: "from-sky-500 to-blue-600",
    lightBg: "bg-sky-50",
    lightText: "text-sky-700",
    contentCount: { fiches: 3, resources: 3 },
    preview: [
      "Réseaux Express Vélo : la solution mobilité",
      "Transformer la mobilité en zone rurale",
    ],
  },
  {
    slug: "petit-budget-grand-impact",
    theme: "Économie & finances",
    title: "Petit budget, grand impact",
    subtitle: "Financer la transition sans exploser les comptes",
    emoji: "💰",
    gradient: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50",
    lightText: "text-violet-700",
    contentCount: { fiches: 4, resources: 2 },
    preview: [
      "Redirection des dépenses : moins de brun, plus de vert",
      "Les dispositifs Banque des Territoires",
    ],
  },
  {
    slug: "petites-communes",
    theme: "Habitat & urbanisme",
    title: "Moins de 10 000 habitants, et alors ?",
    subtitle: "Des leviers concrets pour les petites communes",
    emoji: "🏘️",
    gradient: "from-rose-500 to-pink-600",
    lightBg: "bg-rose-50",
    lightText: "text-rose-700",
    contentCount: { fiches: 3, resources: 3 },
    preview: [
      "Soutenir le développement d\'écolieux",
      "Développement économique & enjeux environnementaux",
    ],
  },
];

const partners = [
  { name: "La Fabrique des Transitions", src: "/images/partners/fabrique-transitions.png" },
  { name: "CNFPT", src: "/images/partners/cnfpt.png" },
  { name: "WWF France", src: "/images/partners/wwf.png" },
  { name: "ADGCF", src: "/images/partners/adgcf.png" },
  { name: "OFB", src: "/images/partners/ofb.png" },
  { name: "Réseau Cler", src: "/images/partners/cler.png" },
  { name: "I4CE", src: "/images/partners/i4ce.png" },
  { name: "FNH", src: "/images/partners/fnh.png" },
  { name: "Comité 21", src: "/images/partners/comite21.png" },
  { name: "AATF", src: "/images/partners/aatf.png" },
  { name: "France Villes Durables", src: "/images/partners/france-villes.png" },
  { name: "MACIF", src: "/images/partners/macif.png" },
  { name: "Territoires Audacieux", src: "/images/partners/logo9.png" },
];

const heroSearchSuggestions = [
  { icon: "⚡", label: "Précarité énergétique", q: "énergie" },
  { icon: "🌾", label: "Agroécologie", q: "agroécologie" },
  { icon: "🚲", label: "Mobilité douce", q: "mobilité" },
  { icon: "💰", label: "Financer la transition", q: "finances" },
  { icon: "🏛️", label: "100 premiers jours", q: "mandat" },
];

export default function Home() {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const handleHeroSearch = (q?: string) => {
    const query = (q ?? heroSearch).trim();
    if (!query) return;
    router.push(`/fiches?q=${encodeURIComponent(query)}`);
  };

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoInView = useInView(videoWrapperRef, { amount: 0.4 });

  useEffect(() => {
    if (!videoRef.current) return;
    if (videoInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [videoInView]);

  return (
    <div className="overflow-hidden">
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-[10%] w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-40 right-[15%] w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-[30%] w-80 h-80 bg-sky-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              Municipales 2026 : préparez la transition dès maintenant
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8"
            >
              Des clefs pour{" "}
              <span className="gradient-text">comprendre</span>,{" "}
              <br className="hidden sm:block" />
              des outils pour{" "}
              <span className="gradient-text">agir</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              La boîte à outils des élus, agents et acteurs locaux pour la
              transition écologique et solidaire des territoires.
            </motion.p>

            {/* ── HERO SEARCH BAR ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28 }}
              className="relative max-w-2xl mx-auto mb-10"
            >
              <div
                className={`flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-lg transition-all duration-200 ${
                  searchFocused
                    ? "shadow-emerald-200/60 ring-2 ring-emerald-400"
                    : "shadow-slate-200/80 ring-1 ring-slate-200"
                }`}
              >
                <Search className={`w-5 h-5 flex-none transition-colors ${searchFocused ? "text-emerald-500" : "text-slate-400"}`} />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                  onKeyDown={(e) => e.key === "Enter" && handleHeroSearch()}
                  placeholder="Rechercher une fiche, une ressource, un sujet…"
                  className="flex-1 text-base text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                />
                {heroSearch && (
                  <button onClick={() => setHeroSearch("")} className="flex-none text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleHeroSearch()}
                  className="flex-none px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  Rechercher <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Suggestions dropdown */}
              <AnimatePresence>
                {searchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 overflow-hidden z-20"
                  >
                    <p className="px-5 pt-3 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Suggestions rapides</p>
                    {heroSearchSuggestions
                      .filter((s) =>
                        heroSearch === "" ||
                        s.label.toLowerCase().includes(heroSearch.toLowerCase()) ||
                        s.q.toLowerCase().includes(heroSearch.toLowerCase())
                      )
                      .map((s) => (
                        <button
                          key={s.q}
                          onMouseDown={() => handleHeroSearch(s.q)}
                          className="w-full flex items-center gap-3 px-5 py-3 hover:bg-emerald-50 transition-colors group text-left"
                        >
                          <span className="text-lg">{s.icon}</span>
                          <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700 transition-colors">{s.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-500 ml-auto transition-colors" />
                        </button>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chips below */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {heroSearchSuggestions.map((s) => (
                  <button
                    key={s.q}
                    onClick={() => handleHeroSearch(s.q)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-sm text-slate-600 font-medium hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all shadow-sm"
                  >
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/fiches"
                className="group relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-1 flex items-center gap-2"
              >
                Explorer les fiches
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/projet"
                className="group px-8 py-4 text-lg font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-2xl hover:border-emerald-300 hover:bg-emerald-50 transition-all flex items-center gap-2"
              >
                <Play className="w-5 h-5 text-emerald-600" />
                Découvrir le projet
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-500"
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════ VIDEO SHOWCASE ═══════════════════════════ */}
      <section className="relative py-32 overflow-hidden bg-slate-950">
        {/* Background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/50" />
          <div className="absolute inset-0 opacity-[0.04]">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="video-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#video-dots)" />
            </svg>
          </div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 left-1/4 w-[700px] h-[700px] bg-emerald-500/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-32 right-1/4 w-[600px] h-[600px] bg-teal-500/15 rounded-full blur-[120px]"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-28 items-center">

            {/* ── Left : texte ── */}
            <AnimatedSection className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Le projet en vidéo
              </motion.div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] mb-6">
                La transition,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  concrètement
                </span>
              </h2>

              <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
                Solutions Transitions met à disposition des élus et agents locaux tous les
                outils pour engager, piloter et réussir la transition écologique dans leur
                territoire.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: "🎯", text: "Des fiches pratiques directement actionnables" },
                  { icon: "🤝", text: "Un réseau de plus de 20 partenaires engagés" },
                  { icon: "🔎", text: "Des ressources sélectionnées et fiables" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-xl shrink-0 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-300">
                      {item.icon}
                    </div>
                    <span className="text-slate-300 font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  href="/projet"
                  className="group px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Découvrir le projet
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/rejoindre"
                  className="px-7 py-3.5 text-white/80 border border-white/25 rounded-xl hover:bg-white/10 hover:text-white transition-all font-medium"
                >
                  Rejoindre
                </Link>
              </div>
            </AnimatedSection>

            {/* ── Right : vidéo ── */}
            <AnimatedSection delay={0.15} className="order-1 lg:order-2 flex justify-center">
              <div ref={videoWrapperRef} className="relative">

                {/* Glow halo derrière le téléphone */}
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-emerald-500/40 to-teal-400/20 blur-2xl scale-105 pointer-events-none" />

                {/* Badge flottant haut-gauche */}
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-4 sm:-left-16 top-14 z-20 bg-white rounded-2xl shadow-2xl shadow-slate-900/30 p-3 pr-5 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-900 leading-none">26+</div>
                    <div className="text-xs text-slate-500 mt-0.5">fiches pratiques</div>
                  </div>
                </motion.div>

                {/* Badge flottant bas-droite */}
                <motion.div
                  animate={{ y: [0, 14, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                  className="absolute -right-4 sm:-right-14 bottom-28 z-20 bg-white rounded-2xl shadow-2xl shadow-slate-900/30 p-3 pr-5 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-900 leading-none">20+</div>
                    <div className="text-xs text-slate-500 mt-0.5">partenaires</div>
                  </div>
                </motion.div>

                {/* Téléphone */}
                <div className="relative w-[250px] sm:w-[290px] rounded-[2.8rem] overflow-hidden ring-1 ring-white/20 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">

                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[72px] h-5 bg-slate-950 rounded-b-2xl z-20 flex items-end justify-center pb-1">
                    <div className="w-10 h-1 bg-slate-800 rounded-full" />
                  </div>

                  {/* Vidéo */}
                  <video
                    ref={videoRef}
                    src="https://solutionstransitions.fr/wp-content/uploads/2026/02/SolutionsTransition-1-1.mp4?_=1"
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full aspect-[9/16] object-cover block"
                  />

                  {/* Overlay bas avec toggle son */}
                  <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end pb-5 px-5 z-10">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/35 transition-all active:scale-95"
                      aria-label={isMuted ? "Activer le son" : "Couper le son"}
                    >
                      {isMuted
                        ? <VolumeX className="w-4 h-4" />
                        : <Volume2 className="w-4 h-4" />
                      }
                    </button>
                  </div>
                </div>

                {/* Ligne décorative sous le téléphone */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-36 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ THEMATIC HUB ═══════════════════════════ */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-slate-50/80 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Parcours thématiques
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4">
              Trouvez votre <span className="gradient-text">prochaine action</span>
            </h2>
            <p className="text-xl text-slate-500 mt-6 max-w-2xl mx-auto">
              Des parcours concrets qui mélangent fiches pratiques et ressources — choisissez votre sujet, on vous guide.
            </p>
          </AnimatedSection>

          {/* ── Bento Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-auto gap-4 lg:gap-5">

            {/* HERO CARD */}
            <AnimatedSection className="md:col-span-2 lg:col-span-7 lg:row-span-2">
              <Link href={`/collections/${collections[0].slug}`}>
                <div className={`group relative h-full min-h-[420px] rounded-[2rem] overflow-hidden bg-gradient-to-br ${collections[0].gradient} p-8 sm:p-10 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1`}>
                  <div className="absolute top-0 right-0 w-72 h-72 bg-white/[0.07] rounded-full blur-2xl -translate-y-1/3 translate-x-1/3" />
                  <div className="absolute bottom-0 left-0 w-52 h-52 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />

                  <div className="relative">
                    <div className="text-5xl sm:text-6xl mb-5">{collections[0].emoji}</div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
                      {collections[0].title}
                    </h3>
                    <p className="text-lg text-white/70 max-w-md leading-relaxed">
                      {collections[0].subtitle}
                    </p>
                  </div>

                  <div className="relative mt-8">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {collections[0].preview.map((item, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white/[0.12] backdrop-blur-sm text-white/90 text-xs font-medium rounded-lg border border-white/10">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full flex items-center gap-1.5">
                          <FileText className="w-3 h-3" /> {collections[0].contentCount.fiches} fiches
                        </span>
                        <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full flex items-center gap-1.5">
                          <Library className="w-3 h-3" /> {collections[0].contentCount.resources} ressources
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>

            {/* SIDE CARDS */}
            {collections.slice(1, 3).map((col, i) => (
              <AnimatedSection key={col.slug} delay={0.1 + i * 0.1} className="lg:col-span-5">
                <Link href={`/collections/${col.slug}`}>
                  <div className="group relative h-full rounded-[2rem] overflow-hidden bg-white border border-slate-100 p-7 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1">
                    <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${col.gradient} opacity-[0.06] group-hover:opacity-[0.12] rounded-bl-[3rem] transition-opacity`} />

                    <div className="flex items-start gap-4 mb-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${col.gradient} flex items-center justify-center text-2xl shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {col.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                          {col.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">{col.subtitle}</p>
                      </div>
                    </div>

                    <div className="space-y-2.5 mb-5">
                      {col.preview.map((item, j) => (
                        <div key={j} className="flex items-center gap-2.5 text-sm text-slate-600">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${col.gradient} shrink-0`} />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className={`${col.lightBg} ${col.lightText} px-2.5 py-1 rounded-full text-xs font-semibold`}>
                          {col.contentCount.fiches} fiches
                        </span>
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs font-semibold">
                          {col.contentCount.resources} ressources
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}

            {/* BOTTOM CARDS */}
            {collections.slice(3).map((col, i) => (
              <AnimatedSection key={col.slug} delay={0.2 + i * 0.08} className="lg:col-span-4">
                <Link href={`/collections/${col.slug}`}>
                  <div className="group relative h-full rounded-[2rem] overflow-hidden bg-white border border-slate-100 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1">
                    <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${col.gradient} opacity-[0.06] group-hover:opacity-[0.12] rounded-bl-[2rem] transition-opacity`} />

                    <div className="text-3xl mb-3">{col.emoji}</div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug mb-1.5 group-hover:text-emerald-700 transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">{col.subtitle}</p>

                    <div className="space-y-2 mb-4">
                      {col.preview.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-slate-500">
                          <div className={`w-1 h-1 rounded-full bg-gradient-to-br ${col.gradient} shrink-0`} />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`${col.lightBg} ${col.lightText} px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                          {col.contentCount.fiches} fiches
                        </span>
                        <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {col.contentCount.resources} ress.
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* See all */}
          <AnimatedSection delay={0.3} className="text-center mt-12">
            <Link
              href="/fiches"
              className="group inline-flex items-center gap-2 px-8 py-4 text-emerald-600 font-semibold border-2 border-emerald-200 rounded-2xl hover:bg-emerald-50 transition-all"
            >
              Voir toutes les fiches & ressources
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>


      {/* ═══════════════════════════ NETWORK CTA ═══════════════════════════ */}
      <section className="relative py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 rounded-[2.5rem] p-12 sm:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="circles" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#circles)" />
                </svg>
              </div>

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-8">
                  <Heart className="w-4 h-4" />
                  Rejoignez le mouvement
                </div>

                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                  Et si on avançait{" "}
                  <span className="text-emerald-200">ensemble</span> ?
                </h2>
                <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Porté par le réseau Le Lierre, Solutions Transitions réunit une coalition
                  inédite de plus de 20 partenaires. Rejoignez-nous pour faire avancer la
                  transition dans les territoires.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="group px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl hover:shadow-2xl hover:shadow-black/20 transition-all hover:-translate-y-1 flex items-center gap-2"
                  >
                    Contribuer au projet
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════ PARTNERS MARQUEE ═══════════════════════════ */}
      <section className="py-16 bg-white border-t border-slate-100">
        <AnimatedSection className="text-center mb-10">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Un projet soutenu par des acteurs engagés
          </p>
        </AnimatedSection>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex animate-marquee">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className="flex-none mx-8 flex items-center justify-center h-20 w-44 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={176}
                  height={80}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
