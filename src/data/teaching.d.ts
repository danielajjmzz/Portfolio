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
  /** Video only: play with sound and visible controls instead of a muted loop. */
  sound?: boolean;
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
  /** Name for section 03 and its nav chip (default "Lessons"). */
  lessonsLabel?: string;
  /** Line under the section 03 title (default "{n} lessons, one new idea each. Pick one."). */
  lessonsIntro?: string;
  /** Word before the number in the open tab, e.g. "Lesson 01" (default "Lesson"). */
  lessonItemLabel?: string;
  /** "wide" shows 16:9 frames (slides); default "square" for photos. */
  lessonMediaAspect?: "square" | "wide";
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
