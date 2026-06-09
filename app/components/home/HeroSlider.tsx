// components/home/HeroSlider.js
"use client";
import type { HeroSlide } from "../../types";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

interface HeroSliderProps {
  drupalSlides: HeroSlide[] | null;
}

export default function HeroSlider({ drupalSlides }: HeroSliderProps) {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const progressLine = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressLine.current) {
      progressLine.current.style.width = `${(1 - progress) * 100}%`;
    }
  };

  const defaultSlides = [
    {
      subtitle: "// INDUSTRIAL AUTOMATION",
      title: "SYSTEMY AUTOMATYZACJI PROCESÓW TECHNOLOGICZNYCH",
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
      title: "DEDYKOWANE SYSTEMY BEZPIECZEŃSTWA",
      image: "/images/d-slajdy-04a.jpg",
      imageMobile: "/images/m-slajdy-04a.jpg",
    },
    {
      subtitle: "// AIR CONDITIONING",
      title: "PRZEMYSŁOWE UKŁADY CHŁODZENIA",
      image: "/images/d-slajdy-05a.jpg",
      imageMobile: "/images/m-slajdy-05a.jpg",
    },
    {
      subtitle: "// GAS MONITORING",
      title: "SYSTEMY POMIAROWE GAZOMETRII",
      image: "/images/d-slajdy-06a.jpg",
      imageMobile: "/images/m-slajdy-06a.jpg",
    },
    {
      subtitle: "// ENERGY MANAGEMENT",
      title: "SYSTEMY MONITORINGU I BILANSOWANIA MEDIÓW",
      image: "/images/d-slajdy-07a.jpg",
      imageMobile: "/images/m-slajdy-07a.jpg",
    },
    {
      subtitle: "// SCADA",
      title: "NADZOROWANIE I KONTROLA PROCESÓW PRZEMYSŁOWYCH",
      image: "/images/d-slajdy-08a.jpg",
      imageMobile: "/images/m-slajdy-08a.jpg",
    },
    {
      subtitle: "// Ex",
      title: "DOŚWIADCZENIE I KOMPETENCJE W STREFACH Ex",
      image: "/images/d-slajdy-09a.jpg",
      imageMobile: "/images/m-slajdy-09a.jpg",
    },
    {
      subtitle: "// PRZEMYSŁ 4.0",
      title: "CYFROWA TRANSFORMACJA PRZEMYSŁU",
      image: "/images/d-slajdy-10a.jpg",
      imageMobile: "/images/m-slajdy-10a.jpg",
    },
  ];

  // 💡 TUTAJ JEDYNA LOGIKA: Używamy danych z Drupala, a jak ich nie ma (np. DDEV wyłączony), to Twoich defaultowych.
  const slides =
    drupalSlides && drupalSlides.length > 0 ? drupalSlides : defaultSlides;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[rgb(27,52,74)]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        allowTouchMove={false}
        loop={true}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="w-full h-full z-0"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={slide.id || index}
            className="relative overflow-hidden w-full h-full"
          >
            {({ isActive, isPrev }) => (
              <>
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(27, 52, 74, 0.4) 0%, rgba(0, 0, 0, 0.1) 100%)",
                  }}
                />

                {/* 💡 TUTAJ WSTRZYKNĄŁEM DANE Z DRUPALA LUB DEFAULT */}
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet={slide.imageMobile || "/images/m-slajdy-01a.jpg"}
                  />
                  <source
                    media="(min-width: 768px)"
                    srcSet={slide.image || "/images/d-slajdy-01a.jpg"}
                  />
                  <img
                    src={slide.image || "/images/d-slajdy-01a.jpg"}
                    alt={slide.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    className={`w-full h-full object-cover object-center transition-transform ${
                      isActive || isPrev
                        ? "scale-105 ease-linear"
                        : "scale-100 ease-none"
                    }`}
                    style={{
                      transitionDuration: isActive || isPrev ? "7000ms" : "0ms",
                    }}
                  />
                </picture>

                <div className="absolute inset-0 z-30 flex justify-center items-center pointer-events-none">
                  <div
                    className={`absolute inset-x-0 mx-auto max-w-6xl flex flex-col items-center text-center px-6 transition-all duration-1000 ease-in-out ${isActive ? "opacity-100 translate-y-0 pointer-events-auto blur-none" : "opacity-0 translate-y-4 pointer-events-none blur-md"}`}
                  >
                    <span
                      className="text-red-500 font-mono text-xs md:text-base uppercase tracking-widest mb-4 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                      aria-live="polite"
                    >
                      {slide.subtitle}
                    </span>
                    <h1 className="heading-display text-2xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight px-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                      {slide.title}
                    </h1>
                    <div className="w-12 md:w-16 h-[3px] md:h-[4px] bg-red-600 mt-6 mb-6 md:mt-8 md:mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"></div>
                    <div className="w-auto px-6 sm:px-0">
                      <button className="bg-red-600 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest px-5 py-2 md:px-8 md:py-4 hover:bg-white hover:text-gray-950 transition-all duration-300 cursor-pointer relative z-40">
                        Nasza Oferta
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        @keyframes telemetry-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
        .animate-telemetry { animation: telemetry-bounce 1.5s infinite ease-in-out; }
      `}</style>

      {/* Przycisk do przewijania w dół */}
      <div
        className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer"
        onClick={(e) => {
          const sliderElement = e.currentTarget.closest(".h-screen");
          const nextElement = sliderElement?.nextElementSibling;

          if (nextElement) {
            const topPosition =
              nextElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: topPosition - 95,
              behavior: "smooth",
            });
          } else {
            window.scrollTo({
              top: window.innerHeight - 95,
              behavior: "smooth",
            });
          }
        }}
      >
        <div className="w-5 h-10 border-2 border-red-600 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-3 bg-red-500 rounded-full animate-telemetry"></div>
        </div>
        <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest drop-shadow-md">
          Przewiń
        </span>
      </div>

      <div className="absolute bottom-10 left-0 w-full z-30 flex justify-center gap-3">
        {slides.map((_, index) => {
          const isCurrent = index === currentSlide;

          return (
            <button
              key={index}
              aria-label={`Przejdź do slajdu ${index + 1}`}
              aria-current={isCurrent ? "true" : "false"}
              onClick={() => swiperInstance?.slideToLoop(index, 1000)}
              className="group relative h-1.5 md:h-2 w-6 md:w-8 overflow-hidden bg-slate-700/60 transition-all hover:bg-gray-400/60 z-40 cursor-pointer"
            >
              <span
                ref={isCurrent ? progressLine : null}
                className={`absolute left-0 top-0 h-full bg-red-600 ${isCurrent ? "opacity-100" : "opacity-0 w-0"}`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
