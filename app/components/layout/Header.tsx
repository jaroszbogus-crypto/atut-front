"use client";
import type { Language, EuProject } from "../../types";
import React, { useState, useEffect } from "react";
import FlagIcon from "../ui/FlagIcon"; // Importujemy nasz nowy, mały klocek!

interface HeaderProps {
  drupalLanguages?: Language[];
  drupalEuProjects?: EuProject[];
}

export default function Header({ drupalLanguages, drupalEuProjects }: HeaderProps) {
  // 💡 ZMIANA 1: Rozbudowana tablica 6 języków (zgodnie z Twoją listą)
  const languages = drupalLanguages || [
    { code: "PL", label: "Polski", url: "#lang-pl", active: true },
    { code: "EN", label: "English", url: "#lang-en", active: false },
    { code: "TR", label: "Türkçe", url: "#lang-tr", active: false },
    { code: "VI", label: "Tiếng Việt", url: "#lang-vi", active: false },
    { code: "UK", label: "Українська", url: "#lang-uk", active: false },
    { code: "DE", label: "Deutsch", url: "#lang-de", active: false },
  ];

  const euProjects = drupalEuProjects || [
    {
      title: "Wdrożenie systemów IoT w procesach...",
      id: "POIR-01-2024",
      url: "/projekty-ue",
    },
    {
      title: "Rozwój innowacyjnego centrum prefabrykacji...",
      id: "POPW-03-2025",
      url: "/projekty-ue",
    },
  ];

  const currentLang = languages.find((l) => l.active) || languages[0];
  const limitedEuProjects = euProjects.slice(0, 3);

  // Stany TYLKO dla Headera
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileEuOpen, setIsMobileEuOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);

  // Detektor scrolla - wyizolowany z HeroSlidera
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`left-0 w-full z-50 h-24 ${
        isScrolled
          ? "fixed top-0 h-20 shadow-lg bg-[rgba(22,39,56,0.95)] backdrop-blur-md animate-slide-down"
          : "absolute top-0 bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b from-black/60 to-transparent transition-opacity duration-500 pointer-events-none ${isScrolled ? "opacity-0" : "opacity-100"}`}
      ></div>
      <div
        className={`absolute inset-0 bg-[rgba(22,39,56,0.95)] backdrop-blur-md transition-opacity duration-500 pointer-events-none ${isScrolled ? "opacity-100" : "opacity-0"}`}
      ></div>

      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center relative z-10">
        {/* LOGO */}
        <div className="flex items-center h-16 w-auto cursor-pointer transition-all duration-300">
          <img
            src="/images/logo-atut.svg"
            alt="Logo ATUT"
            className="h-full w-auto object-contain drop-shadow-md"
          />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-8 text-white font-bold text-sm uppercase tracking-widest">
            <a
              href="#"
              className="hover:text-red-500 transition-colors duration-300"
            >
              Start
            </a>
            <a
              href="#"
              className="hover:text-red-500 transition-colors duration-300"
            >
              O nas
            </a>
            <a
              href="#"
              className="hover:text-red-500 transition-colors duration-300"
            >
              Oferta
            </a>
            <a
              href="#"
              className="hover:text-red-500 transition-colors duration-300"
            >
              Zakres usług
            </a>
            <a
              href="#"
              className="hover:text-red-500 transition-colors duration-300"
            >
              Kontakt
            </a>
          </nav>

          {/* EU DROPDOWN (Uproszczony wizualnie, kod z poprzedniej wersji) */}
          <div className="relative group/eu border-l border-white/20 pl-6 flex items-center h-10">
            <button className="flex items-center gap-3 text-white text-xs font-bold uppercase tracking-wider py-2">
              <span className="text-xl">🇪🇺</span>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] text-gray-400 font-normal">
                  Fundusze
                </span>
                <span className="text-[11px] tracking-widest font-black">
                  Europejskie
                </span>
              </div>
              <span className="text-[9px] text-gray-400 group-hover/eu:rotate-180 transition-transform duration-300 block">
                ▼
              </span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-80 bg-gray-900 border border-gray-800 shadow-2xl rounded-sm opacity-0 invisible translate-y-2 group-hover/eu:opacity-100 group-hover/eu:visible group-hover/eu:translate-y-0 transition-all duration-300 z-50">
              <div className="p-3 border-b border-gray-800 bg-gray-950/50">
                <span className="text-[9px] font-mono font-bold text-red-500 uppercase tracking-widest">
                  // OSTATNIE DOTACJE
                </span>
              </div>
              <div className="py-1">
                {limitedEuProjects.map((project, index) => (
                  <a
                    key={index}
                    href={project.url}
                    className="block px-4 py-3 hover:bg-red-600/10 border-b border-gray-800/50 transition-colors group/item"
                  >
                    <span className="block text-[9px] font-mono text-gray-500 group-hover/item:text-red-400 mb-0.5">
                      {project.id}
                    </span>
                    <p className="text-xs font-sans text-gray-300 group-hover/item:text-white leading-normal font-medium">
                      {project.title}
                    </p>
                  </a>
                ))}
              </div>

              {/* 💡 ZMIANA 2: Dodany przycisk Wszystkie Projekty na dole listy */}
              <div className="p-3 border-t border-gray-800 bg-transparent">
                <a
                  href="/projekty-ue"
                  className="bg-red-600 text-white px-4 py-3 text-[10px] font-mono uppercase tracking-widest font-bold hover:bg-white hover:text-gray-900 transition-colors flex justify-center items-center gap-1.5 group rounded-md shadow-md"
                >
                  Wszystkie projekty
                  <span className="bg-transparent text-white group-hover:text-gray-900 transition-colors">
                    ({euProjects.length})
                  </span>
                </a>
              </div>
              {/* Koniec modyfikacji przycisku */}
            </div>
          </div>

          {/* LANG DROPDOWN */}
          <div className="relative group/lang border-l border-white/20 pl-6 flex items-center h-10">
            <button className="flex items-center gap-2.5 text-white font-mono text-xs font-bold uppercase tracking-widest py-2">
              <div className="flex items-center">
                <FlagIcon code={currentLang.code} />
              </div>
              <span>{currentLang.code}</span>
              <span className="text-[9px] text-gray-400 group-hover/lang:rotate-180 transition-transform duration-300 block">
                ▼
              </span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-44 bg-gray-900 border border-gray-800 shadow-2xl rounded-sm opacity-0 invisible translate-y-2 group-hover/lang:opacity-100 group-hover/lang:visible group-hover/lang:translate-y-0 transition-all duration-300 z-50">
              <div className="py-1 font-mono text-[11px] font-bold tracking-wider">
                {languages.map((lang, index) => (
                  <a
                    key={index}
                    href={lang.url}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors group/link ${lang.active ? "text-red-500 bg-gray-950/40 border-l-2 border-red-600" : "text-gray-300 hover:text-white hover:bg-red-600/10"}`}
                  >
                    <div className="flex items-center flex-shrink-0">
                      <FlagIcon code={lang.code} />
                    </div>
                    <span className="flex-1 text-left font-sans text-xs font-normal capitalize tracking-normal">
                      {lang.label}
                    </span>
                    <span className="text-[10px] font-mono text-gray-600 group-hover/link:text-red-500 transition-colors">
                      {lang.code}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            setIsMobileEuOpen(false); // 💡 Resetuje (zamyka) listę projektów UE
            setIsMobileLangOpen(false); // 💡 Resetuje (zamyka) listę języków
          }}
          className="flex md:hidden flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 text-white focus:outline-none"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-80 z-50 bg-[rgb(22,39,56)] shadow-2xl p-6 pt-10 flex flex-col gap-8 transition-transform duration-300 border-l border-white/5 md:hidden overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* DEDYKOWANY KRZYŻYK DO ZAMYKANIA MENU */}
        <button
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsMobileEuOpen(false);
            setIsMobileLangOpen(false);
          }}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
          aria-label="Zamknij menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <nav className="flex flex-col gap-5 text-white font-bold text-sm uppercase tracking-widest border-b border-white/10 pb-6 mt-10">
          <a href="#" className="hover:text-red-500">
            Start
          </a>
          <a href="#" className="hover:text-red-500">
            O nas
          </a>
          <a href="#" className="hover:text-red-500">
            Oferta
          </a>
          <a href="#" className="hover:text-red-500">
            Zakres usług
          </a>
          <a href="#" className="hover:text-red-500">
            Kontakt
          </a>
        </nav>

        {/* MOBILNE: PROJEKTY UE Z CZERWONYM BUTTONEM */}
        <div className="border-b border-white/10 pb-6">
          <button
            onClick={() => {
              setIsMobileEuOpen(!isMobileEuOpen);
              setIsMobileLangOpen(false); // 💡 Zamyka język, gdy otwierasz projekty
            }}
            className="flex justify-between items-center w-full text-white font-bold text-sm uppercase tracking-widest"
          >
            <span className="flex items-center gap-3">
              <span className="text-xl">🇪🇺</span> Fundusze Europejskie
            </span>
            <span className="text-gray-400">{isMobileEuOpen ? "▲" : "▼"}</span>
          </button>

          <div
            className={`flex flex-col gap-4 mt-4 pl-4 border-l border-white/10 transition-all ${isMobileEuOpen ? "block" : "hidden"}`}
          >
            {limitedEuProjects.map((project, index) => (
              <a
                key={index}
                href={project.url}
                className="block px-4 py-3 hover:bg-red-600/10 border-b border-gray-800/50 transition-colors group/item"
              >
                <span className="block text-[9px] font-mono text-gray-500 group-hover/item:text-red-400 mb-0.5">
                  {project.id}
                </span>
                <p className="text-xs font-sans text-gray-300 group-hover/item:text-white leading-normal font-medium">
                  {project.title}
                </p>
              </a>
            ))}
            {/* Czerwony button z licznikiem */}
            <a
              href="/projekty-ue"
              className="mt-2 bg-red-600 text-white px-4 py-3 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-gray-900 transition-colors flex justify-center items-center gap-1.5 group rounded-md shadow-md"
            >
              Wszystkie projekty
              <span className="bg-transparent text-white group-hover:text-gray-900 transition-colors">
                ({euProjects.length})
              </span>
            </a>
          </div>
        </div>

        {/* MOBILNE: WYBÓR JĘZYKA */}
        <div className="pb-6">
          <button
            onClick={() => {
              setIsMobileLangOpen(!isMobileLangOpen);
              setIsMobileEuOpen(false); // 💡 Zamyka projekty, gdy otwierasz język
            }}
            className="flex justify-between items-center w-full text-white font-bold text-sm uppercase tracking-widest"
          >
            <span className="flex items-center gap-3">
              <FlagIcon code={currentLang.code} /> Język ({currentLang.code})
            </span>
            <span className="text-gray-400">
              {isMobileLangOpen ? "▲" : "▼"}
            </span>
          </button>

          <div
            className={`flex flex-col gap-1 mt-4 border-l border-white/10 transition-all ${isMobileLangOpen ? "block" : "hidden"}`}
          >
            {languages.map((lang, index) => (
              <a
                key={index}
                href={lang.url}
                className={`flex items-center gap-3 px-4 py-2.5 transition-colors group/link w-full justify-start ${lang.active ? "text-red-500 bg-gray-950/40 border-l-2 border-red-600 font-bold" : "text-gray-300 hover:text-white hover:bg-red-600/10"}`}
              >
                <div className="flex items-center flex-shrink-0">
                  <FlagIcon code={lang.code} />
                </div>
                <div className="flex items-baseline">
                  {/* 💡 ZMIANA: w-24 inline-block tworzy niewidzialną, równą kolumnę */}
                  <span className="w-24 inline-block font-sans text-xs font-normal capitalize tracking-normal text-left">
                    {lang.label}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 group-hover/link:text-red-500 transition-colors">
                    {lang.code}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
