import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import ServicesGrid from "./components/ServicesGrid";
import WhyChooseUs from "./components/WhyChooseUs";
import TechnicalTabs from "./components/TechnicalTabs";
import PartnerLogos from "./components/PartnerLogos";
import LatestNews from "./components/LatestNews";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <FeatureCards />
      <ServicesGrid />
      <WhyChooseUs />
      <TechnicalTabs />
      <PartnerLogos />
      <LatestNews />
      <Footer />
    </main>
  );
}
