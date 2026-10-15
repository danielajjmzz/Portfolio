import realEstateCover from "@/assets/real-estate-database.jpg";
import ultaCover from "@/assets/ulta-beauty-ai.jpg";
import jpmCover from "@/assets/jp-morgan-dashboard.jpg";

/**
 * Single source of truth for all portfolio projects.
 * To add a project later: append one object to this array. Nothing else to edit.
 */
export const projects = [
  {
    slug: "real-estate-database",
    title: "Real Estate Management Database",
    summary:
      "A structured database and interface concept for managing property records, tenants, and listings.",
    year: "2025",
    role: "Designer & Developer",
    client: "Academic project — Illinois Tech",
    tools: ["SQL", "Figma"],
    coverImage: realEstateCover,
    order: 1,
    featured: true,
    problem:
      "Placeholder — project content coming soon. This section will describe the core problem the project set out to solve.",
    process:
      "Placeholder — project content coming soon. This section will walk through research, schema design, and interface iterations.",
    solution:
      "Placeholder — project content coming soon. This section will describe the final designed solution.",
    outcome:
      "Placeholder — project content coming soon. This section will describe results and what came out of the work.",
    repo_url: "",
    live_url: "",
  },
  {
    slug: "ulta-beauty-ai",
    title: "AI Strategy for Ulta Beauty",
    summary:
      "Led a 6-person interdisciplinary team designing generative AI concepts to improve Ulta Beauty's guest experience.",
    year: "2025",
    role: "Team Lead",
    client: "Ulta Beauty",
    tools: ["Figma", "Framer"],
    coverImage: ultaCover,
    order: 2,
    featured: true,
    problem: "Placeholder — real project content coming soon.",
    process:
      "Conducted user research, competitive analysis, and stakeholder interviews. Built and tested AI-powered recommendation prototypes.",
    solution: "Placeholder — real project content coming soon.",
    outcome:
      "Delivered an implementation roadmap presented at Illinois Tech Innovation Day to students, faculty, and industry guests.",
    repo_url: "",
    live_url: "",
  },
  {
    slug: "jp-morgan-dashboard",
    title: "JP Morgan Chase — Student Finance Dashboard",
    summary:
      "Designed a student budgeting dashboard and identified pain points through user research.",
    year: "2023",
    role: "Project Lead",
    client: "JP Morgan Chase (P33 program)",
    tools: ["Moqups", "Figma"],
    coverImage: jpmCover,
    order: 3,
    featured: true,
    problem: "Students needed a clearer way to understand and manage their finances.",
    process:
      "Conducted user research to uncover student financial pain points. Designed wireframes in Moqups. Built multiple interactive prototypes in Figma. Ran usability testing and iterated based on feedback.",
    solution:
      "A final interactive prototype of a student budgeting dashboard, refined across multiple rounds of testing.",
    outcome:
      "Presented to a 50+ person audience, achieved 90% usability satisfaction, and delivered all milestones on time.",
    repo_url: "",
    live_url: "",
  },
  {
    slug: "portfolio-website",
    title: "Daniela Jimenez Portfolio Website",
    summary:
      "A personal portfolio designed and built to present multidisciplinary featured projects, physical designs, and professional experience.",
    year: "2026",
    role: "Designer & Developer",
    client: "Personal project",
    tools: ["Figma", "React", "TypeScript"],
    coverImage: "/images/placeholder.jpg",
    order: 4,
    featured: true,
    problem:
      "Placeholder — project content coming soon. This section will describe the core problem the project set out to solve.",
    process:
      "Placeholder — project content coming soon. This section will walk through research, information architecture, visual design, and development.",
    solution:
      "Placeholder — project content coming soon. This section will describe the final designed and developed portfolio experience.",
    outcome:
      "Placeholder — project content coming soon. This section will describe results and what came out of the work.",
    repo_url: "",
    live_url: "",
  },
];

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

export const featuredProjects = sortedProjects.filter((p) => p.featured);

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
