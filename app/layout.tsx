import { Inter, JetBrains_Mono, Archivo_Black } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
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
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
