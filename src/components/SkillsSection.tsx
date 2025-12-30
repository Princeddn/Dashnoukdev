"use client";

import type { Skill } from "@/types";
import { CheckCircle2, BookOpen, Target } from "lucide-react";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const acquiredSkills = skills.filter((s) => s.level === "acquired");
  const learningSkills = skills.filter((s) => s.level === "learning");
  const targetSkills = skills.filter((s) => s.level === "target");

  return (
    <section className="py-20 bg-gradient-to-br from-apple-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-apple-gray-900 mb-4">
            Mes Compétences
          </h2>
          <p className="text-xl text-apple-gray-400">
            Ce que je maîtrise, ce que j'apprends, ce que je vise
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Compétences acquises */}
          <div className="glass-card rounded-apple-lg shadow-apple-medium p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-apple bg-apple-green/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-apple-green" />
              </div>
              <h3 className="text-2xl font-bold text-apple-gray-900">
                Acquises
              </h3>
            </div>

            {acquiredSkills.length === 0 ? (
              <p className="text-apple-gray-400">
                Aucune compétence acquise
              </p>
            ) : (
              <div className="space-y-3">
                {acquiredSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 rounded-apple bg-apple-green/5 hover:bg-apple-green/10 transition-all duration-300 border border-apple-green/20"
                  >
                    <p className="font-semibold text-apple-gray-900 mb-2">
                      {skill.name}
                    </p>
                    <span className="inline-block px-3 py-1 bg-apple-green/10 text-apple-green rounded-apple-sm text-xs font-semibold">
                      {skill.category}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Compétences en apprentissage */}
          <div className="glass-card rounded-apple-lg shadow-apple-medium p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-apple bg-apple-blue/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-apple-blue" />
              </div>
              <h3 className="text-2xl font-bold text-apple-gray-900">
                En cours
              </h3>
            </div>

            {learningSkills.length === 0 ? (
              <p className="text-apple-gray-400">
                Aucune compétence en apprentissage
              </p>
            ) : (
              <div className="space-y-3">
                {learningSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 rounded-apple bg-apple-blue/5 hover:bg-apple-blue/10 transition-all duration-300 border border-apple-blue/20"
                  >
                    <p className="font-semibold text-apple-gray-900 mb-2">
                      {skill.name}
                    </p>
                    <span className="inline-block px-3 py-1 bg-apple-blue/10 text-apple-blue rounded-apple-sm text-xs font-semibold">
                      {skill.category}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Compétences à acquérir */}
          <div className="glass-card rounded-apple-lg shadow-apple-medium p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-apple bg-apple-orange/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-apple-orange" />
              </div>
              <h3 className="text-2xl font-bold text-apple-gray-900">
                À viser
              </h3>
            </div>

            {targetSkills.length === 0 ? (
              <p className="text-apple-gray-400">
                Aucune compétence ciblée
              </p>
            ) : (
              <div className="space-y-3">
                {targetSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 rounded-apple bg-apple-orange/5 hover:bg-apple-orange/10 transition-all duration-300 border border-apple-orange/20"
                  >
                    <p className="font-semibold text-apple-gray-900 mb-2">
                      {skill.name}
                    </p>
                    <span className="inline-block px-3 py-1 bg-apple-orange/10 text-apple-orange rounded-apple-sm text-xs font-semibold">
                      {skill.category}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
