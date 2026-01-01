import { demoProjects } from "@/lib/demo-data";
import { ProjectDetail } from "./ProjectDetail";

// Générer les routes statiques pour l'export (utilise les IDs connus)
export function generateStaticParams() {
  return demoProjects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  return <ProjectDetail id={id} />;
}
