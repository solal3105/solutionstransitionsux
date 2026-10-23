"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Leaf,
  Zap,
  ArrowRight,
  Mic,
  Paperclip,
  Maximize2,
  Minimize2,
  BookOpen,
  FileText,
  ExternalLink,
  ChevronLeft,
  Landmark,
  GraduationCap,
  Bike,
  Utensils,
  TreePine,
  Users,
  Gift,
  Clock,
  Layers,
} from "lucide-react";

// ── Related content database ──────────────────────────────────────────
interface RelatedItem {
  type: "fiche" | "ressource";
  id: string;
  title: string;
  icon: string;
  tag: string;
  tagColor: string;
}

const relatedContent: Record<string, RelatedItem[]> = {
  énergie: [
    { type: "fiche", id: "transition-energetique", title: "Embarquer tous les ménages dans une transition énergétique juste", icon: "⚡", tag: "Agir", tagColor: "bg-rose-500" },
    { type: "ressource", id: "contrat-performance-energetique", title: "Guide méthodologique pour un Contrat de Performance Énergétique", icon: "📋", tag: "Guide", tagColor: "bg-violet-500" },
    { type: "fiche", id: "finances-transition", title: "Mettre les finances au service de la transition écologique", icon: "💰", tag: "Organiser", tagColor: "bg-amber-500" },
  ],
  biodiversité: [
    { type: "fiche", id: "biodiversite-locale", title: "Protéger et restaurer la biodiversité à l'échelle locale", icon: "🦋", tag: "Agir", tagColor: "bg-rose-500" },
    { type: "ressource", id: "renaturer-territoires", title: "Comment renaturer les territoires ?", icon: "🌿", tag: "Rapport", tagColor: "bg-emerald-500" },
    { type: "ressource", id: "solutions-fondees-nature", title: "Place aux Solutions Fondées sur la Nature", icon: "🌳", tag: "Étude", tagColor: "bg-sky-500" },
  ],
  financement: [
    { type: "fiche", id: "finances-transition", title: "Mettre les finances au service de la transition écologique", icon: "💰", tag: "Organiser", tagColor: "bg-amber-500" },
    { type: "ressource", id: "depenses-locales-vertes", title: "Moins de brun, plus de vert : la nécessaire redirection des dépenses locales", icon: "💰", tag: "Analyse", tagColor: "bg-sky-500" },
    { type: "fiche", id: "cadre-legal", title: "Le cadre légal de la transition écologique pour les collectivités", icon: "⚖️", tag: "Comprendre", tagColor: "bg-sky-500" },
  ],
  alimentation: [
    { type: "fiche", id: "agroecologie", title: "Leviers d'un EPCI pour la transition agroécologique et l'alimentation durable", icon: "🌾", tag: "Agir", tagColor: "bg-rose-500" },
    { type: "ressource", id: "transition-ecologique-emplois", title: "La transition écologique, créatrice d'emplois dans les territoires ruraux", icon: "📄", tag: "Rapport", tagColor: "bg-emerald-500" },
  ],
  mobilité: [
    { type: "ressource", id: "reseaux-express-velo", title: "Réseaux Express Vélo : la solution pour la mobilité durable", icon: "🚲", tag: "Étude", tagColor: "bg-sky-500" },
    { type: "fiche", id: "ecolieux", title: "Pourquoi et comment soutenir le développement d'écolieux", icon: "🏡", tag: "Agir", tagColor: "bg-rose-500" },
  ],
  rejoindre: [
    { type: "ressource", id: "maire-pourquoi-faire", title: "Municipales 2026 : Maire, pourquoi faire ?", icon: "📘", tag: "Guide", tagColor: "bg-violet-500" },
    { type: "ressource", id: "abecedaire-politiques", title: "L'abécédaire des politiques publiques locales liées à la transition", icon: "📖", tag: "Guide", tagColor: "bg-violet-500" },
    { type: "ressource", id: "podcast-fabrique", title: "Le Podcast de la Fabrique des Transitions", icon: "🎙️", tag: "Podcast", tagColor: "bg-amber-500" },
  ],
  default: [
    { type: "ressource", id: "maire-pourquoi-faire", title: "Municipales 2026 : Maire, pourquoi faire ?", icon: "📘", tag: "Guide", tagColor: "bg-violet-500" },
    { type: "fiche", id: "cadre-legal", title: "Le cadre légal de la transition écologique pour les collectivités", icon: "⚖️", tag: "Comprendre", tagColor: "bg-sky-500" },
  ],
};

