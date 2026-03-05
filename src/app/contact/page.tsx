"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Send,
  MapPin,
  Users,
  ArrowUpRight,
  Heart,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-emerald-50/80 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-[15%] w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-[10%] w-96 h-96 bg-teal-100/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              Contactez-nous
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6">
              Parlons <span className="gradient-text">transition</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Une question, une suggestion, une envie de contribuer ? Nous sommes à
              votre écoute.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl shadow-slate-100/50">
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Prénom
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Nom
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900"
                        placeholder="votre@email.fr"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Fonction / Institution
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900"
                        placeholder="Ex: Élu municipal, DGS, Agent territorial..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Objet
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 bg-white">
                        <option value="">Sélectionnez un objet</option>
                        <option>Contribuer à une fiche</option>
                        <option>Proposer une ressource</option>
                        <option>Signaler une erreur</option>
                        <option>Partenariat</option>
                        <option>Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 resize-none"
                        placeholder="Votre message..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
                    >
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection delay={0.1}>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <Mail className="w-8 h-8 text-emerald-600 mb-3" />
                  <h3 className="font-bold text-slate-900 mb-2">Par email</h3>
                  <a
                    href="mailto:contact@solutionstransitions.fr"
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    contact@solutionstransitions.fr
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <MapPin className="w-8 h-8 text-emerald-600 mb-3" />
                  <h3 className="font-bold text-slate-900 mb-2">Le Lierre</h3>
                  <p className="text-sm text-slate-500">Paris, France</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 text-white">
                  <Heart className="w-8 h-8 text-emerald-200 mb-3" />
                  <h3 className="font-bold mb-2">Rejoindre le réseau</h3>
                  <p className="text-sm text-emerald-100 mb-4">
                    Devenez membre du Lierre pour accéder à l&apos;ensemble des ressources
                    et participer activement.
                  </p>
                  <a
                    href="https://le-lierre.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-emerald-700 font-bold rounded-xl hover:shadow-lg transition-all text-sm"
                  >
                    <Users className="w-4 h-4" />
                    Rejoindre
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
