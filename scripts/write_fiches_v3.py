#!/usr/bin/env python3
# -*- coding: utf-8 -*-

TSX = """\
"use client";

import {{ useState, useMemo, useEffect, Suspense }} from "react";
import {{ useSearchParams }} from "next/navigation";
import Link from "next/link";
import {{ motion, AnimatePresence }} from "framer-motion";
import {{
  Search, ArrowRight, X, FileText, Library, Bike, Sprout, Banknote, Scale,
  Home, Zap, TreePine, LayoutGrid, Clock, Headphones, BarChart3, BookOpen,
  ChevronRight,
}} from "lucide-react";
import React from "react";

type ContentType = "fiche" | "ressource";
type FormatType = "Rapport" | "Guide" | "\u00c9tude" | "Podcast" | "Analyse";
type TypeFilter = "tout" | ContentType;

type ContentItem = {{
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
}};

const allContent: ContentItem[] = [
  {{
    id: "transition-energetique",
    title: "Embarquer tous les m\u00e9nages dans une transition \u00e9nerg\u00e9tique juste",
    type: "fiche", theme: "\u00c9nergie",
    description: "Pourquoi et comment mobiliser les leviers \u00e0 la main des collectivit\u00e9s pour lutter contre la pr\u00e9carit\u00e9 \u00e9nerg\u00e9tique.",
    tags: ["\u00c9nergie", "Justice sociale", "R\u00e9novation"], readTime: "12 min", icon: "\u26a1",
  }},
  {{
    id: "vision-systemique",
    title: "Comment d\u00e9ployer une vision syst\u00e9mique dans un projet de politique publique\u00a0?",
    type: "fiche", theme: "Pilotage & m\u00e9thode",
    description: "Int\u00e9grer la pens\u00e9e syst\u00e9mique pour des politiques publiques plus coh\u00e9rentes et efficaces.",
    tags: ["Syst\u00e9mique", "M\u00e9thodologie", "Pilotage"], readTime: "10 min", icon: "\U0001f504",
  }},
  {{
    id: "agroecologie",
    title: "Leviers d\u2019un EPCI pour la transition agro\u00e9cologique et l\u2019alimentation durable",
    type: "fiche", theme: "Agriculture & alimentation",
    description: "Quels leviers pour agir en faveur de la transition agro\u00e9cologique \u00e0 l\u2019\u00e9chelle intercommunale.",
    tags: ["Agriculture", "Alimentation", "EPCI"], readTime: "15 min", icon: "\U0001f33e",
  }},
  {{
    id: "ecolieux",
    title: "Pourquoi et comment soutenir le d\u00e9veloppement d\u2019\u00e9colieux",
    type: "fiche", theme: "Habitat & urbanisme",
    description: "Les collectivit\u00e9s ont un r\u00f4le cl\u00e9 pour faciliter l\u2019\u00e9mergence et la p\u00e9rennit\u00e9 des \u00e9colieux.",
    tags: ["Habitat", "Innovation", "Territoire"], readTime: "8 min", icon: "\U0001f3e1",
  }},
  {{
    id: "developpement-economique",
    title: "Prendre en compte les enjeux environnementaux dans le d\u00e9veloppement \u00e9conomique",
    type: "fiche", theme: "\u00c9conomie & finances",
    description: "Comment int\u00e9grer la dimension environnementale dans les politiques de d\u00e9veloppement \u00e9conomique local.",
    tags: ["\u00c9conomie", "Environnement", "Strat\u00e9gie"], readTime: "11 min", icon: "\U0001f4ca",
  }},
  {{
    id: "prestataire-prive",
    title: "Mobiliser efficacement un prestataire priv\u00e9 pour ses politiques de transition",
    type: "fiche", theme: "Pilotage & m\u00e9thode",
    description: "Les cl\u00e9s pour une collaboration r\u00e9ussie entre collectivit\u00e9s et prestataires priv\u00e9s.",
    tags: ["March\u00e9s publics", "Partenariat", "Efficacit\u00e9"], readTime: "9 min", icon: "\U0001f91d",
  }},
  {{
    id: "cadre-legal",
    title: "Le cadre l\u00e9gal de la transition \u00e9cologique pour les collectivit\u00e9s",
    type: "fiche", theme: "Cadre l\u00e9gal",
    description: "Panorama des obligations et opportunit\u00e9s l\u00e9gales pour les collectivit\u00e9s en mati\u00e8re de transition.",
    tags: ["L\u00e9gislation", "Obligations", "Cadre juridique"], readTime: "14 min", icon: "\u2696\ufe0f",
  }},
  {{
    id: "finances-transition",
    title: "Mettre les finances au service de la transition \u00e9cologique",
    type: "fiche", theme: "\u00c9conomie & finances",
    description: "Comment r\u00e9orienter les budgets locaux pour acc\u00e9l\u00e9rer la transition sans grever les finances.",
    tags: ["Budget", "Finances", "Investissement"], readTime: "13 min", icon: "\U0001f4b0",
  }},
  {{
    id: "biodiversite-locale",
    title: "Prot\u00e9ger et restaurer la biodiversit\u00e9 \u00e0 l\u2019\u00e9chelle locale",
    type: "fiche", theme: "Biodiversit\u00e9 & nature",
    description: "Les outils et dispositifs pour une politique locale ambitieuse en faveur de la biodiversit\u00e9.",
    tags: ["Biodiversit\u00e9", "Nature", "Renaturation"], readTime: "10 min", icon: "\U0001f98b",
  }},
  {{
    id: "transition-ecologique-emplois",
    title: "La transition \u00e9cologique, cr\u00e9atrice d\u2019emplois dans les territoires ruraux",
    type: "ressource", theme: "\u00c9conomie & finances", format: "Rapport",
    description: "\u00c0 l\u2019horizon 2030, la transition \u00e9cologique pourrait cr\u00e9er pr\u00e8s de 500\u202f000 emplois suppl\u00e9mentaires en France.",
    tags: ["Emploi", "Territoires ruraux", "Planification"], icon: "\U0001f4c4", source: "R\u00e9seau Action Climat", date: "Janv. 2026",
  }},
  {{
    id: "maire-pourquoi-faire",
    title: "Municipales 2026\u00a0: Maire, pourquoi faire\u00a0?",
    type: "ressource", theme: "Pilotage & m\u00e9thode", format: "Guide",
    description: "Un guide pour comprendre les enjeux du mandat municipal 2026\u20132032 et les leviers d\u2019action pour la transition.",
    tags: ["Municipales", "Mandat", "\u00c9lections"], icon: "\U0001f4d8", source: "Le Lierre", date: "F\u00e9vr. 2026",
  }},
  {{
    id: "reseaux-express-velo",
    title: "R\u00e9seaux Express V\u00e9lo\u00a0: la solution imm\u00e9diate pour la mobilit\u00e9 durable",
    type: "ressource", theme: "Mobilit\u00e9", format: "\u00c9tude",
    description: "Comment les REV peuvent am\u00e9liorer la sant\u00e9, le pouvoir d\u2019achat et la qualit\u00e9 de vie.",
    tags: ["Mobilit\u00e9", "V\u00e9lo", "Urbanisme"], icon: "\U0001f6b2", source: "FUB", date: "D\u00e9c. 2025",
  }},
  {{
    id: "depenses-locales-vertes",
    title: "Moins de brun, plus de vert\u00a0: la n\u00e9cessaire redirection des d\u00e9penses locales",
    type: "ressource", theme: "\u00c9conomie & finances", format: "Analyse",
    description: "Analyse de la n\u00e9cessit\u00e9 de r\u00e9orienter les d\u00e9penses locales vers des investissements verts.",
    tags: ["Finances", "Budget vert", "Investissement"], icon: "\U0001f4b0", source: "I4CE", date: "Nov. 2025",
  }},
  {{
    id: "abecedaire-politiques",
    title: "L\u2019ab\u00e9c\u00e9daire des politiques publiques de transition",
    type: "ressource", theme: "Pilotage & m\u00e9thode", format: "Guide",
    description: "R\u00e9f\u00e9rence exhaustive des concepts, outils et dispositifs pour piloter des politiques de transition \u00e9cologique.",
    tags: ["Politique publique", "Guide", "R\u00e9f\u00e9rence"], icon: "\U0001f4da", source: "Solutions Transitions", date: "Oct. 2025",
  }},
  {{
    id: "podcast-fabrique",
    title: "Le Podcast de la Fabrique des Transitions",
    type: "ressource", theme: "Pilotage & m\u00e9thode", format: "Podcast",
    description: "Des \u00e9changes inspirants avec les acteurs de terrain qui font avancer la transition \u00e9cologique.",
    tags: ["Podcast", "T\u00e9moignages", "Inspiration"], icon: "\U0001f399\ufe0f", source: "La Fabrique des Transitions", date: "Continu",
  }},
  {{
    id: "contrat-performance-energetique",
    title: "Guide m\u00e9thodologique\u00a0: Contrats de Performance \u00c9nerg\u00e9tique",
    type: "ressource", theme: "\u00c9nergie", format: "Guide",
    description: "M\u00e9thodologie compl\u00e8te pour la mise en place de CPE dans les collectivit\u00e9s territoriales.",
    tags: ["\u00c9nergie", "Contrat", "Performance"], icon: "\U0001f4cb", source: "CEREMA", date: "Sept. 2025",
  }},
  {{
    id: "renaturer-territoires",
    title: "Comment renaturer les territoires\u00a0?",
    type: "ressource", theme: "Biodiversit\u00e9 & nature", format: "Rapport",
    description: "M\u00e9thodes et retours d\u2019exp\u00e9rience pour la renaturation des espaces artificialis\u00e9s.",
    tags: ["Renaturation", "ZAN", "Biodiversit\u00e9"], icon: "\U0001f33f", source: "CEREMA", date: "Ao\u00fbt 2025",
  }},
  {{
    id: "solutions-fondees-nature",
    title: "Place aux Solutions Fond\u00e9es sur la Nature",
    type: "ressource", theme: "Biodiversit\u00e9 & nature", format: "\u00c9tude",
    description: "Explorer les Solutions Fond\u00e9es sur la Nature comme levier d\u2019adaptation au changement climatique.",
    tags: ["Nature", "Adaptation", "Climat"], icon: "\U0001f333", source: "OFB", date: "Juil. 2025",
  }},
];

const themes = [
  {{ name: "\u00c9nergie",                 icon: Zap,        color: "#f59e0b", light: "#fef3c7", border: "#fde68a" }},
  {{ name: "Mobilit\u00e9",               icon: Bike,       color: "#0ea5e9", light: "#e0f2fe", border: "#bae6fd" }},
  {{ name: "Agriculture & alimentation", icon: Sprout,     color: "#84cc16", light: "#f7fee7", border: "#d9f99d" }},
  {{ name: "Biodiversit\u00e9 & nature",  icon: TreePine,   color: "#10b981", light: "#d1fae5", border: "#a7f3d0" }},
  {{ name: "\u00c9conomie & finances",    icon: Banknote,   color: "#8b5cf6", light: "#ede9fe", border: "#ddd6fe" }},
  {{ name: "Habitat & urbanisme",        icon: Home,       color: "#f43f5e", light: "#ffe4e6", border: "#fecdd3" }},
  {{ name: "Cadre l\u00e9gal",           icon: Scale,      color: "#64748b", light: "#f1f5f9", border: "#e2e8f0" }},
  {{ name: "Pilotage & m\u00e9thode",    icon: LayoutGrid, color: "#14b8a6", light: "#ccfbf1", border: "#99f6e4" }},
] as const;

type ThemeCfg = (typeof themes)[number];
const themeMap = new Map<string, ThemeCfg>(themes.map((t) => [t.name, t]));

function Card({{ item }}: {{ item: ContentItem }}) {{
  const href    = item.type === "fiche" ? `/fiches/${{item.id}}` : `/ressources/${{item.id}}`;
  const th      = themeMap.get(item.theme);
  const isFiche = item.type === "fiche";

  return (
    <Link href={{href}} className="group block h-full">
      <div
        className="h-full flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        style={{{{ borderTopColor: th?.color ?? "#e2e8f0", borderTopWidth: 3 }}}}
      >
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{isFiche
                ? {{ background: "#d1fae5", color: "#065f46" }}
                : {{ background: "#ede9fe", color: "#5b21b6" }}}}
            >
              {{isFiche ? "Fiche pratique" : (item.format ?? "Ressource")}}
            </span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              {{item.readTime
                ? <><Clock className="w-3 h-3" />{{item.readTime}}</>
                : item.date ?? ""}}
            </span>
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-3 select-none"
            style={{{{ background: th?.light ?? "#f1f5f9" }}}}
          >
            {{item.icon}}
          </div>
          <h3 className="font-bold text-slate-900 text-[15px] leading-snug line-clamp-3 group-hover:text-emerald-700 transition-colors duration-200">
            {{item.title}}
          </h3>
        </div>
        <div className="px-5 pb-3">
          <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">
            {{item.description}}
          </p>
        </div>
        <div className="flex-1" />
        <div className="px-5 pb-5 pt-3 border-t border-slate-50">
          {{item.source && (
            <p className="text-[11px] text-slate-400 mb-2.5">
              Source\u00a0: <span className="font-semibold text-slate-600">{{item.source}}</span>
            </p>
          )}}
          {{th && (
            <div className="flex items-center justify-between">
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{{{ background: th.light, color: th.color, border: `1px solid ${{th.border}}` }}}}
              >
                <th.icon className="w-3 h-3" />
                {{item.theme}}
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {{isFiche ? "Lire" : "Voir"}} <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          )}}
        </div>
      </div>
    </Link>
  );
}}

function ThemeSection({{ theme, items, onFilter }}: {{ theme: ThemeCfg; items: ContentItem[]; onFilter: () => void }}) {{
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{{{ background: theme.light, border: `1.5px solid ${{theme.border}}` }}}}
          >
            <theme.icon className="w-4 h-4" style={{{{ color: theme.color }}}} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">{{theme.name}}</h2>
            <p className="text-[11px] text-slate-400">{{items.length}} contenu{{items.length > 1 ? "s" : ""}}</p>
          </div>
        </div>
        <button
          onClick={{onFilter}}
          className="flex items-center gap-1 text-[13px] font-semibold text-slate-400 hover:text-emerald-600 transition-colors"
        >
          Voir tout <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {{items.map((item) => (
          <motion.div
            key={{item.id}}
            initial={{{{ opacity: 0, y: 12 }}}}
            whileInView={{{{ opacity: 1, y: 0 }}}}
            viewport={{{{ once: true, margin: "-40px" }}}}
            transition={{{{ duration: 0.3 }}}}
          >
            <Card item={{item}} />
          </motion.div>
        ))}}
      </div>
    </section>
  );
}}

function FichesHub() {{
  const searchParams = useSearchParams();

  const [search,       setSearch]       = useState(() => searchParams.get("q") ?? "");
  const [typeFilter,   setTypeFilter]   = useState<TypeFilter>(() => {{
    const t = searchParams.get("type");
    return t === "fiche" || t === "ressource" ? t : "tout";
  }});
  const [themeFilter,  setThemeFilter]  = useState(() => searchParams.get("theme") ?? "");
  const [formatFilter, setFormatFilter] = useState(() => searchParams.get("format") ?? "");

  useEffect(() => {{
    const t = searchParams.get("type");
    setTypeFilter(t === "fiche" || t === "ressource" ? t : "tout");
    setThemeFilter(searchParams.get("theme") ?? "");
    setSearch(searchParams.get("q") ?? "");
    setFormatFilter(searchParams.get("format") ?? "");
  }}, [searchParams]);

  const isFiltered = !!(search || typeFilter !== "tout" || themeFilter || formatFilter);

  const filtered = useMemo(() => {{
    return allContent.filter((item) => {{
      if (typeFilter !== "tout" && item.type !== typeFilter) return false;
      if (themeFilter && item.theme !== themeFilter) return false;
      if (formatFilter && item.format !== formatFilter) return false;
      if (search) {{
        const q = search.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)) ||
          item.theme.toLowerCase().includes(q) ||
          (item.source ?? "").toLowerCase().includes(q)
        );
      }}
      return true;
    }});
  }}, [typeFilter, themeFilter, formatFilter, search]);

  const ficheCount     = filtered.filter((i) => i.type === "fiche").length;
  const ressourceCount = filtered.filter((i) => i.type === "ressource").length;
  const nbFiches       = allContent.filter((i) => i.type === "fiche").length;
  const nbRessources   = allContent.filter((i) => i.type === "ressource").length;

  const resetAll   = () => {{ setSearch(""); setTypeFilter("tout"); setThemeFilter(""); setFormatFilter(""); }};
  const handleType = (t: TypeFilter) => {{ setTypeFilter(t); if (t !== "ressource") setFormatFilter(""); }};

  return (
    <div className="min-h-screen bg-slate-50">

      {{/* Hero */}}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-10">
          <motion.div initial={{{{ opacity: 0, y: 16 }}}} animate={{{{ opacity: 1, y: 0 }}}} transition={{{{ duration: 0.5 }}}}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                Hub de contenus
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 leading-tight">
              Fiches &amp; Ressources
            </h1>
            <p className="text-slate-500 text-base max-w-xl">
              {{nbFiches}} fiches pratiques et {{nbRessources}} ressources s\u00e9lectionn\u00e9es
              pour acc\u00e9l\u00e9rer la transition dans votre territoire.
            </p>
          </motion.div>
        </div>
      </div>

      {{/* Sticky filters */}}
      <div className="sticky top-[64px] lg:top-[80px] z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">

          {{/* Row 1: search + type */}}
          <div className="flex gap-3 mb-3">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={{search}}
                onChange={{(e) => setSearch(e.target.value)}}
                placeholder="Rechercher\u2026"
                className="w-full h-10 pl-10 pr-9 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 transition-all"
              />
              {{search && (
                <button onClick={{() => setSearch("")}} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}}
            </div>
            <div className="flex h-10 bg-slate-100 rounded-xl p-1 shrink-0">
              {{(["tout", "fiche", "ressource"] as const).map((t) => {{
                const icons: Record<typeof t, React.ElementType> = {{ tout: BookOpen, fiche: FileText, ressource: Library }};
                const labels: Record<typeof t, string> = {{ tout: "Tout", fiche: "Fiches", ressource: "Ressources" }};
                const Icon = icons[t];
                return (
                  <button
                    key={{t}}
                    onClick={{() => handleType(t)}}
                    className={{`flex items-center gap-1.5 px-3.5 rounded-lg text-sm font-semibold transition-all duration-150 ${{typeFilter === t ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}}`}}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {{labels[t]}}
                  </button>
                );
              }})}}
            </div>
          </div>

          {{/* Row 2: formats + themes */}}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {{typeFilter === "ressource" && (
              <>
                {{(["Rapport", "Guide", "\u00c9tude", "Podcast", "Analyse"] as const).map((f) => (
                  <button
                    key={{f}}
                    onClick={{() => setFormatFilter(formatFilter === f ? "" : f)}}
                    className={{`flex items-center h-7 px-3 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all border ${{formatFilter === f ? "bg-slate-800 text-white border-slate-800 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}}`}}
                  >
                    {{f}}
                  </button>
                ))}}
                <div className="w-px h-5 bg-slate-200 shrink-0 mx-1" />
              </>
            )}}
            <button
              onClick={{() => setThemeFilter("")}}
              className={{`h-7 px-3 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all border ${{!themeFilter ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"}}`}}
            >
              Toutes les th\u00e9matiques
            </button>
            {{themes.map((th) => {{
              const count  = allContent.filter((i) => i.theme === th.name && (typeFilter === "tout" || i.type === typeFilter)).length;
              const active = themeFilter === th.name;
              return (
                <button
                  key={{th.name}}
                  onClick={{() => setThemeFilter(active ? "" : th.name)}}
                  className={{`flex items-center gap-1.5 h-7 px-3 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all border ${{active ? "text-white border-transparent shadow-sm" : "bg-white border-slate-200 hover:border-slate-300"}}`}}
                  style={{active ? {{ background: th.color, borderColor: th.color }} : {{ color: th.color }}}}
                >
                  <th.icon className="w-3 h-3" />
                  {{th.name}}
                  <span style={{{{ opacity: 0.65 }}}}>{{count}}</span>
                </button>
              );
            }})}}
          </div>

          {{/* Active filters summary */}}
          <AnimatePresence>
            {{isFiltered && (
              <motion.div
                initial={{{{ height: 0, opacity: 0 }}}}
                animate={{{{ height: "auto", opacity: 1 }}}}
                exit={{{{ height: 0, opacity: 0 }}}}
                transition={{{{ duration: 0.2 }}}}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-2 flex-wrap pt-2.5">
                  <span className="text-xs text-slate-500">
                    <span className="font-bold text-slate-800">{{filtered.length}}</span> r\u00e9sultat{{filtered.length > 1 ? "s" : ""}}
                    {{ficheCount > 0 && ressourceCount > 0 && (
                      <span className="text-slate-400"> ({{ficheCount}} fiche{{ficheCount > 1 ? "s" : ""}}, {{ressourceCount}} ressource{{ressourceCount > 1 ? "s" : ""}})</span>
                    )}}
                  </span>
                  {{typeFilter !== "tout" && (
                    <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                      {{typeFilter === "fiche" ? "Fiches" : "Ressources"}}
                      <button onClick={{() => handleType("tout")}}><X className="w-3 h-3" /></button>
                    </span>
                  )}}
                  {{themeFilter && (
                    <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-full font-semibold">
                      {{themeFilter}}<button onClick={{() => setThemeFilter("")}}><X className="w-3 h-3" /></button>
                    </span>
                  )}}
                  {{formatFilter && (
                    <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-full font-semibold">
                      {{formatFilter}}<button onClick={{() => setFormatFilter("")}}><X className="w-3 h-3" /></button>
                    </span>
                  )}}
                  {{search && (
                    <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-full font-semibold">
                      \u201c{{search}}\u201d<button onClick={{() => setSearch("")}}><X className="w-3 h-3" /></button>
                    </span>
                  )}}
                  <button onClick={{resetAll}} className="text-xs text-slate-400 hover:text-slate-700 font-semibold underline underline-offset-2 transition-colors ml-1">
                    Tout effacer
                  </button>
                </div>
              </motion.div>
            )}}
          </AnimatePresence>
        </div>
      </div>

      {{/* Content */}}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          {{!isFiltered ? (
            <motion.div key="browse" initial={{{{ opacity: 0 }}}} animate={{{{ opacity: 1 }}}} exit={{{{ opacity: 0 }}}} transition={{{{ duration: 0.2 }}}} className="space-y-12">
              {{themes.map((th) => {{
                const items = allContent.filter((i) => i.theme === th.name);
                if (!items.length) return null;
                return <ThemeSection key={{th.name}} theme={{th}} items={{items}} onFilter={{() => setThemeFilter(th.name)}} />;
              }})}}
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div key="empty" initial={{{{ opacity: 0, y: 12 }}}} animate={{{{ opacity: 1, y: 0 }}}} exit={{{{ opacity: 0 }}}} transition={{{{ duration: 0.25 }}}} className="text-center py-28">
              <div className="text-5xl mb-4 select-none">\U0001f50d</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Aucun contenu trouv\u00e9</h3>
              <p className="text-slate-500 mb-7 max-w-sm mx-auto text-sm">Essayez de modifier vos crit\u00e8res ou r\u00e9initialisez les filtres.</p>
              <button onClick={{resetAll}} className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
                <X className="w-4 h-4" /> R\u00e9initialiser
              </button>
            </motion.div>
          ) : (
            <motion.div key={{`grid-${{typeFilter}}-${{themeFilter}}-${{formatFilter}}`}} initial={{{{ opacity: 0, y: 8 }}}} animate={{{{ opacity: 1, y: 0 }}}} exit={{{{ opacity: 0 }}}} transition={{{{ duration: 0.2 }}}}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {{filtered.map((item, i) => (
                  <motion.div
                    key={{item.id}}
                    initial={{{{ opacity: 0, y: 10 }}}}
                    animate={{{{ opacity: 1, y: 0 }}}}
                    transition={{{{ delay: Math.min(i * 0.04, 0.3), duration: 0.25 }}}}
                  >
                    <Card item={{item}} />
                  </motion.div>
                ))}}
              </div>
            </motion.div>
          )}}
        </AnimatePresence>
      </div>
    </div>
  );
}}

export default function FichesPage() {{
  return (
    <Suspense fallback={{<div className="min-h-screen bg-slate-50" />}}>
      <FichesHub />
    </Suspense>
  );
}}
"""

path = "/Users/solalgendrin/CascadeProjects/solutionstransitionsux/src/app/fiches/page.tsx"
with open(path, "w", encoding="utf-8") as f:
    f.write(TSX)

lines = TSX.count("\n")
print(f"OK — {len(TSX)} chars, {lines} lines written to {path}")

# Verify no literal backslash-u sequences remain in JSX (outside of data strings)
import re
bad = re.findall(r'\\\\u[0-9a-fA-F]{{4}}', TSX)
if bad:
    print(f"WARNING: found {len(bad)} literal \\u sequences: {bad[:5]}")
else:
    print("Clean: no literal \\u escape sequences")
