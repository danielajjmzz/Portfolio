/** `caption` is optional text shown under the photo in the expanded view. */
export type MediaItem =
  | { type: "image"; src: string; alt: string; caption?: string; poster?: never }
  | { type: "video"; src: string; alt: string; caption?: string; poster?: string };

export interface DesignEntry {
  id: string;
  title: string;
  image: string;
  description: string;
  order: number;
  media: MediaItem[];
  repoUrl?: string;
  liveUrl?: string;
  artifactUrl?: string;
  artifactLabel?: string;
}

export interface LessonEntry {
  id: string;
  title: string;
  description: string;
  order: number;
  media: MediaItem[];
  repoUrl?: string;
  liveUrl?: string;
  artifactUrl?: string;
  artifactLabel?: string;
}

export interface DesignSection {
  id: "lessons" | "physical-designs" | "document-designs" | "photography";
  title: string;
  summary: string;
  entries: Array<DesignEntry | LessonEntry>;
}

export const lessons: LessonEntry[];
export const designs: DesignEntry[];
export const documentDesigns: DesignEntry[];
export const photography: DesignEntry[];
export const designSections: DesignSection[];
