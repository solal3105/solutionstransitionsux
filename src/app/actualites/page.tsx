"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Users,
  Tag,
  Flame,
  Mic,
  Video,
  BookOpen,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const news = [
  {
    id: "1",
    date: "28 fév. 2026",
    category: "Publication",
    categoryColor: "bg-emerald-100 text-emerald-700",
    title: "Nouvelle fiche : Embarquer tous les ménages dans une transition énergétique juste",
    excerpt:
      "Découvrez comment les collectivités peuvent agir contre la précarité énergétique. Focus sur le programme Slime et des exemples inspirants.",
    href: "/fiches/transition-energetique",
    icon: "⚡",
    featured: true,
  },
  {
    id: "2",
    date: "20 fév. 2026",
    category: "Ressource",
    categoryColor: "bg-violet-100 text-violet-700",
    title: "Rapport : La transition écologique, créatrice d'emplois dans les territoires ruraux",
    excerpt:
      "Le Réseau Action Climat publie une étude majeure sur le potentiel de création d'emplois liés à la transition dans les zones rurales.",
    href: "/ressources/transition-ecologique-emplois",
    icon: "📄",
    featured: true,
  },
  {
    id: "3",
    date: "15 fév. 2026",
    category: "Réseau",
    categoryColor: "bg-pink-100 text-pink-700",
    title: "Le Lierre dépasse les 1500 membres : cap sur les municipales",
    excerpt:
      "Le réseau professionnel Le Lierre franchit un palier symbolique à quelques semaines des élections municipales.",
    href: "/rejoindre",
    icon: "🎉",
    featured: false,
  },
  {
    id: "4",
    date: "10 fév. 2026",
    category: "Publication",
    categoryColor: "bg-emerald-100 text-emerald-700",
    title: "Mise à jour : Leviers d'un EPCI pour la transition agroécologique",
    excerpt:
      "La fiche sur la transition agroécologique a été enrichie avec de nouveaux retours d'expérience et données chiffrées.",
    href: "/fiches/agroecologie",
    icon: "🌾",
    featured: false,
  },
  {
    id: "5",
    date: "5 fév. 2026",
    category: "Partenariat",
    categoryColor: "bg-sky-100 text-sky-700",
    title: "Nouveau partenaire : La Fabrique des Transitions rejoint la coalition",
    excerpt:
      "La Fabrique des Transitions s'associe au projet Solutions Transitions pour enrichir la bibliothèque de ressources.",
    href: "/projet",
    icon: "🤝",
    featured: false,
  },
  {
    id: "6",
    date: "1 fév. 2026",
    category: "Publication",
    categoryColor: "bg-emerald-100 text-emerald-700",
    title: "Nouvelle fiche : Protéger et restaurer la biodiversité à l'échelle locale",
    excerpt:
      "Outils et dispositifs pour une politique locale ambitieuse en faveur de la biodiversité.",
    href: "/fiches/biodiversite-locale",
    icon: "🦋",
    featured: false,
  },
];

