'use client';
import React, { useState } from 'react';
import { GearSix, Desktop, Check } from '@phosphor-icons/react';

// Mapowanie nazw ikon na komponenty Phosphor
const iconMap: Record<string, React.ElementType> = {
  gear: GearSix,
  desktop: Desktop,
};

export default function TechnicalTabs({ drupalData }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = drupalData || [
    {
      label: "Prefabrykacja",
      iconKey: "gear",
      title: "Modernizacja istniejącej procesów technologicznych zakładu",
      desc: "Nasze centrum prefabrykacji to ogromny potencjał wiedzy inżynierskiej.",
      bullets: ["Zgodność z normą PN-EN 61439", "Pełna dokumentacja powykonawcza", "Testy FAT w obecności klienta"],
      image: "/images/d-tt-kadra-inz.jpg"
    },
    {
      label: "Systemy PLC",
      iconKey: "desktop",
      title: "Programowanie Sterowników i Wizualizacji",
      desc: "Tworzymy kod, który optymalizuje cykle maszyn. Specjalizujemy się w środowiskach TIA Portal, Studio 5000 oraz Codesys.",
      bullets: ["Optymalizacja czasu cyklu", "Diagnostyka zdalna VPN", "Przyjazne interfejsy HMI"],
      image: "/images/d-tt-plc.jpg"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-red-600 font-mono text-sm uppercase tracking-widest">// TECHNOLOGIE</span>
          <h2 className="heading-display text-3xl md:text-5xl font-bold uppercase text-gray-950 mt-2">Zaawansowane Wsparcie Inżynieryjne</h2>
        </div>

        {/* PRZEŁĄCZNIKI TABS */}
        <div className="flex flex-wrap justify-center gap-1 mb-12">
          {tabs.map((tab, i) => {
            const IconComponent = iconMap[tab.iconKey] || GearSix;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-8 py-4 font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-3 ${
                  activeTab === i ? 'bg-gray-950 text-white' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <IconComponent size={18} weight="bold" aria-hidden="true" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TREŚĆ AKTYWNEGO TABU */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 border border-gray-200">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold uppercase text-gray-950 mb-6">{tabs[activeTab].title}</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">{tabs[activeTab].desc}</p>
            <ul className="space-y-4 mb-10">
              {tabs[activeTab].bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-800">
                  <Check size={16} weight="bold" className="text-red-600 flex-shrink-0" aria-hidden="true" /> {b}
                </li>
              ))}
            </ul>
            <button className="bg-red-600 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-gray-950 transition-all">Specyfikacja Techniczna //</button>
          </div>
          <div className="h-[400px] overflow-hidden">
            <img src={tabs[activeTab].image} className="w-full h-full object-cover" alt="Technologia ATUT" />
          </div>
        </div>
      </div>
    </section>
  );
}