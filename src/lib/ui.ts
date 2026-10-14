import { cn } from "@/lib/utils";

/** Shared class recipes so buttons, chips and cards look identical on every page. */

/** Accent (pink) button — square corners. */
export const accentButton =
  "inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Outlined button on the page or a card — square corners. */
export const outlineButton =
  "inline-flex items-center justify-center gap-2 border border-border-strong bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-link hover:text-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Filter / jump chips and tabs — square, filled with the accent when active. */
export const chipClass = (active: boolean) =>
  cn(
    "inline-flex h-9 shrink-0 items-center gap-2 border px-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    active
      ? "border-primary bg-primary font-medium text-primary-foreground"
      : "border-border-strong bg-card text-foreground hover:border-link hover:text-link",
  );

/** Rounded card surface. */
export const cardClass = "rounded-card border border-border bg-card";

/** Card sitting on a tinted band (white in light mode, raised plum in dark mode). */
export const tintCardClass = "rounded-card bg-tint-card";

/** Section heading row: title on the left, small muted note on the right. */
export const sectionHeadRow = "mb-7 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2";
