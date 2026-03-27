"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Heart, Mail, ExternalLink } from "lucide-react";

const footerLinks = {
  Thématiques: [
    { label: "Énergie", href: "/fiches?theme=Énergie" },
    { label: "Mobilité", href: "/fiches?theme=Mobilité" },
    { label: "Agriculture & alimentation", href: "/fiches?theme=Agriculture+%26+alimentation" },
    { label: "Biodiversité & nature", href: "/fiches?theme=Biodiversité+%26+nature" },
    { label: "Économie & finances", href: "/fiches?theme=Économie+%26+finances" },
    { label: "Actualités & Agenda", href: "/actualites" },
  ],
  Participer: [
    { label: "S'engager", href: "/rejoindre" },
    { label: "Contribuer", href: "/contact" },
    { label: "Le Projet", href: "/projet" },
    { label: "Assistant IA", href: "/assistant" },
    { label: "FAQ", href: "/faq" },
  ],
  Partenaires: [
    { label: "Le Lierre", href: "https://le-lierre.fr/", external: true },
    { label: "ADEME", href: "https://www.ademe.fr/", external: true },
    { label: "CLER", href: "https://cler.org/", external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex mb-6 group">
              <Image
                src="/images/logo-horiz.png"
                alt="Solutions Transitions"
                width={220}
                height={97}
                className="h-11 w-auto object-contain brightness-0 invert group-hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-sm">
              Une boîte à outils pour les élus, agents et acteurs locaux qui veulent agir
              concrètement en faveur de la transition écologique et solidaire.
            </p>
            <p className="text-sm text-slate-500">
              Un projet porté par{" "}
              <a
                href="https://le-lierre.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
              >
                Le Lierre <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {(link as { external?: boolean }).external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Solutions Transitions. Tous droits réservés.
          </p>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            Fait avec <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> pour les
            territoires
          </p>
        </div>
      </div>
    </footer>
  );
}
