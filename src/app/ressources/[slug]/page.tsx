"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  ExternalLink,
  Tag,
  Share2,
  BookmarkPlus,
  Calendar,
  Building2,
  Users,
  Heart,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  MapPin,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CounterAnimation from "@/components/CounterAnimation";

export default function ResourceDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-violet-50/50 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-violet-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-[20%] w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/ressources"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux ressources
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-emerald-100 text-emerald-700 text-sm font-bold px-4 py-1.5 rounded-full">
                Rapport
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <Calendar className="w-4 h-4" />
                Janvier 2026
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <Building2 className="w-4 h-4" />
                Réseau Action Climat
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              <span className="text-5xl mr-3">📄</span>
              La transition écologique, créatrice d&apos;emplois dans les territoires ruraux
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              À l&apos;horizon 2030, la transition écologique pourrait créer près de 500 000
              emplois supplémentaires en France. Cette étude conduite par le Réseau Action
              Climat décrit les bénéfices pour les territoires ruraux, souvent perçus comme
              éloignés de la transition.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {["Emploi", "Territoires ruraux", "Planification", "Rénovation", "Réindustrialisation"].map((tag) => (
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
              <a
                href="https://reseauactionclimat.org/wp-content/uploads/2026/01/2026-01-19-publication-emploi-rural-web-pap.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Télécharger le rapport (PDF)
              </a>
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
            {[
              { value: "500K", label: "emplois à créer d'ici 2030" },
              { value: "100K+", label: "emplois en zones rurales" },
              { value: "90%", label: "des zones rurales gagnantes" },
              { value: "250K", label: "emplois rénovation en 2050" },
            ].map((fig, i) => (
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

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose-like space-y-12">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-bold">
                  01
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Les territoires ruraux, grands gagnants de la transition
                </h2>
              </div>
              <div className="space-y-4 border-l-4 border-l-emerald-500 bg-emerald-50/50 p-6 rounded-r-xl">
                <p className="text-slate-600 leading-relaxed text-[15px]">
                  Basée sur les calculs du cabinet Sémaphores, l&apos;étude montre que plus de
                  100 000 emplois sont à créer dans le secteur privé d&apos;ici 2030 dans les
                  territoires ruraux, en appliquant les hypothèses fixées pour la
                  planification écologique de la France.
                </p>
                <p className="text-slate-600 leading-relaxed text-[15px]">
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold mr-1">
                    <CheckCircle2 className="w-4 h-4 inline" />
                  </span>
                  +90% des zones rurales en revitalisation seraient gagnantes en termes
                  d&apos;emploi, dans l&apos;hypothèse d&apos;un scénario de réindustrialisation verte
                  volontariste.
                </p>
                <p className="text-slate-600 leading-relaxed text-[15px]">
                  La réindustrialisation au service de la transition écologique permettrait
                  de revitaliser les bassins industriels en perte de vitesse, souvent situés
                  dans les territoires ruraux les plus fragiles.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-bold">
                  02
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  La rénovation énergétique : premier pourvoyeur d&apos;emplois
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed text-[15px]">
                  La rénovation des bâtiments est de loin le secteur le plus générateur
                  d&apos;emplois écologiques à horizon 2030 dans l&apos;ensemble des territoires
                  français.
                </p>
                <p className="text-slate-600 leading-relaxed text-[15px]">
                  L&apos;analyse conduite en lien avec l&apos;Institut négaWatt montre qu&apos;un objectif
                  ambitieux de rénovation du bâti mobiliserait au global environ 200 000
                  emplois de la filière du bâtiment dans les intercommunalités rurales en
                  2030. Et ce chiffre monte à plus de 250 000 d&apos;ici à 2050.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-bold">
                  03
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Une opportunité à saisir avant les élections municipales
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed text-[15px]">
                  À la veille des élections locales, des propositions pour l&apos;action publique
                  sont mises sur la table pour valoriser les potentiels de développement
                  local :
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {[
                    {
                      icon: TrendingUp,
                      title: "Planification écologique",
                      desc: "Se saisir de la planification pour générer des impacts positifs et non délocalisables dans les territoires ruraux.",
                    },
                    {
                      icon: MapPin,
                      title: "Ambition territoriale",
                      desc: "Pousser partout l'ambition de transition : les politiques locales pour le climat sont alliées du développement local.",
                    },
                    {
                      icon: Briefcase,
                      title: "Réseau emploi et formation",
                      desc: "Mobiliser le réseau local de l'emploi et de la formation pour répondre aux besoins de la transition.",
                    },
                    {
                      icon: Heart,
                      title: "Soutien ciblé",
                      desc: "Porter une attention et un soutien spécifique aux territoires potentiellement fragiles.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-slate-50 rounded-2xl border border-slate-100"
                    >
                      <item.icon className="w-6 h-6 text-emerald-600 mb-3" />
                      <h4 className="font-bold text-slate-900 text-sm mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Source */}
            <AnimatedSection delay={0.2}>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Source</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Réseau Action Climat, en lien avec dix partenaires experts dont l&apos;Institut
                  négaWatt et le cabinet Sémaphores.
                </p>
                <a
                  href="https://reseauactionclimat.org/wp-content/uploads/2026/01/2026-01-19-publication-emploi-rural-web-pap.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Accéder au document original
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Ressources associées
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: "Municipales 2026 : Maire, pourquoi faire ?", type: "Guide", icon: "📘" },
                { title: "Moins de brun, plus de vert : redirection des dépenses locales", type: "Analyse", icon: "💰" },
                { title: "Réseaux Express Vélo : la solution pour la mobilité durable", type: "Étude", icon: "🚲" },
              ].map((r, i) => (
                <Link key={i} href="/ressources">
                  <div className="group bg-white rounded-2xl p-6 border border-slate-100 card-hover h-full">
                    <div className="text-2xl mb-3">{r.icon}</div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
                      {r.type}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-3 mb-4 leading-snug group-hover:text-emerald-700 transition-colors">
                      {r.title}
                    </h3>
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      Voir <ArrowRight className="w-3 h-3" />
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
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Vous connaissez une ressource pertinente ?
              </h2>
              <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
                Aidez-nous à enrichir cette bibliothèque en partageant des ressources
                fiables et utiles pour les acteurs de la transition.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 bg-white text-emerald-700 font-bold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                >
                  Proposer une ressource
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
