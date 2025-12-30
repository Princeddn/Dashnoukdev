import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { GoalsSection } from "@/components/GoalsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ToolsSection } from "@/components/ToolsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { demoGoals, demoSkills, demoTools, demoProjects } from "@/lib/demo-data";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section id="accueil">
          <HeroSection />
        </section>
        <section id="objectifs">
          <GoalsSection goals={demoGoals} />
        </section>
        <section id="competences">
          <SkillsSection skills={demoSkills} />
        </section>
        <section id="outils">
          <ToolsSection tools={demoTools} />
        </section>
        <section id="projets">
          <ProjectsSection projects={demoProjects} limit={6} />
        </section>
      </main>
    </>
  );
}
