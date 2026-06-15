import type { HeroSlide } from "./types";
import HeroSlider from "./components/home/HeroSlider";
import ServicesGrid from "./components/home/ServicesGrid";
import FeatureCards from "./components/home/FeatureCards";
import WhyChooseUs from "./components/home/WhyChooseUs";
import TechnicalTabs from "./components/home/TechnicalTabs";
import LatestNews from "./components/home/LatestNews";
import PartnerLogos from "./components/home/PartnerLogos";

// =========================================================================
// 1. POBIERANIE SLAJDÓW Z DRUPALA (JSON:API) — Drupal-first
// =========================================================================
async function getHeroSlidesFromDrupal(): Promise<HeroSlide[] | null> {
  try {
    const res = await fetch(
      `${process.env.DRUPAL_BASE_URL}/jsonapi/node/slajd_glowny?include=field_zdjecie_desktop,field_zdjecie_mobile,field_wideo_desktop,field_wideo_mobile,field_sektor&sort=field_waga`,
      { next: { revalidate: 10 } },
    );
    if (!res.ok) {
      console.warn("[SYSTEM] Brak odpowiedzi z Drupala dla slajdów. Używam danych domyślnych.");
      return null;
    }

    const json = await res.json();
    if (!json.data || json.data.length === 0) return null;

    const getFileUrl = (relationship: any): string | null => {
      if (!relationship?.data) return null;
      const fileNode = json.included?.find(
        (inc: any) => inc.id === relationship.data.id,
      );
      return fileNode
        ? `${process.env.DRUPAL_BASE_URL}${fileNode.attributes.uri.url}`
        : null;
    };

    const getAlt = (relationship: any): string => {
      return relationship?.data?.meta?.alt || "";
    };

    const getSektorUrl = (relationship: any): string | null => {
      if (!relationship?.data) return null;
      const sektorNode = json.included?.find(
        (inc: any) => inc.id === relationship.data.id,
      );
      const alias = sektorNode?.attributes?.path?.alias;
      return alias || null;
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
      sektorUrl: getSektorUrl(item.relationships.field_sektor),
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
    <main className="relative min-h-screen bg-gray-950 font-sans text-white">
      <HeroSlider drupalSlides={drupalSlides} />
      <FeatureCards drupalData={null} />
      <ServicesGrid />
      <WhyChooseUs drupalData={null} />
      <TechnicalTabs drupalData={null} />
      <PartnerLogos logos={null} />
      <LatestNews drupalPosts={null} />
    </main>
  );
}
