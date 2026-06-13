"use client";
import React, { useState, useEffect } from "react";

interface HeroMediaProps {
  image: string | null;
  imageAlt: string;
  video: string | null;
}

// Wspólny komponent mediów hero (zasada "obecność decyduje"):
// jest wideo -> gra wideo, zdjęcie jako poster + fallback reduced-motion;
// brak wideo -> samo zdjęcie. Client Component, bo czyta prefers-reduced-motion.
export default function HeroMedia({ image, imageAlt, video }: HeroMediaProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  const showVideo = !!video && !reducedMotion;

  if (showVideo) {
    return (
      <video
        src={video || undefined}
        poster={image || undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={imageAlt}
        className="w-full h-auto border border-gray-200"
      />
    );
  }

  if (image) {
    return (
      <img
        src={image}
        alt={imageAlt}
        loading="eager"
        className="w-full h-auto border border-gray-200"
      />
    );
  }

  return null;
}