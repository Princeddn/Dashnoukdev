"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { StatCard } from "@/components/admin/SectionCard";
import { SectionCard } from "@/components/admin/SectionCard";
import { Rocket, Lightbulb, Target, Wrench, Activity } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    goals: 0,
    tools: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsRes, skillsRes, goalsRes, toolsRes] = await Promise.all([
          supabase.from('projects').select('id', { count: 'exact', head: true }).is('deleted_at', null),
          supabase.from('skills').select('id', { count: 'exact', head: true }),
          supabase.from('goals').select('id', { count: 'exact', head: true }),
          supabase.from('tools').select('id', { count: 'exact', head: true }).eq('is_visible', true),
        ]);

        setStats({
          projects: projectsRes.count || 0,
          skills: skillsRes.count || 0,
          goals: goalsRes.count || 0,
          tools: toolsRes.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bienvenue sur votre HQ ! 👋</h1>
        <p className="text-gray-600 mt-2">
          Voici un aperçu rapide de votre contenu
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Projets"
          value={stats.projects}
          icon={<Rocket className="w-6 h-6 text-apple-blue" />}
        />
        <StatCard
          title="Compétences"
          value={stats.skills}
          icon={<Lightbulb className="w-6 h-6 text-apple-purple" />}
        />
        <StatCard
          title="Objectifs"
          value={stats.goals}
          icon={<Target className="w-6 h-6 text-apple-orange" />}
        />
        <StatCard
          title="Outils"
          value={stats.tools}
          icon={<Wrench className="w-6 h-6 text-green-600" />}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard
          title="Actions rapides"
          description="Gérez rapidement votre contenu"
        >
          <div className="grid grid-cols-2 gap-3">
            <a
              href="/admin/projects"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-apple-blue hover:bg-apple-blue/5 transition-colors cursor-pointer"
            >
              <Rocket className="w-6 h-6 text-apple-blue" />
              <span className="text-sm font-medium text-gray-700">Nouveau projet</span>
            </a>
            <a
              href="/admin/skills"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-apple-purple hover:bg-apple-purple/5 transition-colors cursor-pointer"
            >
              <Lightbulb className="w-6 h-6 text-apple-purple" />
              <span className="text-sm font-medium text-gray-700">Ajouter compétence</span>
            </a>
            <a
              href="/admin/goals"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-apple-orange hover:bg-apple-orange/5 transition-colors cursor-pointer"
            >
              <Target className="w-6 h-6 text-apple-orange" />
              <span className="text-sm font-medium text-gray-700">Définir objectif</span>
            </a>
            <a
              href="/admin/content"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-green-600 hover:bg-green-50 transition-colors cursor-pointer"
            >
              <Activity className="w-6 h-6 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Modifier contenu</span>
            </a>
          </div>
        </SectionCard>

        <SectionCard
          title="Système CMS"
          description="État de votre infrastructure"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Base de données</span>
              </div>
              <span className="text-xs text-green-600 font-medium">Connectée</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">CMS Core</span>
              </div>
              <span className="text-xs text-green-600 font-medium">Actif</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">GitHub Integration</span>
              </div>
              <span className="text-xs text-blue-600 font-medium">À configurer</span>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Getting Started */}
      <SectionCard
        title="Prochaines étapes"
        description="Complétez la configuration de votre HQ"
      >
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-apple-blue text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Personnaliser le profil</h4>
              <p className="text-sm text-gray-600 mt-1">
                Ajoutez votre photo et mettez à jour vos informations personnelles
              </p>
              <a href="/admin/profile" className="text-sm text-apple-blue hover:underline mt-2 inline-block">
                Aller au profil →
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-apple-purple text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Configurer GitHub</h4>
              <p className="text-sm text-gray-600 mt-1">
                Connectez votre compte GitHub pour synchroniser automatiquement vos repositories
              </p>
              <a href="/admin/github" className="text-sm text-apple-purple hover:underline mt-2 inline-block">
                Configurer GitHub →
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-apple-orange text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Personnaliser l'apparence</h4>
              <p className="text-sm text-gray-600 mt-1">
                Ajustez les couleurs, thèmes et visibilité des sections
              </p>
              <a href="/admin/appearance" className="text-sm text-apple-orange hover:underline mt-2 inline-block">
                Modifier l'apparence →
              </a>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
