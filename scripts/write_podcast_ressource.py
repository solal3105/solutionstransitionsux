#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os

RESSOURCE_PODCAST = '''\
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft, ArrowRight, Share2, BookmarkPlus, Play, Pause,
  SkipBack, SkipForward, Radio, Mic, Clock, Tag, Volume2,
  VolumeX, ExternalLink,
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

export default function PodcastFichePage() {
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
'''

# Need AnimatePresence import
RESSOURCE_PODCAST = RESSOURCE_PODCAST.replace(
    'import { useState, useRef, useEffect } from "react";',
    'import { useState, useRef, useEffect } from "react";\nimport { AnimatePresence } from "framer-motion";'
)

out_dir = "/Users/solalgendrin/CascadeProjects/solutionstransitionsux/src/app/ressources/[slug]"
os.makedirs(out_dir, exist_ok=True)
path = os.path.join(out_dir, "page.tsx")
with open(path, "w", encoding="utf-8") as f:
    f.write(RESSOURCE_PODCAST)

bad = __import__('re').findall(r'\\u[0-9a-fA-F]{4}', RESSOURCE_PODCAST)
print(f"ressources/[slug]/page.tsx: {len(RESSOURCE_PODCAST)} chars, {RESSOURCE_PODCAST.count(chr(10))} lines")
print(f"Literal \\u: {len(bad)}" + (" → none ✓" if not bad else str(bad[:3])))
