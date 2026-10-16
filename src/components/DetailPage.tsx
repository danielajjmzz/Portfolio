import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Building blocks shared by featured project pages (/projects/:slug) and
 * teaching pages (/teaching/:slug), so both keep the same layout:
 * hero, meta row, section chips, sticky section bar and numbered two-column sections.
 */

export interface DetailSection {
  id: string;
  /** Short name on the section chips. */
  label: string;
  /** Numbered heading, e.g. "02 My Process". */
  title: string;
}

export const bodyText = "text-base leading-relaxed text-muted-foreground";

export function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="hairline-t pt-3">
      <dt className="label-tech">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{value}</dd>
    </div>
  );
}

export function SectionChips({
  sections,
  ariaLabel,
  className,
}: {
  sections: DetailSection[];
  ariaLabel: string;
  className?: string;
}) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn("-mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0", className)}
    >
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="hairline shrink-0 bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-link"
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}

/** Two-column numbered section row: heading on the left, content on the right. */
export function Section({
  id,
  title,
  aside,
  children,
}: {
  id: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="grid scroll-mt-36 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
    >
      <div className="min-w-0">
        <h2 id={`${id}-heading`} className="font-display leading-tight text-foreground">
          {title}
        </h2>
        {aside}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

/**
 * Tracks the site header and the sticky section bar so sticky content can sit just under both.
 * `heroRef` goes on the hero image; the bar appears (`pinned`) once the hero scrolls away.
 */
export function useStickyBar() {
  const heroRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number | null>(null);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const measure = () => setBarHeight(bar.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;
    const measure = () => setHeaderHeight(header.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([item]) => setPinned(item ? !item.isIntersecting : false),
      { rootMargin: `-${headerHeight ?? 72}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [headerHeight]);

  return {
    heroRef,
    barRef,
    pinned,
    headerHeight,
    /** Top offset for content that sticks under the header and the section bar. */
    stickyTop: (headerHeight ?? 72) + barHeight + 12,
  };
}

/** Section bar that slides in under the site header once the hero scrolls away. */
export function StickySectionBar({
  title,
  sections,
  ariaLabel,
  bar,
}: {
  title: string;
  sections: DetailSection[];
  ariaLabel: string;
  bar: Pick<ReturnType<typeof useStickyBar>, "barRef" | "pinned" | "headerHeight">;
}) {
  return (
    <div
      ref={bar.barRef}
      style={bar.headerHeight !== null ? { top: bar.headerHeight } : undefined}
      className={cn(
        "fixed inset-x-0 top-[69px] z-20 border-b border-border bg-background transition-all duration-300 motion-reduce:transition-none md:top-[77px]",
        bar.pinned
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0",
      )}
      aria-hidden={!bar.pinned}
      inert={!bar.pinned}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-2.5 md:px-8">
        <p className="min-w-0 truncate font-display text-lg leading-none text-foreground">
          {title}
        </p>
        <SectionChips
          sections={sections}
          ariaLabel={`${ariaLabel} (pinned)`}
          className="ml-auto min-w-0 md:ml-0"
        />
      </div>
    </div>
  );
}
