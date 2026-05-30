import React from 'react';

export default function PartnerLogos({ logos }) {
  const defaultLogos = ["/images/logo1.svg", "/images/logo2.svg", "/images/logo3.svg", "/images/logo4.svg", "/images/logo5.svg"];
  const list = logos || defaultLogos;

  return (
    <section className="bg-red-600 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-white/70 font-mono text-[10px] uppercase tracking-[0.3em] mb-8">ZAUFALI NAM ŚWIATOWI LIDRZY AUTOMATYKI</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-80 grayscale brightness-200">
          {list.map((logo, i) => (
            <img key={i} src={logo} className="h-8 md:h-10 w-auto object-contain" alt="Partner ATUT" />
          ))}
        </div>
      </div>
    </section>
  );
}