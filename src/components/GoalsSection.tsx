"use client";

import type { Goal, GoalStatus } from "@/types";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface GoalsSectionProps {
  goals: Goal[];
}

function getStatusIcon(status: GoalStatus) {
  switch (status) {
    case "done":
      return <CheckCircle2 className="w-5 h-5 text-apple-green" />;
    case "in_progress":
      return <Clock className="w-5 h-5 text-apple-blue" />;
    case "todo":
      return <Circle className="w-5 h-5 text-apple-gray-300" />;
  }
}

function getStatusBadge(status: GoalStatus) {
  switch (status) {
    case "done":
      return (
        <span className="px-3 py-1 bg-apple-green/10 text-apple-green rounded-apple-sm text-xs font-semibold">
          Terminé
        </span>
      );
    case "in_progress":
      return (
        <span className="px-3 py-1 bg-apple-blue/10 text-apple-blue rounded-apple-sm text-xs font-semibold">
          En cours
        </span>
      );
    case "todo":
      return (
        <span className="px-3 py-1 bg-apple-gray-100 text-apple-gray-400 rounded-apple-sm text-xs font-semibold">
          À faire
        </span>
      );
  }
}

export function GoalsSection({ goals }: GoalsSectionProps) {
  const yearlyGoals = goals.filter((g) => g.scope === "year");
  const monthlyGoals = goals.filter((g) => g.scope === "month");

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-apple-gray-900 mb-4">
            Mes Objectifs
          </h2>
          <p className="text-xl text-apple-gray-400">
            Mes ambitions annuelles et mensuelles
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Objectifs annuels */}
          <div className="glass-card rounded-apple-lg shadow-apple-medium p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-apple bg-apple-blue/10 flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold text-apple-gray-900">
                Objectifs Annuels
              </h3>
            </div>

            {yearlyGoals.length === 0 ? (
              <p className="text-apple-gray-400">
                Aucun objectif annuel défini
              </p>
            ) : (
              <div className="space-y-3">
                {yearlyGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-start gap-3 p-4 rounded-apple bg-white/50 hover:bg-white/80 transition-all duration-300 border border-apple-gray-200/50"
                  >
                    {getStatusIcon(goal.status)}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-apple-gray-900 mb-1">
                        {goal.title}
                      </p>
                      {goal.year && (
                        <p className="text-sm text-apple-gray-400">
                          {goal.year}
                        </p>
                      )}
                    </div>
                    {getStatusBadge(goal.status)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Objectifs mensuels */}
          <div className="glass-card rounded-apple-lg shadow-apple-medium p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-apple bg-apple-purple/10 flex items-center justify-center">
                <span className="text-2xl">📆</span>
              </div>
              <h3 className="text-2xl font-bold text-apple-gray-900">
                Objectifs Mensuels
              </h3>
            </div>

            {monthlyGoals.length === 0 ? (
              <p className="text-apple-gray-400">
                Aucun objectif mensuel défini
              </p>
            ) : (
              <div className="space-y-3">
                {monthlyGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-start gap-3 p-4 rounded-apple bg-white/50 hover:bg-white/80 transition-all duration-300 border border-apple-gray-200/50"
                  >
                    {getStatusIcon(goal.status)}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-apple-gray-900 mb-1">
                        {goal.title}
                      </p>
                      {goal.month && goal.year && (
                        <p className="text-sm text-apple-gray-400">
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
          </div>
        </div>
      </div>
    </section>
  );
}
