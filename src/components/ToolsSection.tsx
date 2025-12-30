import { Badge } from "@/components/ui/badge";
import type { Tool } from "@/types";

interface ToolsSectionProps {
  tools: Tool[];
}

export function ToolsSection({ tools }: ToolsSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Outils maîtrisés</h2>

        {tools.length === 0 ? (
          <p className="text-muted-foreground">Aucun outil défini</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition cursor-default"
              >
                {tool}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
