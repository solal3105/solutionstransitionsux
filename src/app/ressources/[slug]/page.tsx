"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Share2, BookmarkPlus, Play, Pause,
  SkipBack, SkipForward, Radio, Mic, Clock, Tag, ExternalLink,
  FileText, BookOpen, BarChart3, Download, Calendar, Building2,
} from "lucide-react";

/* ── mini data (shared with podcast page) ── */
const episodes = [
  {
    id: "e08", number: 8,
    title: "100 premiers jours : comment embarquer vos agents dans la transition ?",
    guest: "Hélène Chartier", role: "Directrice Urbanisme & Mobilité, C40 Cities",
    duration: "48:22", durationSecs: 2902, date: "18 mars 2026",
    tags: ["Mandat", "Management", "Pilotage"],
  },
  {
    id: "e07", number: 7,
    title: "Réseaux Express Vélo : transformer la mobilité en 18 mois",
    guest: "Olivier Schneider", role: "Président, Fédération française des usagers de la bicyclette",
    duration: "41:05", durationSecs: 2465, date: "3 mars 2026",
    tags: ["Mobilité", "Vélo", "Urbanisme"],
  },
  {
    id: "e06", number: 6,
    title: "Agroécologie : les EPCI passent à l'action",
    guest: "Mathieu Courgeau", role: "DGA Transition écologique, CA du Pays de la Loire",
    duration: "52:14", durationSecs: 3134, date: "17 févr. 2026",
    tags: ["Agriculture", "EPCI", "Alimentation"],
  },
  {
    id: "e05", number: 5,
    title: "Petit budget, grand impact : financer la transition sans se ruiner",
    guest: "Lucile Schmid", role: "Présidente, La Fabrique Écologique",
    duration: "38:47", durationSecs: 2327, date: "2 févr. 2026",
    tags: ["Finances", "Budget", "Communes rurales"],
  },
  {
    id: "e04", number: 4,
    title: "Sobriété énergétique : embarquer les ménages précaires en premier",
    guest: "Anne Vandenbunder", role: "Directrice, SLIME",
    duration: "44:30", durationSecs: 2670, date: "20 janv. 2026",
    tags: ["Énergie", "Précarité", "Solidarité"],
  },
];

