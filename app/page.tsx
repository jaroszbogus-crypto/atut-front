import type { HeroSlide } from "./types";
import Header from "./components/layout/Header";
import HeroSlider from "./components/home/HeroSlider";
import ServicesGrid from "./components/home/ServicesGrid";
import FeatureCards from "./components/home/FeatureCards";
import WhyChooseUs from "./components/home/WhyChooseUs";
import TechnicalTabs from "./components/home/TechnicalTabs";
import LatestNews from "./components/home/LatestNews";
import PartnerLogos from "./components/home/PartnerLogos";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";

// =========================================================================
// 1. ASYNCHRONICZNE POBIERANIE DANYCH Z DRUPALA (JSON:API)
// =========================================================================

// Mapowanie wideo na slajdy (index → ścieżka do pliku)
// Dodawaj klipy w miarę ich cięcia w Premiere Pro.
// Slajdy bez wpisu = pokażą zdjęcie zamiast wideo.
const heroVideoMap: Record<number, string> = {
  0: "/videos/hero-01.mp4",  // Systemy automatyzacji — CNC
  1: "/videos/hero-02.mp4",  // Strefy Ex — panele
  2: "/videos/hero-03.mp4",  // Prefabrykacja — hala
  3: "/videos/hero-04.mp4",  // SCADA — centrum sterowania
  4: "/videos/hero-05.mp4",  // CAD — monitory
  5: "/videos/hero-06.mp4",  // Sensoryka — sensor A5
  6: "/videos/hero-07.mp4",  // Bezpieczeństwo — CUKS/tunel
  // 7: brak klipu — klimatyzacja (do uzupełnienia)
  8: "/videos/hero-09.mp4",  // Oświetlenie Ex — LED
  9: "/videos/hero-10.mp4",  // Górnictwo — kinowy tunel
};

// =========================================================================
// 1. POBIERANIE SLAJDÓW Z DRUPALA (JSON:API) — Drupal-first
// =========================================================================
async function getHeroSlidesFromDrupal(): Promise<HeroSlide[] | null> {
  try {
    const res = await fetch(
      `${process.env.DRUPAL_BASE_URL}/jsonapi/node/slajd_glowny?include=field_zdjecie_desktop,field_zdjecie_mobile,field_wideo_desktop,field_wideo_mobile&sort=field_waga`,
      { next: { revalidate: 10 } },
    );

    if (!res.ok) {
      console.warn("[SYSTEM] Brak odpowiedzi z Drupala dla slajdów. Używam danych domyślnych.");
      return null;
    }

    const json = await res.json();
    if (!json.data || json.data.length === 0) return null;

    // Pomocnik: wyciąga URL pliku (zdjęcie lub wideo) z relacji + included
    const getFileUrl = (relationship: any): string | null => {
      if (!relationship?.data) return null;
      const fileNode = json.included?.find(
        (inc: any) => inc.id === relationship.data.id,
      );
      return fileNode
        ? `${process.env.DRUPAL_BASE_URL}${fileNode.attributes.uri.url}`
        : null;
    };

    // Pomocnik: wyciąga alt zdjęcia z meta relacji
    const getAlt = (relationship: any): string => {
      return relationship?.data?.meta?.alt || "";
    };

    const mappedSlides: HeroSlide[] = json.data.map((item: any) => ({
      title: item.attributes.title,
      subtitle: item.attributes.field_podtytul || "// ATUT",
      image: getFileUrl(item.relationships.field_zdjecie_desktop),
      imageMobile: getFileUrl(item.relationships.field_zdjecie_mobile),
      imageAlt: getAlt(item.relationships.field_zdjecie_desktop),
      video: getFileUrl(item.relationships.field_wideo_desktop),
      videoMobile: getFileUrl(item.relationships.field_wideo_mobile),
      duration: item.attributes.field_czas_trwania || 6000,
      animationScale: parseFloat(item.attributes.field_skala_animacji) || 1.05,
    }));

    return mappedSlides;
  } catch (error: any) {
    console.error("[SYSTEM] Błąd połączenia z API Drupala:", error.message);
    return null;
  }
}

// =========================================================================
// 2. GŁÓWNY WIDOK STRONY (SERVER COMPONENT)
// =========================================================================
export default async function HomePage() {
  const drupalSlides = await getHeroSlidesFromDrupal();

  return (
    <>
      <main className="relative min-h-screen bg-gray-950 font-sans text-white">
        <Header />
        <HeroSlider drupalSlides={drupalSlides} />
        <FeatureCards drupalData={null} />
        <ServicesGrid />
        <WhyChooseUs drupalData={null} />
        <TechnicalTabs drupalData={null} />
        <PartnerLogos logos={null} />
        <LatestNews drupalPosts={null} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}