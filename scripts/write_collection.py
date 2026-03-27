#!/usr/bin/env python3
# -*- coding: utf-8 -*-

tsx = '''\
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Clock, FileText, Library,
  Zap, Bike, Sprout, Banknote, Scale, Home, TreePine, LayoutGrid,
} from "lucide-react";

type ContentType = "fiche" | "ressource";
type FormatType = "Rapport" | "Guide" | "\u00c9tude" | "Podcast" | "Analyse";

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
};

const allContent: ContentItem[] = [
  {
    id: "transition-energetique",
    title: "Embarquer tous les m\u00e9nages dans une transition \u00e9nerg\u00e9tique juste",
    type: "fiche", theme: "\u00c9nergie",
    description: "Pourquoi et comment mobiliser les leviers \u00e0 la main des collectivit\u00e9s pour lutter contre la pr\u00e9carit\u00e9 \u00e9nerg\u00e9tique d\u2019une fa\u00e7on qui soit juste et solidaire pour tous les m\u00e9nages du territoire.",
    tags: ["\u00c9nergie", "Justice sociale", "R\u00e9novation"], readTime: "12 min", icon: "\u26a1",
  },
  {
    id: "vision-systemique",
    title: "Comment d\u00e9ployer une vision syst\u00e9mique dans un projet de politique publique\u00a0?",
    type: "fiche", theme: "Pilotage & m\u00e9thode",
    description: "Int\u00e9grer la pens\u00e9e syst\u00e9mique pour des politiques publiques plus coh\u00e9rentes, efficaces et durables dans le temps.",
    tags: ["Syst\u00e9mique", "M\u00e9thodologie", "Pilotage"], readTime: "10 min", icon: "\U0001f504",
  },
  {
    id: "agroecologie",
    title: "Leviers d\u2019un EPCI pour la transition agro\u00e9cologique et l\u2019alimentation durable",
    type: "fiche", theme: "Agriculture & alimentation",
    description: "Quels leviers pour agir en faveur de la transition agro\u00e9cologique \u00e0 l\u2019\u00e9chelle intercommunale et soutenir une alimentation durable pour tous.",
    tags: ["Agriculture", "Alimentation", "EPCI"], readTime: "15 min", icon: "\U0001f33e",
  },
  {
    id: "ecolieux",
    title: "Pourquoi et comment soutenir le d\u00e9veloppement d\u2019\u00e9colieux",
    type: "fiche", theme: "Habitat & urbanisme",
    description: "Les collectivit\u00e9s ont un r\u00f4le cl\u00e9 pour faciliter l\u2019\u00e9mergence et la p\u00e9rennit\u00e9 des \u00e9colieux, ces lieux de vie durables et innovants.",
    tags: ["Habitat", "Innovation", "Territoire"], readTime: "8 min", icon: "\U0001f3e1",
  },
  {
    id: "developpement-economique",
    title: "Prendre en compte les enjeux environnementaux dans le d\u00e9veloppement \u00e9conomique",
    type: "fiche", theme: "\u00c9conomie & finances",
    description: "Comment int\u00e9grer la dimension environnementale dans les politiques de d\u00e9veloppement \u00e9conomique local pour attirer des activit\u00e9s soutenables.",
    tags: ["\u00c9conomie", "Environnement", "Strat\u00e9gie"], readTime: "11 min", icon: "\U0001f4ca",
  },
  {
    id: "prestataire-prive",
    title: "Mobiliser efficacement un prestataire priv\u00e9 pour ses politiques de transition",
    type: "fiche", theme: "Pilotage & m\u00e9thode",
    description: "Les cl\u00e9s pour une collaboration r\u00e9ussie entre collectivit\u00e9s et prestataires priv\u00e9s autour des politiques de transition \u00e9cologique.",
    tags: ["March\u00e9s publics", "Partenariat", "Efficacit\u00e9"], readTime: "9 min", icon: "\U0001f91d",
  },
  {
    id: "cadre-legal",
    title: "Le cadre l\u00e9gal de la transition \u00e9cologique pour les collectivit\u00e9s",
    type: "fiche", theme: "Cadre l\u00e9gal",
    description: "Panorama des obligations et opportunit\u00e9s l\u00e9gales pour les collectivit\u00e9s territoriales en mati\u00e8re de transition \u00e9cologique.",
    tags: ["L\u00e9gislation", "Obligations", "Cadre juridique"], readTime: "14 min", icon: "\u2696\ufe0f",
  },
  {
    id: "finances-transition",
    title: "Mettre les finances au service de la transition \u00e9cologique",
    type: "fiche", theme: "\u00c9conomie & finances",
    description: "Comment r\u00e9orienter les budgets locaux pour acc\u00e9l\u00e9rer la transition sans grever les finances publiques ni augmenter la fiscalit\u00e9.",
    tags: ["Budget", "Finances", "Investissement"], readTime: "13 min", icon: "\U0001f4b0",
  },
  {
    id: "biodiversite-locale",
    title: "Prot\u00e9ger et restaurer la biodiversit\u00e9 \u00e0 l\u2019\u00e9chelle locale",
    type: "fiche", theme: "Biodiversit\u00e9 & nature",
    description: "Les outils et dispositifs pour une politique locale ambitieuse en faveur de la biodiversit\u00e9 et des \u00e9cosyst\u00e8mes naturels.",
    tags: ["Biodiversit\u00e9", "Nature", "Renaturation"], readTime: "10 min", icon: "\U0001f98b",
  },
  {
    id: "transition-ecologique-emplois",
    title: "La transition \u00e9cologique, cr\u00e9atrice d\u2019emplois dans les territoires ruraux",
    type: "ressource", theme: "\u00c9conomie & finances", format: "Rapport",
    description: "\u00c0 l\u2019horizon 2030, la transition \u00e9cologique pourrait cr\u00e9er pr\u00e8s de 500\u202f000 emplois suppl\u00e9mentaires en France, en particulier dans les territoires ruraux.",
    tags: ["Emploi", "Territoires ruraux", "Planification"], icon: "\U0001f4c4", source: "R\u00e9seau Action Climat", date: "Janv. 2026",
  },
  {
    id: "maire-pourquoi-faire",
    title: "Municipales 2026\u00a0: Maire, pourquoi faire\u00a0?",
    type: "ressource", theme: "Pilotage & m\u00e9thode", format: "Guide",
    description: "Un guide pour comprendre les enjeux du mandat municipal 2026\u20132032 et les leviers d\u2019action pour une transition \u00e9cologique r\u00e9ussie.",
    tags: ["Municipales", "Mandat", "\u00c9lections"], icon: "\U0001f4d8", source: "Le Lierre", date: "F\u00e9vr. 2026",
  },
  {
    id: "reseaux-express-velo",
    title: "R\u00e9seaux Express V\u00e9lo\u00a0: la solution imm\u00e9diate pour la mobilit\u00e9 durable",
    type: "ressource", theme: "Mobilit\u00e9", format: "\u00c9tude",
    description: "Comment les R\u00e9seaux Express V\u00e9lo peuvent am\u00e9liorer la sant\u00e9, le pouvoir d\u2019achat et la qualit\u00e9 de vie dans les territoires.",
    tags: ["Mobilit\u00e9", "V\u00e9lo", "Urbanisme"], icon: "\U0001f6b2", source: "FUB", date: "D\u00e9c. 2025",
  },
  {
    id: "depenses-locales-vertes",
    title: "Moins de brun, plus de vert\u00a0: la n\u00e9cessaire redirection des d\u00e9penses locales",
    type: "ressource", theme: "\u00c9conomie & finances", format: "Analyse",
    description: "Analyse de la n\u00e9cessit\u00e9 de r\u00e9orienter les d\u00e9penses locales vers des investissements verts pour att\u00e9nuer le changement climatique.",
    tags: ["Finances", "Budget vert", "Investissement"], icon: "\U0001f4b0", source: "I4CE", date: "Nov. 2025",
  },
  {
    id: "abecedaire-politiques",
    title: "L\u2019ab\u00e9c\u00e9daire des politiques publiques de transition",
    type: "ressource", theme: "Pilotage & m\u00e9thode", format: "Guide",
    description: "R\u00e9f\u00e9rence exhaustive des concepts, outils et dispositifs pour piloter des politiques de transition \u00e9cologique efficaces.",
    tags: ["Politique publique", "Guide", "R\u00e9f\u00e9rence"], icon: "\U0001f4da", source: "Solutions Transitions", date: "Oct. 2025",
  },
  {
    id: "podcast-fabrique",
    title: "Le Podcast de la Fabrique des Transitions",
    type: "ressource", theme: "Pilotage & m\u00e9thode", format: "Podcast",
    description: "Des \u00e9changes inspirants avec les acteurs de terrain qui font avancer la transition \u00e9cologique au quotidien.",
    tags: ["Podcast", "T\u00e9moignages", "Inspiration"], icon: "\U0001f399\ufe0f", source: "La Fabrique des Transitions", date: "Continu",
  },
  {
    id: "contrat-performance-energetique",
    title: "Guide m\u00e9thodologique\u00a0: Contrats de Performance \u00c9nerg\u00e9tique",
    type: "ressource", theme: "\u00c9nergie", format: "Guide",
    description: "M\u00e9thodologie compl\u00e8te pour la mise en place de contrats de performance \u00e9nerg\u00e9tique dans les collectivit\u00e9s territoriales.",
    tags: ["\u00c9nergie", "Contrat", "Performance"], icon: "\U0001f4cb", source: "CEREMA", date: "Sept. 2025",
  },
  {
    id: "renaturer-territoires",
    title: "Comment renaturer les territoires\u00a0?",
    type: "ressource", theme: "Biodiversit\u00e9 & nature", format: "Rapport",
    description: "M\u00e9thodes et retours d\u2019exp\u00e9rience pour la renaturation des espaces artificialis\u00e9s et la reconqu\u00eate du vivant.",
    tags: ["Renaturation", "ZAN", "Biodiversit\u00e9"], icon: "\U0001f33f", source: "CEREMA", date: "Ao\u00fbt 2025",
  },
  {
    id: "solutions-fondees-nature",
    title: "Place aux Solutions Fond\u00e9es sur la Nature",
    type: "ressource", theme: "Biodiversit\u00e9 & nature", format: "\u00c9tude",
    description: "Explorer les Solutions Fond\u00e9es sur la Nature comme levier d\u2019adaptation au changement climatique et de restauration des \u00e9cosyst\u00e8mes.",
    tags: ["Nature", "Adaptation", "Climat"], icon: "\U0001f333", source: "OFB", date: "Juil. 2025",
  },
];

const themes = [
  {
    name: "\u00c9nergie", icon: Zap, color: "#f59e0b", light: "#fef3c7", border: "#fde68a",
    description: "R\u00e9duire la d\u00e9pendance aux \u00e9nergies fossiles et embarquer tous les habitants dans une transition \u00e9nerg\u00e9tique juste et solidaire.",
    insight: "La r\u00e9novation \u00e9nerg\u00e9tique et le d\u00e9ploiement des EnR sont les deux leviers prioritaires pour les collectivit\u00e9s.",
  },
  {
    name: "Mobilit\u00e9", icon: Bike, color: "#0ea5e9", light: "#e0f2fe", border: "#bae6fd",
    description: "Repenser les d\u00e9placements pour r\u00e9duire les \u00e9missions, am\u00e9liorer la qualit\u00e9 de vie et d\u00e9senclaver les territoires.",
    insight: "Les transports repr\u00e9sentent 31\u00a0% des \u00e9missions de gaz \u00e0 effet de serre en France. Chaque territoire peut agir.",
  },
  {
    name: "Agriculture & alimentation", icon: Sprout, color: "#84cc16", light: "#f7fee7", border: "#d9f99d",
    description: "Soutenir des syst\u00e8mes alimentaires locaux, durables et r\u00e9silients au b\u00e9n\u00e9fice des habitants et des paysans.",
    insight: "L\u2019alimentation repr\u00e9sente pr\u00e8s de 25\u00a0% de l\u2019empreinte carbone des Fran\u00e7ais. Les territoires ont un r\u00f4le d\u00e9terminant.",
  },
  {
    name: "Biodiversit\u00e9 & nature", icon: TreePine, color: "#10b981", light: "#d1fae5", border: "#a7f3d0",
    description: "Prot\u00e9ger et restaurer le vivant pour des territoires plus r\u00e9silients, attractifs et en bonne sant\u00e9.",
    insight: "La France m\u00e9tropolitaine a perdu 30\u00a0% de ses esp\u00e8ces sauvages depuis 1990. Les collectivit\u00e9s peuvent inverser la tendance.",
  },
  {
    name: "\u00c9conomie & finances", icon: Banknote, color: "#8b5cf6", light: "#ede9fe", border: "#ddd6fe",
    description: "Mobiliser les finances locales et le tissu \u00e9conomique pour acc\u00e9l\u00e9rer la transition \u00e9cologique sans sacrifier le d\u00e9veloppement.",
    insight: "La transition \u00e9cologique est une opportunit\u00e9 \u00e9conomique : elle cr\u00e9e plus d\u2019emplois qu\u2019elle n\u2019en d\u00e9truit.",
  },
  {
    name: "Habitat & urbanisme", icon: Home, color: "#f43f5e", light: "#ffe4e6", border: "#fecdd3",
    description: "Construire et r\u00e9nover autrement pour des logements sobres, confortables et accessibles \u00e0 tous.",
    insight: "Les b\u00e2timents sont responsables de 44\u00a0% de la consommation \u00e9nerg\u00e9tique en France. R\u00e9nover, c\u2019est agir.",
  },
  {
    name: "Cadre l\u00e9gal", icon: Scale, color: "#64748b", light: "#f1f5f9", border: "#e2e8f0",
    description: "Ma\u00eeter les obligations et opportunit\u00e9s l\u00e9gales pour agir vite, bien et en conformit\u00e9 avec les r\u00e9glementations.",
    insight: "Les lois Climat et R\u00e9silience et ZAN cr\u00e9ent un cadre contraignant mais aussi de nombreuses opportunit\u00e9s d\u2019action.",
  },
  {
    name: "Pilotage & m\u00e9thode", icon: LayoutGrid, color: "#14b8a6", light: "#ccfbf1", border: "#99f6e4",
    description: "Structurer, prioriser et embarquer les parties prenantes pour une transition \u00e9cologique efficace et durable.",
    insight: "Les collectivit\u00e9s qui r\u00e9ussissent leur transition ont un point commun\u00a0: une strat\u00e9gie claire et un portage politique fort.",
  },
] as const;

type ThemeCfg = (typeof themes)[number];
const themeMap = new Map<string, ThemeCfg>(themes.map((t) => [t.name, t]));
const themeSlug = (name: string) => encodeURIComponent(name);

function FeaturedCard({ item, theme }: { item: ContentItem; theme: ThemeCfg }) {
  const href = item.type === "fiche" ? `/fiches/${item.id}` : `/ressources/${item.id}`;
  const isFiche = item.type === "fiche";
  return (
    <Link href={href} className="group block h-full">
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="h-full rounded-3xl overflow-hidden relative flex flex-col p-8 min-h-[340px]"
        style={{ background: `linear-gradient(135deg, ${theme.light} 0%, white 70%)`, border: `1.5px solid ${theme.border}` }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-8">
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={isFiche ? { background: "#d1fae5", color: "#065f46" } : { background: "#ede9fe", color: "#5b21b6" }}
          >
            {isFiche ? "Fiche pratique" : (item.format ?? "Ressource")}
          </span>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl select-none shadow-sm"
            style={{ background: "white", border: `2px solid ${theme.border}` }}
          >
            {item.icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-extrabold text-slate-900 leading-tight mb-4 group-hover:text-emerald-700 transition-colors duration-200">
            {item.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
          <div className="text-[12px] text-slate-500 flex items-center gap-2">
            {item.readTime && <><Clock className="w-3.5 h-3.5" />{item.readTime}</>}
            {item.source && <span className="font-semibold text-slate-700">{item.source}</span>}
            {item.date && !item.source && item.date}
          </div>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl text-white transition-all shadow-sm group-hover:shadow-md"
            style={{ background: theme.color }}
          >
            {isFiche ? "Lire la fiche" : "Acc\u00e9der"} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

function BentoCard({ item, theme, tall = false }: { item: ContentItem; theme: ThemeCfg; tall?: boolean }) {
  const href = item.type === "fiche" ? `/fiches/${item.id}` : `/ressources/${item.id}`;
  const isFiche = item.type === "fiche";
  return (
    <Link href={href} className="group block h-full">
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="h-full flex flex-col bg-white rounded-2xl overflow-hidden"
        style={{ borderTop: `3px solid ${theme.color}`, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" }}
      >
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl select-none flex-shrink-0"
              style={{ background: theme.light }}
            >
              {item.icon}
            </div>
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
              style={isFiche ? { background: "#d1fae5", color: "#065f46" } : { background: "#ede9fe", color: "#5b21b6" }}
            >
              {isFiche ? "Fiche" : (item.format ?? "Ressource")}
            </span>
          </div>
          <h3 className={`font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors mb-3 ${tall ? "text-[16px] line-clamp-3" : "text-[14px] line-clamp-2"}`}>
            {item.title}
          </h3>
          <p className={`text-[12px] text-slate-500 leading-relaxed ${tall ? "line-clamp-3" : "line-clamp-2"}`}>
            {item.description}
          </p>
          <div className="flex-1" />
          <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              {item.readTime ?? item.source ?? item.date ?? ""}
            </span>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {isFiche ? "Lire" : "Voir"} <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function WideCard({ item, theme }: { item: ContentItem; theme: ThemeCfg }) {
  const href = item.type === "fiche" ? `/fiches/${item.id}` : `/ressources/${item.id}`;
  const isFiche = item.type === "fiche";
  return (
    <Link href={href} className="group block h-full">
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="h-full flex items-center gap-6 bg-white rounded-2xl p-6"
        style={{ borderLeft: `4px solid ${theme.color}`, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl select-none flex-shrink-0"
          style={{ background: theme.light }}
        >
          {item.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={isFiche ? { background: "#d1fae5", color: "#065f46" } : { background: "#ede9fe", color: "#5b21b6" }}
            >
              {isFiche ? "Fiche pratique" : (item.format ?? "Ressource")}
            </span>
            {(item.readTime ?? item.source) && (
              <span className="text-[11px] text-slate-400">{item.readTime ?? item.source}</span>
            )}
          </div>
          <h3 className="font-bold text-slate-900 text-[15px] leading-snug line-clamp-1 group-hover:text-emerald-700 transition-colors">
            {item.title}
          </h3>
          <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-1 mt-1">
            {item.description}
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
      </motion.div>
    </Link>
  );
}

function Bento({ items, theme }: { items: ContentItem[]; theme: ThemeCfg }) {
  if (items.length === 0) return null;

  /* ---- 1 item ---- */
  if (items.length === 1) {
    return (
      <div className="h-[360px]">
        <FeaturedCard item={items[0]} theme={theme} />
      </div>
    );
  }

  /* ---- 2 items ---- */
  if (items.length === 2) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="h-[340px]"><FeaturedCard item={items[0]} theme={theme} /></div>
        <div className="h-[340px]"><FeaturedCard item={items[1]} theme={theme} /></div>
      </div>
    );
  }

  /* ---- 3 items ---- */
  if (items.length === 3) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 h-[360px]">
          <FeaturedCard item={items[0]} theme={theme} />
        </div>
        <div className="lg:col-span-5 grid grid-rows-2 gap-5">
          <BentoCard item={items[1]} theme={theme} tall />
          <BentoCard item={items[2]} theme={theme} tall />
        </div>
      </div>
    );
  }

  /* ---- 4 items ---- */
  if (items.length === 4) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 h-[360px]">
          <FeaturedCard item={items[0]} theme={theme} />
        </div>
        <div className="lg:col-span-5 grid grid-rows-2 gap-5">
          <BentoCard item={items[1]} theme={theme} tall />
          <BentoCard item={items[2]} theme={theme} tall />
        </div>
        <div className="lg:col-span-12">
          <WideCard item={items[3]} theme={theme} />
        </div>
      </div>
    );
  }

  /* ---- 5+ items ---- */
  const [feat, a, b, ...rest] = items;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div className="lg:col-span-7 h-[360px]">
        <FeaturedCard item={feat} theme={theme} />
      </div>
      <div className="lg:col-span-5 grid grid-rows-2 gap-5">
        <BentoCard item={a} theme={theme} tall />
        <BentoCard item={b} theme={theme} tall />
      </div>
      {rest.map((item) => (
        <div key={item.id} className="lg:col-span-12">
          <WideCard item={item} theme={theme} />
        </div>
      ))}
    </div>
  );
}

export default function CollectionPage() {
  const params = useParams();
  const themeName = decodeURIComponent(params.theme as string);
  const theme = themeMap.get(themeName);
  const items = allContent.filter((i) => i.theme === themeName);
  const nbFiches = items.filter((i) => i.type === "fiche").length;
  const nbRessources = items.filter((i) => i.type === "ressource").length;
  const otherThemes = themes.filter((t) => t.name !== themeName);

  if (!theme) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Th\u00e9matique non trouv\u00e9e</h1>
          <Link href="/fiches" className="text-emerald-600 font-semibold hover:text-emerald-700">
            Retour au hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── HERO ── */}
      <div
        className="relative overflow-hidden pt-28 pb-16"
        style={{ background: `linear-gradient(135deg, ${theme.light} 0%, white 60%)` }}
      >
        {/* Decorative circle */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: theme.color }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: theme.color }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/fiches"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au hub
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
              {/* Big icon */}
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg"
                style={{ background: "white", border: `2px solid ${theme.border}` }}
              >
                <theme.icon className="w-10 h-10" style={{ color: theme.color }} />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
                  {theme.name}
                </h1>
                <div className="flex items-center gap-3 mt-3">
                  {nbFiches > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-slate-700">
                      <FileText className="w-3.5 h-3.5 text-emerald-500" />
                      {nbFiches} fiche{nbFiches > 1 ? "s" : ""} pratique{nbFiches > 1 ? "s" : ""}
                    </span>
                  )}
                  {nbRessources > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-slate-700">
                      <Library className="w-3.5 h-3.5 text-violet-500" />
                      {nbRessources} ressource{nbRessources > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mb-8">
              {theme.description}
            </p>

            {/* Insight banner */}
            <div
              className="inline-flex items-start gap-3 px-5 py-4 rounded-2xl max-w-2xl"
              style={{ background: `${theme.light}`, border: `1px solid ${theme.border}` }}
            >
              <span className="text-xl select-none mt-0.5">💡</span>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                {theme.insight}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── BENTO GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <div
              className="w-1 h-8 rounded-full"
              style={{ background: theme.color }}
            />
            <h2 className="text-xl font-extrabold text-slate-900">
              Contenus de la collection
            </h2>
          </div>

          <Bento items={items} theme={theme} />
        </motion.div>
      </div>

      {/* ── AUTRES TH\u00c9MATIQUES ── */}
      <div className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-extrabold text-slate-900 mb-8">
              Continuer \u00e0 explorer
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
              {otherThemes.map((t) => {
                const count = allContent.filter((i) => i.theme === t.name).length;
                return (
                  <Link
                    key={t.name}
                    href={`/collections/${encodeURIComponent(t.name)}`}
                    className="group flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                    style={{ background: t.light, border: `1.5px solid ${t.border}` }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "white" }}
                    >
                      <t.icon className="w-5 h-5" style={{ color: t.color }} />
                    </div>
                    <span className="text-[12px] font-bold text-slate-800 text-center leading-tight">{t.name}</span>
                    <span className="text-[10px] text-slate-500">{count} contenu{count > 1 ? "s" : ""}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
'''

path = "/Users/solalgendrin/CascadeProjects/solutionstransitionsux/src/app/collections/[theme]/page.tsx"
with open(path, "w", encoding="utf-8") as f:
    f.write(tsx)

import re
bad = re.findall(r'\\u[0-9a-fA-F]{4}', tsx)
print(f"OK — {len(tsx)} chars, {tsx.count(chr(10))} lines")
if bad:
    print(f"WARNING: {len(bad)} literal \\u found: {bad[:3]}")
else:
    print("Clean unicode")
