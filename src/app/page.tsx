"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Users,
  Lightbulb,
  TrendingUp,
  Zap,
  MapPin,
  Target,
  ChevronRight,
  Play,
  Sparkles,
  FileText,
  Library,
  ArrowUpRight,
  Building2,
  Leaf,
  Globe,
  Heart,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CounterAnimation from "@/components/CounterAnimation";
import { useRef } from "react";

const fiches = [
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
];

const resources = [
  {
    title: "La transition écologique, créatrice d'emplois dans les territoires ruraux",
    type: "Rapport",
    source: "Réseau Action Climat",
    icon: "📄",
  },
  {
    title: "Municipales 2026 : Maire, pourquoi faire ?",
    type: "Guide",
    source: "Le Lierre",
    icon: "📘",
  },
  {
    title: "Réseaux Express Vélo : la solution pour la mobilité durable",
    type: "Étude",
    source: "FUB",
    icon: "🚲",
  },
  {
    title: "Moins de brun, plus de vert : redirection des dépenses locales",
    type: "Analyse",
    source: "I4CE",
    icon: "💰",
  },
];

const categories = [
  {
    name: "Comprendre",
    icon: Lightbulb,
    color: "from-sky-400 to-sky-600",
    shadowColor: "shadow-sky-500/25",
    bgColor: "bg-sky-50",
    textColor: "text-sky-700",
    description:
      "Saisir les fondamentaux, le cadre légal et les leviers disponibles pour le mandat 2026-2032.",
    count: 8,
  },
  {
    name: "Organiser",
    icon: Target,
    color: "from-amber-400 to-amber-600",
    shadowColor: "shadow-amber-500/25",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    description:
      "Élaborer un projet de mandat, identifier les priorités, piloter la transition dans son organisation.",
    count: 6,
  },
  {
    name: "Agir",
    icon: Zap,
    color: "from-rose-400 to-rose-600",
    shadowColor: "shadow-rose-500/25",
    bgColor: "bg-rose-50",
    textColor: "text-rose-700",
    description:
      "Déployer les politiques publiques, mobiliser les acteurs et les dispositifs pertinents.",
    count: 12,
  },
];

const partners = [
  "Le Lierre", "ADEME", "CLER", "ADCF", "ANPP", "Banque des Territoires",
  "I4CE", "Réseau Action Climat", "CEREMA", "FNAU", "La Fabrique des Transitions",
  "France Urbaine", "Intercommunalités de France", "APVF",
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
              className="text-xl sm:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12"
            >
              La boîte à outils des élus, agents et acteurs locaux pour la
              transition écologique et solidaire des territoires.
            </motion.p>

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

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: "Fiches pratiques", value: 26, icon: FileText, suffix: "+" },
              { label: "Ressources", value: 50, icon: Library, suffix: "+" },
              { label: "Partenaires", value: 20, icon: Building2, suffix: "+" },
              { label: "Thématiques", value: 15, icon: Globe, suffix: "" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-5 text-center card-hover"
              >
                <stat.icon className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-slate-900">
                  <CounterAnimation end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
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

      {/* ═══════════════════════════ 3 PILLARS ═══════════════════════════ */}
      <section className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Notre approche
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4">
              Trois piliers pour <span className="gradient-text">transformer</span> votre territoire
            </h2>
            <p className="text-xl text-slate-500 mt-6 max-w-2xl mx-auto">
              Un parcours structuré pour accompagner chaque étape de votre action locale.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.name} delay={i * 0.15}>
                <Link href={`/fiches?category=${cat.name.toLowerCase()}`}>
                  <div className="group relative bg-white rounded-3xl p-8 border border-slate-100 card-hover cursor-pointer overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity rounded-bl-full" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
                    
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg ${cat.shadowColor} mb-6 group-hover:scale-110 transition-transform`}>
                      <cat.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {cat.name}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-6">
                      {cat.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className={`${cat.bgColor} ${cat.textColor} px-3 py-1 rounded-full text-sm font-medium`}>
                        {cat.count} fiches
                      </span>
                      <span className="flex items-center gap-1 text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all">
                        Explorer <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ FICHES SHOWCASE ═══════════════════════════ */}
      <section className="relative py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                <FileText className="w-4 h-4" />
                Fiches pratiques
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4">
                Nos dernières <span className="gradient-text">fiches</span>
              </h2>
              <p className="text-xl text-slate-500 mt-4 max-w-xl">
                Des contenus actionnables pour passer de la réflexion à l&apos;action.
              </p>
            </div>
            <Link
              href="/fiches"
              className="group flex items-center gap-2 px-6 py-3 text-emerald-600 font-semibold border-2 border-emerald-200 rounded-xl hover:bg-emerald-50 transition-all shrink-0"
            >
              Voir toutes les fiches
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fiches.map((fiche, i) => (
              <AnimatedSection key={fiche.id} delay={i * 0.1}>
                <Link href={`/fiches/${fiche.id}`}>
                  <div className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover h-full">
                    <div className="h-3 bg-gradient-to-r from-emerald-400 via-teal-500 to-sky-500" />
                    <div className="p-7">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`${fiche.categoryColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                          {fiche.category}
                        </span>
                        <span className="text-xs text-slate-400">{fiche.readTime}</span>
                      </div>

                      <div className="text-3xl mb-4">{fiche.icon}</div>

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
                        Lire la fiche <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ IMPACT NUMBERS ═══════════════════════════ */}
      <section className="relative py-32 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold">
              L&apos;impact en <span className="text-emerald-300">chiffres</span>
            </h2>
            <p className="text-xl text-emerald-200/70 mt-6 max-w-2xl mx-auto">
              La transition écologique est une opportunité massive pour les territoires.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 500000, label: "emplois à créer d'ici 2030", suffix: "", prefix: "" },
              { value: 65, label: "des Français font confiance à leur maire", suffix: "%", prefix: "" },
              { value: 4, label: "millions de passoires énergétiques", suffix: "M", prefix: "" },
              { value: 126000, label: "emplois via la rénovation", suffix: "", prefix: "" },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-4xl sm:text-5xl font-extrabold text-emerald-300 mb-3">
                    <CounterAnimation
                      end={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>
                  <p className="text-emerald-100/80 text-sm">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ RESOURCES ═══════════════════════════ */}
      <section className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
                <Library className="w-4 h-4" />
                Ressources
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4">
                Des contenus <span className="gradient-text">fiables</span>, sélectionnés pour vous
              </h2>
            </div>
            <Link
              href="/ressources"
              className="group flex items-center gap-2 px-6 py-3 text-emerald-600 font-semibold border-2 border-emerald-200 rounded-xl hover:bg-emerald-50 transition-all shrink-0"
            >
              Toutes les ressources
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((res, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Link href="/ressources/transition-ecologique-emplois">
                  <div className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all hover:-translate-y-1 cursor-pointer h-full">
                    <div className="text-3xl mb-4">{res.icon}</div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
                      {res.type}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-3 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-xs text-slate-400">{res.source}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
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
                  <a
                    href="https://le-lierre.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl hover:shadow-2xl hover:shadow-black/20 transition-all hover:-translate-y-1 flex items-center gap-2"
                  >
                    <Users className="w-5 h-5" />
                    Rejoindre Le Lierre
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <Link
                    href="/contact"
                    className="px-8 py-4 text-white font-bold border-2 border-white/30 rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    Contribuer au projet
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
                className="flex-none mx-8 px-8 py-4 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