const events = [
  {
    id: "e1",
    date: "12 mars",
    year: "2026",
    dayOfWeek: "Jeudi",
    time: "14h – 17h",
    title: "Table ronde : Préparer le mandat municipal 2026-2032",
    location: "Paris — Maison de la Conversation",
    type: "Présentiel",
    typeIcon: Mic,
    typeColor: "bg-amber-100 text-amber-700",
    description:
      "Échanges entre élus sortants et candidats sur les enjeux de la transition écologique pour le prochain mandat.",
    spots: "120 places",
    href: "#",
  },
  {
    id: "e2",
    date: "18 mars",
    year: "2026",
    dayOfWeek: "Mercredi",
    time: "10h – 12h",
    title: "Webinaire : Financer la transition sans augmenter les impôts",
    location: "En ligne — Zoom",
    type: "En ligne",
    typeIcon: Video,
    typeColor: "bg-sky-100 text-sky-700",
    description:
      "Présentation des mécanismes de financement innovants pour la transition écologique locale.",
    spots: "500 places",
    href: "#",
  },
  {
    id: "e3",
    date: "25 mars",
    year: "2026",
    dayOfWeek: "Mercredi",
    time: "9h – 18h",
    title: "Journée nationale Solutions Transitions",
    location: "Lyon — Hôtel de la Métropole",
    type: "Présentiel",
    typeIcon: Users,
    typeColor: "bg-emerald-100 text-emerald-700",
    description:
      "La grande journée annuelle du réseau : ateliers, conférences, networking et lancement de nouvelles fiches.",
    spots: "300 places",
    href: "#",
    highlight: true,
  },
  {
    id: "e4",
    date: "2 avril",
    year: "2026",
    dayOfWeek: "Jeudi",
    time: "14h – 16h",
    title: "Atelier : Déployer le programme Slime dans votre collectivité",
    location: "En ligne — Zoom",
    type: "En ligne",
    typeIcon: Video,
    typeColor: "bg-sky-100 text-sky-700",
    description:
      "Retour d'expérience et méthodologie pour mettre en place un programme de lutte contre la précarité énergétique.",
    spots: "200 places",
    href: "#",
  },
  {
    id: "e5",
    date: "15 avril",
    year: "2026",
    dayOfWeek: "Mercredi",
    time: "18h30 – 20h30",
    title: "Afterwork Le Lierre : Réseau et transition en Île-de-France",
    location: "Paris — La REcyclerie",
    type: "Présentiel",
    typeIcon: Mic,
    typeColor: "bg-amber-100 text-amber-700",
    description:
      "Un moment convivial pour échanger entre membres du réseau et découvrir les actions franciliennes.",
    spots: "80 places",
    href: "#",
  },
];

type TabType = "tout" | "news" | "agenda";

