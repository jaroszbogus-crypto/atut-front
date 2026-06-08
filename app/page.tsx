import type { HeroSlide } from "./types";
import Header from "./components/layout/Header";
import HeroSlider from "./components/home/HeroSlider";
import ServicesGrid from "./components/home/ServicesGrid"; //
import ScrollToTop from "./components/ui/ScrollToTop"; // Dodany import

// =========================================================================
// 1. ASYNCHRONICZNE POBIERANIE DANYCH Z DRUPALA (JSON:API)
// =========================================================================
async function getHeroSlidesFromDrupal(): Promise<HeroSlide[] | null> {
  try {
    const res = await fetch(
      `${process.env.DRUPAL_BASE_URL}/jsonapi/node/slajd_glowny?include=field_zdjecie_desktop,field_zdjecie_mobile&sort=field_kolejnosc`,
      { next: { revalidate: 10 } },
    );

    if (!res.ok) {
      console.warn(
        "[SYSTEM] Brak odpowiedzi z Drupala dla slajdów. Używam danych domyślnych.",
      );
      return null;
    }

    const json = await res.json();
    if (!json.data || json.data.length === 0) return null;

    const mappedSlides = json.data.map((item) => {
      const getImageUrl = (relationshipData) => {
        if (!relationshipData || !relationshipData.data) return null;
        const imageNode = json.included?.find(
          (inc) => inc.id === relationshipData.data.id,
        );
        return imageNode
          ? `${process.env.DRUPAL_BASE_URL}${imageNode.attributes.uri.url}`
          : null;
      };

      return {
        title: item.attributes.title,
        subtitle: item.attributes.field_podtytul || "// ATUT 2026",
        image: getImageUrl(item.relationships.field_zdjecie_desktop),
        imageMobile: getImageUrl(item.relationships.field_zdjecie_mobile),
      };
    });

    return mappedSlides;
  } catch (error) {
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

        {/* 💡 TUTAJ WSTAWIAMY NOWĄ SEKCJĘ ZAMIAST TYMCZASOWEGO NAPISU */}
        <ServicesGrid />
      </main>

      {/* ScrollToTop musi być poza main, aby fixed działał względem viewportu */}
      <ScrollToTop />
    </>
  );
}
