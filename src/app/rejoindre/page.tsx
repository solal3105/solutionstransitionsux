"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Heart,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  MessageSquare,
  Calendar,
  Network,
  Shield,
  Zap,
  Star,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CounterAnimation from "@/components/CounterAnimation";

const benefits = [
  {
    icon: BookOpen,
    title: "Accès privilégié aux contenus",
    description: "Fiches pratiques, analyses exclusives et ressources avant leur publication.",
  },
  {
    icon: Network,
    title: "Un réseau d'experts",
    description: "Échangez avec des agents, élus et experts de la transition écologique.",
  },
  {
    icon: Calendar,
    title: "Événements & rencontres",
    description: "Tables-rondes, conférences et ateliers pour approfondir vos connaissances.",
  },
  {
    icon: MessageSquare,
    title: "Contribuer aux contenus",
    description: "Participez à la rédaction et à l'amélioration des fiches pratiques.",
  },
  {
    icon: Shield,
    title: "Un espace de confiance",
    description: "Un cadre bienveillant et non-partisan pour échanger sur la transition.",
  },
  {
    icon: Zap,
    title: "Impact concret",
    description: "Vos contributions alimentent directement les outils utilisés sur le terrain.",
  },
];

const testimonials = [
  {
    quote:
      "Solutions Transitions m'a permis de structurer mon approche de la transition écologique au sein de ma commune. Les fiches sont remarquablement claires.",
    name: "Marie D.",
    role: "Élue municipale, Bretagne",
  },
  {
    quote:
      "En tant que DGS, je recommande régulièrement les ressources à mes équipes. C'est un gain de temps considérable pour la montée en compétences.",
    name: "Thomas L.",
    role: "DGS, Intercommunalité Auvergne",
  },
  {
    quote:
      "Le réseau Le Lierre permet de sortir de l'isolement. On trouve des pairs qui partagent les mêmes défis et les mêmes ambitions.",
    name: "Sophie M.",
    role: "Directrice Environnement, Métropole",
  },
];

export default function RejoindrePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-emerald-50/80 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-[10%] w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-[20%] w-96 h-96 bg-teal-100/40 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Rejoignez le mouvement
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              Ensemble, faisons avancer la{" "}
              <span className="gradient-text">transition</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
              Le Lierre est un réseau professionnel qui rassemble agents publics, élus et
              acteurs engagés pour accélérer la transition écologique et solidaire.
            </p>
            <a
              href="https://le-lierre.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-1"
            >
              <Users className="w-5 h-5" />
              Rejoindre Le Lierre
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Pourquoi <span className="gradient-text">nous rejoindre</span> ?
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Être membre, c&apos;est accéder à un écosystème unique au service de la transition.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="p-7 bg-white rounded-3xl border border-slate-100 card-hover h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-5">
                    <b.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Ils font partie du réseau
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="bg-white rounded-3xl p-8 border border-slate-100 card-hover h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 leading-relaxed italic mb-6 flex-grow">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: 1500, suffix: "+", label: "membres actifs" },
              { value: 20, suffix: "+", label: "partenaires" },
              { value: 50, suffix: "+", label: "événements par an" },
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

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Heart className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Prêt à faire la différence ?
            </h2>
            <p className="text-xl text-slate-500 mb-10 max-w-xl mx-auto">
              Rejoignez une communauté de professionnels engagés pour la transition
              écologique et solidaire des territoires.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://le-lierre.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-1 flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Rejoindre Le Lierre
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 text-lg font-bold text-slate-700 border-2 border-slate-200 rounded-2xl hover:border-emerald-300 hover:bg-emerald-50 transition-all"
              >
                Nous contacter
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
