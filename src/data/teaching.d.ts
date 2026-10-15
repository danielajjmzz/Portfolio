/** A photo or video slot. An empty `src` renders a labeled placeholder frame. */
export interface TeachingMedia {
  type: "image" | "video";
  src: string;
  alt: string;
  /** Placeholder text shown while `src` is empty. */
  label: string;
  /** Small second line on the placeholder (or under the media). */
  note?: string;
  poster?: string;
  caption?: string;
}

export interface TeachingLesson {
  id: string;
  /** Short name in the lesson picker. */
  label: string;
  title: string;
  dates: string;
  body: string;
  tags: string[];
  /** Optional pull quote under the lesson. */
  note: string;
  media: TeachingMedia[];
}

export interface TeachingEntry {
  slug: string;
  title: string;
  summary: string;
  /** Small line above the card title on /projects. */
  cardMeta: string;
  year: string;
  role: string;
  audience: string;
  tools: string[];
  cover: TeachingMedia;
  /** Main cards show in the first row; the rest appear after "Show more". */
  main: boolean;
  order: number;
  context: { body: string; media: TeachingMedia; caption: string };
  approach: { lead: string; body: string }[];
  lessons: TeachingLesson[];
  outcome: {
    body: string;
    extrasLabel?: string;
    extras: TeachingMedia[];
    change: string;
  };
}

export const teaching: TeachingEntry[];
export const sortedTeaching: TeachingEntry[];
export function getTeachingBySlug(slug: string): TeachingEntry | undefined;
