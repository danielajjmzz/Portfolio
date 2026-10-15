/** `caption` is optional text shown under the photo in the expanded view. */
export type MediaItem =
  | { type: "image"; src: string; alt: string; caption?: string; poster?: never }
  | { type: "video"; src: string; alt: string; caption?: string; poster?: string };

export interface DesignEntry {
  id: string;
  /** How it was made, shown above the title: "Laser cut", "3D carve", "Vinyl cut"… */
  method?: string;
  title: string;
  image: string;
  description: string;
  order: number;
  media: MediaItem[];
}

export interface LessonEntry {
  id: string;
  title: string;
  description: string;
  order: number;
  media: MediaItem[];
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