// ── Fake AI responses keyed by topic ──────────────────────────────────
const fakeResponses: Record<string, string> = {
  default:
    "Merci pour votre question ! En tant qu'assistant IA spécialisé dans la transition écologique, je peux vous aider à comprendre les enjeux, trouver des fiches pratiques ou vous orienter vers les bonnes ressources. N'hésitez pas à me poser une question précise !",
  énergie:
    "La transition énergétique est un levier majeur. Pour votre territoire, je vous recommande de commencer par un diagnostic énergétique local, puis d'explorer nos fiches sur les Communautés d'Énergie Renouvelable (CER). Le décret du 23 novembre 2023 offre un cadre favorable aux collectivités. Voici les contenus les plus pertinents :",
  biodiversité:
    "La préservation de la biodiversité passe par des actions concrètes : trames vertes et bleues, gestion différenciée des espaces verts, zéro phyto… Voici les ressources que je vous recommande pour approfondir le sujet :",
  financement:
    "Plusieurs dispositifs existent pour financer votre transition : le Fonds Vert (2,5 Md€ en 2024), les CEE, l'ADEME, les fonds européens FEDER/LEADER… Voici nos contenus dédiés aux finances et au financement :",
  alimentation:
    "L'alimentation durable est un formidable levier d'action locale ! PAT (Projets Alimentaires Territoriaux), restauration collective bio, circuits courts, lutte contre le gaspillage… Plus de 400 PAT sont déjà labellisés en France ! Voici nos contenus associés :",
  mobilité:
    "La mobilité représente 31% des émissions de GES en France. Pour votre collectivité, les leviers sont nombreux : plan vélo, covoiturage, transport à la demande, ZFE, bornes de recharge… Consultez ces ressources :",
  rejoindre:
    "Rejoindre Le Lierre, c'est intégrer un réseau de plus de 1 500 agents publics engagés pour la transition ! Vous accédez à des groupes de travail thématiques, des événements exclusifs et une communauté bienveillante. L'adhésion est gratuite. Voici quelques ressources pour découvrir l'écosystème :",
};

const suggestedQuestions = [
  { icon: Zap, text: "Comment financer ma transition ?", key: "financement" },
  { icon: Leaf, text: "Biodiversité : par où commencer ?", key: "biodiversité" },
  { icon: Sparkles, text: "C'est quoi Le Lierre ?", key: "rejoindre" },
];

// ── Thematic collections ("packs") ────────────────────────────────────
interface CollectionItem {
  type: "fiche" | "ressource";
  id: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
  tagColor: string;
  readTime?: string;
}

interface Collection {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  gradient: string;
  borderColor: string;
  iconColor: string;
  LucideIcon: React.ComponentType<{ className?: string }>;
  items: CollectionItem[];
}

