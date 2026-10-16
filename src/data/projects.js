import realEstateCover from "@/assets/real-estate-database.jpg";
import ultaCover from "@/assets/ulta-beauty-ai.jpg";
import jpmCover from "@/assets/jp-morgan-dashboard.jpg";

/**
 * Single source of truth for all portfolio projects.
 * To add a project later: append one object to this array. Nothing else to edit.
 *
 * Project pages use the same layout as teaching pages. Optional extras:
 *   problemMedia   — one photo beside "01 The Problem"
 *   processSteps   — tabbed steps with photos for "02 My Process" (like a teaching page's lessons);
 *                    leave it out and "02 My Process" shows the `process` text instead
 *   solutionMedia  — photos under "03 The Solution"
 *   outcomeExtras  — small photo grid in "04 The Outcome", plus `change` ("What I'd change")
 *
 * Media: leave `src` empty ("") to show a labeled placeholder frame until the real
 * photo or video is ready; `label` is what the placeholder says.
 */

/** Empty photo slot: shows a labeled placeholder frame until `src` is filled in. */
const slot = (label, note = "Photo coming soon") => ({
  type: "image",
  src: "",
  alt: "",
  label,
  note,
});
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
    processSteps: [
      {
        id: "research",
        label: "Research",
        title: "Research",
        body: "Placeholder — project content coming soon.",
        tags: [],
        media: [slot("Research photo"), slot("Research photo")],
      },
      {
        id: "schema",
        label: "Schema design",
        title: "Schema design",
        body: "Placeholder — project content coming soon.",
        tags: ["SQL"],
        media: [slot("Schema diagram"), slot("Table design")],
      },
      {
        id: "interface",
        label: "Interface",
        title: "Interface iterations",
        body: "Placeholder — project content coming soon.",
        tags: ["Figma"],
        media: [slot("Interface draft"), slot("Interface final")],
      },
    ],
    solution:
      "Placeholder — project content coming soon. This section will describe the final designed solution.",
    outcome:
      "Placeholder — project content coming soon. This section will describe results and what came out of the work.",
    // "#" shows the icon as "coming soon" on the Projects card; replace with a real URL, or "" to hide it.
    repo_url: "#",
    live_url: "#",
    file_url: "#",
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
    processSteps: [
      {
        id: "research",
        label: "Research",
        title: "User research and competitive analysis",
        body: "Conducted user research and competitive analysis. Placeholder — full write-up coming soon.",
        tags: ["User research", "Competitive analysis"],
        media: [slot("Research deck slide"), slot("Research deck slide")],
      },
      {
        id: "interview",
        label: "Interview",
        title: "Stakeholder interview",
        body: "Conducted stakeholder interviews. Placeholder — full write-up coming soon.",
        tags: ["Stakeholder interview"],
        media: [slot("Interview notes"), slot("Interview takeaways")],
      },
      {
        id: "prototype",
        label: "Prototype",
        title: "AI recommendation prototype",
        body: "Built and tested AI-powered recommendation prototypes. Placeholder — full write-up coming soon.",
        tags: ["Prototyping", "Generative AI"],
        media: [slot("Prototype screen"), slot("Prototype screen")],
      },
    ],
    solution: "Placeholder — real project content coming soon.",
    outcome:
      "Delivered an implementation roadmap presented at Illinois Tech Innovation Day to students, faculty, and industry guests.",
    // "#" shows the icon as "coming soon" on the Projects card; replace with a real URL, or "" to hide it.
    repo_url: "#",
    live_url: "#",
    file_url: "#",
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
    processSteps: [
      {
        id: "research",
        label: "User research",
        title: "User research",
        body: "Conducted user research to uncover student financial pain points.",
        tags: ["User research"],
        media: [slot("Research photo"), slot("Pain points")],
      },
      {
        id: "wireframes",
        label: "Wireframes",
        title: "Wireframes",
        body: "Designed wireframes in Moqups.",
        tags: ["Moqups", "Wireframing"],
        media: [slot("Wireframe"), slot("Wireframe")],
      },
      {
        id: "prototypes",
        label: "Prototypes",
        title: "Interactive prototypes",
        body: "Built multiple interactive prototypes in Figma.",
        tags: ["Figma", "Prototyping"],
        media: [slot("Prototype screen"), slot("Prototype screen")],
      },
      {
        id: "testing",
        label: "Usability testing",
        title: "Usability testing",
        body: "Ran usability testing and iterated based on feedback.",
        tags: ["Usability testing", "Iteration"],
        media: [slot("Testing session"), slot("Revised screen")],
      },
    ],
    solution:
      "A final interactive prototype of a student budgeting dashboard, refined across multiple rounds of testing.",
    outcome:
      "Presented to a 50+ person audience, achieved 90% usability satisfaction, and delivered all milestones on time.",
    // "#" shows the icon as "coming soon" on the Projects card; replace with a real URL, or "" to hide it.
    repo_url: "#",
    live_url: "#",
    file_url: "#",
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
    processSteps: [
      {
        id: "research",
        label: "Research",
        title: "Research",
        body: "Placeholder — project content coming soon.",
        tags: [],
        media: [slot("Reference sites"), slot("Research notes")],
      },
      {
        id: "architecture",
        label: "Information architecture",
        title: "Information architecture",
        body: "Placeholder — project content coming soon.",
        tags: [],
        media: [slot("Site map"), slot("Page structure")],
      },
      {
        id: "visual",
        label: "Visual design",
        title: "Visual design",
        body: "Placeholder — project content coming soon.",
        tags: ["Figma"],
        media: [slot("Color and type"), slot("Page design")],
      },
      {
        id: "development",
        label: "Development",
        title: "Development",
        body: "Placeholder — project content coming soon.",
        tags: ["React", "TypeScript"],
        media: [slot("Code"), slot("Live page")],
      },
    ],
    solution:
      "Placeholder — project content coming soon. This section will describe the final designed and developed portfolio experience.",
    outcome:
      "Placeholder — project content coming soon. This section will describe results and what came out of the work.",
    // "#" shows the icon as "coming soon" on the Projects card; replace with a real URL, or "" to hide it.
    repo_url: "#",
    live_url: "#",
    file_url: "#",
  },
];

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

export const featuredProjects = sortedProjects.filter((p) => p.featured);

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
