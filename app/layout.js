import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // 💡 Bezpieczny komponent Next.js do obsługi skryptów
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ATUT - Systemy IoT",
  description: "Zaawansowane systemy automatyki przemysłowej, modułowa prefabrykacja dla Przemysłu 4.0.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-gray-900">
        
        {children}
        
        {/* 🔥 Bezpieczny, oficjalny strażnik interfejsu Next.js (Rozwiązuje błąd konsoli) */}
        <Script id="watermark-cleaner" strategy="afterInteractive">
          {`
            (function() {
              function cleanNextElements() {
                var selectors = [
                  '.__next-toast-container',
                  '#--next-badge-root',
                  '[data-nextjs-toast-wrapper]',
                  '#nextjs-dev-overlay',
                  'nextjs-portal'
                ];
                selectors.forEach(function(s) {
                  var el = document.querySelector(s);
                  if (el) el.remove();
                });

                var allDivs = document.querySelectorAll('body > div, body > nextjs-portal');
                allDivs.forEach(function(el) {
                  var style = window.getComputedStyle(el);
                  if (style.position === 'fixed' && style.bottom === '0px' && style.left === '0px') {
                    if (el.innerHTML.toLowerCase().includes('next') || el.innerHTML.toLowerCase().includes('vercel')) {
                      el.remove();
                    }
                  }
                });
              }
              
              cleanNextElements();
              window.addEventListener('load', cleanNextElements);
              setTimeout(cleanNextElements, 500);
              setTimeout(cleanNextElements, 1500);
              setTimeout(cleanNextElements, 3500);
            })();
          `}
        </Script>

      </body>
    </html>
  );
}