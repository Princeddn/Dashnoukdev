import { HeroSection } from "@/components/HeroSection";
import { GoalsSection } from "@/components/GoalsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ToolsSection } from "@/components/ToolsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { demoGoals, demoSkills, demoTools, demoProjects } from "@/lib/demo-data";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <GoalsSection goals={demoGoals} />
      <SkillsSection skills={demoSkills} />
      <ToolsSection tools={demoTools} />
      <ProjectsSection projects={demoProjects} limit={6} />
    </main>
  );
}
