"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { GoalsSection } from "@/components/GoalsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ToolsSection } from "@/components/ToolsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { supabase } from "@/lib/supabase";
import type { Goal, Skill, Project } from "@/types";

export default function Home() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [goalsRes, skillsRes, projectsRes] = await Promise.all([
          supabase.from('goals').select('*').order('year', { ascending: false }),
          supabase.from('skills').select('*').order('created_at', { ascending: true }),
          supabase.from('projects').select('*').is('deleted_at', null).order('created_at', { ascending: false }),
        ]);

        if (goalsRes.data) setGoals(goalsRes.data as Goal[]);
        if (skillsRes.data) setSkills(skillsRes.data as Skill[]);
        if (projectsRes.data) setProjects(projectsRes.data as Project[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section id="accueil">
          <HeroSection />
        </section>
        <section id="objectifs">
          <GoalsSection goals={goals} />
        </section>
        <section id="competences">
          <SkillsSection skills={skills} />
        </section>
        <section id="outils">
          <ToolsSection />
        </section>
        <section id="projets">
          <ProjectsSection projects={projects} limit={6} />
        </section>
      </main>
    </>
  );
}
