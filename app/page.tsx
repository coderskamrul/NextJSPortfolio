import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/home/hero-section";
import { SkillsSection } from "@/components/home/skills-section";
import { FeaturedPlugins } from "@/components/home/featured-plugins";
import { ExperienceSection } from "@/components/home/experience-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturedPlugins />
      <ExperienceSection />
      <SkillsSection />
      <Footer />
    </main>
  );
}
