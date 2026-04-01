#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os

PODCAST_PAGE = '''\
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Headphones, ArrowRight, Clock, ChevronDown, ChevronUp,
  Radio, Mic, Share2, Download, Maximize2,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   DATA
────────────────────────────────────────────────────────────── */
type Episode = {
  id: string;
  number: number;
  title: string;
  guest: string;
  guestRole: string;
  description: string;
  duration: string; // "mm:ss"
  durationSecs: number;
  date: string;
  tags: string[];
  color: string;
  gradient: string;
  emoji: string;
  audioUrl?: string;  // laisser vide = démo
  relatedHref?: string;
  relatedLabel?: string;
};

const episodes: Episode[] = [
  {
    id: "e08",
    number: 8,
    title: "100 premiers jours : comment embarquer vos agents dans la transition ?",
    guest: "Hélène Chartier",
    guestRole: "Directrice Urbanisme & Mobilité, C40 Cities",
    description: "Élue ou fonctionnaire, vous avez 100 jours pour poser les bases d'un mandat aligné avec les enjeux écologiques. Hélène Chartier partage les leviers concrets pour mobiliser les équipes techniques, convaincre les sceptiques et inscrire la transition dans la durée — bien au-delà des effets d'annonce.",
    duration: "48:22",
    durationSecs: 2902,
    date: "18 mars 2026",
    tags: ["Mandat", "Management", "Pilotage"],
    color: "#059669",
    gradient: "from-emerald-500 to-teal-600",
    emoji: "🏛️",
    relatedHref: "/fiches/vision-systemique",
    relatedLabel: "Fiche – Vision systémique",
  },
  {
    id: "e07",
    number: 7,
    title: "Réseaux Express Vélo : transformer la mobilité en 18 mois",
    guest: "Olivier Schneider",
    guestRole: "Président, Fédération française des usagers de la bicyclette",
    description: "Comment des villes moyennes ont réussi à déployer des axes cyclables structurants en moins de deux ans, avec peu de budget et beaucoup de méthode. Un épisode ancré dans le concret.",
    duration: "41:05",
    durationSecs: 2465,
    date: "3 mars 2026",
    tags: ["Mobilité", "Vélo", "Urbanisme"],
    color: "#0284c7",
    gradient: "from-sky-500 to-blue-600",
    emoji: "🚲",
    relatedHref: "/ressources/reseaux-express-velo",
    relatedLabel: "Étude – Réseaux Express Vélo",
  },
  {
    id: "e06",
    number: 6,
    title: "Agroécologie : les EPCI passent à l'action",
    guest: "Mathieu Courgeau",
    guestRole: "DGA Transition écologique, CA du Pays de la Loire",
    description: "Quand une intercommunalité décide de transformer ses politiques alimentaires de fond en comble : label bio, PAT, soutien aux agriculteurs engagés… Mathieu Courgeau raconte les coulisses d'une stratégie agroécologique à l'échelle intercommunale.",
    duration: "52:14",
    durationSecs: 3134,
    date: "17 févr. 2026",
    tags: ["Agriculture", "EPCI", "Alimentation"],
    color: "#65a30d",
    gradient: "from-lime-500 to-green-600",
    emoji: "🌾",
    relatedHref: "/fiches/agroecologie",
    relatedLabel: "Fiche – Agroécologie & alimentation durable",
  },
  {
    id: "e05",
    number: 5,
    title: "Petit budget, grand impact : financer la transition sans se ruiner",
    guest: "Lucile Schmid",
    guestRole: "Présidente, La Fabrique Écologique",
    description: "Les collectivités n'ont pas les moyens des métropoles mais ont tous les leviers pour agir. Lucile Schmid démonte le mythe du coût prohibitif de la transition et partage des exemples concrets de communes rurales qui ont réussi à décarboner avec trois bouts de ficelle... et beaucoup de méthode.",
    duration: "38:47",
    durationSecs: 2327,
    date: "2 févr. 2026",
    tags: ["Finances", "Budget", "Communes rurales"],
    color: "#7c3aed",
    gradient: "from-violet-500 to-purple-600",
    emoji: "💰",
    relatedHref: "/fiches/finances-transition",
    relatedLabel: "Fiche – Mettre les finances au service de la transition",
  },
  {
    id: "e04",
    number: 4,
    title: "Sobriété énergétique : embarquer les ménages précaires en premier",
    guest: "Anne Vandenbunder",
    guestRole: "Directrice, SLIME (Service Local d'Intervention pour la Maîtrise de l'Énergie)",
    description: "La précarité énergétique touche 12 millions de Français. Comment les collectivités peuvent-elles dépasser l'aide curative pour agir structurellement ? Anne Vandenbunder détaille le dispositif SLIME et les conditions de son succès dans des territoires très différents.",
    duration: "44:30",
    durationSecs: 2670,
    date: "20 janv. 2026",
    tags: ["Énergie", "Précarité", "Solidarité"],
    color: "#d97706",
    gradient: "from-amber-500 to-orange-600",
    emoji: "⚡",
    relatedHref: "/fiches/transition-energetique",
    relatedLabel: "Fiche – Transition énergétique juste",
  },
  {
    id: "e03",
    number: 3,
    title: "Biodiversité : quand la nature devient infrastructure",
    guest: "Xavier Bonnet",
    guestRole: "Directeur adjoint, Office français de la biodiversité",
    description: "Trames vertes et bleues, ZAN, solutions fondées sur la nature : les collectivités ont un rôle inédit à jouer pour inverser le déclin du vivant. Xavier Bonnet explicite les outils disponibles et les pièges à éviter lors de leur mise en œuvre locale.",
    duration: "46:58",
    durationSecs: 2818,
    date: "6 janv. 2026",
    tags: ["Biodiversité", "Nature", "Renaturation"],
    color: "#16a34a",
    gradient: "from-green-500 to-emerald-600",
    emoji: "🌿",
    relatedHref: "/ressources/solutions-fondees-nature",
    relatedLabel: "Étude – Solutions fondées sur la nature",
  },
  {
    id: "e02",
    number: 2,
    title: "Écolieux et habitat alternatif : le rôle clé des communes",
    guest: "Sophie Ricard",
    guestRole: "Architecte, fondatrice de Exyzt",
    description: "Les écolieux se multiplient, souvent en dépit du bon sens administratif. Comment les communes peuvent-elles devenir des partenaires actifs plutôt que des obstacles ? Sophie Ricard partage des retours d'expérience inspirants depuis ses projets en milieu rural.",
    duration: "35:22",
    durationSecs: 2122,
    date: "16 déc. 2025",
    tags: ["Habitat", "Écolieux", "Rural"],
    color: "#e11d48",
    gradient: "from-rose-500 to-pink-600",
    emoji: "🏡",
    relatedHref: "/fiches/ecolieux",
    relatedLabel: "Fiche – Soutenir les écolieux",
  },
  {
    id: "e01",
    number: 1,
    title: "La transition écologique après les élections : par où commencer ?",
    guest: "Celia Blauel",
    guestRole: "Ancienne adjointe à la Mairie de Paris, chargée de l'environnement",
    description: "Premier épisode de la Fabrique des Transitions. Celia Blauel revient sur ses premières semaines d'élue et partage un constat sans filtre : la transition ne s'improvise pas, elle se prépare. Un épisode fondateur pour comprendre la philosophie de ce podcast.",
    duration: "29:44",
    durationSecs: 1784,
    date: "1 déc. 2025",
    tags: ["Politique", "Mandat", "Stratégie"],
    color: "#0f766e",
    gradient: "from-teal-500 to-cyan-600",
    emoji: "🎙️",
    relatedHref: "/ressources/maire-pourquoi-faire",
    relatedLabel: "Guide – Maire, pourquoi faire ?",
  },
];

/* ──────────────────────────────────────────────────────────────
   UTILS
────────────────────────────────────────────────────────────── */
function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ──────────────────────────────────────────────────────────────
   WAVEFORM (animated bars)
────────────────────────────────────────────────────────────── */
function Waveform({ playing, color }: { playing: boolean; color: string }) {
  const bars = Array.from({ length: 36 });
  return (
    <div className="flex items-end gap-[2px] h-10">
      {bars.map((_, i) => {
        const baseH = 20 + Math.sin(i * 0.8) * 14 + Math.cos(i * 1.3) * 8;
        return (
          <motion.div
            key={i}
            className="w-[3px] rounded-full flex-shrink-0"
            style={{ background: color, opacity: playing ? 1 : 0.35 }}
            animate={
              playing
                ? {
                    height: [
                      `${baseH}%`,
                      `${Math.min(95, baseH + 30 + Math.random() * 20)}%`,
                      `${Math.max(15, baseH - 15)}%`,
                      `${baseH}%`,
                    ],
                  }
                : { height: `${baseH}%` }
            }
            transition={
              playing
                ? {
                    duration: 0.6 + (i % 4) * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 7) * 0.07,
                  }
                : { duration: 0.4 }
            }
          />
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PROGRESS BAR
────────────────────────────────────────────────────────────── */
function ProgressBar({
  current, total, color, onChange,
}: {
  current: number; total: number; color: string; onChange: (v: number) => void;
}) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  const barRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onChange(Math.max(0, Math.min(1, ratio)) * total);
  };

  return (
    <div
      ref={barRef}
      onClick={handleClick}
      className="relative h-1.5 bg-white/20 rounded-full cursor-pointer group"
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: color, width: `${pct}%` }}
        transition={{ duration: 0.1 }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ left: `calc(${pct}% - 7px)` }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   FEATURED PLAYER (grand player en haut)
────────────────────────────────────────────────────────────── */
function FeaturedPlayer({
  ep, playing, currentTime, onPlay, onSeek, onSkip,
}: {
  ep: Episode;
  playing: boolean;
  currentTime: number;
  onPlay: () => void;
  onSeek: (v: number) => void;
  onSkip: (dir: number) => void;
}) {
  return (
    <motion.div
      layout
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${ep.gradient} shadow-2xl`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: playing ? [0, 360] : 0 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-white/10"
        />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="relative z-10 p-7 sm:p-10">
        {/* Episode meta */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white/70 bg-white/15 px-3 py-1 rounded-full mb-3">
              <Radio className="w-3 h-3" /> Épisode {ep.number.toString().padStart(2, "0")}
            </span>
            <div className="text-4xl mb-2 select-none">{ep.emoji}</div>
          </div>
          <div className="flex items-center gap-1.5 text-white/60 text-[12px]">
            <Clock className="w-3.5 h-3.5" />
            {ep.duration}
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3 max-w-2xl">
          {ep.title}
        </h2>
        <p className="text-white/80 text-sm font-semibold mb-1">{ep.guest}</p>
        <p className="text-white/60 text-xs mb-8">{ep.guestRole}</p>

        {/* Waveform */}
        <div className="mb-6">
          <Waveform playing={playing} color="rgba(255,255,255,0.8)" />
        </div>

        {/* Progress */}
        <div className="mb-4">
          <ProgressBar
            current={currentTime}
            total={ep.durationSecs}
            color="white"
            onChange={onSeek}
          />
          <div className="flex justify-between text-[11px] text-white/60 mt-1.5">
            <span>{formatTime(currentTime)}</span>
            <span>{ep.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onSkip(-1)}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <SkipBack className="w-5 h-5 text-white" />
            </button>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={onPlay}
              className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
            >
              {playing ? (
                <Pause className="w-7 h-7" style={{ color: ep.color }} />
              ) : (
                <Play className="w-7 h-7 ml-0.5" style={{ color: ep.color }} />
              )}
            </motion.button>

            <button
              onClick={() => onSkip(1)}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <SkipForward className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {ep.relatedHref && (
              <Link
                href={ep.relatedHref}
                className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/80 hover:text-white bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                Fiche liée
              </Link>
            )}
            <button className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors">
              <Share2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   EPISODE ROW (liste)
────────────────────────────────────────────────────────────── */
function EpisodeRow({
  ep, active, playing, onSelect,
}: {
  ep: Episode;
  active: boolean;
  playing: boolean;
  onSelect: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        active
          ? "border-transparent shadow-lg"
          : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
      }`}
      style={active ? { background: `linear-gradient(135deg, ${ep.color}12, white 60%)`, borderColor: `${ep.color}40` } : {}}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Play button */}
        <button
          onClick={onSelect}
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={
            active
              ? { background: ep.color }
              : { background: "#f1f5f9" }
          }
        >
          {active && playing ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className={`w-5 h-5 ml-0.5 ${active ? "text-white" : "text-slate-500"}`} />
          )}
        </button>

        {/* Num + title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-bold text-slate-400">#{ep.number.toString().padStart(2, "0")}</span>
            {active && playing && (
              <span className="flex gap-0.5 items-end h-3">
                {[0,1,2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full"
                    style={{ background: ep.color }}
                    animate={{ height: ["30%", "100%", "30%"] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                  />
                ))}
              </span>
            )}
          </div>
          <p className={`text-sm font-bold leading-snug line-clamp-2 ${active ? "text-slate-900" : "text-slate-800"}`}>
            {ep.title}
          </p>
          <p className="text-[12px] text-slate-500 mt-0.5 line-clamp-1">{ep.guest} · {ep.date}</p>
        </div>

        {/* Right meta */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden sm:block text-[12px] text-slate-400 font-mono">{ep.duration}</span>
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
            className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-400"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable description */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 pb-5 pt-0">
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{ep.description}</p>
              <div className="flex flex-wrap items-center gap-2">
                {ep.tags.map((t) => (
                  <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {t}
                  </span>
                ))}
                {ep.relatedHref && (
                  <Link
                    href={ep.relatedHref}
                    className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-1 rounded-full transition-colors"
                    style={{ background: `${ep.color}18`, color: ep.color }}
                  >
                    <ArrowRight className="w-3 h-3" />
                    {ep.relatedLabel}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PAGE
────────────────────────────────────────────────────────────── */
export default function PodcastPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ep = episodes[activeIdx];

  /* Fake timer for demo player */
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (playing) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= ep.durationSecs) {
            setPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, ep.durationSecs]);

  const selectEpisode = useCallback(
    (idx: number) => {
      if (idx === activeIdx) {
        setPlaying((p) => !p);
      } else {
        setActiveIdx(idx);
        setCurrentTime(0);
        setPlaying(true);
      }
    },
    [activeIdx]
  );

  const handleSkip = (dir: number) => {
    const next = (activeIdx + dir + episodes.length) % episodes.length;
    setActiveIdx(next);
    setCurrentTime(0);
    setPlaying(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden pt-28 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="pg" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pg)" />
          </svg>
        </div>

        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-[20%] w-80 h-80 rounded-full bg-emerald-500/20 blur-[80px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-[10%] w-96 h-96 rounded-full bg-teal-500/15 blur-[100px] pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-semibold mb-6">
              <Mic className="w-4 h-4" />
              Le Podcast de la Fabrique des Transitions
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-4">
              Des voix pour <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">la transition</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
              Chaque semaine, des élus, agents territoriaux et experts partagent leurs expériences concrètes pour accélérer la transition écologique dans les territoires.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              {[
                { n: episodes.length.toString(), label: "épisodes" },
                { n: "8k+", label: "auditeurs" },
                { n: "4.9⭐", label: "note moyenne" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold text-white">{s.n}</p>
                  <p className="text-sm text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Featured player (sticky on desktop) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <FeaturedPlayer
                  ep={ep}
                  playing={playing}
                  currentTime={currentTime}
                  onPlay={() => setPlaying((p) => !p)}
                  onSeek={(v) => setCurrentTime(v)}
                  onSkip={handleSkip}
                />
              </motion.div>

              {/* Episode description card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={ep.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
                >
                  <p className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Headphones className="w-4 h-4" style={{ color: ep.color }} />
                    À propos de cet épisode
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{ep.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ep.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: `${ep.color}18`, color: ep.color }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {ep.relatedHref && (
                    <Link
                      href={ep.relatedHref}
                      className="flex items-center gap-2 p-3 rounded-xl border transition-colors group"
                      style={{ borderColor: `${ep.color}30`, background: `${ep.color}08` }}
                    >
                      <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" style={{ color: ep.color }} />
                      <span className="text-[13px] font-bold" style={{ color: ep.color }}>{ep.relatedLabel}</span>
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Episode list */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-slate-900">
                Tous les épisodes
                <span className="ml-2 text-sm font-normal text-slate-400">({episodes.length})</span>
              </h2>
              <Link
                href="/ressources/podcast-fabrique"
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                Voir la fiche <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {episodes.map((e, i) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <EpisodeRow
                    ep={e}
                    active={activeIdx === i}
                    playing={playing && activeIdx === i}
                    onSelect={() => selectEpisode(i)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Subscribe CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mt-10 rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950 p-8 text-center"
            >
              <div className="text-4xl mb-4 select-none">🎙️</div>
              <h3 className="text-xl font-extrabold text-white mb-2">Ne ratez aucun épisode</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
                Disponible sur toutes les plateformes d'écoute. Abonnez-vous pour recevoir chaque nouvel épisode dès sa sortie.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Spotify", "Apple Podcasts", "Deezer", "Podcast Addict"].map((p) => (
                  <button
                    key={p}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors border border-white/10"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
'''

# Write podcast page
podcast_dir = "/Users/solalgendrin/CascadeProjects/solutionstransitionsux/src/app/podcast"
os.makedirs(podcast_dir, exist_ok=True)
path = os.path.join(podcast_dir, "page.tsx")
with open(path, "w", encoding="utf-8") as f:
    f.write(PODCAST_PAGE)

bad = [m for m in __import__('re').findall(r'\\u[0-9a-fA-F]{4}', PODCAST_PAGE)]
print(f"podcast/page.tsx: {len(PODCAST_PAGE)} chars, {PODCAST_PAGE.count(chr(10))} lines")
print(f"Literal \\u sequences: {len(bad)}" + (f" → {bad[:3]}" if bad else " → none ✓"))
