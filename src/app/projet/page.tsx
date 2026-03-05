"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  FileText,
  Share2,
  Calendar,
  Globe,
  Heart,
  Lightbulb,
  Target,
  Zap,
  Building2,
  ExternalLink,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CounterAnimation from "@/components/CounterAnimation";

const partners = [
  "Le Lierre",
  "ADEME",
  "CLER",
  "ADCF",
  "ANPP",
  "Banque des Territoires",
  "I4CE",
  "Réseau Action Climat",
  "CEREMA",
  "FNAU",
  "La Fabrique des Transitions",
  "France Urbaine",
  "Intercommunalités de France",
  "APVF",
  "ADGCF",
  "Villes de France",
  "ANCT",
  "France Nature Environnement",
  "Fondation pour la Nature et l'Homme",
  "WWF France",
];

const timeline = [
  {
    year: "2024",
    title: "Lancement du projet",
    description:
      "Le Lierre initie Solutions Transitions avec ses premiers partenaires pour préparer les municipales 2026.",
  },
  {
    year: "2025",
    title: "Premières fiches et ressources",
    description:
      "Publication des premières fiches pratiques et constitution de la bibliothèque de ressources.",
  },
  {
    year: "2026",
    title: "Municipales & passage à l'échelle",
    description:
      "Déploiement massif en vue des élections municipales de mars 2026 pour accompagner les candidats et élus.",
  },
];

export default function ProjetPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-emerald-50/80 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-[10%] w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-[15%] w-96 h-96 bg-teal-100/40 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Notre mission
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              Solutions <span className="gradient-text">Transitions</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Une boîte à outils pour faciliter l&apos;action dans les territoires.
              Portée par{" "}
              <a
                href="https://le-lierre.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1"
              >
                Le Lierre <ExternalLink className="w-4 h-4" />
              </a>{" "}
              et une coalition de plus de 20 partenaires.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Le constat */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4 block">
                  Notre constat
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  Les territoires sont au cœur de la transition écologique
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Les élections municipales de mars 2026 sont décisives pour le devenir de
                  nos territoires. Les agents et élus de bonne volonté ne manquent pas, mais
                  tous ne savent pas comment faire.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Ils n&apos;ont pas toujours les outils disponibles, l&apos;expertise ou les
                  compétences pour déployer facilement et efficacement les politiques
                  environnementales et leur versant social.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Building2,
                    title: "Les collectivités sont incontournables",
                    description:
                      "Le bloc local dispose de budgets et compétences clés pour mettre en œuvre la planification écologique.",
                  },
                  {
                    icon: Users,
                    title: "Les élus locaux sont légitimes",
                    description:
                      "65% des Français font confiance à leur maire. Plus on s'éloigne du local, plus la confiance diminue.",
                  },
                  {
                    icon: Globe,
                    title: "Une conscience écologique partagée",
                    description:
                      "Depuis 15 ans, des collectivités de tous bords mettent en œuvre la transition avec pragmatisme.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <div className="flex-none w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Ce que nous faisons */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4 block">
              Un projet, des actions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Ce que nous faisons
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Produire du contenu",
                color: "from-sky-400 to-sky-600",
                shadowColor: "shadow-sky-500/25",
                description:
                  "Notes, fiches méthodologiques et thématiques, analyses, retours d'expérience et bonnes pratiques pour la montée en compétences.",
              },
              {
                icon: Share2,
                title: "Diffuser, simplifier",
                color: "from-amber-400 to-amber-600",
                shadowColor: "shadow-amber-500/25",
                description:
                  "Rendre accessibles les ressources existantes sur les thématiques traitées par des acteurs de confiance reconnus pour leur expertise.",
              },
              {
                icon: Calendar,
                title: "Organiser",
                color: "from-rose-400 to-rose-600",
                shadowColor: "shadow-rose-500/25",
                description:
                  "Tables-rondes, conférences, salons et événements pour créer du lien entre acteurs de la transition et favoriser le partage.",
              },
            ].map((action, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="bg-white rounded-3xl p-8 border border-slate-100 card-hover h-full">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg ${action.shadowColor} mb-6`}
                  >
                    <action.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {action.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {action.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: 26, suffix: "+", label: "Fiches pratiques" },
              { value: 50, suffix: "+", label: "Ressources" },
              { value: 20, suffix: "+", label: "Partenaires" },
              { value: 15, suffix: "", label: "Thématiques" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl sm:text-5xl font-extrabold text-emerald-300 mb-2">
                  <CounterAnimation end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-emerald-200/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Notre parcours
            </h2>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-emerald-200" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.15} direction="left">
                  <div className="flex gap-6">
                    <div className="flex-none relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/25">
                        {item.year}
                      </div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4 block">
              Une coalition inédite
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Nos partenaires
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Plus de 20 organisations impliquées dans la transition écologique et
              solidaire des territoires.
            </p>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((partner, i) => (
              <AnimatedSection key={i} delay={i * 0.03}>
                <div className="px-6 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
                  <span className="text-sm font-semibold text-slate-700">
                    {partner}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 rounded-[2.5rem] p-12 sm:p-16 text-center text-white overflow-hidden relative">
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern
                      id="projCircles"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle
                        cx="20"
                        cy="20"
                        r="8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#projCircles)" />
                </svg>
              </div>

              <div className="relative">
                <h2 className="text-3xl sm:text-5xl font-bold mb-6">
                  Envie de rejoindre <br />
                  <span className="text-emerald-200">le mouvement ?</span>
                </h2>
                <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto">
                  Que vous soyez élu, agent territorial, associatif ou simplement citoyen
                  engagé, il y a une place pour vous dans cette aventure.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://le-lierre.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl hover:shadow-2xl hover:shadow-black/20 transition-all hover:-translate-y-1 flex items-center gap-2"
                  >
                    <Users className="w-5 h-5" />
                    Rejoindre Le Lierre
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <Link
                    href="/contact"
                    className="px-8 py-4 text-white font-bold border-2 border-white/30 rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
