// components/home/HeroSlider.tsx
"use client";
import type { HeroSlide } from "../../types";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { useRouter } from "next/navigation";

interface HeroSliderProps {
  drupalSlides: HeroSlide[] | null;
}

export default function HeroSlider({ drupalSlides }: HeroSliderProps) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const progressLine = useRef<HTMLSpanElement | null>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onMq);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressLine.current) {
      progressLine.current.style.width = `${(1 - progress) * 100}%`;
    }
  };

  const handleSlideChange = useCallback((swiper: any) => {
    const realIndex = swiper.realIndex;
    setCurrentSlide(realIndex);

    Object.entries(videoRefs.current).forEach(([idx, videoEl]) => {
      if (!videoEl) return;
      if (Number(idx) === realIndex) {
        videoEl.currentTime = 0;
        videoEl.play().catch(() => {});
      } else {
        videoEl.pause();
      }
    });
  }, []);

  const defaultSlides: HeroSlide[] = [
    {
      subtitle: "// INDUSTRIAL AUTOMATION",
      title: "STERUJEMY PROCESAMI, KTÓRYCH INNI SIĘ NIE PODEJMUJĄ",
      image: "/images/d-slajdy-01a.jpg",
      imageMobile: "/images/m-slajdy-01a.jpg",
      imageAlt: "Systemy automatyzacji ATUT",
      video: null,
      videoMobile: null,
      duration: 6000,
      animationScale: 1.05,
      sektorUrl: null,
    },
  ];

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
        loopAdditionalSlides={1}
        watchSlidesProgress={true}
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="w-full h-full z-0"
      >
        {slides.map((slide, index) => {
          const videoSrc = isMobile ? slide.videoMobile : slide.video;
          const showVideo = !!videoSrc && !reducedMotion;
          const scale = slide.animationScale || 1.05;
          const isCurrent = index === currentSlide;
          const slideDuration = slide.duration || 6000;

          return (
            <SwiperSlide
              key={slide.id || index}
              data-swiper-autoplay={slideDuration}
              className="relative overflow-hidden w-full h-full"
            >
              {/* Ciemny overlay */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(22, 39, 56, 0.55) 0%, rgba(0, 0, 0, 0.2) 100%)",
                }}
              />

              {/* WIDEO lub ZDJĘCIE */}
              {showVideo ? (
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={videoSrc || undefined}
                  poster={slide.image || "/images/d-slajdy-01a.jpg"}
                  autoPlay={index === 0}
                  muted
                  loop
                  playsInline
                  preload={index === 0 ? "auto" : "none"}
                  aria-label={slide.imageAlt || slide.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              ) : (
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
                    alt={slide.imageAlt || slide.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover object-center"
                    style={{
                      transform:
                        isCurrent && !reducedMotion ? `scale(${scale})` : "scale(1)",
                      transition:
                        isCurrent && !reducedMotion
                          ? `transform ${slideDuration}ms linear`
                          : "none",
                    }}
                  />
                </picture>
              )}

              {/* Tekst slajdu — widoczność zależy od currentSlide */}
              <div className="absolute inset-0 z-30 flex justify-center items-center pointer-events-none">
                <div
                  className={`absolute inset-x-0 mx-auto max-w-6xl flex flex-col items-center text-center px-6 transition-all duration-1000 ease-in-out ${
                    isCurrent
                      ? "opacity-100 translate-y-0 blur-none"
                      : "opacity-0 translate-y-4 blur-md"
                  }`}
                >
                  <span
                    className="text-red-500 font-mono text-xs md:text-base uppercase tracking-widest mb-4 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    {slide.subtitle}
                  </span>
                  <h1 className="heading-display text-2xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight px-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                    {slide.title}
                  </h1>
                  <div className="w-12 md:w-16 h-[3px] md:h-[4px] bg-red-600 mt-6 mb-6 md:mt-8 md:mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"></div>
                  {slide.sektorUrl && (
                    <button type="button" onClick={() => router.push(slide.sektorUrl!)} className={`inline-block bg-red-600 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest px-5 py-2 md:px-8 md:py-4 hover:bg-white hover:text-gray-950 transition-all duration-300 cursor-pointer relative z-50 ${isCurrent ? "pointer-events-auto" : "pointer-events-none"}`}>
                      Nasza Oferta
                    </button>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style>{`
        @keyframes telemetry-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
        .animate-telemetry { animation: telemetry-bounce 1.5s infinite ease-in-out; }
        @media (prefers-reduced-motion: reduce) {
          .animate-telemetry { animation: none; }
        }
      `}</style>

      {/* Przewiń w dół */}
      <div
        className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer"
        onClick={(e) => {
          const sliderElement = e.currentTarget.closest(".h-screen");
          const nextElement = sliderElement?.nextElementSibling;
          if (nextElement) {
            const topPosition =
              nextElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: topPosition - 95, behavior: "smooth" });
          } else {
            window.scrollTo({ top: window.innerHeight - 95, behavior: "smooth" });
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

      {/* Nawigacja kropki */}
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