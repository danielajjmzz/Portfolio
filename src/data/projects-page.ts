import { designs, type DesignEntry } from "./designs";
import { sortedTeaching, type TeachingEntry } from "./teaching";
import { sortedProjects } from "./projects";

/**
 * Featured project cards on /projects, most recent first (same order as Home).
 * Each card uses the project's real title, summary and year.
 */
const featuredOrder = ["real-estate-database", "ulta-beauty-ai", "jp-morgan-dashboard"];

export const featuredProjectCards = featuredOrder
  .map((slug) => sortedProjects.find((project) => project.slug === slug))
  .filter((project) => project !== undefined)
  .map((project, index) => ({
    ...project,
    // Card label, e.g. "01 · 2025 · Featured" (the year is pulled from values like "Fall 2025").
    meta: `${String(index + 1).padStart(2, "0")} · ${project.year.match(/\d{4}/)?.[0] ?? project.year} · Featured`,
  }));

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

// Photography and Document designs are hidden for now; add them back here (and to visualWork) to show them again.
export const visualFilters = ["All", "Physical designs"] as const;
export type VisualFilter = (typeof visualFilters)[number];
export interface VisualEntry extends DesignEntry {
  category: Exclude<VisualFilter, "All">;
}

export const visualWork: VisualEntry[] = [
  ...designs.map((entry) => ({ ...entry, category: "Physical designs" as const })),
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
