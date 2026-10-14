export interface Project {
  slug: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  client: string;
  tools: string[];
  coverImage: string;
  order: number;
  featured: boolean;
  problem: string;
  process: string;
  solution: string;
  outcome: string;
  repo_url?: string;
  live_url?: string;
}

export const projects: Project[];
export const sortedProjects: Project[];
export const featuredProjects: Project[];
export function getProjectBySlug(slug: string): Project | undefined;
