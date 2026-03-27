#!/usr/bin/env python3
# -*- coding: utf-8 -*-

tsx = '''\
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Clock, FileText, Library,
  BookOpen, Headphones, BarChart3, FileBarChart,
} from "lucide-react";

type ContentType = "fiche" | "ressource";
type FormatType = "Rapport" | "Guide" | "\u00c9tude" | "Podcast" | "Analyse";

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
    subtitle: "Le guide de survie du nouveau maire face \u00e0 la transition \u00e9cologique",
    emoji: "\U0001F3DB\uFE0F",
    gradient: "from-emerald-600 via-emerald-700 to-teal-800",
    accentColor: "#059669",
    accentLight: "#d1fae5",
    accentBorder: "#a7f3d0",
    description:
      "Prendre les rennes d\u2019une collectivit\u00e9 et piloter la transition \u00e9cologique en m\u00eame temps\u00a0: un d\u00e9fi de taille. Ces ressources vous aident \u00e0 d\u00e9marrer du bon pied, \u00e0 embarquer vos \u00e9quipes et \u00e0 poser une strat\u00e9gie lisible d\u00e8s le premier mandat.",
    items: [
      {
        id: "vision-systemique",
        title: "Comment d\u00e9ployer une vision syst\u00e9mique dans un projet de politique publique\u00a0?",
        type: "fiche",
        description: "Int\u00e9grer la pens\u00e9e syst\u00e9mique pour des politiques publiques plus coh\u00e9rentes, efficaces et durables dans le temps.",
        tags: ["Syst\u00e9mique", "M\u00e9thodologie", "Pilotage"],
        readTime: "10 min", icon: "\U0001f504",
      },
      {
        id: "prestataire-prive",
        title: "Mobiliser efficacement un prestataire priv\u00e9 pour ses politiques de transition",
        type: "fiche",
        description: "Les cl\u00e9s pour une collaboration r\u00e9ussie entre collectivit\u00e9s et prestataires priv\u00e9s autour des politiques de transition \u00e9cologique.",
        tags: ["March\u00e9s publics", "Partenariat", "Efficacit\u00e9"],
        readTime: "9 min", icon: "\U0001f91d",
      },
      {
        id: "cadre-legal",
        title: "Le cadre l\u00e9gal de la transition \u00e9cologique pour les collectivit\u00e9s",
        type: "fiche",
        description: "Panorama des obligations et opportunit\u00e9s l\u00e9gales pour les collectivit\u00e9s territoriales en mati\u00e8re de transition \u00e9cologique.",
        tags: ["L\u00e9gislation", "Obligations", "Cadre juridique"],
        readTime: "14 min", icon: "\u2696\ufe0f",
      },
      {
        id: "finances-transition",
        title: "Mettre les finances au service de la transition \u00e9cologique",
        type: "fiche",
        description: "Comment r\u00e9orienter les budgets locaux pour acc\u00e9l\u00e9rer la transition sans grever les finances publiques.",
        tags: ["Budget", "Finances", "Investissement"],
        readTime: "13 min", icon: "\U0001f4b0",
      },
      {
        id: "ecolieux",
        title: "Pourquoi et comment soutenir le d\u00e9veloppement d\u2019\u00e9colieux",
        type: "fiche",
        description: "Les collectivit\u00e9s ont un r\u00f4le cl\u00e9 pour faciliter l\u2019\u00e9mergence et la p\u00e9rennit\u00e9 des \u00e9colieux, ces lieux de vie durables et innovants.",
        tags: ["Habitat", "Innovation", "Territoire"],
        readTime: "8 min", icon: "\U0001f3e1",
      },
      {
        id: "maire-pourquoi-faire",
        title: "Municipales 2026\u00a0: Maire, pourquoi faire\u00a0?",
        type: "ressource", format: "Guide", source: "Le Lierre", date: "F\u00e9vr. 2026",
        description: "Un guide pour comprendre les enjeux du mandat municipal 2026\u20132032 et les leviers d\u2019action pour une transition \u00e9cologique r\u00e9ussie.",
        tags: ["Municipales", "Mandat", "\u00c9lections"],
        icon: "\U0001f4d8",
      },
      {
        id: "abecedaire-politiques",
        title: "L\u2019ab\u00e9c\u00e9daire des politiques publiques de transition",
        type: "ressource", format: "Guide", source: "Solutions Transitions", date: "Oct. 2025",
        description: "R\u00e9f\u00e9rence exhaustive des concepts, outils et dispositifs pour piloter des politiques de transition \u00e9cologique efficaces.",
        tags: ["Politique publique", "Guide", "R\u00e9f\u00e9rence"],
        icon: "\U0001f4da",
      },
      {
        id: "podcast-fabrique",
        title: "Le Podcast de la Fabrique des Transitions",
        type: "ressource", format: "Podcast", source: "La Fabrique des Transitions", date: "Continu",
        description: "Des \u00e9changes inspirants avec les acteurs de terrain qui font avancer la transition \u00e9cologique au quotidien.",
        tags: ["Podcast", "T\u00e9moignages", "Inspiration"],
        icon: "\U0001f399\ufe0f",
      },
    ],
  },
  {
    slug: "sobriete-energetique",
    title: "Sobri\u00e9t\u00e9 \u00e9nerg\u00e9tique\u00a0: par o\u00f9 commencer\u00a0?",
    subtitle: "R\u00e9nover, isoler, accompagner les m\u00e9nages",
    emoji: "\u26a1",
    gradient: "from-amber-500 to-orange-600",
    accentColor: "#d97706",
    accentLight: "#fef3c7",
    accentBorder: "#fde68a",
    description:
      "La r\u00e9novation \u00e9nerg\u00e9tique et la lutte contre la pr\u00e9carit\u00e9 sont au c\u0153ur des comp\u00e9tences des collectivit\u00e9s. Ce parcours vous guide de la strat\u00e9gie \u00e0 l\u2019op\u00e9rationnel pour embarquer tous les habitants dans une transition \u00e9nerg\u00e9tique juste et efficace.",
    items: [
      {
        id: "transition-energetique",
        title: "Embarquer tous les m\u00e9nages dans une transition \u00e9nerg\u00e9tique juste",
        type: "fiche",
        description: "Pourquoi et comment mobiliser les leviers \u00e0 la main des collectivit\u00e9s pour lutter contre la pr\u00e9carit\u00e9 \u00e9nerg\u00e9tique de fa\u00e7on juste et solidaire.",
        tags: ["\u00c9nergie", "Justice sociale", "R\u00e9novation"],
        readTime: "12 min", icon: "\u26a1",
      },
      {
        id: "finances-transition",
        title: "Mettre les finances au service de la transition \u00e9cologique",
        type: "fiche",
        description: "Comment r\u00e9orienter les budgets locaux pour acc\u00e9l\u00e9rer la transition sans grever les finances publiques ni augmenter la fiscalit\u00e9.",
        tags: ["Budget", "Finances", "Investissement"],
        readTime: "13 min", icon: "\U0001f4b0",
      },
      {
        id: "developpement-economique",
        title: "Prendre en compte les enjeux environnementaux dans le d\u00e9veloppement \u00e9conomique",
        type: "fiche",
        description: "Comment int\u00e9grer la dimension environnementale dans les politiques de d\u00e9veloppement \u00e9conomique local.",
        tags: ["\u00c9conomie", "Environnement", "Strat\u00e9gie"],
        readTime: "11 min", icon: "\U0001f4ca",
      },
      {
        id: "cadre-legal",
        title: "Le cadre l\u00e9gal de la transition \u00e9cologique pour les collectivit\u00e9s",
        type: "fiche",
        description: "Panorama des obligations et opportunit\u00e9s l\u00e9gales pour les collectivit\u00e9s en mati\u00e8re de transition \u00e9nerg\u00e9tique.",
        tags: ["L\u00e9gislation", "Obligations", "Cadre juridique"],
        readTime: "14 min", icon: "\u2696\ufe0f",
      },
      {
        id: "contrat-performance-energetique",
        title: "Guide m\u00e9thodologique\u00a0: Contrats de Performance \u00c9nerg\u00e9tique",
        type: "ressource", format: "Guide", source: "CEREMA", date: "Sept. 2025",
        description: "M\u00e9thodologie compl\u00e8te pour la mise en place de contrats de performance \u00e9nerg\u00e9tique dans les collectivit\u00e9s territoriales.",
        tags: ["\u00c9nergie", "Contrat", "Performance"],
        icon: "\U0001f4cb",
      },
      {
        id: "depenses-locales-vertes",
        title: "Moins de brun, plus de vert\u00a0: la n\u00e9cessaire redirection des d\u00e9penses locales",
        type: "ressource", format: "Analyse", source: "I4CE", date: "Nov. 2025",
        description: "Analyse de la n\u00e9cessit\u00e9 de r\u00e9orienter les d\u00e9penses locales vers des investissements verts pour att\u00e9nuer le changement climatique.",
        tags: ["Finances", "Budget vert", "Investissement"],
        icon: "\U0001f4b0",
      },
    ],
  },
  {
    slug: "nourrir-territoire",
    title: "Nourrir son territoire autrement",
    subtitle: "Agro\u00e9cologie, circuits courts & alimentation durable",
    emoji: "\U0001f33e",
    gradient: "from-lime-500 to-green-600",
    accentColor: "#65a30d",
    accentLight: "#f7fee7",
    accentBorder: "#d9f99d",
    description:
      "L\u2019alimentation repr\u00e9sente pr\u00e8s de 25\u00a0% de l\u2019empreinte carbone des Fran\u00e7ais. Les collectivit\u00e9s ont des leviers puissants pour soutenir une agriculture durable, des circuits courts et une alimentation saine et accessible \u00e0 tous.",
    items: [
      {
        id: "agroecologie",
        title: "Leviers d\u2019un EPCI pour la transition agro\u00e9cologique et l\u2019alimentation durable",
        type: "fiche",
        description: "Quels leviers pour agir en faveur de la transition agro\u00e9cologique \u00e0 l\u2019\u00e9chelle intercommunale et soutenir une alimentation durable pour tous.",
        tags: ["Agriculture", "Alimentation", "EPCI"],
        readTime: "15 min", icon: "\U0001f33e",
      },
      {
        id: "biodiversite-locale",
        title: "Prot\u00e9ger et restaurer la biodiversit\u00e9 \u00e0 l\u2019\u00e9chelle locale",
        type: "fiche",
        description: "Les outils et dispositifs pour une politique locale ambitieuse en faveur de la biodiversit\u00e9 et des \u00e9cosyst\u00e8mes naturels, essentiels \u00e0 l\u2019agriculture.",
        tags: ["Biodiversit\u00e9", "Nature", "Renaturation"],
        readTime: "10 min", icon: "\U0001f98b",
      },
      {
        id: "developpement-economique",
        title: "Prendre en compte les enjeux environnementaux dans le d\u00e9veloppement \u00e9conomique",
        type: "fiche",
        description: "Comment int\u00e9grer la dimension environnementale dans les politiques de d\u00e9veloppement \u00e9conomique, notamment pour soutenir les fili\u00e8res agricoles locales.",
        tags: ["\u00c9conomie", "Environnement", "Strat\u00e9gie"],
        readTime: "11 min", icon: "\U0001f4ca",
      },
      {
        id: "transition-ecologique-emplois",
        title: "La transition \u00e9cologique, cr\u00e9atrice d\u2019emplois dans les territoires ruraux",
        type: "ressource", format: "Rapport", source: "R\u00e9seau Action Climat", date: "Janv. 2026",
        description: "\u00c0 l\u2019horizon 2030, la transition \u00e9cologique pourrait cr\u00e9er pr\u00e8s de 500\u202f000 emplois, notamment dans l\u2019agriculture durable et les territoires ruraux.",
        tags: ["Emploi", "Territoires ruraux", "Planification"],
        icon: "\U0001f4c4",
      },
      {
        id: "solutions-fondees-nature",
        title: "Place aux Solutions Fond\u00e9es sur la Nature",
        type: "ressource", format: "\u00c9tude", source: "OFB", date: "Juil. 2025",
        description: "Explorer les Solutions Fond\u00e9es sur la Nature comme levier d\u2019adaptation au changement climatique et de restauration des \u00e9cosyst\u00e8mes agricoles.",
        tags: ["Nature", "Adaptation", "Climat"],
        icon: "\U0001f333",
      },
      {
        id: "renaturer-territoires",
        title: "Comment renaturer les territoires\u00a0?",
        type: "ressource", format: "Rapport", source: "CEREMA", date: "Ao\u00fbt 2025",
        description: "M\u00e9thodes et retours d\u2019exp\u00e9rience pour la renaturation des espaces artificialis\u00e9s, un enjeu cl\u00e9 pour les territoires agricoles.",
        tags: ["Renaturation", "ZAN", "Biodiversit\u00e9"],
        icon: "\U0001f33f",
      },
      {
        id: "depenses-locales-vertes",
        title: "Moins de brun, plus de vert\u00a0: la n\u00e9cessaire redirection des d\u00e9penses locales",
        type: "ressource", format: "Analyse", source: "I4CE", date: "Nov. 2025",
        description: "Analyse des leviers financiers pour soutenir la transition agro\u00e9cologique et les fili\u00e8res alimentaires durables.",
        tags: ["Finances", "Budget vert", "Investissement"],
        icon: "\U0001f4b0",
      },
    ],
  },
  {
    slug: "mobilite-douce",
    title: "Sortir du tout-voiture",
    subtitle: "V\u00e9lo, transports collectifs & mobilit\u00e9 d\u00e9carbon\u00e9e",
    emoji: "\U0001f6b2",
    gradient: "from-sky-500 to-blue-600",
    accentColor: "#0284c7",
    accentLight: "#e0f2fe",
    accentBorder: "#bae6fd",
    description:
      "Les transports repr\u00e9sentent 31\u00a0% des \u00e9missions de gaz \u00e0 effet de serre en France. Ce parcours vous donne les cl\u00e9s pour repenser les d\u00e9placements dans votre territoire\u00a0: r\u00e9seau express v\u00e9lo, transports collectifs, am\u00e9nagement favorable aux mobilit\u00e9s douces.",
    items: [
      {
        id: "developpement-economique",
        title: "Prendre en compte les enjeux environnementaux dans le d\u00e9veloppement \u00e9conomique",
        type: "fiche",
        description: "Comment int\u00e9grer la mobilit\u00e9 durable dans les politiques de d\u00e9veloppement \u00e9conomique local pour attirer des activit\u00e9s pourvoyeuses d\u2019emplois de proximit\u00e9.",
        tags: ["\u00c9conomie", "Mobilit\u00e9", "Am\u00e9nagement"],
        readTime: "11 min", icon: "\U0001f4ca",
      },
      {
        id: "cadre-legal",
        title: "Le cadre l\u00e9gal de la transition \u00e9cologique pour les collectivit\u00e9s",
        type: "fiche",
        description: "Les obligations et opportunit\u00e9s l\u00e9gales en mati\u00e8re de mobilit\u00e9 durable, notamment LOM et ZFE, pour agir vite et en conformit\u00e9.",
        tags: ["L\u00e9gislation", "LOM", "ZFE"],
        readTime: "14 min", icon: "\u2696\ufe0f",
      },
      {
        id: "finances-transition",
        title: "Mettre les finances au service de la transition \u00e9cologique",
        type: "fiche",
        description: "Les financements disponibles pour les infrastructures de mobilit\u00e9 durable\u00a0: pistes cyclables, transport en commun, intermodalit\u00e9.",
        tags: ["Budget", "Infrastructures", "Financement"],
        readTime: "13 min", icon: "\U0001f4b0",
      },
      {
        id: "reseaux-express-velo",
        title: "R\u00e9seaux Express V\u00e9lo\u00a0: la solution imm\u00e9diate pour la mobilit\u00e9 durable",
        type: "ressource", format: "\u00c9tude", source: "FUB", date: "D\u00e9c. 2025",
        description: "Comment les R\u00e9seaux Express V\u00e9lo peuvent am\u00e9liorer la sant\u00e9, le pouvoir d\u2019achat et la qualit\u00e9 de vie dans les territoires\u00a0: chiffres-cl\u00e9s et retours d\u2019exp\u00e9rience.",
        tags: ["Mobilit\u00e9", "V\u00e9lo", "Urbanisme"],
        icon: "\U0001f6b2",
      },
      {
        id: "transition-ecologique-emplois",
        title: "La transition \u00e9cologique, cr\u00e9atrice d\u2019emplois dans les territoires ruraux",
        type: "ressource", format: "Rapport", source: "R\u00e9seau Action Climat", date: "Janv. 2026",
        description: "Les emplois li\u00e9s \u00e0 la mobilit\u00e9 durable (v\u00e9lo, transports bas-carbone) repr\u00e9sentent une opportunit\u00e9 \u00e9conomique r\u00e9elle pour les territoires.",
        tags: ["Emploi", "Mobilit\u00e9", "Territoires"],
        icon: "\U0001f4c4",
      },
      {
        id: "depenses-locales-vertes",
        title: "Moins de brun, plus de vert\u00a0: la n\u00e9cessaire redirection des d\u00e9penses locales",
        type: "ressource", format: "Analyse", source: "I4CE", date: "Nov. 2025",
        description: "Analyse sur la r\u00e9orientation des d\u00e9penses locales vers les infrastructures de mobilit\u00e9 durable et les transports collectifs.",
        tags: ["Finances", "Infrastructures", "Budget"],
        icon: "\U0001f4b0",
      },
    ],
  },
  {
    slug: "petit-budget-grand-impact",
    title: "Petit budget, grand impact",
    subtitle: "Financer la transition sans exploser les comptes",
    emoji: "\U0001f4b0",
    gradient: "from-violet-500 to-purple-600",
    accentColor: "#7c3aed",
    accentLight: "#ede9fe",
    accentBorder: "#ddd6fe",
    description:
      "La transition \u00e9cologique ne doit pas \u00eatre un luxe r\u00e9serv\u00e9 aux grandes m\u00e9tropoles. Ce parcours montre comment maximiser l\u2019impact de chaque euro investi, activer les bons dispositifs de financement et rejoindr les leviers fiscaux disponibles.",
    items: [
      {
        id: "finances-transition",
        title: "Mettre les finances au service de la transition \u00e9cologique",
        type: "fiche",
        description: "Comment r\u00e9orienter les budgets locaux pour acc\u00e9l\u00e9rer la transition sans grever les finances publiques ni augmenter la fiscalit\u00e9.",
        tags: ["Budget", "Finances", "Investissement"],
        readTime: "13 min", icon: "\U0001f4b0",
      },
      {
        id: "developpement-economique",
        title: "Prendre en compte les enjeux environnementaux dans le d\u00e9veloppement \u00e9conomique",
        type: "fiche",
        description: "Attirer des activit\u00e9s durables qui g\u00e9n\u00e8rent des recettes fiscales tout en diminuant l\u2019empreinte environnementale du territoire.",
        tags: ["\u00c9conomie", "Fiscalit\u00e9", "D\u00e9veloppement"],
        readTime: "11 min", icon: "\U0001f4ca",
      },
      {
        id: "prestataire-prive",
        title: "Mobiliser efficacement un prestataire priv\u00e9 pour ses politiques de transition",
        type: "fiche",
        description: "N\u00e9gocier, structurer et piloter une prestation pour obtenir le meilleur rapport co\u00fbt-efficacit\u00e9 dans vos politiques de transition.",
        tags: ["March\u00e9s publics", "Partenariat", "Efficacit\u00e9"],
        readTime: "9 min", icon: "\U0001f91d",
      },
      {
        id: "cadre-legal",
        title: "Le cadre l\u00e9gal de la transition \u00e9cologique pour les collectivit\u00e9s",
        type: "fiche",
        description: "Les dispositifs l\u00e9gaux permettant de financer la transition\u00a0: CEE, fonds europ\u00e9ens, dotations d\u2019\u00c9tat et bonifications.",
        tags: ["L\u00e9gislation", "Financement", "CEE"],
        readTime: "14 min", icon: "\u2696\ufe0f",
      },
      {
        id: "transition-ecologique-emplois",
        title: "La transition \u00e9cologique, cr\u00e9atrice d\u2019emplois dans les territoires ruraux",
        type: "ressource", format: "Rapport", source: "R\u00e9seau Action Climat", date: "Janv. 2026",
        description: "La transition \u00e9cologique g\u00e9n\u00e8re plus de revenus et d\u2019emplois qu\u2019elle n\u2019en co\u00fbte\u00a0: les preuves chiffr\u00e9es pour convaincre les s\u00e9ceptiques.",
        tags: ["Emploi", "ROI", "Planification"],
        icon: "\U0001f4c4",
      },
      {
        id: "depenses-locales-vertes",
        title: "Moins de brun, plus de vert\u00a0: la n\u00e9cessaire redirection des d\u00e9penses locales",
        type: "ressource", format: "Analyse", source: "I4CE", date: "Nov. 2025",
        description: "Comment r\u00e9allouer les d\u00e9penses existantes vers des investissements verts sans creuser le budget\u00a0: la m\u00e9thode I4CE.",
        tags: ["Finances", "Budget vert", "Investissement"],
        icon: "\U0001f4b0",
      },
    ],
  },
  {
    slug: "petites-communes",
    title: "Moins de 10\u202f000 habitants, et alors\u00a0?",
    subtitle: "Des leviers concrets pour les petites communes",
    emoji: "\U0001f3d8\ufe0f",
    gradient: "from-rose-500 to-pink-600",
    accentColor: "#e11d48",
    accentLight: "#ffe4e6",
    accentBorder: "#fecdd3",
    description:
      "Les petites communes ont souvent l\u2019impression que la transition \u00e9cologique est r\u00e9serv\u00e9e aux grandes villes. C\u2019est faux\u00a0! Ce parcours montre que les petites collectivit\u00e9s ont des atouts uniques et des leviers d\u2019action concrets \u00e0 leur \u00e9chelle.",
    items: [
      {
        id: "ecolieux",
        title: "Pourquoi et comment soutenir le d\u00e9veloppement d\u2019\u00e9colieux",
        type: "fiche",
        description: "Les collectivit\u00e9s ont un r\u00f4le cl\u00e9 pour faciliter l\u2019\u00e9mergence et la p\u00e9rennit\u00e9 des \u00e9colieux\u00a0: ces lieux de vie durables et innovants souvent implant\u00e9s en milieu rural.",
        tags: ["Habitat", "Innovation", "Ruralité"],
        readTime: "8 min", icon: "\U0001f3e1",
      },
      {
        id: "agroecologie",
        title: "Leviers d\u2019un EPCI pour la transition agro\u00e9cologique et l\u2019alimentation durable",
        type: "fiche",
        description: "Les intercommunalit\u00e9s rurales ont un r\u00f4le d\u00e9terminant pour soutenir les agriculteurs locaux et d\u00e9velopper des fili\u00e8res courtes.",
        tags: ["Agriculture", "Rural", "EPCI"],
        readTime: "15 min", icon: "\U0001f33e",
      },
      {
        id: "developpement-economique",
        title: "Prendre en compte les enjeux environnementaux dans le d\u00e9veloppement \u00e9conomique",
        type: "fiche",
        description: "Attirer des entreprises durables et cr\u00e9er de l\u2019emploi local\u00a0: une strat\u00e9gie gagnante pour les petites communes.",
        tags: ["\u00c9conomie", "Emploi local", "Attractivit\u00e9"],
        readTime: "11 min", icon: "\U0001f4ca",
      },
      {
        id: "reseaux-express-velo",
        title: "R\u00e9seaux Express V\u00e9lo\u00a0: la solution imm\u00e9diate pour la mobilit\u00e9 durable",
        type: "ressource", format: "\u00c9tude", source: "FUB", date: "D\u00e9c. 2025",
        description: "M\u00eame dans les territoires p\u00e9riurbains, les REV peuvent transformer la mobilit\u00e9 du quotidien et am\u00e9liorer la qualit\u00e9 de vie.",
        tags: ["Mobilit\u00e9", "V\u00e9lo", "P\u00e9riurbain"],
        icon: "\U0001f6b2",
      },
      {
        id: "maire-pourquoi-faire",
        title: "Municipales 2026\u00a0: Maire, pourquoi faire\u00a0?",
        type: "ressource", format: "Guide", source: "Le Lierre", date: "F\u00e9vr. 2026",
        description: "Les enjeux du mandat 2026\u20132032 vus par les petites communes\u00a0: par o\u00f9 commencer, quelles priorit\u00e9s et comment embarquer les habitants.",
        tags: ["Mandat", "Communes rurales", "\u00c9lus"],
        icon: "\U0001f4d8",
      },
      {
        id: "transition-ecologique-emplois",
        title: "La transition \u00e9cologique, cr\u00e9atrice d\u2019emplois dans les territoires ruraux",
        type: "ressource", format: "Rapport", source: "R\u00e9seau Action Climat", date: "Janv. 2026",
        description: "Les small et medium communes rurales sont en premi\u00e8re ligne pour b\u00e9n\u00e9ficier des cr\u00e9ations d\u2019emplois li\u00e9es \u00e0 la transition \u00e9cologique.",
        tags: ["Emploi", "Ruralité", "Attractivit\u00e9"],
        icon: "\U0001f4c4",
      },
    ],
  },
];

const collectionMap = new Map(collections.map((c) => [c.slug, c]));

const formatIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  Guide: BookOpen,
  Rapport: FileBarChart,
  "\u00c9tude": BarChart3,
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
            {isFiche ? "Lire la fiche" : "Acc\u00e9der"} <ArrowRight className="w-4 h-4" />
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
          <Link href="/" className="text-emerald-600 font-semibold hover:text-emerald-700">Retour \u00e0 l\u2019accueil</Link>
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
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white mb-10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour \u00e0 l\u2019accueil
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
            <h2 className="text-lg font-extrabold text-slate-900 mb-7">Autres parcours th\u00e9matiques</h2>
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
'''

import os

# Write [slug] page
slug_dir = "/Users/solalgendrin/CascadeProjects/solutionstransitionsux/src/app/collections/[slug]"
os.makedirs(slug_dir, exist_ok=True)
path = os.path.join(slug_dir, "page.tsx")
with open(path, "w", encoding="utf-8") as f:
    f.write(tsx)

import re
bad = re.findall(r'\\u[0-9a-fA-F]{4}', tsx)
print(f"OK — {len(tsx)} chars, {tsx.count(chr(10))} lines written to {path}")
if bad:
    print(f"WARNING: {len(bad)} literal \\u: {bad[:3]}")
else:
    print("Clean unicode")

# Remove old [theme] page if it exists
theme_page = "/Users/solalgendrin/CascadeProjects/solutionstransitionsux/src/app/collections/[theme]/page.tsx"
if os.path.exists(theme_page):
    os.remove(theme_page)
    os.rmdir(os.path.dirname(theme_page))
    print("Removed old [theme] folder")
