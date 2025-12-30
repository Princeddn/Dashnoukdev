"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Compétences</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Compétences acquises */}
          <Card className="border-green-200 dark:border-green-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                Acquises
              </CardTitle>
            </CardHeader>
            <CardContent>
              {acquiredSkills.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Aucune compétence
                </p>
              ) : (
                <div className="space-y-3">
                  {acquiredSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3 rounded-md bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900"
                    >
                      <p className="font-medium text-sm">{skill.name}</p>
                      <Badge
                        variant="outline"
                        className="mt-1 text-xs border-green-300 dark:border-green-800"
                      >
                        {skill.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Compétences en apprentissage */}
          <Card className="border-blue-200 dark:border-blue-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <BookOpen className="w-5 h-5" />
                En apprentissage
              </CardTitle>
            </CardHeader>
            <CardContent>
              {learningSkills.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Aucune compétence
                </p>
              ) : (
                <div className="space-y-3">
                  {learningSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3 rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900"
                    >
                      <p className="font-medium text-sm">{skill.name}</p>
                      <Badge
                        variant="outline"
                        className="mt-1 text-xs border-blue-300 dark:border-blue-800"
                      >
                        {skill.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Compétences à acquérir */}
          <Card className="border-orange-200 dark:border-orange-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <Target className="w-5 h-5" />
                À acquérir
              </CardTitle>
            </CardHeader>
            <CardContent>
              {targetSkills.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Aucune compétence
                </p>
              ) : (
                <div className="space-y-3">
                  {targetSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3 rounded-md bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900"
                    >
                      <p className="font-medium text-sm">{skill.name}</p>
                      <Badge
                        variant="outline"
                        className="mt-1 text-xs border-orange-300 dark:border-orange-800"
                      >
                        {skill.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
