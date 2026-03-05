"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Clock,
  Tag,
  Share2,
  BookmarkPlus,
  ChevronRight,
  ExternalLink,
  Users,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Heart,
  MessageSquare,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const ficheData: Record<string, {
  title: string;
  category: string;
  categoryColor: string;
  icon: string;
  readTime: string;
  tags: string[];
  summary: string;
  sections: {
    id: string;
    title: string;
    content: string[];
    type?: "info" | "warning" | "example" | "default";
  }[];
  keyFigures: { value: string; label: string }[];
  relatedFiches: { id: string; title: string; category: string }[];
}> = {
  "transition-energetique": {
    title: "Embarquer tous les ménages dans une transition énergétique juste",
    category: "Agir",
    categoryColor: "bg-rose-500",
    icon: "⚡",
    readTime: "12 min",
    tags: ["Énergie", "Justice sociale", "Rénovation", "Précarité", "PCAET"],
    summary:
      "Après avoir défini le sujet de la précarité énergétique, cette fiche s'intéresse au pourquoi et au comment mobiliser les leviers à la main des collectivités pour intervenir sur cet enjeu. Elle propose un focus sur le programme Slime et quelques exemples inspirants.",
    sections: [
      {
        id: "definition",
        title: "Précarité énergétique : de quoi parle-t-on ?",
        type: "info",
        content: [
          "La loi reconnaît la précarité énergétique comme une \"difficulté à disposer de la fourniture d'énergie nécessaire à la satisfaction de ses besoins élémentaires en raison de l'inadaptation de ses ressources ou de ses conditions d'habitat\" (loi du 10 juillet 2010, dite \"loi Grenelle 2\").",
          "Derrière cette définition légale se cachent des réalités très différentes, liées à des causes multiples et souvent cumulatives : la qualité du logement et son isolation thermique, le niveau de revenu des occupants, le prix des énergies en évolution continue, et le non-recours aux aides existantes.",
          "Les conséquences sont économiques (impayés, endettement), techniques (dégradation du logement), et sanitaires (restrictions de chauffage, risques pour la santé physique et mentale).",
          "En France sont particulièrement exposés : les personnes âgées dans des logements anciens, les ménages isolés et familles monoparentales, les locataires du parc privé dans des passoires thermiques, et les ménages dans des logements non rénovés utilisant gaz ou fioul.",
        ],
      },
      {
        id: "pourquoi",
        title: "Pourquoi agir contre la précarité énergétique ?",
        type: "default",
        content: [
          "Pour réduire les inégalités et augmenter le pouvoir d'achat : plus de 3 millions de ménages (10,1%) sont concernés par des dépenses d'énergie excessives, et 35% des Français déclarent avoir eu froid dans leur logement.",
          "Pour optimiser l'efficacité des aides publiques : sur 1 million de nouveaux bénéficiaires attendus du chèque énergie en 2024, seuls 160 000 l'ont utilisé — soit un taux de non-recours de 84% !",
          "Pour favoriser la rénovation des 4,2 millions de passoires énergétiques en France (13,9% du parc). Éradiquer ces passoires éviterait 6 millions de tonnes de GES et créerait plus de 126 000 emplois.",
          "Pour répondre à un enjeu sanitaire : chaque euro investi dans la rénovation énergétique engendre 30 centimes d'économie en dépenses de santé.",
        ],
      },
      {
        id: "leviers",
        title: "Quels leviers mobiliser à l'échelle locale ?",
        type: "default",
        content: [
          "Des aides complémentaires à MaPrimeRénov', qui viennent renforcer les niveaux d'aide et d'accompagnement, parfois les niveaux d'exigence des travaux.",
          "Des fonds d'aide aux \"petits travaux\" et des caisses d'avance pour avancer les subventions aux ménages qui en bénéficient.",
          "Des aides extra-légales proposées par certains CCAS (aides au paiement des factures d'énergie et achat d'équipement ménager).",
          "Des dispositifs de médiation bailleur-locataire pour améliorer la qualité énergétique du parc locatif privé.",
          "Des programmes dédiés financés par les CEE : le Slime, Bail Rénov', Territoires Zéro Exclusion Énergétique.",
          "Le double enjeu local consiste à faire \"se rencontrer\" les dispositifs et leurs publics, et à construire une réponse articulant enjeux sociaux des ménages et enjeux techniques liés au bâti.",
        ],
      },
      {
        id: "slime",
        title: "Le programme Slime : repérage et accompagnement des ménages",
        type: "info",
        content: [
          "Porté depuis 2013 par Cler Solutions, le Slime (Service Local d'Intervention pour la Maîtrise de l'Énergie) est un programme éligible aux Certificats d'Économies d'Énergie qui cofinance les actions des collectivités territoriales.",
          "Une cinquantaine de collectivités sont engagées : Conseils départementaux, Métropoles, Communautés urbaines et de communes, villes, CCAS, syndicats d'énergie, PNR...",
          "Le Slime s'appuie sur 3 principes : la transition énergétique juste (égal accès de tous à des conditions de logement dignes), la coordination avec les politiques publiques existantes, et l'accompagnement sur-mesure des ménages.",
          "Il se déploie en 3 étapes : le repérage des situations via un réseau de donneurs d'alerte, les visites à domicile pour qualifier les situations et installer des équipements d'économie d'énergie, et l'orientation vers les solutions adaptées.",
        ],
      },
      {
        id: "exemples",
        title: "Quelques exemples d'actions inspirantes",
        type: "example",
        content: [
          "Grand Paris Seine-Ouest missionne les conseillers France Rénov' pour proposer un accompagnement global, du repérage à la réalisation de travaux énergétiques.",
          "La Métropole de Lyon mobilise plusieurs programmes CEE pour mutualiser l'animation territoriale et proposer des solutions sur-mesure aux ménages propriétaires et locataires.",
          "La ville de Marseille fait un lien fort entre copropriétés dégradées, lutte contre l'insalubrité et accompagnement social en mutualisant les informations de repérage.",
          "Le Parc éolien citoyen de l'Hyrôme (Mauges Communauté) subventionne depuis 2022 les actions de lutte contre la précarité énergétique du CCAS local.",
          "La Métropole de Brest a mis en place un Bricobus avec les Compagnons Bâtisseurs pour poser gratuitement des équipements économes et réparer installations défectueuses.",
        ],
      },
      {
        id: "resultats",
        title: "Des résultats concrets pour les ménages",
        type: "default",
        content: [
          "Plus de 80% des ménages réalisent une première action suite à la visite Slime : suivi des factures, interpellation du bailleur, contact avec un professionnel du territoire.",
          "65% réalisent une action engageante comme des travaux, le changement d'équipements énergivores, ou un déménagement.",
          "Plus de 60% se sentent suffisamment acteurs pour transmettre les conseils reçus à des personnes qu'ils connaissent.",
        ],
      },
    ],
    keyFigures: [
      { value: "3M+", label: "ménages en précarité énergétique" },
      { value: "84%", label: "de non-recours au chèque énergie" },
      { value: "4,2M", label: "passoires énergétiques en France" },
      { value: "80%", label: "des ménages agissent après une visite Slime" },
    ],
    relatedFiches: [
      {
        id: "vision-systemique",
        title: "Comment déployer une vision systémique dans un projet de politique publique ?",
        category: "Organiser",
      },
      {
        id: "ecolieux",
        title: "Pourquoi et comment soutenir le développement d'écolieux",
        category: "Agir",
      },
      {
        id: "agroecologie",
        title: "Leviers d'un EPCI pour la transition agroécologique",
        category: "Agir",
      },
    ],
  },
};

