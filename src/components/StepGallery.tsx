import { useId, useRef, useState } from "react";
import { MediaFrame } from "@/components/MediaFrame";
import type { TeachingMedia } from "@/data/teaching";
import { cn } from "@/lib/utils";

/** One tab in a StepGallery: a lesson on a teaching page, a process step on a project page. */
export interface GalleryStep {
  id: string;
  /** Short name in the step picker. */
  label: string;
  title: string;
  /** Small line after the step number, e.g. dates or a phase. Optional. */
  dates?: string;
  body: string;
  tags: string[];
  /** Optional pull quote under the step. */
  note?: string;
  media: TeachingMedia[];
  /** Overrides the gallery's mediaAspect for this step only. */
  mediaAspect?: "square" | "wide";
}

const bodyText = "text-base leading-relaxed text-muted-foreground";

/**
 * Numbered section with a sticky step picker on the left and the selected step's photos,
 * text and tags on the right. Shared by teaching pages ("03 The Lessons") and
 * featured project pages ("02 My Process").
 */
export function StepGallery({
  id,
  title,
  intro,
  steps,
  ariaLabel,
  itemLabel,
  mediaAspect,
  stickyTop,
}: {
  id: string;
  title: string;
  intro: string;
  steps: GalleryStep[];
  /** Accessible name for the step list. */
  ariaLabel: string;
  /** Word before the number in the open step, e.g. "Lesson 01" or "Step 01". */
  itemLabel: string;
  /** "wide" shows 16:9 frames (slides); default "square" for photos. */
  mediaAspect?: "square" | "wide" | undefined;
  stickyTop: number;
}) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const step = steps[active]!;
  const wide = (step.mediaAspect ?? mediaAspect) === "wide";
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tablistRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Switching tabs after scrolling down brings the new step's start back into view,
  // just below the sticky bars (and the sticky number row on phones).
  const select = (index: number) => {
    setActive(index);
    const panel = panelRef.current;
    if (!panel) return;
    const mobileRow = window.matchMedia("(min-width: 768px)").matches
      ? 0
      : (tablistRef.current?.offsetHeight ?? 0);
    const offset = (mobileRow ? stickyTop - 12 : stickyTop) + mobileRow + 12;
    const top = panel.getBoundingClientRect().top;
    if (top < offset) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: window.scrollY + top - offset, behavior: reduce ? "auto" : "smooth" });
    }
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = steps.length - 1;
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? index === last
          ? 0
          : index + 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? index === 0
            ? last
            : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="grid scroll-mt-36 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
    >
      {/*
        Desktop: the whole left column (title, intro, step list) sticks while the step scrolls.
        Phone: this wrapper dissolves (display: contents) so only the number row sticks,
        across the full length of the step.
      */}
      <div className="contents md:block md:self-start md:sticky" style={{ top: stickyTop }}>
        <div>
          <h2 id={`${id}-heading`} className="font-display leading-tight text-foreground">
            {title}
          </h2>
          <p className="label-tech mt-3">{intro}</p>
        </div>
        <div
          ref={tablistRef}
          role="tablist"
          aria-orientation="vertical"
          aria-label={ariaLabel}
          // Flush under the bars on phones (the 12px breathing room is for the desktop column).
          style={{ top: stickyTop - 12 }}
          className="sticky z-10 -mx-5 flex gap-2 overflow-x-auto border-b border-border bg-background px-5 py-2.5 md:static md:mx-0 md:mt-5 md:grid md:overflow-visible md:border-0 md:bg-transparent md:p-0"
        >
          {steps.map((item, index) => {
            const selected = index === active;
            const number = String(index + 1).padStart(2, "0");
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`${baseId}-tab-${index}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                title={item.label}
                onClick={() => select(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "flex h-10 min-w-10 shrink-0 items-center justify-center gap-3 border px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:h-auto md:justify-start md:py-2 md:text-left",
                  selected
                    ? "border-link bg-secondary font-medium text-foreground"
                    : "border-border-strong bg-card text-muted-foreground hover:border-link hover:text-link",
                )}
              >
                <span
                  className={cn(
                    "tabular-nums md:text-xs md:text-muted-foreground",
                    selected && "text-link",
                  )}
                >
                  {number}
                </span>
                {/* Phones show only the number; the name stays for screen readers. */}
                <span className="sr-only md:not-sr-only">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={panelRef}
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className="min-w-0 focus-visible:outline-none"
        style={{ scrollMarginTop: stickyTop + 12 }}
      >
        {step.media.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {step.media.map((media, index) => (
              <MediaFrame
                key={`${step.id}-${index}`}
                media={media}
                className={cn(
                  wide ? "aspect-[16/9]" : "aspect-square",
                  // Wide slides: an odd count lets the first slide lead at full width.
                  wide && step.media.length % 2 === 1 && index === 0 && "col-span-2",
                )}
              />
            ))}
          </div>
        )}
        <p className={cn("label-tech", step.media.length > 0 && "mt-5")}>
          {itemLabel} {String(active + 1).padStart(2, "0")}
          {step.dates ? ` · ${step.dates}` : ""}
        </p>
        <h3 className="mt-2 text-[1.625rem] text-foreground">{step.title}</h3>
        <p className={cn(bodyText, "mt-3")}>{step.body}</p>
        {step.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skills">
            {step.tags.map((tag, index) => (
              <li
                key={`${tag}-${index}`}
                className="border border-border-strong bg-card px-2.5 py-1 text-xs text-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        {step.note && (
          <blockquote className="mt-5 border-l-2 border-link pl-3 text-sm italic text-link">
            {step.note}
          </blockquote>
        )}
      </div>
    </section>
  );
}