export default function ActualitesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("tout");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-900">
          <div className="absolute inset-0">
            <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-[20%] w-[400px] h-[400px] bg-teal-500/8 rounded-full blur-[100px]" />
          </div>
          <div className="absolute inset-0 opacity-[0.04]">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="actGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#actGrid)" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-medium mb-6 border border-emerald-500/20"
            >
              <Flame className="w-4 h-4" />
              Le fil de la transition
            </motion.div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6">
              Actualités <span className="text-emerald-400">&</span> Agenda
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Dernières publications, événements à venir et temps forts du réseau.
              Restez connecté à la transition.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="inline-flex items-center bg-white/[0.06] rounded-2xl p-1.5 border border-white/[0.08]">
              {[
                { key: "tout" as TabType, label: "Tout", icon: Sparkles },
                { key: "news" as TabType, label: "Actualités", icon: Newspaper },
                { key: "agenda" as TabType, label: "Agenda", icon: Calendar },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === tab.key
                      ? "bg-white text-slate-900 shadow-lg"
                      : "text-white/50 hover:text-white/80 hover:bg-white/[0.05]"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {/* ═══ News Feed ═══ */}
            {(activeTab === "tout" || activeTab === "news") && (
              <motion.div
                key="news"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "tout" && (
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Newspaper className="w-4 h-4 text-white" />
                      </div>
                      Dernières actualités
                    </h2>
                  </div>
                )}

                {/* Featured news */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {news
                    .filter((n) => n.featured)
                    .map((item, i) => (
                      <AnimatedSection key={item.id} delay={i * 0.1}>
                        <Link href={item.href}>
                          <div className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover h-full">
                            <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-sky-500" />
                            <div className="p-7">
                              <div className="flex items-center gap-3 mb-4">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.categoryColor}`}>
                                  {item.category}
                                </span>
                                <span className="text-xs text-slate-400">
                                  {item.date}
                                </span>
                              </div>
                              <div className="text-3xl mb-3">{item.icon}</div>
                              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors leading-snug">
                                {item.title}
                              </h3>
                              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                                {item.excerpt}
                              </p>
                              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 group-hover:gap-2.5 transition-all">
                                Lire la suite <ArrowRight className="w-4 h-4" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </AnimatedSection>
                    ))}
                </div>

                {/* News list */}
                <div className="space-y-4">
                  {news
                    .filter((n) => !n.featured)
                    .map((item, i) => (
                      <AnimatedSection key={item.id} delay={i * 0.05}>
                        <Link href={item.href}>
                          <div className="group flex items-start gap-5 bg-white rounded-2xl p-5 border border-slate-100 card-hover">
                            <div className="text-2xl flex-none mt-1">{item.icon}</div>
                            <div className="flex-grow min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${item.categoryColor}`}>
                                  {item.category}
                                </span>
                                <span className="text-xs text-slate-400">
                                  {item.date}
                                </span>
                              </div>
                              <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors leading-snug">
                                {item.title}
                              </h3>
                              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                                {item.excerpt}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300 flex-none mt-3 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                          </div>
                        </Link>
                      </AnimatedSection>
                    ))}
                </div>

                {activeTab === "tout" && <div className="h-16" />}
              </motion.div>
            )}

            {/* ═══ Agenda ═══ */}
            {(activeTab === "tout" || activeTab === "agenda") && (
              <motion.div
                key="agenda"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: activeTab === "tout" ? 0.1 : 0 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    Événements à venir
                  </h2>
                  <span className="text-sm text-slate-400">
                    {events.length} événements
                  </span>
                </div>

                <div className="space-y-5">
                  {events.map((event, i) => (
                    <AnimatedSection key={event.id} delay={i * 0.08}>
                      <div
                        className={`group relative bg-white rounded-3xl overflow-hidden border card-hover ${
                          event.highlight
                            ? "border-emerald-200 ring-2 ring-emerald-100"
                            : "border-slate-100"
                        }`}
                      >
                        {event.highlight && (
                          <div className="absolute top-4 right-4">
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold rounded-full shadow-lg shadow-emerald-500/20">
                              <Flame className="w-3 h-3" />
                              Temps fort
                            </span>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row">
                          {/* Date block */}
                          <div className={`flex-none w-full sm:w-32 p-6 flex sm:flex-col items-center sm:items-center justify-start sm:justify-center gap-3 sm:gap-1 ${
                            event.highlight
                              ? "bg-gradient-to-b from-emerald-50 to-white"
                              : "bg-slate-50"
                          }`}>
                            <div className={`text-3xl sm:text-4xl font-extrabold ${event.highlight ? "text-emerald-600" : "text-slate-800"}`}>
                              {event.date.split(" ")[0]}
                            </div>
                            <div className={`text-sm sm:text-xs font-semibold uppercase ${event.highlight ? "text-emerald-500" : "text-slate-400"}`}>
                              {event.date.split(" ")[1]}
                            </div>
                            <div className="text-[10px] text-slate-400 hidden sm:block">
                              {event.dayOfWeek}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-grow p-6">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${event.typeColor}`}>
                                <event.typeIcon className="w-3 h-3" />
                                {event.type}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-slate-400">
                                <Clock className="w-3 h-3" />
                                {event.time}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-slate-400">
                                <Users className="w-3 h-3" />
                                {event.spots}
                              </span>
                            </div>

                            <h3 className={`text-lg font-bold mb-2 leading-snug group-hover:text-emerald-700 transition-colors ${
                              event.highlight ? "text-emerald-900" : "text-slate-900"
                            }`}>
                              {event.title}
                            </h3>

                            <p className="text-sm text-slate-500 leading-relaxed mb-4">
                              {event.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                                <MapPin className="w-3.5 h-3.5" />
                                {event.location}
                              </span>
                              <button className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                event.highlight
                                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/25"
                                  : "bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-700"
                              }`}>
                                S&apos;inscrire
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 rounded-[2rem] p-10 sm:p-14 text-center overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-teal-500/10 rounded-full blur-[60px]" />
              </div>

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 mx-auto mb-6">
                  <Newspaper className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Ne manquez rien
                </h2>
                <p className="text-white/50 mb-8 max-w-md mx-auto">
                  Recevez les dernières publications et invitations aux événements.
                  1 email par mois maximum, désabonnement en un clic.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="votre@email.fr"
                    className="flex-grow px-5 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  />
                  <button className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all hover:-translate-y-0.5 text-sm whitespace-nowrap">
                    S&apos;abonner
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
