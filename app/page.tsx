import { SectionNav, HamburgerMenu } from "@/components/SectionNav";
import { IslandNav } from "@/components/IslandNav";
import { HeroSection } from "@/app/hero/HeroSection";
import { ProblemSection } from "@/app/problem/ProblemSection";
import { ServicesSection } from "@/app/our-services/ServicesSection";
import { WhyUsSection } from "@/app/about-us/WhyUsSection";
import { ComparisonSection } from "@/app/comparison/ComparisonSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <IslandNav />
      <SectionNav />
      <HamburgerMenu />
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <WhyUsSection />
      <div className="snap-tail">
        <ComparisonSection />
        <Footer />
      </div>
    </main>
  );
}
