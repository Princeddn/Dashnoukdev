"use client";

import type { Tool } from "@/types";
import { Wrench } from "lucide-react";

interface ToolsSectionProps {
  tools: Tool[];
}

export function ToolsSection({ tools }: ToolsSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-apple bg-gradient-to-br from-apple-blue to-apple-purple flex items-center justify-center">
              <Wrench className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-apple-gray-900 mb-4">
            Mes Outils
          </h2>
          <p className="text-xl text-apple-gray-400">
            Technologies et outils que je maîtrise au quotidien
          </p>
        </div>

        {tools.length === 0 ? (
          <div className="text-center">
            <p className="text-apple-gray-400 text-lg">Aucun outil défini</p>
          </div>
        ) : (
          <div className="glass-card rounded-apple-lg shadow-apple-medium p-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="group px-6 py-3 bg-gradient-to-br from-apple-blue/5 to-apple-purple/5 hover:from-apple-blue/10 hover:to-apple-purple/10 border border-apple-gray-200 hover:border-apple-blue/30 rounded-apple shadow-apple-subtle hover:shadow-apple-medium transition-all duration-300 cursor-default"
                >
                  <span className="text-sm font-semibold text-apple-gray-900 group-hover:text-apple-blue transition-colors">
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
