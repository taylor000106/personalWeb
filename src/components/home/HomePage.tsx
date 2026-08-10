import { ArchiveSection } from "./ArchiveSection";
import { ArticlesSection } from "./ArticlesSection";
import { ContactSection } from "./ContactSection";
import { ExperienceSection } from "./ExperienceSection";
import { HeroSection } from "./HeroSection";
import { LabPreviewSection } from "./LabPreviewSection";
import { ProjectsSection } from "./ProjectsSection";
import { VitalsSection } from "./VitalsSection";
import { profile } from "@/content/profile";

export function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05050c] text-white">
      <HeroSection />
      <ProjectsSection />
      <ArchiveSection />
      <ExperienceSection />
      <VitalsSection />
      <LabPreviewSection />
      <ArticlesSection />
      <ContactSection />
      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-sm text-zinc-500">
        {"\u00A9"} {new Date().getFullYear()} {profile.name} {"\u00B7"} yywtaylor.cyou
      </footer>
    </div>
  );
}
