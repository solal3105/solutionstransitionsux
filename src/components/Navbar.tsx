"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Fiches", href: "/fiches" },
  { label: "Ressources", href: "/fiches?type=ressource" },
  { label: "Actualités", href: "/actualites" },
  { label: "Le Projet", href: "/projet" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        setMobileOpen(false);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const close = useCallback(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm shadow-slate-200/60 border-b border-slate-100" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 group" onClick={close}>
              <Image
                src="/images/logo-horiz.png"
                alt="Solutions Transitions"
                width={180}
                height={79}
                className="h-9 w-auto object-contain group-hover:opacity-80 transition-opacity"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive(link.href)
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-emerald-50 -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => { setSearchOpen(true); setMobileOpen(false); }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline text-slate-400">Rechercher</span>
                <kbd className="hidden lg:inline-flex px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-400">⌘K</kbd>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.25, 0.4, 0.25, 1] }}
              className="md:hidden overflow-hidden bg-white border-t border-slate-100"
            >
              <nav className="px-4 py-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.href)
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ═══ Command Palette / Search Overlay ═══ */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh]"
            onClick={close}
          >
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative w-full max-w-xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-200 overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
                  <Search className="w-5 h-5 text-slate-400 flex-none" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un sujet, une fiche, une ressource..."
                    className="flex-grow text-base text-slate-900 placeholder-slate-400 outline-none bg-transparent"
                  />
                  <kbd className="flex-none px-2 py-1 rounded-md bg-slate-100 text-[10px] font-mono text-slate-400">
                    ESC
                  </kbd>
                </div>

                {/* Quick Results */}
                <div className="p-3 max-h-[50vh] overflow-y-auto">
                  <p className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Accès rapide
                  </p>
                  {[
                    { label: "Transition énergétique juste", href: "/fiches/transition-energetique", tag: "Fiche", icon: "⚡" },
                    { label: "Transition écologique & emplois ruraux", href: "/ressources/transition-ecologique-emplois", tag: "Ressource", icon: "📄" },
                    { label: "Agroécologie et alimentation durable", href: "/fiches/agroecologie", tag: "Fiche", icon: "🌾" },
                    { label: "Agenda des événements", href: "/actualites", tag: "Actualités", icon: "📅" },
                    { label: "Rejoindre Le Lierre", href: "/rejoindre", tag: "Réseau", icon: "💚" },
                  ]
                    .filter(
                      (item) =>
                        searchQuery === "" ||
                        item.label.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={close}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-emerald-50 transition-colors group"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <div className="flex-grow min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate group-hover:text-emerald-700 transition-colors">
                            {item.label}
                          </p>
                        </div>
                        <span className="flex-none text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 flex-none group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
