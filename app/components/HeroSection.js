"use client";
import React, { useState, useEffect } from "react";

// Słownik wektorowych flag SVG (Bezpieczne dla Windowsa, ostre na ekranach 4K)
const flagIcons = {
  PL: (
    <svg
      viewBox="0 0 16 10"
      className="w-5 h-3.5 object-cover rounded-xs border border-white/10 shadow-xs"
    >
      <rect width="16" height="5" fill="#fff" />
      <rect width="16" height="5" y="5" fill="#dc2626" />
    </svg>
  ),
  EN: (
    <svg
      viewBox="0 0 60 30"
      className="w-5 h-3.5 object-cover rounded-xs border border-white/10 shadow-xs"
    >
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#012169" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  ),
  TR: (
    <svg
      viewBox="0 0 1200 800"
      className="w-5 h-3.5 object-cover rounded-xs border border-white/10 shadow-xs"
    >
      <rect width="1200" height="800" fill="#e30a17" />
      <circle cx="400" cy="400" r="200" fill="#fff" />
      <circle cx="450" cy="400" r="160" fill="#e30a17" />
      <polygon points="575,400 645,423 602,364 602,436 645,377" fill="#fff" />
    </svg>
  ),
  VI: (
    <svg
      viewBox="0 0 900 600"
      className="w-5 h-3.5 object-cover rounded-xs border border-white/10 shadow-xs"
    >
      <rect width="900" height="600" fill="#da251d" />
      <polygon
        points="450,225 479,316 558,316 494,363 518,454 450,407 382,454 406,363 342,316 421,316"
        fill="#ffff00"
      />
    </svg>
  ),
  UK: (
    <svg
      viewBox="0 0 3 2"
      className="w-5 h-3.5 object-cover rounded-xs border border-white/10 shadow-xs"
    >
      <rect width="3" height="1" fill="#0057b7" />
      <rect width="3" height="1" y="1" fill="#ffd700" />
    </svg>
  ),
  DE: (
    <svg
      viewBox="0 0 5 3"
      className="w-5 h-3.5 object-cover rounded-xs border border-white/10 shadow-xs"
    >
      <rect width="5" height="1" fill="#000" />
      <rect width="5" height="1" y="1" fill="#dd0000" />
      <rect width="5" height="1" y="2" fill="#ffce00" />
    </svg>
  ),
};

export default function HeroSection({
  drupalHeroData,
  drupalLanguages,
  drupalEuProjects,
}) {
  // 1. Zdefiniowane 4 slajdy (Desktop + Mobile)
  const defaultSlides = [
    {
      subtitle: "// INDUSTRIAL AUTOMATION",
      title: "ZAAWANSOWANE SYSTEMY IoT",
      image: "/images/d-slajdy-01a.jpg",
      imageMobile: "/images/m-slajdy-01a.jpg",
    },
    {
      subtitle: "// ENGINEERING PREMIUM",
      title: "MODUŁOWA PREFABRYKACJA SYSTEMÓW",
      image: "/images/d-slajdy-02a.jpg",
      imageMobile: "/images/m-slajdy-02a.jpg",
    },
    {
      subtitle: "// SMART SENSING",
      title: "ZAAWANSOWANE UKŁADY SENSORYCZNE",
      image: "/images/d-slajdy-03a.jpg",
      imageMobile: "/images/m-slajdy-03a.jpg",
    },
    {
      subtitle: "// SECURE AUTOMATION",
      title: "DEDKOWANE SYSTEMY BEZPIECZEŃSTWA",
      image: "/images/d-slajdy-04a.jpg",
      imageMobile: "/images/m-slajdy-04a.jpg",
    },
  ];

  // 2. Dynamiczna lista języków
  const defaultLanguages = [
    { code: "PL", label: "Polski", url: "#lang-pl", active: true },
    { code: "EN", label: "English", url: "#lang-en", active: false },
    { code: "TR", label: "Türkçe", url: "#lang-tr", active: false },
    { code: "VI", label: "Tiếng Việt", url: "#lang-vi", active: false },
    { code: "UK", label: "Українська", url: "#lang-uk", active: false },
    { code: "DE", label: "Deutsch", url: "#lang-de", active: false },
  ];

  // 3. Domyślna lista projektów UE
  const defaultEuProjects = [
    {
      title: "Wdrożenie systemów IoT w procesach kontroli jakości",
      id: "POIR-01-2024",
      url: "/projekty-ue",
    },
    {
      title: "Rozwój innowacyjnego centrum prefabrykacji szaf sterowniczych",
      id: "POPW-03-2025",
      url: "/projekty-ue",
    },
    {
      title: "Automatyzacja cyklu produkcyjnego w oparciu o algorytmy AI",
      id: "RPO-07-2026",
      url: "/projekty-ue",
    },
  ];

  const slides = drupalHeroData?.slides || defaultSlides;
  const languages = drupalLanguages || defaultLanguages;
  const euProjects = drupalEuProjects || defaultEuProjects;

  const currentLang = languages.find((l) => l.active) || languages[0];
  const limitedEuProjects = euProjects.slice(0, 3);

  // STANY RESPONSYWNE
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileEuOpen, setIsMobileEuOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slides.length]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden font-sans"
      style={{ backgroundColor: "rgb(27, 52, 74)" }}
    >
      {/* ---------------------------------------------------------
        STICKY MENU NAWIGACYJNE
        ---------------------------------------------------------
      */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "h-20 shadow-lg backdrop-blur-md"
            : "h-24 bg-gradient-to-b from-black/60 to-transparent"
        }`}
        style={{
          backgroundColor: isScrolled
            ? "rgba(22, 39, 56, 0.95)"
            : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center relative">
          {/* Logo ATUT */}
          <div
            className={`flex items-center w-auto cursor-pointer transition-all duration-300 ${isScrolled ? "h-9" : "h-12"}`}
          >
            <img
              src="/images/logo-atut.svg"
              alt="Logo ATUT Automatyka"
              className="h-full w-auto object-contain"
            />
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-7 text-white font-bold text-xs uppercase tracking-widest">
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
                Kariera
              </a>
              <a
                href="#"
                className="hover:text-red-500 transition-colors duration-300"
              >
                Kontakt
              </a>
            </nav>

            {/* 🇪🇺 DESKTOP DROPDOWN UNII EUROPEJSKIEJ */}
            <div className="relative group/eu border-l border-white/20 pl-6 flex items-center h-10">
              <button className="flex items-center gap-3 text-white font-sans text-xs font-bold uppercase tracking-wider hover:text-red-500 transition-colors duration-300 py-2">
                <svg
                  className="w-7 h-5 rounded-xs border border-white/10 shadow-xs"
                  viewBox="0 0 810 540"
                >
                  <rect width="810" height="540" fill="#039" />
                  <g fill="#fc0" transform="matrix(1 0 0 1 405 270)">
                    <g id="j">
                      <polygon
                        id="k"
                        points="0,-30 9,-11 30,-11 13,2 19,23 0,10 -19,23 -13,2 -30,-11 -9,-11"
                        transform="matrix(1 0 0 1 0 -175)"
                      />
                      <use href="#k" transform="rotate(30)" />
                      <use href="#k" transform="rotate(60)" />
                      <use href="#k" transform="rotate(90)" />
                      <use href="#k" transform="rotate(120)" />
                      <use href="#k" transform="rotate(150)" />
                      <use href="#k" transform="rotate(180)" />
                      <use href="#k" transform="rotate(210)" />
                      <use href="#k" transform="rotate(240)" />
                      <use href="#k" transform="rotate(270)" />
                      <use href="#k" transform="rotate(300)" />
                      <use href="#k" transform="rotate(330)" />
                    </g>
                  </g>
                </svg>
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
                      href={`/projekty-ue#${index}`}
                      className="block px-4 py-3 hover:bg-red-600/10 border-b border-gray-800/50 last:border-0 transition-colors group/item"
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
                <div className="p-3 bg-gray-950/80">
                  <a
                    href="/projekty-ue"
                    className="flex justify-center items-center gap-2 w-full bg-red-600 hover:bg-white hover:text-gray-950 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 text-white rounded-sm"
                  >
                    Wszystkie projekty ({euProjects.length})
                  </a>
                </div>
              </div>
            </div>

            {/* 🌐 DESKTOP DROPDOWN JĘZYKÓW */}
            <div className="relative group/lang border-l border-white/20 pl-6 flex items-center h-10">
              <button className="flex items-center gap-2.5 text-white font-mono text-xs font-bold uppercase tracking-widest hover:text-red-500 transition-colors duration-300 py-2">
                <div className="flex items-center">
                  {flagIcons[currentLang.code] || flagIcons.PL}
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
                      className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${lang.active ? "text-red-500 bg-gray-950/40 border-l-2 border-red-600" : "text-gray-300 hover:text-white hover:bg-red-600/10"}`}
                    >
                      <div className="flex items-center flex-shrink-0">
                        {flagIcons[lang.code] || flagIcons.PL}
                      </div>
                      <span className="flex-1 text-left font-sans text-xs font-normal capitalize tracking-normal">
                        {lang.label}
                      </span>
                      <span className="text-[9px] text-gray-500">
                        {lang.code}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 📱 HAMBURGER BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 text-white focus:outline-none"
            aria-label="Menu"
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
      </header>

      {/* ---------------------------------------------------------
        📱 PANEL NAWIGACJI MOBILNEJ
        ---------------------------------------------------------
      */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-80 z-40 bg-[rgb(22,39,56)] shadow-2xl p-6 pt-28 flex flex-col gap-8 transition-transform duration-300 border-l border-white/5 md:hidden overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-5 text-white font-bold text-sm uppercase tracking-widest border-b border-white/10 pb-6">
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-red-500 transition-colors"
          >
            Start
          </a>
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-red-500 transition-colors"
          >
            O nas
          </a>
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-red-500 transition-colors"
          >
            Oferta
          </a>
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-red-500 transition-colors"
          >
            Zakres usług
          </a>
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-red-500 transition-colors"
          >
            Kariera
          </a>
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-red-500 transition-colors"
          >
            Kontakt
          </a>
        </nav>

        {/* Akordeon Mobilny: Projekty UE */}
        <div className="border-b border-white/10 pb-4">
          <button
            onClick={() => setIsMobileEuOpen(!isMobileEuOpen)}
            className="w-full flex justify-between items-center text-white text-xs font-bold uppercase tracking-wider py-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🇪🇺</span>
              <span>Fundusze Europejskie</span>
            </div>
            <span
              className={`text-[10px] text-gray-400 transition-transform ${isMobileEuOpen ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>

          <div
            className={`flex flex-col gap-2 mt-2 pl-8 ${isMobileEuOpen ? "block" : "hidden"}`}
          >
            {limitedEuProjects.map((project, index) => (
              <a
                key={index}
                href={`/projekty-ue#${index}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1.5 text-xs text-gray-400 hover:text-white"
              >
                <span className="block text-[8px] font-mono text-red-500">
                  {project.id}
                </span>
                {project.title.substring(0, 45)}...
              </a>
            ))}
            <a
              href="/projekty-ue"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block mt-3 bg-red-600 text-center text-white font-bold text-[10px] uppercase tracking-widest py-2 px-4 rounded-sm"
            >
              Wszystkie projekty ({euProjects.length})
            </a>
          </div>
        </div>

        {/* Akordeon Mobilny: Języki */}
        <div className="pb-4">
          <button
            onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
            className="w-full flex justify-between items-center text-white text-xs font-bold uppercase tracking-wider py-2"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {flagIcons[currentLang.code]}
              </div>
              <span>Język ({currentLang.code})</span>
            </div>
            <span
              className={`text-[10px] text-gray-400 transition-transform ${isMobileLangOpen ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>

          <div
            className={`grid grid-cols-2 gap-2 mt-3 pl-8 ${isMobileLangOpen ? "grid" : "hidden"}`}
          >
            {languages.map((lang, index) => (
              <a
                key={index}
                href={lang.url}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 p-2 rounded-xs border text-[11px] font-bold ${
                  lang.active
                    ? "border-red-600 bg-gray-950/40 text-red-500"
                    : "border-white/10 text-gray-300"
                }`}
              >
                {flagIcons[lang.code]}
                <span>{lang.code}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------
        🖼️ ADAPTACYJNY SLIDER Z DYNAMICZNYM EFEKTEM KENA BURNSA
        ---------------------------------------------------------
      */}
      <div className="absolute inset-0 z-0 bg-[rgb(27,52,74)]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* 💡 POPRAWIONA MASKA: 
                Zmieniona na luksusowy, głęboki granat (25% krycia), który podbija profesjonalizm maszyn.
                Usunięty mix-blend, by zdjęcia były jasne i ostre, a index zrównany z warstwą obrazka.
            */}
            {/* Baza w czystym CSS - wpisz tu dowolny kolor w formacie RGBA. 
                 Ostatnia cyfra (0.25) to przezroczystość czyli 25% */}
            <div
              className="absolute inset-0 z-10"
              style={{ backgroundColor: "rgba(66, 16, 18, 0.12)" }}
            />

            <picture>
              {/* Wersja Mobilna */}
              <source
                media="(max-width: 767px)"
                srcSet={slide.imageMobile || "/images/szafa_hero_mobile.webp"}
              />

              {/* Wersja Desktop */}
              <source
                media="(min-width: 768px)"
                srcSet={slide.image || "/images/szafa_hero.jpg"}
              />

              {/* Twój perfekcyjnie podkręcony Ken Burns (7 sekund, skala 115) */}
              <img
                src={slide.image || "/images/szafa_hero.jpg"}
                alt={slide.title}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`w-full h-full object-cover object-center transform ease-linear duration-[7000ms] ${
                  index === currentSlide ? "scale-115" : "scale-100"
                }`}
              />
            </picture>
          </div>
        ))}
      </div>
      {/* ---------------------------------------------------------
        📝 DYNAMICZNE TEKSTY HERO
        ---------------------------------------------------------
        
      */}
      {/*<button className="border border-white text-white font-bold text-[11px] md:text-xs uppercase tracking-widest px-8 py-3.5 md:py-4 bg-transparent hover:bg-red-600 hover:border-red-600 transition-all rounded-sm w-full sm:w-auto">Zobacz Realizacje</button>*/}
      {/* 💡 ROZWIĄZANIE: Kontener główny jest teraz czystym 'absolute' z pełnym centrowaniem flex.
          Wszystkie nieaktywne slajdy mają 'pointer-events-none' (są przezroczyste dla myszki),
          a aktywny slajd ma 'pointer-events-auto', dzięki czemu hover działa idealnie i nic nie znika. */}
      <div className="absolute inset-0 z-30 flex justify-center items-center pointer-events-none">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-x-0 mx-auto max-w-6xl flex flex-col items-center text-center px-6 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            {/* 1. Podtytuł */}
            <span className="text-red-500 font-mono text-xs md:text-base uppercase tracking-widest mb-4 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {slide.subtitle}
            </span>

            {/* 2. Główny tytuł */}
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight px-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              {slide.title}
            </h1>

            {/* 3. Separator */}
            <div className="w-12 md:w-16 h-[3px] md:h-[4px] bg-red-600 mt-6 mb-6 md:mt-8 md:mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"></div>

            {/* 4. Kontener przycisku */}
            <div className="w-full sm:w-auto px-6 sm:px-0">
              <button className="bg-red-600 text-white font-bold text-[11px] md:text-xs uppercase tracking-widest px-8 py-3.5 md:py-4 hover:bg-white hover:text-gray-950 transition-all duration-300 rounded-sm w-full sm:w-auto shadow-xl cursor-pointer relative z-40">
                Nasza Oferta
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dolne kropki nawigacji */}
      <div className="absolute bottom-10 left-0 w-full z-30 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 md:h-2 transition-all duration-300 rounded-full ${index === currentSlide ? "w-6 md:w-8 bg-red-600" : "w-1.5 md:w-2 bg-white/50 hover:bg-white"}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
