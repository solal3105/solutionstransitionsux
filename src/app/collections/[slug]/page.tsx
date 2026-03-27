"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Clock, FileText, Library,
  BookOpen, Headphones, BarChart3, FileBarChart,
} from "lucide-react";

type ContentType = "fiche" | "ressource";
type FormatType = "Rapport" | "Guide" | "Étude" | "Podcast" | "Analyse";

type CollectionItem = {
  id: string;
  title: string;
  type: ContentType;
  description: string;
  tags: string[];
  icon: string;
  readTime?: string;
  source?: string;
  date?: string;
  format?: FormatType;
};

type Collection = {
  slug: string;
  title: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  accentColor: string;
  accentLight: string;
  accentBorder: string;
  description: string;
  items: CollectionItem[];
};

const collections: Collection[] = [
  {
    slug: "100-premiers-jours",
    title: "Les 100 premiers jours du mandat",
    subtitle: "Le guide de survie du nouveau maire face à la transition écologique",
    emoji: "🏛️",
    gradient: "from-emerald-600 via-emerald-700 to-teal-800",
    accentColor: "#059669",
    accentLight: "#d1fae5",
    accentBorder: "#a7f3d0",
    description:
      "Prendre les rennes d’une collectivité et piloter la transition écologique en même temps : un défi de taille. Ces ressources vous aident à démarrer du bon pied, à embarquer vos équipes et à poser une stratégie lisible dès le premier mandat.",
    items: [
      {
        id: "vision-systemique",
        title: "Comment déployer une vision systémique dans un projet de politique publique ?",
        type: "fiche",
        description: "Intégrer la pensée systémique pour des politiques publiques plus cohérentes, efficaces et durables dans le temps.",
        tags: ["Systémique", "Méthodologie", "Pilotage"],
        readTime: "10 min", icon: "🔄",
      },
      {
        id: "prestataire-prive",
        title: "Mobiliser efficacement un prestataire privé pour ses politiques de transition",
        type: "fiche",
        description: "Les clés pour une collaboration réussie entre collectivités et prestataires privés autour des politiques de transition écologique.",
        tags: ["Marchés publics", "Partenariat", "Efficacité"],
        readTime: "9 min", icon: "🤝",
      },
      {
        id: "cadre-legal",
        title: "Le cadre légal de la transition écologique pour les collectivités",
        type: "fiche",
        description: "Panorama des obligations et opportunités légales pour les collectivités territoriales en matière de transition écologique.",
        tags: ["Législation", "Obligations", "Cadre juridique"],
        readTime: "14 min", icon: "⚖️",
      },
      {
        id: "finances-transition",
        title: "Mettre les finances au service de la transition écologique",
        type: "fiche",
        description: "Comment réorienter les budgets locaux pour accélérer la transition sans grever les finances publiques.",
        tags: ["Budget", "Finances", "Investissement"],
        readTime: "13 min", icon: "💰",
      },
      {
        id: "ecolieux",
        title: "Pourquoi et comment soutenir le développement d’écolieux",
        type: "fiche",
        description: "Les collectivités ont un rôle clé pour faciliter l’émergence et la pérennité des écolieux, ces lieux de vie durables et innovants.",
        tags: ["Habitat", "Innovation", "Territoire"],
        readTime: "8 min", icon: "🏡",
      },
      {
        id: "maire-pourquoi-faire",
        title: "Municipales 2026 : Maire, pourquoi faire ?",
        type: "ressource", format: "Guide", source: "Le Lierre", date: "Févr. 2026",
        description: "Un guide pour comprendre les enjeux du mandat municipal 2026–2032 et les leviers d’action pour une transition écologique réussie.",
        tags: ["Municipales", "Mandat", "Élections"],
        icon: "📘",
      },
      {
        id: "abecedaire-politiques",
        title: "L’abécédaire des politiques publiques de transition",
        type: "ressource", format: "Guide", source: "Solutions Transitions", date: "Oct. 2025",
        description: "Référence exhaustive des concepts, outils et dispositifs pour piloter des politiques de transition écologique efficaces.",
        tags: ["Politique publique", "Guide", "Référence"],
        icon: "📚",
      },
      {
        id: "podcast-fabrique",
        title: "Le Podcast de la Fabrique des Transitions",
        type: "ressource", format: "Podcast", source: "La Fabrique des Transitions", date: "Continu",
        description: "Des échanges inspirants avec les acteurs de terrain qui font avancer la transition écologique au quotidien.",
        tags: ["Podcast", "Témoignages", "Inspiration"],
        icon: "🎙️",
      },
    ],
  },
  {
    slug: "sobriete-energetique",
    title: "Sobriété énergétique : par où commencer ?",
    subtitle: "Rénover, isoler, accompagner les ménages",
    emoji: "⚡",
    gradient: "from-amber-500 to-orange-600",
    accentColor: "#d97706",
    accentLight: "#fef3c7",
    accentBorder: "#fde68a",
    description:
      "La rénovation énergétique et la lutte contre la précarité sont au cœur des compétences des collectivités. Ce parcours vous guide de la stratégie à l’opérationnel pour embarquer tous les habitants dans une transition énergétique juste et efficace.",
    items: [
      {
        id: "transition-energetique",
        title: "Embarquer tous les ménages dans une transition énergétique juste",
        type: "fiche",
        description: "Pourquoi et comment mobiliser les leviers à la main des collectivités pour lutter contre la précarité énergétique de façon juste et solidaire.",
        tags: ["Énergie", "Justice sociale", "Rénovation"],
        readTime: "12 min", icon: "⚡",
      },
      {
        id: "finances-transition",
        title: "Mettre les finances au service de la transition écologique",
        type: "fiche",
        description: "Comment réorienter les budgets locaux pour accélérer la transition sans grever les finances publiques ni augmenter la fiscalité.",
        tags: ["Budget", "Finances", "Investissement"],
        readTime: "13 min", icon: "💰",
      },
      {
        id: "developpement-economique",
        title: "Prendre en compte les enjeux environnementaux dans le développement économique",
        type: "fiche",
        description: "Comment intégrer la dimension environnementale dans les politiques de développement économique local.",
        tags: ["Économie", "Environnement", "Stratégie"],
        readTime: "11 min", icon: "📊",
      },
      {
        id: "cadre-legal",
        title: "Le cadre légal de la transition écologique pour les collectivités",
        type: "fiche",
        description: "Panorama des obligations et opportunités légales pour les collectivités en matière de transition énergétique.",
        tags: ["Législation", "Obligations", "Cadre juridique"],
        readTime: "14 min", icon: "⚖️",
      },
      {
        id: "contrat-performance-energetique",
        title: "Guide méthodologique : Contrats de Performance Énergétique",
        type: "ressource", format: "Guide", source: "CEREMA", date: "Sept. 2025",
        description: "Méthodologie complète pour la mise en place de contrats de performance énergétique dans les collectivités territoriales.",
        tags: ["Énergie", "Contrat", "Performance"],
        icon: "📋",
      },
      {
        id: "depenses-locales-vertes",
        title: "Moins de brun, plus de vert : la nécessaire redirection des dépenses locales",
        type: "ressource", format: "Analyse", source: "I4CE", date: "Nov. 2025",
        description: "Analyse de la nécessité de réorienter les dépenses locales vers des investissements verts pour atténuer le changement climatique.",
        tags: ["Finances", "Budget vert", "Investissement"],
        icon: "💰",
      },
    ],
  },
  {
    slug: "nourrir-territoire",
    title: "Nourrir son territoire autrement",
    subtitle: "Agroécologie, circuits courts & alimentation durable",
    emoji: "🌾",
    gradient: "from-lime-500 to-green-600",
    accentColor: "#65a30d",
    accentLight: "#f7fee7",
    accentBorder: "#d9f99d",
    description:
      "L’alimentation représente près de 25 % de l’empreinte carbone des Français. Les collectivités ont des leviers puissants pour soutenir une agriculture durable, des circuits courts et une alimentation saine et accessible à tous.",
    items: [
      {
        id: "agroecologie",
        title: "Leviers d’un EPCI pour la transition agroécologique et l’alimentation durable",
        type: "fiche",
        description: "Quels leviers pour agir en faveur de la transition agroécologique à l’échelle intercommunale et soutenir une alimentation durable pour tous.",
        tags: ["Agriculture", "Alimentation", "EPCI"],
        readTime: "15 min", icon: "🌾",
      },
      {
        id: "biodiversite-locale",
        title: "Protéger et restaurer la biodiversité à l’échelle locale",
        type: "fiche",
        description: "Les outils et dispositifs pour une politique locale ambitieuse en faveur de la biodiversité et des écosystèmes naturels, essentiels à l’agriculture.",
        tags: ["Biodiversité", "Nature", "Renaturation"],
        readTime: "10 min", icon: "🦋",
      },
      {
        id: "developpement-economique",
        title: "Prendre en compte les enjeux environnementaux dans le développement économique",
        type: "fiche",
        description: "Comment intégrer la dimension environnementale dans les politiques de développement économique, notamment pour soutenir les filières agricoles locales.",
        tags: ["Économie", "Environnement", "Stratégie"],
        readTime: "11 min", icon: "📊",
      },
      {
        id: "transition-ecologique-emplois",
        title: "La transition écologique, créatrice d’emplois dans les territoires ruraux",
        type: "ressource", format: "Rapport", source: "Réseau Action Climat", date: "Janv. 2026",
        description: "À l’horizon 2030, la transition écologique pourrait créer près de 500 000 emplois, notamment dans l’agriculture durable et les territoires ruraux.",
        tags: ["Emploi", "Territoires ruraux", "Planification"],
        icon: "📄",
      },
      {
        id: "solutions-fondees-nature",
        title: "Place aux Solutions Fondées sur la Nature",
        type: "ressource", format: "Étude", source: "OFB", date: "Juil. 2025",
        description: "Explorer les Solutions Fondées sur la Nature comme levier d’adaptation au changement climatique et de restauration des écosystèmes agricoles.",
        tags: ["Nature", "Adaptation", "Climat"],
        icon: "🌳",
      },
      {
        id: "renaturer-territoires",
        title: "Comment renaturer les territoires ?",
        type: "ressource", format: "Rapport", source: "CEREMA", date: "Août 2025",
        description: "Méthodes et retours d’expérience pour la renaturation des espaces artificialisés, un enjeu clé pour les territoires agricoles.",
        tags: ["Renaturation", "ZAN", "Biodiversité"],
        icon: "🌿",
      },
      {
        id: "depenses-locales-vertes",
        title: "Moins de brun, plus de vert : la nécessaire redirection des dépenses locales",
        type: "ressource", format: "Analyse", source: "I4CE", date: "Nov. 2025",
        description: "Analyse des leviers financiers pour soutenir la transition agroécologique et les filières alimentaires durables.",
        tags: ["Finances", "Budget vert", "Investissement"],
        icon: "💰",
      },
    ],
  },
  {
    slug: "mobilite-douce",
    title: "Sortir du tout-voiture",
    subtitle: "Vélo, transports collectifs & mobilité décarbonée",
    emoji: "🚲",
    gradient: "from-sky-500 to-blue-600",
    accentColor: "#0284c7",
    accentLight: "#e0f2fe",
    accentBorder: "#bae6fd",
    description:
      "Les transports représentent 31 % des émissions de gaz à effet de serre en France. Ce parcours vous donne les clés pour repenser les déplacements dans votre territoire : réseau express vélo, transports collectifs, aménagement favorable aux mobilités douces.",
    items: [
      {
        id: "developpement-economique",
        title: "Prendre en compte les enjeux environnementaux dans le développement économique",
        type: "fiche",
        description: "Comment intégrer la mobilité durable dans les politiques de développement économique local pour attirer des activités pourvoyeuses d’emplois de proximité.",
        tags: ["Économie", "Mobilité", "Aménagement"],
        readTime: "11 min", icon: "📊",
      },
      {
        id: "cadre-legal",
        title: "Le cadre légal de la transition écologique pour les collectivités",
        type: "fiche",
        description: "Les obligations et opportunités légales en matière de mobilité durable, notamment LOM et ZFE, pour agir vite et en conformité.",
        tags: ["Législation", "LOM", "ZFE"],
        readTime: "14 min", icon: "⚖️",
      },
      {
        id: "finances-transition",
        title: "Mettre les finances au service de la transition écologique",
        type: "fiche",
        description: "Les financements disponibles pour les infrastructures de mobilité durable : pistes cyclables, transport en commun, intermodalité.",
        tags: ["Budget", "Infrastructures", "Financement"],
        readTime: "13 min", icon: "💰",
      },
      {
        id: "reseaux-express-velo",
        title: "Réseaux Express Vélo : la solution immédiate pour la mobilité durable",
        type: "ressource", format: "Étude", source: "FUB", date: "Déc. 2025",
        description: "Comment les Réseaux Express Vélo peuvent améliorer la santé, le pouvoir d’achat et la qualité de vie dans les territoires : chiffres-clés et retours d’expérience.",
        tags: ["Mobilité", "Vélo", "Urbanisme"],
        icon: "🚲",
      },
      {
        id: "transition-ecologique-emplois",
        title: "La transition écologique, créatrice d’emplois dans les territoires ruraux",
        type: "ressource", format: "Rapport", source: "Réseau Action Climat", date: "Janv. 2026",
        description: "Les emplois liés à la mobilité durable (vélo, transports bas-carbone) représentent une opportunité économique réelle pour les territoires.",
        tags: ["Emploi", "Mobilité", "Territoires"],
        icon: "📄",
      },
      {
        id: "depenses-locales-vertes",
        title: "Moins de brun, plus de vert : la nécessaire redirection des dépenses locales",
        type: "ressource", format: "Analyse", source: "I4CE", date: "Nov. 2025",
        description: "Analyse sur la réorientation des dépenses locales vers les infrastructures de mobilité durable et les transports collectifs.",
        tags: ["Finances", "Infrastructures", "Budget"],
        icon: "💰",
      },
    ],
  },
  {
    slug: "petit-budget-grand-impact",
    title: "Petit budget, grand impact",
    subtitle: "Financer la transition sans exploser les comptes",
    emoji: "💰",
    gradient: "from-violet-500 to-purple-600",
    accentColor: "#7c3aed",
    accentLight: "#ede9fe",
    accentBorder: "#ddd6fe",
    description:
      "La transition écologique ne doit pas être un luxe réservé aux grandes métropoles. Ce parcours montre comment maximiser l’impact de chaque euro investi, activer les bons dispositifs de financement et rejoindr les leviers fiscaux disponibles.",
    items: [
      {
        id: "finances-transition",
        title: "Mettre les finances au service de la transition écologique",
        type: "fiche",
        description: "Comment réorienter les budgets locaux pour accélérer la transition sans grever les finances publiques ni augmenter la fiscalité.",
        tags: ["Budget", "Finances", "Investissement"],
        readTime: "13 min", icon: "💰",
      },
      {
        id: "developpement-economique",
        title: "Prendre en compte les enjeux environnementaux dans le développement économique",
        type: "fiche",
        description: "Attirer des activités durables qui génèrent des recettes fiscales tout en diminuant l’empreinte environnementale du territoire.",
        tags: ["Économie", "Fiscalité", "Développement"],
        readTime: "11 min", icon: "📊",
      },
      {
        id: "prestataire-prive",
        title: "Mobiliser efficacement un prestataire privé pour ses politiques de transition",
        type: "fiche",
        description: "Négocier, structurer et piloter une prestation pour obtenir le meilleur rapport coût-efficacité dans vos politiques de transition.",
        tags: ["Marchés publics", "Partenariat", "Efficacité"],
        readTime: "9 min", icon: "🤝",
      },
      {
        id: "cadre-legal",
        title: "Le cadre légal de la transition écologique pour les collectivités",
        type: "fiche",
        description: "Les dispositifs légaux permettant de financer la transition : CEE, fonds européens, dotations d’État et bonifications.",
        tags: ["Législation", "Financement", "CEE"],
        readTime: "14 min", icon: "⚖️",
      },
      {
        id: "transition-ecologique-emplois",
        title: "La transition écologique, créatrice d’emplois dans les territoires ruraux",
        type: "ressource", format: "Rapport", source: "Réseau Action Climat", date: "Janv. 2026",
        description: "La transition écologique génère plus de revenus et d’emplois qu’elle n’en coûte : les preuves chiffrées pour convaincre les séceptiques.",
        tags: ["Emploi", "ROI", "Planification"],
        icon: "📄",
      },
      {
        id: "depenses-locales-vertes",
        title: "Moins de brun, plus de vert : la nécessaire redirection des dépenses locales",
        type: "ressource", format: "Analyse", source: "I4CE", date: "Nov. 2025",
        description: "Comment réallouer les dépenses existantes vers des investissements verts sans creuser le budget : la méthode I4CE.",
        tags: ["Finances", "Budget vert", "Investissement"],
        icon: "💰",
      },
    ],
  },
  {
    slug: "petites-communes",
    title: "Moins de 10 000 habitants, et alors ?",
    subtitle: "Des leviers concrets pour les petites communes",
    emoji: "🏘️",
    gradient: "from-rose-500 to-pink-600",
    accentColor: "#e11d48",
    accentLight: "#ffe4e6",
    accentBorder: "#fecdd3",
    description:
      "Les petites communes ont souvent l’impression que la transition écologique est réservée aux grandes villes. C’est faux ! Ce parcours montre que les petites collectivités ont des atouts uniques et des leviers d’action concrets à leur échelle.",
    items: [
      {
        id: "ecolieux",
        title: "Pourquoi et comment soutenir le développement d’écolieux",
        type: "fiche",
        description: "Les collectivités ont un rôle clé pour faciliter l’émergence et la pérennité des écolieux : ces lieux de vie durables et innovants souvent implantés en milieu rural.",
        tags: ["Habitat", "Innovation", "Ruralité"],
        readTime: "8 min", icon: "🏡",
      },
      {
        id: "agroecologie",
        title: "Leviers d’un EPCI pour la transition agroécologique et l’alimentation durable",
        type: "fiche",
        description: "Les intercommunalités rurales ont un rôle déterminant pour soutenir les agriculteurs locaux et développer des filières courtes.",
        tags: ["Agriculture", "Rural", "EPCI"],
        readTime: "15 min", icon: "🌾",
      },
      {
        id: "developpement-economique",
        title: "Prendre en compte les enjeux environnementaux dans le développement économique",
        type: "fiche",
        description: "Attirer des entreprises durables et créer de l’emploi local : une stratégie gagnante pour les petites communes.",
        tags: ["Économie", "Emploi local", "Attractivité"],
        readTime: "11 min", icon: "📊",
      },
      {
        id: "reseaux-express-velo",
        title: "Réseaux Express Vélo : la solution immédiate pour la mobilité durable",
        type: "ressource", format: "Étude", source: "FUB", date: "Déc. 2025",
        description: "Même dans les territoires périurbains, les REV peuvent transformer la mobilité du quotidien et améliorer la qualité de vie.",
        tags: ["Mobilité", "Vélo", "Périurbain"],
        icon: "🚲",
      },
      {
        id: "maire-pourquoi-faire",
        title: "Municipales 2026 : Maire, pourquoi faire ?",
        type: "ressource", format: "Guide", source: "Le Lierre", date: "Févr. 2026",
        description: "Les enjeux du mandat 2026–2032 vus par les petites communes : par où commencer, quelles priorités et comment embarquer les habitants.",
        tags: ["Mandat", "Communes rurales", "Élus"],
        icon: "📘",
      },
      {
        id: "transition-ecologique-emplois",
        title: "La transition écologique, créatrice d’emplois dans les territoires ruraux",
        type: "ressource", format: "Rapport", source: "Réseau Action Climat", date: "Janv. 2026",
        description: "Les small et medium communes rurales sont en première ligne pour bénéficier des créations d’emplois liées à la transition écologique.",
        tags: ["Emploi", "Ruralité", "Attractivité"],
        icon: "📄",
      },
    ],
  },
];

