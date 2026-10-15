import { designs, documentDesigns, type DesignEntry } from "./designs";
import { sortedTeaching, type TeachingEntry } from "./teaching";
import { sortedProjects } from "./projects";

const realEstate = sortedProjects.find((project) => project.slug === "real-estate-database");
const finance = sortedProjects.find((project) => project.slug === "jp-morgan-dashboard");
const retail = sortedProjects.find((project) => project.slug === "ulta-beauty-ai");

export const featuredProjectCards = [
  ...(realEstate ? [{ ...realEstate, meta: "01 · 2025 · Featured" }] : []),
  ...(finance
    ? [
        {
          ...finance,
          title: "[Featured project 2 — finance]",
          summary: "Placeholder — finance research, design process, and outcomes coming soon.",
          meta: "02 · [YEAR]",
        },
      ]
    : []),
  ...(retail
    ? [
        {
          ...retail,
          title: "[Featured project 3 — retail AI]",
          summary: "Placeholder — retail AI research, design process, and outcomes coming soon.",
          meta: "03 · [YEAR]",
        },
      ]
    : []),
];

/** Teaching cards on /projects, curated from the shared teaching catalog (src/data/teaching.js). */
export const teaching: TeachingEntry[] = [
  ...sortedTeaching.filter((entry) => entry.main),
  ...sortedTeaching.filter((entry) => !entry.main),
];

/** Teaching shows one row (the main cards) before "Show more". */
export const TEACHING_INITIAL_COUNT = 3;

export function selectTeaching(expanded = false, limit: number = TEACHING_INITIAL_COUNT) {
  const canExpand = teaching.length > limit;
  return {
    entries: expanded ? teaching : teaching.slice(0, limit),
    hasMore: !expanded && canExpand,
    canCollapse: expanded && canExpand,
  };
}

// Photography is hidden for now; add "Photography" back here (and to visualWork) to show it again.
export const visualFilters = ["All", "Physical designs", "Document designs"] as const;
export type VisualFilter = (typeof visualFilters)[number];
export interface VisualEntry extends DesignEntry {
  category: Exclude<VisualFilter, "All">;
}

export const visualWork: VisualEntry[] = [
  ...designs.map((entry) => ({ ...entry, category: "Physical designs" as const })),
  ...documentDesigns.map((entry) => ({ ...entry, category: "Document designs" as const })),
];

/** Visual work shows one row of four before "Show more". */
export const VISUAL_INITIAL_COUNT = 4;

export function selectVisualWork(
  filter: VisualFilter,
  expanded = false,
  limit: number = VISUAL_INITIAL_COUNT,
) {
  const matching = visualWork.filter((entry) => filter === "All" || entry.category === filter);
  const canExpand = matching.length > limit;
  return {
    entries: expanded ? matching : matching.slice(0, limit),
    hasMore: !expanded && canExpand,
    canCollapse: expanded && canExpand,
  };
}
