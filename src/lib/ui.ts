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

/**
 * Hover/focus affordance for clickable project cards: the card lifts, gains a pink ring,
 * and its image zooms slightly (pair with `cardImageZoom` on the image).
 * The card must be `relative`; one link inside uses `stretchedLink` to make the whole card clickable.
 */
export const interactiveCard =
  "relative transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_-16px_rgba(0,0,0,0.35)] hover:ring-2 hover:ring-primary/60 focus-within:-translate-y-1 focus-within:ring-2 focus-within:ring-primary/60 motion-reduce:transform-none motion-reduce:transition-none";

/** Slight zoom on a card's image while the card is hovered or focused. */
export const cardImageZoom =
  "transition-transform duration-300 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none";

/** Turns a link into a full-card click target (the card needs `relative`). */
export const stretchedLink =
  "after:absolute after:inset-0 after:z-0 after:rounded-card after:content-[''] focus-visible:outline-none";

/** Nudges a trailing arrow while the card is hovered. */
export const arrowNudge =
  "transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none";
