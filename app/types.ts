// =========================================================================
// TYPY DLA DANYCH Z DRUPALA (JSON:API)
// =========================================================================

/** Slajd główny (HeroSlider) */
export interface HeroSlide {
  id?: string;
  title: string;
  subtitle: string;
  image: string | null;
  imageMobile: string | null;
  video?: string | null;
}

/** Język w przełączniku */
export interface Language {
  code: string;
  label: string;
  url: string;
  active: boolean;
}

/** Projekt UE (dropdown w Header) */
export interface EuProject {
  title: string;
  id: string;
  url: string;
}

/** Usługa (ServicesGrid) */
export interface Service {
  icon: string;
  title: string;
  description: string;
  badge?: string;
}

/** Karta cech (FeatureCards) */
export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

/** Wpis aktualności (LatestNews) */
export interface NewsItem {
  title: string;
  date: string;
  excerpt: string;
  url: string;
  image?: string;
}

/** Partner / logo (PartnerLogos) */
export interface Partner {
  name: string;
  logo: string;
  url?: string;
}

/** Zakładka techniczna (TechnicalTabs) */
export interface TechnicalTab {
  label: string;
  content: string;
}