function formatTime(s: number) {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

function Waveform({ playing }: { playing: boolean }) {
  const bars = Array.from({ length: 28 });
  return (
    <div className="flex items-end gap-[3px] h-8">
      {bars.map((_, i) => {
        const base = 25 + Math.sin(i * 0.8) * 18 + Math.cos(i * 1.4) * 9;
        return (
          <motion.div
            key={i}
            className="w-[4px] rounded-full bg-white/70 flex-shrink-0"
            animate={
              playing
                ? { height: [`${base}%`, `${Math.min(95, base + 35)}%`, `${Math.max(15, base - 20)}%`, `${base}%`] }
                : { height: `${base}%` }
            }
            transition={
              playing
                ? { duration: 0.7 + (i % 5) * 0.12, repeat: Infinity, ease: "easeInOut", delay: (i % 6) * 0.08 }
                : { duration: 0.3 }
            }
          />
        );
      })}
    </div>
  );
}

/* ── Format config ── */
const formatConfig: Record<
  string,
  { label: string; icon: React.ElementType; bg: string; text: string; border: string; accent: string }
> = {
  Rapport:  { label: "Rapport",  icon: FileText,  bg: "#fef3c7", text: "#92400e", border: "#fde68a", accent: "#f59e0b" },
  Guide:    { label: "Guide",    icon: BookOpen,  bg: "#dbeafe", text: "#1e40af", border: "#bfdbfe", accent: "#3b82f6" },
  Étude:    { label: "Étude",    icon: BarChart3, bg: "#d1fae5", text: "#065f46", border: "#a7f3d0", accent: "#10b981" },
  Analyse:  { label: "Analyse",  icon: BarChart3, bg: "#ede9fe", text: "#4c1d95", border: "#ddd6fe", accent: "#8b5cf6" },
};

type RessourceItem = {
  title: string;
  description: string;
  format: "Rapport" | "Guide" | "Étude" | "Analyse";
  theme: string;
  source: string;
  date: string;
  tags: string[];
  icon: string;
  url?: string;
  keyPoints?: string[];
};

const ressourceData: Record<string, RessourceItem> = {
  "transition-ecologique-emplois": {
    title: "La transition écologique, créatrice d'emplois dans les territoires ruraux",
    description: "À l'horizon 2030, la transition écologique pourrait créer près de 500 000 emplois supplémentaires en France. Ce rapport analyse les secteurs porteurs et les stratégies pour que les territoires ruraux captent ces opportunités.",
    format: "Rapport",
    theme: "Économie & finances",
    source: "Réseau Action Climat",
    date: "Janvier 2026",
    tags: ["Emploi", "Territoires ruraux", "Planification", "Économie verte"],
    icon: "📄",
    keyPoints: [
      "500 000 emplois à créer d'ici 2030 dans la transition écologique",
      "Les territoires ruraux au cœur des filières énergétiques renouvelables",
      "Des leviers concrets pour les collectivités : formation, attraction d'entreprises, PCAET",
      "Analyse sectorielle : bâtiment, agriculture, énergie, mobilité",
    ],
  },
  "maire-pourquoi-faire": {
    title: "Municipales 2026 : Maire, pourquoi faire ?",
    description: "Un guide complet pour comprendre les enjeux du mandat municipal 2026–2032 et les leviers d'action pour la transition écologique. À destination des candidats, élus en prise de fonction et équipes municipales.",
    format: "Guide",
    theme: "Pilotage & méthode",
    source: "Le Lierre",
    date: "Février 2026",
    tags: ["Municipales", "Mandat", "Élections", "Gouvernance locale"],
    icon: "📘",
    keyPoints: [
      "Panorama des compétences municipales et intercommunales",
      "Les 10 premières décisions à prendre en début de mandat",
      "Comment intégrer la transition dans le programme politique",
      "Retours d'expérience de maires de communes de toutes tailles",
    ],
  },
  "reseaux-express-velo": {
    title: "Réseaux Express Vélo : la solution immédiate pour la mobilité durable",
    description: "Comment les Réseaux Express Vélo (REV) peuvent améliorer la santé, le pouvoir d'achat et la qualité de vie des habitants. Étude comparative sur 12 agglomérations françaises ayant déployé un REV entre 2022 et 2025.",
    format: "Étude",
    theme: "Mobilité",
    source: "FUB – Fédération française des usagers de la bicyclette",
    date: "Décembre 2025",
    tags: ["Mobilité", "Vélo", "Urbanisme", "Santé publique"],
    icon: "🚲",
    keyPoints: [
      "Augmentation du report modal de +18% en moyenne sur les corridors REV",
      "Retour sur investissement positif en moins de 3 ans pour les villes pionnières",
      "Méthodologie de planification et de concertation éprouvée",
      "Impact positif sur le commerce de proximité et l'accessibilité",
    ],
  },
  "depenses-locales-vertes": {
    title: "Moins de brun, plus de vert : la nécessaire redirection des dépenses locales",
    description: "Analyse de la nécessité de réorienter les dépenses locales vers des investissements verts. L'I4CE décortique les budgets de 50 collectivités et formule des recommandations actionnables pour verdir la commande publique.",
    format: "Analyse",
    theme: "Économie & finances",
    source: "I4CE – Institute for Climate Economics",
    date: "Novembre 2025",
    tags: ["Finances", "Budget vert", "Investissement", "Commande publique"],
    icon: "💰",
    keyPoints: [
      "30% des dépenses locales encore orientées vers des actifs carbonés en 2025",
      "Outils d'évaluation du \"verdissement\" budgétaire accessibles aux collectivités",
      "Recommandations pour la passation de marchés publics durables",
      "Cartographie des fonds européens et nationaux mobilisables",
    ],
  },
  "abecedaire-politiques": {
    title: "L'abécédaire des politiques publiques de transition",
    description: "Référence exhaustive des concepts, outils et dispositifs pour piloter des politiques de transition écologique. De l'ACV au ZAN, en passant par le PCAET, le BEE ou la TEE — tous les termes clés expliqués et mis en contexte.",
    format: "Guide",
    theme: "Pilotage & méthode",
    source: "Solutions Transitions",
    date: "Octobre 2025",
    tags: ["Politique publique", "Guide", "Référence", "Glossaire"],
    icon: "📚",
    keyPoints: [
      "Plus de 120 termes et acronymes expliqués",
      "Liens entre concepts et mise en pratique pour les collectivités",
      "Mis à jour en continu avec les nouvelles réglementations",
      "Format navigable et téléchargeable",
    ],
  },
  "contrat-performance-energetique": {
    title: "Guide méthodologique : Contrats de Performance Énergétique",
    description: "Méthodologie complète pour la mise en place de Contrats de Performance Énergétique (CPE) dans les collectivités territoriales. Ce guide accompagne les élus et techniciens de la phase de diagnostic jusqu'à la signature du contrat.",
    format: "Guide",
    theme: "Énergie",
    source: "CEREMA",
    date: "Septembre 2025",
    tags: ["Énergie", "Contrat", "Performance", "Bâtiments publics"],
    icon: "📋",
    keyPoints: [
      "Cadre juridique et contractuel des CPE pour les collectivités",
      "Étapes clés : audit, cahier des charges, sélection du prestataire",
      "Indicateurs de suivi et mécanismes de garantie de performance",
      "Retours d'expérience de 8 collectivités pionnières",
    ],
  },
  "renaturer-territoires": {
    title: "Comment renaturer les territoires ?",
    description: "Méthodes et retours d'expérience pour la renaturation des espaces artificialisés. Le CEREMA documente les stratégies les plus efficaces pour atteindre l'objectif Zéro Artificialisation Nette (ZAN) tout en renforçant la biodiversité.",
    format: "Rapport",
    theme: "Biodiversité & nature",
    source: "CEREMA",
    date: "Août 2025",
    tags: ["Renaturation", "ZAN", "Biodiversité", "Espaces verts"],
    icon: "🌿",
    keyPoints: [
      "Panorama des techniques de renaturation adaptées aux contextes urbains et périurbains",
      "Analyse coûts-bénéfices de 15 projets de renaturation menés entre 2020 et 2025",
      "Outils de planification compatibles avec les PLUi et SCOT",
      "Financement : subventions nationales et fonds LIFE disponibles",
    ],
  },
  "solutions-fondees-nature": {
    title: "Place aux Solutions Fondées sur la Nature",
    description: "Explorer les Solutions Fondées sur la Nature (SfN) comme levier majeur d'adaptation au changement climatique dans les territoires. L'OFB recense les meilleures pratiques et fournit un cadre d'évaluation pour les collectivités.",
    format: "Étude",
    theme: "Biodiversité & nature",
    source: "OFB – Office Français de la Biodiversité",
    date: "Juillet 2025",
    tags: ["Nature", "Adaptation", "Climat", "Biodiversité"],
    icon: "🌳",
    keyPoints: [
      "Les SfN comme réponse simultanée au changement climatique et à l'érosion de la biodiversité",
      "Cadre d'évaluation de l'efficacité des SfN à l'échelle du territoire",
      "Études de cas : zones humides, forêts urbaines, corridors écologiques",
      "Intégration dans les documents de planification (PLU, SCOT, SRADDET)",
    ],
  },
};

/* ── Generic ressource page ── */
function RessourceDetailPage({ slug }: { slug: string }) {
  const data = ressourceData[slug];
  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Ressource introuvable</h1>
          <Link href="/fiches" className="text-emerald-600 hover:underline font-medium">
            ← Retour aux ressources
          </Link>
        </div>
      </div>
    );
  }

  const fmt = formatConfig[data.format];
  const Icon = fmt.icon;

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-[10%] w-80 h-80 rounded-full blur-[80px] pointer-events-none"
          style={{ background: fmt.accent + "44" }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/fiches" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-10">
              <ArrowLeft className="w-4 h-4" /> Retour aux ressources
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-full"
                style={{ background: fmt.bg + "33", color: fmt.bg, border: `1px solid ${fmt.bg}44` }}
              >
                <Icon className="w-3.5 h-3.5" /> {data.format}
              </span>
              <span className="text-slate-400 text-sm flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> {data.source}
              </span>
              <span className="text-slate-400 text-sm flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {data.date}
              </span>
            </div>

            <div className="text-5xl mb-5 select-none">{data.icon}</div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5 max-w-3xl">
              {data.title}
            </h1>
            <p className="text-slate-400 text-base leading-relaxed max-w-2xl mb-8">
              {data.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] font-semibold px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main: key points */}
            <div className="lg:col-span-2 space-y-8">
              {data.keyPoints && data.keyPoints.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm"
                >
                  <h2 className="text-lg font-extrabold text-slate-900 mb-5 flex items-center gap-2">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: fmt.bg }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: fmt.accent }} />
                    </span>
                    Points clés
                  </h2>
                  <ul className="space-y-3">
                    {data.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold"
                          style={{ background: fmt.bg, color: fmt.accent }}
                        >
                          {i + 1}
                        </span>
                        <p className="text-slate-700 text-[15px] leading-relaxed">{point}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* CTA card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl overflow-hidden shadow-md"
                style={{ background: `linear-gradient(135deg, ${fmt.accent}ee, ${fmt.accent}bb)` }}
              >
                <div className="p-6">
                  <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">{data.format}</p>
                  <h3 className="text-white font-extrabold text-base leading-snug mb-4">
                    Accéder à la ressource complète
                  </h3>
                  <a
                    href={data.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-white font-bold text-sm transition-transform hover:scale-105"
                    style={{ color: fmt.accent }}
                  >
                    <Download className="w-4 h-4" /> Télécharger / Consulter
                  </a>
                </div>
              </motion.div>

              {/* Meta card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4"
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Source</p>
                  <p className="text-sm font-semibold text-slate-800">{data.source}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Thématique</p>
                  <p className="text-sm font-semibold text-slate-800">{data.theme}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Publié</p>
                  <p className="text-sm font-semibold text-slate-800">{data.date}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Format</p>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: fmt.bg, color: fmt.text, border: `1px solid ${fmt.border}` }}
                  >
                    <Icon className="w-3 h-3" /> {data.format}
                  </span>
                </div>
              </motion.div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 font-medium text-sm rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                  <Share2 className="w-4 h-4" /> Partager
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 font-medium text-sm rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                  <BookmarkPlus className="w-4 h-4" /> Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Podcast page (unchanged) ── */
function PodcastPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ep = episodes[activeIdx];

  useEffect(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    if (playing) {
      tickRef.current = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= ep.durationSecs) { setPlaying(false); return 0; }
          return t + 1;
        });
      }, 1000);
    }
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [playing, ep.durationSecs]);

  const select = (i: number) => {
    if (i === activeIdx) { setPlaying((p) => !p); }
    else { setActiveIdx(i); setCurrentTime(0); setPlaying(true); }
  };

  const skip = (dir: number) => {
    const next = (activeIdx + dir + episodes.length) % episodes.length;
    setActiveIdx(next); setCurrentTime(0); setPlaying(true);
  };

  const pct = ep.durationSecs > 0 ? (currentTime / ep.durationSecs) * 100 : 0;

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO / PLAYER ── */}
      <section className="relative overflow-hidden pt-28 pb-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-violet-950" />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-[15%] w-96 h-96 rounded-full bg-violet-500/20 blur-[80px] pointer-events-none"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link
              href="/fiches"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" /> Retour aux ressources
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-violet-500/30 text-violet-300 text-sm font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5" /> Podcast
              </span>
              <span className="text-slate-400 text-sm flex items-center gap-1.5">
                <Radio className="w-4 h-4" /> La Fabrique des Transitions
              </span>
              <span className="text-slate-400 text-sm">En continu depuis déc. 2025</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              🎙️ Le Podcast de la Fabrique des Transitions
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl">
              Des échanges inspirants avec les acteurs de terrain qui font avancer la transition écologique au quotidien dans les territoires.
            </p>
          </motion.div>

          {/* ── PLAYER CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-t-3xl overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 shadow-2xl"
          >
            <div className="p-7 sm:p-10">
              {/* Episode selector tabs */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-7 scrollbar-hide">
                {episodes.map((e, i) => (
                  <button
                    key={e.id}
                    onClick={() => select(i)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[12px] font-bold transition-all ${
                      activeIdx === i
                        ? "bg-white text-purple-700 shadow"
                        : "bg-white/15 text-white/70 hover:bg-white/25"
                    }`}
                  >
                    #{e.number.toString().padStart(2, "0")}
                  </button>
                ))}
              </div>

              {/* Now playing info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={ep.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-8"
                >
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">
                    Épisode {ep.number} · {ep.date}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-2">
                    {ep.title}
                  </h2>
                  <p className="text-white/70 text-sm">{ep.guest} <span className="text-white/40">· {ep.role}</span></p>
                </motion.div>
              </AnimatePresence>

              {/* Waveform */}
              <div className="mb-5">
                <Waveform playing={playing} />
              </div>

              {/* Progress bar */}
              <div className="mb-5">
                <div
                  className="relative h-1.5 bg-white/20 rounded-full cursor-pointer group"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const ratio = (e.clientX - rect.left) / rect.width;
                    setCurrentTime(Math.max(0, Math.min(1, ratio)) * ep.durationSecs);
                  }}
                >
                  <div className="absolute inset-y-0 left-0 bg-white rounded-full transition-all" style={{ width: `${pct}%` }} />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `calc(${pct}% - 8px)` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-white/50 mt-1.5">
                  <span>{formatTime(currentTime)}</span>
                  <span>{ep.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => skip(-1)} className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors">
                    <SkipBack className="w-5 h-5 text-white" />
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setPlaying((p) => !p)}
                    className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
                  >
                    {playing
                      ? <Pause className="w-7 h-7 text-purple-700" />
                      : <Play className="w-7 h-7 ml-0.5 text-purple-700" />
                    }
                  </motion.button>
                  <button onClick={() => skip(1)} className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors">
                    <SkipForward className="w-5 h-5 text-white" />
                  </button>
                </div>
                <Link
                  href="/podcast"
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
                >
                  Tous les épisodes <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EPISODES LIST ── */}
      <section className="bg-slate-50 pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-extrabold text-slate-900 mb-6">
            Derniers épisodes
          </h2>
          <div className="space-y-3">
            {episodes.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => select(i)}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                  activeIdx === i
                    ? "border-violet-200 bg-violet-50 shadow-sm"
                    : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activeIdx === i ? "bg-violet-600" : "bg-slate-100"
                }`}>
                  {activeIdx === i && playing
                    ? <Pause className="w-4 h-4 text-white" />
                    : <Play className={`w-4 h-4 ml-0.5 ${activeIdx === i ? "text-white" : "text-slate-500"}`} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-slate-400 mb-0.5">#{e.number.toString().padStart(2, "0")} · {e.date}</p>
                  <p className="text-sm font-bold text-slate-900 line-clamp-1">{e.title}</p>
                  <p className="text-[12px] text-slate-500 line-clamp-1">{e.guest}</p>
                </div>
                <span className="text-[12px] text-slate-400 font-mono flex-shrink-0 hidden sm:block">{e.duration}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/podcast"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-colors shadow-md hover:shadow-lg"
            >
              <Mic className="w-4 h-4" /> Voir tous les épisodes
            </Link>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-slate-100">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
              <Share2 className="w-4 h-4" /> Partager
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
              <BookmarkPlus className="w-4 h-4" /> Sauvegarder
            </button>
            <a
              href="https://lafabriquedesstransitions.org/podcast"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Site de la Fabrique
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Router: default export ── */
export default function RessourceSlugPage() {
  const params = useParams();
  const slug = params?.slug as string;

  if (slug === "podcast-fabrique") {
    return <PodcastPage />;
  }
  return <RessourceDetailPage slug={slug} />;
}
