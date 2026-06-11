import { Inter, JetBrains_Mono, Archivo_Black } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ScrollToTop from "./components/ui/ScrollToTop";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo-black",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "ATUT — Systemy automatyki, bezpieczeństwa i monitoringu",
  description:
    "Projektujemy i produkujemy systemy automatyki, bezpieczeństwa i monitoringu dla środowisk, gdzie nie ma miejsca na kompromis. Od 1989 roku.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pl"
      className={`${archivoBlack.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="h-full bg-[var(--atut-paper)] text-[var(--atut-text)] relative">
        {children}
        <ScrollToTop />

        {/* Bezpieczny strażnik interfejsu Next.js (czyści dev-overlay) */}
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