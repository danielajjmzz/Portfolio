import { designs, documentDesigns, photography, type DesignEntry, type MediaItem } from "./designs";
import { sortedProjects } from "./projects";

const realEstate = sortedProjects.find((project) => project.slug === "real-estate-database");
const finance = sortedProjects.find((project) => project.slug === "jp-morgan-dashboard");
const retail = sortedProjects.find((project) => project.slug === "ulta-beauty-ai");

export const caseStudies = [
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

const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";

/** Three placeholder photos so every card has a working carousel until real photos are added. */
const placeholderMedia = (title: string): MediaItem[] =>
  [1, 2, 3].map((number) => ({
    type: "image" as const,
    src: PLACEHOLDER_IMAGE,
    alt: `${title} placeholder photo ${number}`,
  }));

/**
 * Link placeholders: "#" shows the icon as "coming soon" on every card for now.
 * Replace with a real URL to make it clickable, or delete the field to hide that icon.
 */
const placeholderLinks = { repoUrl: "#", liveUrl: "#", artifactUrl: "#" };

export interface TeachingEntry {
  id: string;
  title: string;
  image: string;
  media: MediaItem[];
  repoUrl?: string;
  liveUrl?: string;
  artifactUrl?: string;
  artifactLabel?: string;
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
    id: "teaching-lesson",
    title: "[Lesson / workshop title]",
    image: PLACEHOLDER_IMAGE,
    media: placeholderMedia("Lesson or workshop"),
    ...placeholderLinks,
    audience: "[Audience / program]",
    made: "[What students built]",
    result: "[One learning outcome]",
    description:
      "Placeholder — lesson materials, teaching process, and student outcomes coming soon.",
  },
  {
    id: "teaching-process",
    title: "Workshop Process Documentation",
    image: documentation?.image ?? PLACEHOLDER_IMAGE,
    media: documentation?.media.length ? documentation.media : placeholderMedia("Workshop process"),
    repoUrl: documentation?.repoUrl ?? "#",
    liveUrl: documentation?.liveUrl ?? "#",
    artifactUrl: documentation?.artifactUrl ?? "#",
    audience: "Exelon Summer Institute students",
    made: "Sketches, tests, and revised maker projects",
    result: "[One learning outcome]",
    description: documentation?.description ?? "Placeholder — workshop documentation coming soon.",
  },
  {
    id: "teaching-showcase",
    title: "Student Showcase Moments",
    image: showcase?.image ?? PLACEHOLDER_IMAGE,
    media: showcase?.media.length ? showcase.media : placeholderMedia("Student showcase"),
    repoUrl: showcase?.repoUrl ?? "#",
    liveUrl: showcase?.liveUrl ?? "#",
    artifactUrl: showcase?.artifactUrl ?? "#",
    audience: "Exelon Summer Institute students",
    made: "Final demos and portfolio reviews",
    result: "[One learning outcome]",
    description:
      showcase?.description ?? "Placeholder — student showcase documentation coming soon.",
  },
];

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
