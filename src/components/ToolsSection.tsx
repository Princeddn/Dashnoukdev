"use client";

import { Wrench } from "lucide-react";
import { useTools, useSectionConfig } from "@/hooks/useCMS";
import type { SectionConfig } from "@/types/cms";

export function ToolsSection() {
  const { data: tools, loading: toolsLoading } = useTools(true);
  const { data: sectionConfig, loading: configLoading } = useSectionConfig('tools');

  // Loading state
  if (toolsLoading || configLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Chargement des outils...</p>
          </div>
        </div>
      </section>
    );
  }

  // Don't render if section is not visible
  const config = sectionConfig as SectionConfig;
  if (!config || !config.is_visible) return null;

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
            {config.title}
          </h2>
          <p className="text-xl text-apple-gray-400">
            {config.description}
          </p>
        </div>

        {!tools || tools.length === 0 ? (
          <div className="text-center">
            <p className="text-apple-gray-400 text-lg">Aucun outil défini</p>
          </div>
        ) : (
          <div className="glass-card rounded-apple-lg shadow-apple-medium p-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="group px-6 py-3 bg-gradient-to-br from-apple-blue/5 to-apple-purple/5 hover:from-apple-blue/10 hover:to-apple-purple/10 border border-apple-gray-200 hover:border-apple-blue/30 rounded-apple shadow-apple-subtle hover:shadow-apple-medium transition-all duration-300 cursor-default"
                >
                  <span className="text-sm font-semibold text-apple-gray-900 group-hover:text-apple-blue transition-colors">
                    {tool.name}
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
