import { HeroBanner } from "@/components/public/home/HeroBanner";
import { TrustBar } from "@/components/public/home/TrustBar";
import { CategoryShowcase } from "@/components/public/home/CategoryShowcase";
import { FeaturedProducts } from "@/components/public/home/FeaturedProducts";
import { ProcessSection } from "@/components/public/home/ProcessSection";
import { AboutSection } from "@/components/public/home/AboutSection";
import { StatsAndReviews } from "@/components/public/home/StatsAndReviews";
import { FAQSection } from "@/components/public/home/FAQSection";
import { WhatsAppCTA } from "@/components/public/home/WhatsAppCTA";

export const metadata = {
  title: "AVP Oils & Millets | Pure Wood Pressed Oils from Tiruvannamalai",
  description:
    "100% Natural Wood Pressed Oils, Traditional Millets & Spices. Cold pressed, chemical-free, farm-fresh from Tiruvannamalai.",
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrustBar />
      <CategoryShowcase />
      <FeaturedProducts />
      <ProcessSection />
      <AboutSection />
      <StatsAndReviews />
      <FAQSection />
      <WhatsAppCTA />
    </>
  );
}