const defaultFiche = ficheData["transition-energetique"];

export default function FicheDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const fiche = defaultFiche;

  const sectionIcons: Record<string, React.ReactNode> = {
    info: <Lightbulb className="w-5 h-5 text-sky-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    example: <Building2 className="w-5 h-5 text-emerald-500" />,
    default: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
  };

  const sectionColors: Record<string, string> = {
    info: "border-l-sky-500 bg-sky-50/50",
    warning: "border-l-amber-500 bg-amber-50/50",
    example: "border-l-emerald-500 bg-emerald-50/50",
    default: "",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-[10%] w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-[20%] w-96 h-96 bg-teal-100/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/fiches"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux fiches
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`${fiche.categoryColor} text-white text-sm font-bold px-4 py-1.5 rounded-full`}>
                {fiche.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                {fiche.readTime} de lecture
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              <span className="text-5xl mr-3">{fiche.icon}</span>
              {fiche.title}
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {fiche.summary}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {fiche.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-full font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
                <Download className="w-4 h-4" />
                Télécharger la fiche (PDF)
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                <Share2 className="w-4 h-4" />
                Partager
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                <BookmarkPlus className="w-4 h-4" />
                Sauvegarder
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Figures */}
      <section className="py-12 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {fiche.keyFigures.map((fig, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                  {fig.value}
                </div>
                <div className="text-sm text-emerald-100">{fig.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents + Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[250px_1fr] gap-12">
            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                  Sommaire
                </h3>
                <nav className="space-y-1">
                  {fiche.sections.map((section, i) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-start gap-2 px-3 py-2 text-sm text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                    >
                      <span className="text-xs text-slate-400 mt-0.5 font-mono w-4">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug">{section.title}</span>
                    </a>
                  ))}
                </nav>

                <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <p className="text-sm font-semibold text-emerald-800 mb-2">
                    Besoin d&apos;aide ?
                  </p>
                  <p className="text-xs text-emerald-600 mb-3">
                    Notre assistant IA peut répondre à vos questions sur cette fiche.
                  </p>
                  <Link
                    href="/assistant"
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    Poser une question <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="space-y-12">
              {fiche.sections.map((section, i) => (
                <AnimatedSection key={section.id} delay={i * 0.05}>
                  <div id={section.id} className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        {section.title}
                      </h2>
                    </div>

                    <div className={`space-y-4 ${section.type && section.type !== "default" ? `border-l-4 ${sectionColors[section.type || "default"]} p-6 rounded-r-xl` : ""}`}>
                      {section.content.map((paragraph, j) => (
                        <p
                          key={j}
                          className="text-slate-600 leading-relaxed text-[15px]"
                        >
                          {section.type === "example" && (
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold mr-1">
                              <CheckCircle2 className="w-4 h-4 inline" />
                            </span>
                          )}
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Fiches */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Fiches associées
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {fiche.relatedFiches.map((related) => (
                <Link key={related.id} href={`/fiches/${related.id}`}>
                  <div className="group bg-white rounded-2xl p-6 border border-slate-100 card-hover h-full">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
                      {related.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-3 mb-4 leading-snug group-hover:text-emerald-700 transition-colors">
                      {related.title}
                    </h3>
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      Lire <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-10 sm:p-14 text-center text-white">
              <MessageSquare className="w-10 h-10 mx-auto mb-4 text-emerald-200" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Et si on avançait ensemble ?
              </h2>
              <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
                Ce contenu vous fait réagir ? Vous souhaitez le compléter, corriger une
                erreur ou partager des bonnes pratiques ?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 bg-white text-emerald-700 font-bold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Contribuer au projet
                </Link>
                <a
                  href="https://le-lierre.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 text-white font-bold border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Rejoindre Le Lierre
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
