import type { GalleryStep } from "@/components/StepGallery";
import type { TeachingMedia } from "@/data/teaching";

/** A process step on a featured project page: same shape as a teaching lesson. */
export type ProjectStep = GalleryStep;

export interface Project {
  slug: string;
  title: string;
  /** Short line under the title (what it is, for whom). */
  subtitle?: string;
  /** One sentence in first person: what I did and what it does. */
  summary: string;
  year: string;
  role: string;
  client: string;
  tools: string[];
  /** "At a glance" extras. `timeline` falls back to `year`. */
  timeline?: string;
  team?: string;
  /** Two or three headline results shown before the cover image. */
  highlights?: { value: string; label: string }[];
  coverImage: string;
  /** Alt text for the cover image (defaults to the project title). */
  coverAlt?: string;
  /** Short caption under the cover image. */
  coverCaption?: string;
  /** Small note under the meta row about the page's images (e.g. AI-generated visuals). */
  mediaNote?: string;
  /** Card and page tags: the project type first ("Case study", "Technical project"), then its topic. */
  tags?: string[];
  order: number;
  featured: boolean;

  /** 01 The Problem */
  problem: string;
  /** Optional photo beside the problem text, like a teaching page's context photo. */
  problemMedia?: { media: TeachingMedia; caption: string };
  /** Optional photos under the problem text (slides, screenshots). */
  problemGallery?: TeachingMedia[];

  /** 02 My Process: shown as plain text when there are no steps. */
  process: string;
  /** Tabbed steps with photos, same layout as a teaching page's lessons. */
  processSteps?: ProjectStep[];
  /** Line under the "02 My Process" heading (defaults to "{n} steps. Pick one."). */
  processIntro?: string;
  /** "wide" shows 16:9 frames (screens, slides); default "square" for photos. */
  processMediaAspect?: "square" | "wide";

  /** 03 The Solution */
  solution: string;
  /** Optional photos under the solution text. */
  solutionMedia?: TeachingMedia[];

  /** 04 The Outcome */
  outcome: string;
  /** Small label above the outcome photos (default "From the project"). */
  outcomeExtrasLabel?: string;
  outcomeExtras?: TeachingMedia[];
  /** "What I'd change" line closing the outcome. */
  change?: string;

  repo_url?: string;
  live_url?: string;
  /** A downloadable project file (PDF, deck…). */
  file_url?: string;
}

export const projects: Project[];
export const sortedProjects: Project[];
export const featuredProjects: Project[];
export function getProjectBySlug(slug: string): Project | undefined;
