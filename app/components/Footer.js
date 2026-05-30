import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 pt-20 pb-10 text-white font-sans border-t-4 border-red-600" style={{ backgroundColor: 'rgb(22, 39, 56)' }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
        
        {/* Kolumna 1: Kontakt */}
        <div>
          <img src="/images/logo-atut.svg" className="h-10 mb-8 w-auto" alt="Logo ATUT" />
          <div className="space-y-6">
            <div className="flex items-start gap-4 text-sm">
              <span className="text-red-500 font-bold text-lg">📍</span>
              <p className="text-gray-300">ul. Przemysłowa 12<br />41-400 Mysłowice, Polska</p>
            </div>
            <div className="flex items-start gap-4 text-sm">
              <span className="text-red-500 font-bold text-lg">📞</span>
              <p className="text-gray-300">+48 32 123 45 67<br />biuro@atut-automatyka.pl</p>
            </div>
          </div>
        </div>

        {/* Kolumna 2: Godziny */}
        <div>
          <h4 className="text-xl font-black uppercase mb-8 border-b border-white/10 pb-4">Godziny Pracy</h4>
          <ul className="space-y-4 text-sm font-mono">
            <li className="flex justify-between border-b border-white/5 pb-2"><span>Poniedziałek - Piątek:</span> <span className="text-red-400">07:00 - 15:30</span></li>
            <li className="flex justify-between border-b border-white/5 pb-2"><span>Sobota:</span> <span className="text-gray-500">Zamknięte</span></li>
            <li className="flex justify-between"><span>Niedziela:</span> <span className="text-gray-500">Zamknięte</span></li>
          </ul>
        </div>

        {/* Kolumna 3: CTA */}
        <div className="bg-white/5 p-8 rounded-sm border border-white/10">
          <h4 className="text-xl font-black uppercase mb-4">Potrzebujesz Audytu?</h4>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">Nasi inżynierowie są gotowi do analizy Twojego parku maszynowego.</p>
          <button className="w-full bg-red-600 py-4 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-gray-950 transition-all">Zapytaj o termin //</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/10 flex flex-col md:row justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest gap-4">
        <p>© 2024 ATUT AUTOMATYKA SP. Z O.O. WSZELKIE PRAWA ZASTRZEŻONE.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Polityka Prywatności</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </footer>
  );
}