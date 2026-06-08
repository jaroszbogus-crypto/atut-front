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

    const mappedSlides = json.data.map((item: any) => {
      const getImageUrl = (relationshipData: any) => {
        if (!relationshipData || !relationshipData.data) return null;
        const imageNode = json.included?.find(
          (inc: any) => inc.id === relationshipData.data.id,
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