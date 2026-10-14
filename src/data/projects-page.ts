import { designs, documentDesigns, photography, type DesignEntry } from "./designs";
import { sortedProjects } from "./projects";

const realEstate = sortedProjects.find((project) => project.slug === "real-estate-database");
const finance = sortedProjects.find((project) => project.slug === "jp-morgan-dashboard");
const retail = sortedProjects.find((project) => project.slug === "ulta-beauty-ai");

export const caseStudies = [
  ...(realEstate ? [{ ...realEstate, meta: "01 · 2025 · Featured" }] : []),
  ...(finance ? [{ ...finance, title: "[Case study 2 — finance]", summary: "Placeholder — finance research, design process, and outcomes coming soon.", meta: "02 · [YEAR]" }] : []),
  ...(retail ? [{ ...retail, title: "[Case study 3 — retail AI]", summary: "Placeholder — retail AI research, design process, and outcomes coming soon.", meta: "03 · [YEAR]" }] : []),
];

export interface TeachingEntry {
  id: string;
  title: string;
  image: string;
  audience: string;
  made: string;
  result: string;
  description: string;
  href?: string;
}

const documentation = photography.find((item) => item.id === "photo-1");
const showcase = photography.find((item) => item.id === "photo-3");
export const teaching: TeachingEntry[] = [
  {
    id: "teaching-lesson", title: "[Lesson / workshop title]", image: "/images/placeholder.jpg",
    audience: "[Audience / program]", made: "[What students built]", result: "[One learning outcome]",
    description: "Placeholder — lesson materials, teaching process, and student outcomes coming soon.",
  },
  {
    id: "teaching-process", title: "Workshop Process Documentation", image: documentation?.image ?? "/images/placeholder.jpg",
    audience: "Exelon Summer Institute students", made: "Sketches, tests, and revised maker projects", result: "[One learning outcome]",
    description: documentation?.description ?? "Placeholder — workshop documentation coming soon.",
  },
  {
    id: "teaching-showcase", title: "Student Showcase Moments", image: showcase?.image ?? "/images/placeholder.jpg",
    audience: "Exelon Summer Institute students", made: "Final demos and portfolio reviews", result: "[One learning outcome]",
    description: showcase?.description ?? "Placeholder — student showcase documentation coming soon.",
  },
];

export const visualFilters = ["All", "Physical designs", "Document designs", "Photography"] as const;
export type VisualFilter = typeof visualFilters[number];
export interface VisualEntry extends DesignEntry { category: Exclude<VisualFilter, "All"> }

const photoPlaceholders: DesignEntry[] = ["[Photography study 2]", "[Photography study 3]"].map((title, index) => ({
  id: `photo-placeholder-${index + 1}`, title, image: "/images/placeholder.jpg", media: [],
  description: "Placeholder — photograph and accompanying description coming soon.", order: index + 4,
}));

export const visualWork: VisualEntry[] = [
  ...designs.map((entry) => ({ ...entry, category: "Physical designs" as const })),
  ...documentDesigns.map((entry) => ({ ...entry, category: "Document designs" as const })),
  ...photography.filter((entry) => entry.id !== documentation?.id && entry.id !== showcase?.id)
    .concat(photoPlaceholders).map((entry) => ({ ...entry, category: "Photography" as const })),
];

/** Columns in the Visual work grid: 2 on small screens, 4 from the `lg` breakpoint. */
export const VISUAL_COLUMNS = { compact: 2, wide: 4 } as const;
/** Collapsed view shows exactly one row, so the limit matches the column count. */
export const visualRowLimit = (wide: boolean) => (wide ? VISUAL_COLUMNS.wide : VISUAL_COLUMNS.compact);

export function selectVisualWork(filter: VisualFilter, expanded = false, limit: number = VISUAL_COLUMNS.wide) {
  const matching = visualWork.filter((entry) => filter === "All" || entry.category === filter);
  const canExpand = matching.length > limit;
  return {
    entries: expanded ? matching : matching.slice(0, limit),
    hasMore: !expanded && canExpand,
    canCollapse: expanded && canExpand,
  };
}