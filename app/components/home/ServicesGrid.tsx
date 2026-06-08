import React from "react";

// Słownik ikon SVG – komponent dopasuje grafikę na podstawie tekstu przysłanego z Drupala
const iconLibrary = {
  aparat: (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>
  ),
  naped: (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  ),
  scada: (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25zM9 7.5l3 3m0 0l3-3m-3 3v6"
      />
    </svg>
  ),
  bezpieczeństwo: (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  ),
  modernizacja: (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 3v1.5M4.5 8.25H3m1.5 7.5H3m15-7.5h1.5m-1.5 7.5H1.5M8.25 19.5V21m7.5-18v1.5m0 15V21m-12-3h12a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0017.25 3H6.75A2.25 2.25 0 004.5 5.25v10.5A2.25 2.25 0 006.75 18z"
      />
    </svg>
  ),
  serwis: (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.128l1.41-.513M5.106 17.785l1.15-.827m11.379-8.16l1.15-.827M8.14 21.27l.707-1.03m7.45-.808l.707-1.03M12 3v1.5m0 15V21m4.743-10l-1.149-.827"
      />
    </svg>
  ),
};

export default function ServicesGrid({ drupalHeader, drupalServices }) {
  // 1. Domyślny nagłówek, jeśli Drupal jeszcze nic nie przekazał
  const sectionHeader = {
    tag: drupalHeader?.tag || "// ZAKRES DZIAŁANIA",
    title:
      drupalHeader?.title || "Kompleksowe usługi dla automatyki przemysłowej",
  };

  // 2. Domyślna lista usług (fallback), jeśli tablica z Drupala jest pusta
  const defaultServices = [
    {
      num: "01",
      iconKey: "aparat",
      title: "Aparatura modułowa i pomiary",
      desc: "Dobór i montaż zabezpieczeń, aparatury rozdzielczej oraz wykonywanie pełnych powdrożeniowych pomiarów skuteczności ochrony przeciwporażeniowej.",
    },
    {
      num: "02",
      iconKey: "naped",
      title: "Układy napędowe i sensoryka",
      desc: "Integracja falowników, serwonapędów oraz zaawansowanych czujników optycznych, laserowych i indukcyjnych do precyzyjnej kontroli pozycji i prędkości.",
    },
    {
      num: "03",
      iconKey: "scada",
      title: "Systemy SCADA / HMI",
      desc: "Projektowanie intuicyjnych interfejsów graficznych dla operatorów maszyn oraz nadrzędnych systemów monitorowania i akwizycji danych produkcyjnych.",
    },
    {
      num: "04",
      iconKey: "bezpieczeństwo",
      title: "Bezpieczeństwo maszyn (LOTO)",
      desc: "Audyty bezpieczeństwa parków maszynowych, dostosowanie układów sterowania do dyrektywy maszynowej, montaż rygli bezpieczeństwa i barier optycznych.",
    },
    {
      num: "05",
      iconKey: "modernizacja",
      title: "Retrofitting i Modernizacja",
      desc: "Kompleksowa wymiana przestarzałych sterowników PLC i układów przekaźnikowych na nowoczesne systemy sterowania bez konieczności wymiany całej maszyny.",
    },
    {
      num: "06",
      iconKey: "serwis",
      title: "Wsparcie i Utrzymanie Ruchu",
      desc: "Szybka diagnostyka błędów w programach PLC, testy pętli sygnałowych na obiekcie oraz stała asysta techniczna dla ciągłości Twojej produkcji.",
    },
  ];

  // Jeśli Drupal dostarczy tablicę, używamy jej, w innym wypadku bierzemy dane domyślne
  const servicesList =
    drupalServices && drupalServices.length > 0
      ? drupalServices
      : defaultServices;

  return (
    <section className="w-full bg-slate-50 py-20 md:py-28 font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Dynamiczny Nagłówek sekcji z Drupala */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-red-600 font-mono text-sm uppercase tracking-wider block mb-3">
            {sectionHeader.tag}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-950 uppercase tracking-tight max-w-3xl leading-none">
            {sectionHeader.title}
          </h2>
          <div className="w-12 h-[3px] bg-red-600 mt-6"></div>
        </div>

        {/* Dynamiczna Siatka usług */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-200">
          {servicesList.map((service, index) => {
            // Pobieramy odpowiednią ikonę ze słownika na podstawie klucza (np. "scada")
            // Jeśli klucz nie pasuje, jako fallback dajemy ikonę "serwis"
            const selectedIcon =
              iconLibrary[service.iconKey] || iconLibrary["serwis"];

            // Formatowanie numeru indeksu (jeśli Drupal nie przyśle sztywnego "num", wyliczamy go automatycznie z kolejności)
            const displayNum =
              service.num || String(index + 1).padStart(2, "0");

            return (
              <div
                key={index} // Kafelki, zmiana koloru cienia itd...
                className="p-8 md:p-12 bg-slate-20 hover:bg-red-600 border-r border-b border-gray-200 transition-all duration-300 flex flex-col justify-between items-center text-center group min-h-[360px] shadow-sm hover:shadow-2xl hover:-translate-y-1 transform rounded-sm"
              >
                <div className="w-full flex flex-col items-center">
                  {/* Indeks numeru */}
                  <div className="text-xs font-mono font-bold text-gray-300 group-hover:text-red-200 transition-colors duration-300 mb-2">
                    {displayNum}
                  </div>

                  {/* 🛠️ MODYFIKACJA IKONKI:
                      W spoczynku: tło jasnoczerwone (bg-red-50), ikona czerwona (text-red-600).
                      W hoverze kafelka (group-hover): tło zmienia się na czysto białe (bg-white), 
                      a ikona zachowuje intensywną czerwień marki (text-red-600). */}
                  <div className="p-4 bg-red-50 rounded-sm group-hover:bg-white transition-colors duration-300 mb-6 shadow-xs">
                    {React.cloneElement(selectedIcon, {
                      className: `w-8 h-8 text-red-600 group-hover:text-red-600 transition-all duration-300`,
                    })}
                  </div>

                  {/* Tytuł usługi */}
                  <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight mb-3 group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Opis usługi */}
                  <p className="text-gray-600 group-hover:text-red-50 text-sm leading-relaxed max-w-sm transition-colors duration-300">
                    {service.desc}
                  </p>
                </div>

                {/* Strzałka akcji / Link */}
                <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors duration-300 cursor-pointer">
                  <span>Szczegóły techniczne</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
