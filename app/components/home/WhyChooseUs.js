import React from 'react';

export default function WhyChooseUs({ drupalData }) {
  // Dane domyślne (fallback), dopóki Drupal nie prześle tablicy przez API
  const content = {
    tag: drupalData?.tag || "// DLACZEGO ATUT?",
    title: drupalData?.title || "Kompleksowe wdrożenia od projektu po uruchomienie",
    desc: drupalData?.desc || "Monitorujemy i optymalizujemy każdy etap powstawania systemu sterowania. Nasze doświadczenie inżynieryjne to gwarancja ciągłości pracy Twojej linii produkcyjnej.",
    image: drupalData?.image || "/images/d-whu-wdrozenie.jpg",
    imageUrl: drupalData?.imageUrl || "/o-nas/nasze-wdrozenia", // Domyślny link dla zdjęcia wdrożeń
    steps: drupalData?.steps || [
      {
        num: "01",
        title: "Analiza i Audyt Maszynowy",
        desc: "Dokładnie badamy potrzeby Twojego zakładu i specyfikację technologiczną przed przystąpieniem do projektowania."
      },
      {
        num: "02",
        title: "Projektowanie i Soft PLC/SCADA",
        desc: "Tworzymy schematy EPLAN i dedykowane oprogramowanie sterujące z dbałością o standardy bezpieczeństwa."
      },
      {
        num: "03",
        title: "Prefabrykacja i Start na Obiekcie",
        desc: "Montujemy szafy sterownicze, wykonujemy testy pętli sygnałowych (FAT/SAT) i uruchamiamy system na gotowo."
      }
    ]
  };

  return (
    /* 💡 PUNKT 03: Zmienione bg-white na bg-gray-50 oraz dodana delikatna, techniczna linia border-t */
    <section className="w-full bg-gray-50 grid grid-cols-1 lg:grid-cols-2 min-h-[600px] border-t border-gray-200/60">
      
      {/* LEWA STRONA: Panel w kolorze firmowego granatu ATUT */}
      <div 
        className="text-white p-8 md:p-16 lg:p-24 flex flex-col justify-center items-start relative overflow-hidden"
        style={{ backgroundColor: 'rgb(22, 39, 56)' }}
      >
        
        {/* Subtelny techniczny schemat w tle (blueprint effect) */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative z-10 max-w-xl w-full">
          <span className="text-red-500 font-mono text-sm uppercase tracking-wider block mb-3">
            {content.tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 leading-tight">
            {content.title}
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-12 opacity-90">
            {content.desc}
          </p>

          {/* OŚ CZASU (STEPS) */}
          <div className="flex flex-col gap-8 relative">
            
            {/* Pionowa linia dopasowana tonalnie do granatowego tła */}
            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-red-600 via-red-900 to-white/10 z-0"></div>

            {content.steps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start relative group z-10">
                
                {/* Okrągły znacznik */}
                <div className="w-10 h-10 rounded-full bg-[rgb(18,37,54)] border-2 border-red-600 flex items-center justify-center text-xs font-mono font-bold text-white flex-shrink-0 transition-colors duration-300 group-hover:bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                  {step.num}
                </div>

                {/* Tekst kroku */}
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-extrabold uppercase tracking-tight text-white group-hover:text-red-500 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed mt-1 opacity-80">
                    {step.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 🛠️ PRAWA STRONA: Zdjęcie przemysłowe podlinkowane na podstronę wdrożeń */}
      <a 
        href={content.imageUrl} 
        className="relative w-full h-80 lg:h-auto overflow-hidden bg-gray-900 group block cursor-pointer"
        title="Zobacz nasze realizacje i wdrożenia maszynowe"
      >
        {/* Płynny, technologiczny czerwony filtr, który podświetla zdjęcie po najechaniu */}
        <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-all duration-500 z-10 pointer-events-none" />
        
        <img 
          src={content.image} 
          alt="Praca inżynierów automatyków ATUT" 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </a>

    </section>
  );
}