const collectionMap = new Map(collections.map((c) => [c.slug, c]));

const formatIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  Guide: BookOpen,
  Rapport: FileBarChart,
  "Étude": BarChart3,
  Podcast: Headphones,
  Analyse: BarChart3,
};

import React from "react";

/* ── CARD TYPES ─────────────────────────────────────── */

function HeroCard({ item, accent }: { item: CollectionItem; accent: string; accentLight: string }) {
  const href = item.type === "fiche" ? `/fiches/${item.id}` : `/ressources/${item.id}`;
  const isFiche = item.type === "fiche";
  return (
    <Link href={href} className="group block h-full">
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.18 }}
        className="h-full rounded-3xl p-8 sm:p-10 flex flex-col min-h-[340px] relative overflow-hidden border border-white/30"
        style={{ background: `linear-gradient(135deg, ${accent}18 0%, white 65%)` }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 pointer-events-none -translate-y-1/3 translate-x-1/3" style={{ background: accent }} />

        <div className="flex items-start justify-between mb-6 relative z-10">
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={isFiche ? { background: "#d1fae5", color: "#065f46" } : { background: "#ede9fe", color: "#5b21b6" }}
          >
            {isFiche ? "Fiche pratique" : (item.format ?? "Ressource")}
          </span>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl select-none shadow-md border border-white bg-white">
            {item.icon}
          </div>
        </div>

        <div className="flex-1 relative z-10">
          <h3 className="text-2xl font-extrabold text-slate-900 leading-tight mb-4 group-hover:text-emerald-700 transition-colors duration-200">
            {item.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">{item.description}</p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/6 relative z-10">
          <span className="text-[12px] text-slate-500 flex items-center gap-1.5">
            {item.readTime && <><Clock className="w-3.5 h-3.5" />{item.readTime}</>}
            {item.source && <span className="font-semibold text-slate-700">{item.source}</span>}
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl text-white shadow-sm group-hover:shadow-md transition-shadow"
            style={{ background: accent }}
          >
            {isFiche ? "Lire la fiche" : "Accéder"} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

function StackCard({ item, accent, accentLight }: { item: CollectionItem; accent: string; accentLight: string }) {
  const href = item.type === "fiche" ? `/fiches/${item.id}` : `/ressources/${item.id}`;
  const isFiche = item.type === "fiche";
  const FmtIcon = item.format ? (formatIcon[item.format] ?? FileText) : null;
  return (
    <Link href={href} className="group block h-full">
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.18 }}
        className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.07)] border border-slate-100/80"
        style={{ borderTop: `3px solid ${accent}` }}
      >
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl select-none flex-shrink-0"
              style={{ background: accentLight }}
            >
              {isFiche ? item.icon : (FmtIcon ? <FmtIcon className="w-4.5 h-4.5" /> : item.icon)}
            </div>
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex-shrink-0"
              style={isFiche ? { background: "#d1fae5", color: "#065f46" } : { background: "#ede9fe", color: "#5b21b6" }}
            >
              {isFiche ? "Fiche" : (item.format ?? "Ressource")}
            </span>
          </div>
          <h3 className="font-bold text-slate-900 text-[14px] leading-snug line-clamp-3 group-hover:text-emerald-700 transition-colors mb-2">
            {item.title}
          </h3>
          <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2 flex-1">{item.description}</p>
          <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 truncate">
              {item.readTime && <span className="flex items-center gap-1"><Clock className="w-3 h-3 inline" />{item.readTime}</span>}
              {item.source && item.source}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function WideCard({ item, accent, accentLight }: { item: CollectionItem; accent: string; accentLight: string }) {
  const href = item.type === "fiche" ? `/fiches/${item.id}` : `/ressources/${item.id}`;
  const isFiche = item.type === "fiche";
  return (
    <Link href={href} className="group block">
      <motion.div
        whileHover={{ x: 3 }}
        transition={{ duration: 0.15 }}
        className="flex items-center gap-5 bg-white rounded-2xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-slate-100/80"
        style={{ borderLeft: `4px solid ${accent}` }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl select-none flex-shrink-0"
          style={{ background: accentLight }}
        >
          {item.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={isFiche ? { background: "#d1fae5", color: "#065f46" } : { background: "#ede9fe", color: "#5b21b6" }}
            >
              {isFiche ? "Fiche" : (item.format ?? "Ressource")}
            </span>
            {(item.readTime ?? item.source) && (
              <span className="text-[11px] text-slate-400">{item.readTime ?? item.source}</span>
            )}
          </div>
          <h3 className="font-bold text-slate-900 text-[14px] leading-snug line-clamp-1 group-hover:text-emerald-700 transition-colors">
            {item.title}
          </h3>
          <p className="text-[12px] text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
      </motion.div>
    </Link>
  );
}

/* ── BENTO LAYOUT ────────────────────────────────────── */

function BentoGrid({ items, accent, accentLight }: { items: CollectionItem[]; accent: string; accentLight: string }) {
  if (items.length === 0) return null;
  if (items.length === 1) {
    return <div className="h-[360px]"><HeroCard item={items[0]} accent={accent} accentLight={accentLight} /></div>;
  }
  if (items.length === 2) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="h-[340px]"><HeroCard item={items[0]} accent={accent} accentLight={accentLight} /></div>
        <div className="h-[340px]"><HeroCard item={items[1]} accent={accent} accentLight={accentLight} /></div>
      </div>
    );
  }
  const [hero, ...rest] = items;
  const stacks = rest.slice(0, 2);
  const wides = rest.slice(2);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7" style={{ minHeight: 340 }}>
          <HeroCard item={hero} accent={accent} accentLight={accentLight} />
        </div>
        <div className="lg:col-span-5 grid gap-5" style={{ gridTemplateRows: `repeat(${stacks.length}, 1fr)` }}>
          {stacks.map((item) => (
            <StackCard key={item.id} item={item} accent={accent} accentLight={accentLight} />
          ))}
        </div>
      </div>
      {wides.length > 0 && (
        <div className="space-y-3">
          {wides.map((item) => (
            <WideCard key={item.id} item={item} accent={accent} accentLight={accentLight} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── PAGE ────────────────────────────────────────────── */

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const col = collectionMap.get(slug);

  if (!col) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Collection introuvable</h1>
          <Link href="/" className="text-emerald-600 font-semibold hover:text-emerald-700">Retour à l’accueil</Link>
        </div>
      </div>
    );
  }

  const fiches = col.items.filter((i) => i.type === "fiche");
  const ressources = col.items.filter((i) => i.type === "ressource");
  const otherCols = collections.filter((c) => c.slug !== slug);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── HERO ── */}
      <div className={`relative overflow-hidden pt-28 pb-20 bg-gradient-to-br ${col.gradient}`}>
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white mb-10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l’accueil
            </Link>

            <div className="text-6xl sm:text-7xl mb-6 select-none">{col.emoji}</div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4 max-w-3xl">
              {col.title}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed mb-8">
              {col.subtitle}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {fiches.length > 0 && (
                <span className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                  <FileText className="w-4 h-4" />
                  {fiches.length} fiche{fiches.length > 1 ? "s" : ""} pratique{fiches.length > 1 ? "s" : ""}
                </span>
              )}
              {ressources.length > 0 && (
                <span className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                  <Library className="w-4 h-4" />
                  {ressources.length} ressource{ressources.length > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── DESCRIPTION ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base text-slate-600 max-w-3xl leading-relaxed"
          >
            {col.description}
          </motion.p>
        </div>
      </div>

      {/* ── BENTO ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-7 rounded-full" style={{ background: col.accentColor }} />
            <h2 className="text-xl font-extrabold text-slate-900">Contenus de la collection</h2>
          </div>
          <BentoGrid items={col.items} accent={col.accentColor} accentLight={col.accentLight} />
        </motion.div>
      </div>

      {/* ── AUTRES PARCOURS ── */}
      <div className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-lg font-extrabold text-slate-900 mb-7">Autres parcours thématiques</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {otherCols.map((c) => (
                <Link
                  key={c.slug}
                  href={`/collections/${c.slug}`}
                  className={`group flex flex-col gap-3 p-5 rounded-2xl bg-gradient-to-br ${c.gradient} text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <span className="text-3xl select-none">{c.emoji}</span>
                  <span className="text-[13px] font-bold leading-snug">{c.title}</span>
                  <span className="text-[11px] text-white/70 mt-auto">
                    {c.items?.length ?? 0} contenus
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