const collections: Collection[] = [
  {
    id: "premiers-pas",
    emoji: "🎓",
    title: "Mes premiers pas d'élu",
    subtitle: "Le kit de démarrage essentiel",
    gradient: "from-violet-500 to-indigo-600",
    borderColor: "border-violet-200",
    iconColor: "text-violet-500",
    LucideIcon: GraduationCap,
    items: [
      { type: "ressource", id: "maire-pourquoi-faire", title: "Municipales 2026 : Maire, pourquoi faire ?", description: "Comprendre les enjeux du mandat 2026-2032", icon: "📘", tag: "Guide", tagColor: "bg-violet-500" },
      { type: "fiche", id: "cadre-legal", title: "Le cadre légal de la transition écologique", description: "Panorama des obligations et opportunités légales", icon: "⚖️", tag: "Comprendre", tagColor: "bg-sky-500", readTime: "14 min" },
      { type: "fiche", id: "vision-systemique", title: "Déployer une vision systémique en politique publique", description: "Pensée systémique pour des politiques plus cohérentes", icon: "🔄", tag: "Organiser", tagColor: "bg-amber-500", readTime: "10 min" },
      { type: "ressource", id: "abecedaire-politiques", title: "L'abécédaire des politiques publiques locales", description: "Guide de A à Z pour la transition écologique", icon: "📖", tag: "Guide", tagColor: "bg-violet-500" },
      { type: "fiche", id: "prestataire-prive", title: "Mobiliser un prestataire privé pour la transition", description: "Clés pour une collaboration réussie", icon: "🤝", tag: "Organiser", tagColor: "bg-amber-500", readTime: "9 min" },
    ],
  },
  {
    id: "finances-locales",
    emoji: "💰",
    title: "Finances locales & transition",
    subtitle: "Budgets, aides et financement vert",
    gradient: "from-amber-500 to-orange-600",
    borderColor: "border-amber-200",
    iconColor: "text-amber-500",
    LucideIcon: Landmark,
    items: [
      { type: "fiche", id: "finances-transition", title: "Mettre les finances au service de la transition", description: "Réorienter les budgets locaux pour accélérer", icon: "💰", tag: "Organiser", tagColor: "bg-amber-500", readTime: "13 min" },
      { type: "ressource", id: "depenses-locales-vertes", title: "Moins de brun, plus de vert", description: "Redirection nécessaire des dépenses locales", icon: "💰", tag: "Analyse", tagColor: "bg-sky-500" },
      { type: "fiche", id: "developpement-economique", title: "Enjeux environnementaux & développement économique", description: "Intégrer l'environnement dans l'économie locale", icon: "📊", tag: "Comprendre", tagColor: "bg-sky-500", readTime: "11 min" },
      { type: "ressource", id: "transition-ecologique-emplois", title: "Transition écologique, créatrice d'emplois", description: "500 000 emplois supplémentaires d'ici 2030", icon: "📄", tag: "Rapport", tagColor: "bg-emerald-500" },
    ],
  },
  {
    id: "energie-renovation",
    emoji: "⚡",
    title: "Énergie & rénovation",
    subtitle: "Transition énergétique du territoire",
    gradient: "from-sky-500 to-cyan-600",
    borderColor: "border-sky-200",
    iconColor: "text-sky-500",
    LucideIcon: Zap,
    items: [
      { type: "fiche", id: "transition-energetique", title: "Embarquer tous les ménages dans la transition énergétique", description: "Lutter contre la précarité énergétique", icon: "⚡", tag: "Agir", tagColor: "bg-rose-500", readTime: "12 min" },
      { type: "ressource", id: "contrat-performance-energetique", title: "Guide du Contrat de Performance Énergétique", description: "Mise en place d'un CPE dans les collectivités", icon: "📋", tag: "Guide", tagColor: "bg-violet-500" },
      { type: "fiche", id: "ecolieux", title: "Soutenir le développement d'écolieux", description: "Faciliter l'émergence de lieux de vie durables", icon: "🏡", tag: "Agir", tagColor: "bg-rose-500", readTime: "8 min" },
    ],
  },
  {
    id: "nature-biodiversite",
    emoji: "🦋",
    title: "Nature & biodiversité",
    subtitle: "Protéger le vivant sur son territoire",
    gradient: "from-emerald-500 to-green-600",
    borderColor: "border-emerald-200",
    iconColor: "text-emerald-500",
    LucideIcon: TreePine,
    items: [
      { type: "fiche", id: "biodiversite-locale", title: "Protéger et restaurer la biodiversité locale", description: "Politique locale ambitieuse pour la biodiversité", icon: "🦋", tag: "Agir", tagColor: "bg-rose-500", readTime: "10 min" },
      { type: "ressource", id: "renaturer-territoires", title: "Comment renaturer les territoires ?", description: "Méthodes de renaturation des espaces artificialisés", icon: "🌿", tag: "Rapport", tagColor: "bg-emerald-500" },
      { type: "ressource", id: "solutions-fondees-nature", title: "Solutions Fondées sur la Nature", description: "Levier d'adaptation au changement climatique", icon: "🌳", tag: "Étude", tagColor: "bg-sky-500" },
    ],
  },
  {
    id: "mobilite-alimentation",
    emoji: "🚲",
    title: "Mobilité & alimentation",
    subtitle: "Se déplacer et manger durable",
    gradient: "from-rose-500 to-pink-600",
    borderColor: "border-rose-200",
    iconColor: "text-rose-500",
    LucideIcon: Bike,
    items: [
      { type: "ressource", id: "reseaux-express-velo", title: "Réseaux Express Vélo pour la mobilité durable", description: "Améliorer santé et qualité de vie", icon: "🚲", tag: "Étude", tagColor: "bg-sky-500" },
      { type: "fiche", id: "agroecologie", title: "Transition agroécologique & alimentation durable", description: "Leviers d'un EPCI pour l'alimentation durable", icon: "🌾", tag: "Agir", tagColor: "bg-rose-500", readTime: "15 min" },
      { type: "ressource", id: "podcast-fabrique", title: "Podcast de la Fabrique des Transitions", description: "Échanges inspirants avec les acteurs de terrain", icon: "🎙️", tag: "Podcast", tagColor: "bg-amber-500" },
    ],
  },
];

