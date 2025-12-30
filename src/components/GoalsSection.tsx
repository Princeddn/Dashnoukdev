"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Goal, GoalStatus } from "@/types";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface GoalsSectionProps {
  goals: Goal[];
}

function getStatusIcon(status: GoalStatus) {
  switch (status) {
    case "done":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "in_progress":
      return <Clock className="w-5 h-5 text-blue-500" />;
    case "todo":
      return <Circle className="w-5 h-5 text-gray-400" />;
  }
}

function getStatusBadge(status: GoalStatus) {
  switch (status) {
    case "done":
      return <Badge variant="default" className="bg-green-500">Terminé</Badge>;
    case "in_progress":
      return <Badge variant="default" className="bg-blue-500">En cours</Badge>;
    case "todo":
      return <Badge variant="outline">À faire</Badge>;
  }
}

export function GoalsSection({ goals }: GoalsSectionProps) {
  const yearlyGoals = goals.filter((g) => g.scope === "year");
  const monthlyGoals = goals.filter((g) => g.scope === "month");

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Objectifs</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Objectifs annuels */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📅</span>
                Objectifs Annuels
              </CardTitle>
            </CardHeader>
            <CardContent>
              {yearlyGoals.length === 0 ? (
                <p className="text-muted-foreground">
                  Aucun objectif annuel défini
                </p>
              ) : (
                <div className="space-y-4">
                  {yearlyGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition"
                    >
                      {getStatusIcon(goal.status)}
                      <div className="flex-1">
                        <p className="font-medium">{goal.title}</p>
                        {goal.year && (
                          <p className="text-sm text-muted-foreground">
                            {goal.year}
                          </p>
                        )}
                      </div>
                      {getStatusBadge(goal.status)}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Objectifs mensuels */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📆</span>
                Objectifs Mensuels
              </CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyGoals.length === 0 ? (
                <p className="text-muted-foreground">
                  Aucun objectif mensuel défini
                </p>
              ) : (
                <div className="space-y-4">
                  {monthlyGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition"
                    >
                      {getStatusIcon(goal.status)}
                      <div className="flex-1">
                        <p className="font-medium">{goal.title}</p>
                        {goal.month && goal.year && (
                          <p className="text-sm text-muted-foreground">
                            {new Date(goal.year, goal.month - 1).toLocaleDateString(
                              "fr-FR",
                              { month: "long", year: "numeric" }
                            )}
                          </p>
                        )}
                      </div>
                      {getStatusBadge(goal.status)}
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
