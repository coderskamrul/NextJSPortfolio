import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AwardsHeroSection } from "@/components/home/awards-hero-section";
import { SkillsSection } from "@/components/home/skills-section";
import { FeaturedPlugins } from "@/components/home/featured-plugins";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ExperienceSection } from "@/components/home/experience-section";
import { HeroCard } from "@/components/home/hero-card";
import { roleContent } from "@/lib/role-config";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <AwardsHeroSection />
      <HeroCard />
      {roleContent.showFeaturedPlugins && <FeaturedPlugins />}
      {roleContent.showFeaturedProjects && <FeaturedProjects />}
      <ExperienceSection />
      <SkillsSection />
      <Footer />
    </main>
  );
}
