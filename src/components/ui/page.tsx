import { ProjectList } from "@/features/projects/ProjectList";

export default function ProjectsPage() {
  return (
    <main className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-gray-500">
          Track and manage your project portfolio.
        </p>
      </div>
      <ProjectList />
    </main>
  );
}
