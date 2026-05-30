import React from 'react';

export default function FeatureCards({ drupalData }) {
  // 1. Definiujemy dane domyślne (zabezpieczenie na wypadek braku danych z CMS)
  const content = {
    col1_tag: drupalData?.col1_tag || "// PRZEMYSŁ",
    col1_title: drupalData?.col1_title || "SYSTEMY",
    col1_desc: drupalData?.col1_desc || "Tworzymy zaawansowane technologicznie systemy dla przemysłu w oparciu o najwyższe standardy IoT",
    col1_btn: drupalData?.col1_btn || "NASZE STANDARDY",
    col1_img: drupalData?.col1_img || "/images/d-fc-systemy.jpg",
    col1_url: drupalData?.col1_url || "/oferta/systemy-iot", // Domyślny link dla pierwszego zdjęcia

    col2_tag: drupalData?.col2_tag || "// PRZEMYSŁ",
    col2_title: drupalData?.col2_title || "URZĄDZENIA",
    col2_desc: drupalData?.col2_desc || "Produkujemy urządzenia wraz z dedykowanym oprogramowaniem sterującym oraz nadrzędne systemy SCADA.",
    col2_btn: drupalData?.col2_btn || "NASZA TECHNIKA",
    col2_img: drupalData?.col2_img || "/images/d-fc-urzadzenia.jpg",
    col2_url: drupalData?.col2_url || "/oferta/projektowanie-eplan", // Domyślny link dla drugiego zdjęcia
  };

  return (
    /* 💡 PUNKT 03: Zmienione bg-white na bg-gray-50 dla idealnej spójności tła strony */
    <section className="w-full bg-gray-50">
      <div className="w-full grid grid-cols-1 md:grid-cols-4 min-h-[450px]">
        
        {/* KOLUMNA 1: Czerwony boks z tekstem */}
        <div className="bg-red-700 text-white p-8 md:p-10 flex flex-col justify-center items-start relative overflow-hidden group h-full">
          <div className="absolute right-4 bottom-[-20px] text-[10rem] font-extrabold text-red-800 opacity-20 select-none font-mono pointer-events-none">
            01
          </div>
          
          <div className="relative z-10 w-full">
            <span className="text-red-200 uppercase font-mono tracking-wider text-sm block mb-2">
              {content.col1_tag}
            </span>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 leading-tight">
              {content.col1_title}
            </h3>
            <p className="text-red-100 text-xs md:text-sm leading-relaxed mb-6">
              {content.col1_desc}
            </p>
            <a 
              href={content.col1_url}
              className="inline-block border border-white text-white font-semibold text-[10px] uppercase tracking-widest px-4 py-2.5 bg-transparent hover:bg-white hover:text-red-700 transition-all duration-300 rounded-sm w-full text-center md:w-auto"
            >
              {content.col1_btn}
            </a>
          </div>
        </div>

        {/* KOLUMNA 2: Pierwsze zdjęcie (Teraz jako aktywny, bezpieczny link) */}
        <a 
          href={content.col1_url} 
          className="relative w-full h-64 md:h-full overflow-hidden bg-gray-900 group block cursor-pointer"
          title={`Przejdź do: ${content.col1_title}`}
        >
          {/* Czerwona nakładka aktywująca się po najechaniu myszką na zdjęcie */}
          <div className="absolute inset-0 bg-red-700/0 group-hover:bg-red-700/20 transition-all duration-500 z-10 pointer-events-none" />
          <img 
            src={content.col1_img} 
            alt={content.col1_title} 
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </a>

        {/* KOLUMNA 3: Antracytowy boks z tekstem (Zoptymalizowany pod Punkt 03) */}
        <div className="bg-slate-900 text-white p-8 md:p-10 flex flex-col justify-center items-start relative overflow-hidden group h-full border-t border-gray-900 md:border-t-0">
          <div className="absolute right-4 bottom-[-20px] text-[10rem] font-extrabold text-slate-950 opacity-40 select-none font-mono pointer-events-none">
            02
          </div>

          <div className="relative z-10 w-full">
            <span className="text-red-500 uppercase font-mono tracking-wider text-sm block mb-2">
              {content.col2_tag}
            </span>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 leading-tight">
              {content.col2_title}
            </h3>
            {/* Zoptymalizowany, czytelniejszy odcień opisu (text-slate-300) */}
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6">
              {content.col2_desc}
            </p>
            <a 
              href={content.col2_url}
              className="inline-block border border-slate-700 text-gray-300 font-semibold text-[10px] uppercase tracking-widest px-4 py-2.5 bg-transparent hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 rounded-sm w-full text-center md:w-auto"
            >
              {content.col2_btn}
            </a>
          </div>
        </div>

        {/* KOLUMNA 4: Drugie zdjęcie (Teraz jako aktywny, bezpieczny link) */}
        <a 
          href={content.col2_url} 
          className="relative w-full h-64 md:h-full overflow-hidden bg-gray-900 group block cursor-pointer"
          title={`Przejdź do: ${content.col2_title}`}
        >
          {/* Czerwona nakładka aktywująca się po najechaniu myszką na zdjęcie */}
          <div className="absolute inset-0 bg-red-700/0 group-hover:bg-red-700/20 transition-all duration-500 z-10 pointer-events-none" />
          <img 
            src={content.col2_img} 
            alt={content.col2_title} 
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </a>

      </div>
    </section>
  );
}