// ── Typing indicator dots ─────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-emerald-400"
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ── Resource card component ───────────────────────────────────────────
function ResourceCard({ item, expanded }: { item: RelatedItem; expanded: boolean }) {
  const href = item.type === "fiche" ? `/fiches/${item.id}` : `/ressources/${item.id}`;
  return (
    <Link
      href={href}
      className={`group flex items-center gap-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/60 transition-all ${expanded ? "px-4 py-3 bg-white shadow-sm" : "px-3 py-2.5 bg-slate-50"}`}
    >
      <span className={`flex-none ${expanded ? "text-lg" : "text-base"}`}>{item.icon}</span>
      <div className="flex-grow min-w-0">
        <p className={`font-medium text-slate-700 group-hover:text-emerald-700 transition-colors ${expanded ? "text-sm leading-snug" : "text-xs truncate"}`}>
          {item.title}
        </p>
        {expanded && (
          <p className="text-[10px] text-slate-400 mt-0.5">
            {item.type === "fiche" ? "Fiche pratique" : "Ressource"} · {item.tag}
          </p>
        )}
      </div>
      <span className={`flex-none text-[9px] font-bold text-white px-1.5 py-0.5 rounded-md ${item.tagColor}`}>
        {item.tag}
      </span>
      <ExternalLink className="w-3 h-3 text-slate-300 flex-none group-hover:text-emerald-500 transition-colors" />
    </Link>
  );
}

// ── Types ─────────────────────────────────────────────────────────────
type TopicKey = "énergie" | "biodiversité" | "financement" | "alimentation" | "mobilité" | "rejoindre" | "default";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  topicKey?: TopicKey;
}

