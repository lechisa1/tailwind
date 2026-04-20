export type ProjectStatus = "active" | "completed" | "cancelled";

export interface Project {
  id: number;
  name: string;
  client: string;
  budget: string;
  progress: number;
  status: ProjectStatus;
  description?: string;
  startDate?: string;
  endDate?: string;
  teamMembers?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectFormData extends Omit<Project, "id" | "createdAt" | "updatedAt"> {
  id?: number;
}

export interface ProjectsResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
}

export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalBudget: string;
  averageProgress: number;
}