// ── Main component ────────────────────────────────────────────────────
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  // Stop pulse after first open
  useEffect(() => {
    if (isOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
      setShowPulse(false);
    }
  }, [isOpen, hasBeenOpened]);

  // Lock body scroll when expanded
  useEffect(() => {
    if (isExpanded && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isExpanded, isOpen]);

  const pickTopic = useCallback((text: string): TopicKey => {
    const lower = text.toLowerCase();
    if (lower.includes("énergi") || lower.includes("energi") || lower.includes("renouvelable"))
      return "énergie";
    if (lower.includes("biodiversi") || lower.includes("nature") || lower.includes("faune"))
      return "biodiversité";
    if (lower.includes("financ") || lower.includes("aide") || lower.includes("budget") || lower.includes("fonds"))
      return "financement";
    if (lower.includes("aliment") || lower.includes("agro") || lower.includes("bio") || lower.includes("restaur"))
      return "alimentation";
    if (lower.includes("mobili") || lower.includes("vélo") || lower.includes("transport") || lower.includes("voiture"))
      return "mobilité";
    if (lower.includes("lierre") || lower.includes("rejoindre") || lower.includes("réseau") || lower.includes("adhé"))
      return "rejoindre";
    return "default";
  }, []);

  const simulateResponse = useCallback(
    (userText: string) => {
      setIsTyping(true);
      const topic = pickTopic(userText);
      const responseText = fakeResponses[topic];
      const delay = 1200 + Math.random() * 1500;
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: responseText,
            timestamp: new Date(),
            topicKey: topic,
          },
        ]);
      }, delay);
    },
    [pickTopic]
  );

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    simulateResponse(trimmed);
  }, [input, isTyping, simulateResponse]);

  const handleSuggestion = useCallback(
    (text: string) => {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      simulateResponse(text);
    },
    [simulateResponse]
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) setIsExpanded(false);
      return !prev;
    });
  }, []);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  // ── Sizing classes based on expand state ──
  const windowClasses = isExpanded
    ? "fixed inset-4 sm:inset-6 md:inset-10 lg:inset-16 z-[99] flex flex-col rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/30 border border-slate-200/80"
    : "fixed bottom-24 right-6 z-[99] w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-200/80";

  return (
    <>
      {/* ═══ Backdrop for expanded mode ═══ */}
      <AnimatePresence>
        {isOpen && isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[98] bg-slate-950/40 backdrop-blur-sm"
            onClick={toggleExpand}
          />
        )}
      </AnimatePresence>

      {/* ═══ Floating Action Button ═══ */}
      <div className="fixed bottom-6 right-6 z-[100]">
        {/* Pulse rings */}
        {showPulse && !isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-pulse-ring" />
            <span
              className="absolute inset-0 rounded-full bg-emerald-400/20 animate-pulse-ring"
              style={{ animationDelay: "0.6s" }}
            />
          </>
        )}

        <motion.button
          onClick={toggleOpen}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center hover:shadow-emerald-500/50 transition-shadow"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Notification badge */}
          {!hasBeenOpened && !isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg"
            >
              1
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* ═══ Chat Window ═══ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className={windowClasses}
            style={{ transformOrigin: "bottom right" }}
          >
            {/* ── Header ── */}
            <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-5 py-4 flex-none overflow-hidden">
              {/* Subtle animated pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern
                      id="chatGrid"
                      width="24"
                      height="24"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="1" cy="1" r="1" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#chatGrid)" />
                </svg>
              </div>

              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-white font-bold text-sm">
                    Assistant Transitions
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    <span className="text-emerald-100 text-xs font-medium">
                      En ligne — IA · beta
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={toggleExpand}
                    className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
                    title={isExpanded ? "Réduire" : "Agrandir"}
                  >
                    {isExpanded ? (
                      <Minimize2 className="w-4 h-4 text-white/80" />
                    ) : (
                      <Maximize2 className="w-4 h-4 text-white/80" />
                    )}
                  </button>
                  <button
                    onClick={toggleOpen}
                    className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-white/80" />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Messages area ── */}
            <div
              ref={scrollRef}
              className="flex-grow overflow-y-auto bg-gradient-to-b from-slate-50 to-white p-4 space-y-4"
            >
              {/* Welcome screen with collections */}
              {messages.length === 0 && !isTyping && (
                <AnimatePresence mode="wait">
                  {activeCollection ? (
                    // ── Collection detail view ──
                    <motion.div
                      key={`detail-${activeCollection}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`space-y-3 ${isExpanded ? "max-w-3xl mx-auto" : ""}`}
                    >
                      {(() => {
                        const col = collections.find((c) => c.id === activeCollection);
                        if (!col) return null;
                        return (
                          <>
                            {/* Back button + header */}
                            <button
                              onClick={() => setActiveCollection(null)}
                              className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-600 transition-colors mb-1 group"
                            >
                              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                              <span className="text-xs font-medium">Retour aux collections</span>
                            </button>

                            {/* Collection banner */}
                            <div className={`relative rounded-2xl bg-gradient-to-br ${col.gradient} p-4 overflow-hidden`}>
                              <div className="absolute top-0 right-0 w-24 h-24 opacity-10 text-6xl flex items-center justify-center select-none pointer-events-none">
                                {col.emoji}
                              </div>
                              <div className="relative flex items-center gap-3">
                                <span className="text-3xl">{col.emoji}</span>
                                <div>
                                  <h4 className="text-white font-bold text-sm leading-tight">{col.title}</h4>
                                  <p className="text-white/70 text-xs mt-0.5">{col.items.length} contenus · {col.subtitle}</p>
                                </div>
                              </div>
                            </div>

                            {/* Items list */}
                            <div className={`space-y-2 ${isExpanded ? "grid grid-cols-1 sm:grid-cols-2 gap-2.5 space-y-0" : ""}`}>
                              {col.items.map((item, idx) => {
                                const href = item.type === "fiche" ? `/fiches/${item.id}` : `/ressources/${item.id}`;
                                return (
                                  <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 * idx, duration: 0.25 }}
                                  >
                                    <Link
                                      href={href}
                                      className="group flex gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/10 transition-all"
                                    >
                                      <span className="text-xl flex-none mt-0.5">{item.icon}</span>
                                      <div className="flex-grow min-w-0">
                                        <p className="text-[13px] font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors leading-snug">
                                          {item.title}
                                        </p>
                                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                                          {item.description}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                          <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded-md ${item.tagColor}`}>
                                            {item.tag}
                                          </span>
                                          <span className="text-[9px] text-slate-400 font-medium px-1.5 py-0.5 rounded-md bg-slate-100">
                                            {item.type === "fiche" ? "Fiche" : "Ressource"}
                                          </span>
                                          {item.readTime && (
                                            <span className="flex items-center gap-0.5 text-[9px] text-slate-400">
                                              <Clock className="w-2.5 h-2.5" />
                                              {item.readTime}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      <ExternalLink className="w-3.5 h-3.5 text-slate-300 flex-none mt-1 group-hover:text-emerald-500 transition-colors" />
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </div>

                            {/* Ask a question prompt */}
                            <div className="flex items-center gap-2 pt-1">
                              <div className="flex-grow h-px bg-slate-200" />
                              <span className="text-[10px] text-slate-400 font-medium flex-none">ou posez une question ci-dessous</span>
                              <div className="flex-grow h-px bg-slate-200" />
                            </div>
                          </>
                        );
                      })()}
                    </motion.div>
                  ) : (
                    // ── Collections grid (welcome) ──
                    <motion.div
                      key="collections-grid"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className={`space-y-3 ${isExpanded ? "max-w-3xl mx-auto" : ""}`}
                    >
                      {/* Bot welcome */}
                      <div className="flex gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-none shadow-md shadow-emerald-500/20">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className={`bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-slate-100 ${isExpanded ? "max-w-[80%]" : "max-w-[85%]"}`}>
                          <p className={`text-slate-700 leading-relaxed ${isExpanded ? "text-base" : "text-sm"}`}>
                            Bonjour ! 👋 Découvrez nos <span className="font-semibold text-emerald-700">collections thématiques</span> pour démarrer, ou posez-moi directement une question.
                          </p>
                        </div>
                      </div>

                      {/* Collections label */}
                      <div className="flex items-center gap-2 pl-1 pt-1">
                        <Layers className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Collections thématiques</span>
                        <span className="text-[10px] text-slate-400 ml-auto">{collections.length} packs</span>
                      </div>

                      {/* Collection cards */}
                      <div className={isExpanded ? "grid grid-cols-2 sm:grid-cols-3 gap-2.5" : "space-y-2"}>
                        {collections.map((col, idx) => (
                          <motion.button
                            key={col.id}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 * idx + 0.2, duration: 0.3 }}
                            whileHover={isExpanded ? { scale: 1.03, y: -2 } : { x: 3 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveCollection(col.id)}
                            className={`group w-full text-left rounded-xl border transition-all overflow-hidden ${col.borderColor} hover:shadow-lg hover:shadow-slate-200/60 ${isExpanded ? "bg-white" : "bg-white flex items-center gap-3 pr-3"}`}
                          >
                            {isExpanded ? (
                              // ── Expanded: vertical card ──
                              <>
                                <div className={`bg-gradient-to-br ${col.gradient} px-4 py-3 relative overflow-hidden`}>
                                  <div className="absolute -right-2 -top-2 text-4xl opacity-20 select-none pointer-events-none">{col.emoji}</div>
                                  <div className="relative flex items-center gap-2">
                                    <span className="text-2xl">{col.emoji}</span>
                                    <span className="text-white/80 text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">{col.items.length} contenus</span>
                                  </div>
                                </div>
                                <div className="px-4 py-3">
                                  <h4 className="text-sm font-bold text-slate-700 group-hover:text-emerald-700 transition-colors leading-tight">{col.title}</h4>
                                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{col.subtitle}</p>
                                  <div className="flex items-center gap-1 mt-2 text-[10px] font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                                    <span>Découvrir</span>
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                  </div>
                                </div>
                              </>
                            ) : (
                              // ── Compact: horizontal row ──
                              <>
                                <div className={`w-12 h-12 flex-none bg-gradient-to-br ${col.gradient} flex items-center justify-center rounded-l-xl`}>
                                  <span className="text-xl">{col.emoji}</span>
                                </div>
                                <div className="flex-grow min-w-0 py-2.5">
                                  <h4 className="text-[13px] font-bold text-slate-700 group-hover:text-emerald-700 transition-colors truncate leading-tight">{col.title}</h4>
                                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">{col.subtitle}</p>
                                </div>
                                <div className="flex flex-col items-center gap-0.5 flex-none">
                                  <span className="text-[10px] font-bold text-slate-500">{col.items.length}</span>
                                  <span className="text-[8px] text-slate-400">contenus</span>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-300 flex-none group-hover:text-emerald-500 transition-colors" />
                              </>
                            )}
                          </motion.button>
                        ))}
                      </div>

                      {/* Quick questions separator */}
                      <div className="flex items-center gap-2 pt-1">
                        <div className="flex-grow h-px bg-slate-200" />
                        <span className="text-[10px] text-slate-400 font-medium flex-none">Questions rapides</span>
                        <div className="flex-grow h-px bg-slate-200" />
                      </div>

                      {/* Suggested questions (compact) */}
                      <div className={isExpanded ? "grid grid-cols-3 gap-2" : "space-y-1.5"}>
                        {suggestedQuestions.map((sq) => (
                          <motion.button
                            key={sq.key}
                            whileHover={{ x: isExpanded ? 0 : 3, scale: isExpanded ? 1.02 : 1 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleSuggestion(sq.text)}
                            className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group shadow-sm"
                          >
                            <sq.icon className="w-3.5 h-3.5 text-emerald-500 flex-none" />
                            <span className="text-xs text-slate-500 group-hover:text-emerald-700 transition-colors truncate">{sq.text}</span>
                            <ArrowRight className="w-3 h-3 text-slate-300 ml-auto flex-none group-hover:text-emerald-500 transition-colors" />
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* Message bubbles */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className={`${isExpanded ? "max-w-2xl mx-auto" : ""}`}
                >
                  <div
                    className={`flex gap-2.5 ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-none shadow-sm ${
                        msg.role === "assistant"
                          ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20"
                          : "bg-gradient-to-br from-slate-700 to-slate-800 shadow-slate-500/20"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <Bot className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`px-4 py-3 leading-relaxed shadow-sm ${
                        isExpanded ? "max-w-[70%] text-sm" : "max-w-[78%] text-sm"
                      } ${
                        msg.role === "assistant"
                          ? "bg-white rounded-2xl rounded-tl-md border border-slate-100 text-slate-700"
                          : "bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl rounded-tr-md text-white"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>

                  {/* Related content cards for assistant messages */}
                  {msg.role === "assistant" && msg.topicKey && relatedContent[msg.topicKey] && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className={`mt-2.5 ml-9 space-y-1.5 ${isExpanded ? "max-w-[70%]" : ""}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <BookOpen className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                          Contenus associés
                        </span>
                      </div>
                      <div className={`space-y-1.5 ${isExpanded ? "grid grid-cols-1 sm:grid-cols-2 gap-2 space-y-0" : ""}`}>
                        {relatedContent[msg.topicKey].map((item) => (
                          <ResourceCard key={item.id} item={item} expanded={isExpanded} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${isExpanded ? "max-w-2xl mx-auto" : ""}`}
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-none shadow-sm shadow-emerald-500/20">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-slate-100">
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </div>

            {/* ── Input area ── */}
            <div className="flex-none bg-white border-t border-slate-100 px-4 py-3">
              <div className={`flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/20 transition-all ${isExpanded ? "max-w-2xl mx-auto" : ""}`}>
                <button className="text-slate-400 hover:text-emerald-500 transition-colors flex-none">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Posez votre question…"
                  className="flex-grow text-sm text-slate-700 placeholder-slate-400 bg-transparent outline-none"
                  disabled={isTyping}
                />
                <button className="text-slate-400 hover:text-emerald-500 transition-colors flex-none">
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-none transition-all ${
                    input.trim() && !isTyping
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/30 cursor-pointer"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className={`text-center text-[10px] text-slate-400 mt-2 ${isExpanded ? "max-w-2xl mx-auto" : ""}`}>
                IA expérimentale · Réponses à titre indicatif
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
