import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  featuredProjectCards,
  teaching,
  visualFilters,
  visualWork,
  selectVisualWork,
  selectTeaching,
  type VisualFilter,
} from "@/data/projects-page";
import { PageHero } from "@/components/PageHero";
import { MediaFrame } from "@/components/MediaFrame";
import { DesignMediaCarousel, type MediaEntry } from "@/components/DesignMediaCarousel";
import { ProjectTags } from "@/components/ProjectTags";
import { useViewCursor } from "@/components/ViewCursor";
import { ProjectLinks } from "@/components/ProjectLinks";
import {
  arrowNudge,
  cardClass,
  cardImageZoom,
  chipClass,
  interactiveCard,
  outlineButton,
  sectionHeadRow,
  stretchedLink,
  tintCardClass,
} from "@/lib/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Daniela Jimenez" },
      {
        name: "description",
        content:
          "Featured projects, teaching, and visual work, each built with a real audience in mind.",
      },
      { property: "og:title", content: "Projects — Daniela Jimenez" },
      {
        property: "og:description",
        content:
          "Explore Daniela Jimenez’s featured projects, student programs, physical designs, and documents.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsIndex,
});

/** "Exelon Summer Institute · 2026": the program name in pink, the rest muted. */
function CardMeta({ text }: { text: string }) {
  const [program, ...rest] = text.split(" · ");
  return (
    <p className="label-tech">
      <span className="text-link">{program}</span>
      {rest.length > 0 && <> · {rest.join(" · ")}</>}
    </p>
  );
}

const sections = [
  {
    id: "featured-projects",
    title: "Featured Projects",
    count: String(featuredProjectCards.length),
  },
  { id: "teaching", title: "Teaching", count: String(teaching.length) },
  { id: "visual", title: "Visual work", count: String(visualWork.length) },
] as const;
type Preview = MediaEntry & { description: string; method?: string | undefined };
const container = "mx-auto max-w-6xl px-5 md:px-8";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function SectionHeading({ id, title, label }: { id: string; title: string; label: string }) {
  return (
    <div className={sectionHeadRow}>
      <h2 id={id}>{title}</h2>
      <p className="label-tech">{label}</p>
    </div>
  );
}

type FeaturedCard = (typeof featuredProjectCards)[number];

/** One large featured project row; every other row puts the image on the right. */
function FeaturedRow({ project, index }: { project: FeaturedCard; index: number }) {
  const view = useViewCursor();
  const flip = index % 2 === 1;
  return (
    <article
      {...view.handlers}
      className={cn(
        cardClass,
        interactiveCard,
        view.activeClass,
        "group grid items-center gap-6 p-3 md:p-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10",
      )}
    >
      <div ref={view.zoneRef} className={cn("relative min-w-0", flip && "lg:order-2")}>
        <div className="overflow-hidden rounded-frame border border-border bg-card">
          <img
            src={project.coverImage}
            alt=""
            width={1600}
            height={900}
            loading={index === 0 ? "eager" : "lazy"}
            className={cn("aspect-[16/10] w-full object-cover", cardImageZoom)}
          />
        </div>
        {/* Sits above the full-card link so each icon stays clickable on its own. */}
        <ProjectLinks
          repoUrl={project.repo_url}
          liveUrl={project.live_url}
          fileUrl={project.file_url}
          className="absolute right-3 top-3 z-10"
        />
        {view.bubble}
      </div>

      <div
        className={cn(
          "min-w-0 px-2 pb-3 md:px-3 lg:px-0 lg:pb-0",
          flip ? "lg:order-1 lg:pl-4" : "lg:pr-4",
        )}
      >
        <p className="label-tech">
          {project.year.match(/\d{4}/)?.[0] ?? project.year} · {project.role}
        </p>
        <h3 className="mt-3 text-[2rem] leading-tight">
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className={cn(stretchedLink, "transition-colors group-hover:text-link")}
          >
            {project.title}
          </Link>
        </h3>
        {project.subtitle && (
          <p className="mt-2 text-lg text-muted-foreground">{project.subtitle}</p>
        )}
        <p className="mt-4 text-base leading-relaxed text-foreground">{project.summary}</p>
        <ProjectTags tags={project.tags} className="mt-5" />
        <p
          aria-hidden
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-link"
        >
          Read the project <ArrowRight className={cn("size-4", arrowNudge)} />
        </p>
      </div>
    </article>
  );
}

function TeachingCard({ entry, index }: { entry: (typeof teaching)[number]; index: number }) {
  const view = useViewCursor();
  return (
    <article
      {...view.handlers}
      className={cn(tintCardClass, interactiveCard, view.activeClass, "group min-w-0 p-3")}
    >
      <div ref={view.zoneRef} className="relative">
        <div className="overflow-hidden rounded-frame">
          <MediaFrame
            media={entry.cover}
            className={cn("aspect-[3/2]", cardImageZoom)}
            eager={index === 0}
            still
          />
        </div>
        {view.bubble}
      </div>
      <div className="px-2 pb-3 pt-4">
        <CardMeta text={entry.cardMeta} />
        <h3 className="mt-2 text-[1.75rem]">
          <Link
            to="/teaching/$slug"
            params={{ slug: entry.slug }}
            className={cn(stretchedLink, "transition-colors group-hover:text-link")}
          >
            {entry.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>
        <p
          aria-hidden
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-link"
        >
          View the material <ArrowRight className={cn("size-4", arrowNudge)} />
        </p>
      </div>
    </article>
  );
}

function VisualCard({ entry, onOpen }: { entry: (typeof visualWork)[number]; onOpen: () => void }) {
  const view = useViewCursor({ match: "[data-view-cursor]" });
  return (
    <article
      {...view.handlers}
      className={cn(
        view.activeClass,
        "group/card min-w-0 transition-transform duration-200 ease-out hover:-translate-y-1 focus-within:-translate-y-1 motion-reduce:transform-none",
      )}
    >
      <div ref={view.zoneRef} className="relative">
        <DesignMediaCarousel
          entry={entry}
          aspect="aspect-square"
          onOpen={onOpen}
          className="transition-[border-color,box-shadow] group-hover/card:border-primary group-hover/card:shadow-[0_14px_30px_-16px_rgba(0,0,0,0.35)]"
        />
        {view.bubble}
      </div>
      <div className="mt-3 px-0.5">
        {entry.method && <p className="label-tech text-link">{entry.method}</p>}
        <h3 className="mt-1 font-sans text-sm font-semibold leading-snug">
          <button
            type="button"
            onClick={onOpen}
            className="text-left transition-colors hover:text-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover/card:text-link"
          >
            {entry.title}
          </button>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {entry.description}
        </p>
      </div>
    </article>
  );
}

function ProjectsIndex() {
  const [activeSection, setActiveSection] = useState<string>("featured-projects");
  const [filter, setFilter] = useState<VisualFilter>("All");
  const [expanded, setExpanded] = useState(false);
  const [preview, setPreview] = useState<Preview | null>(null);
  const visible = selectVisualWork(filter, expanded);
  const [teachingExpanded, setTeachingExpanded] = useState(false);
  const visibleTeaching = selectTeaching(teachingExpanded);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  // Sticky offsets: the jump bar sits under the site header; Visual work filters sit under both.
  const [offsets, setOffsets] = useState<{ nav: number; filters: number } | null>(null);

  useEffect(() => {
    const header = document.getElementById("site-header");
    const nav = document.getElementById("project-section-nav");
    if (!header || !nav) return;
    const measure = () =>
      setOffsets({ nav: header.offsetHeight, filters: header.offsetHeight + nav.offsetHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nav = document.getElementById("project-section-nav");
      const boundary = (nav?.getBoundingClientRect().bottom ?? 144) + 32;
      let current: string = sections[0].id;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= boundary) current = section.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4)
        current = "visual";
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /** If the grid's top has scrolled under the sticky bars, bring it back into view. */
  const revealGridTop = () => {
    requestAnimationFrame(() => {
      const grid = gridRef.current;
      const bar = filterBarRef.current;
      if (!grid || !bar) return;
      const barBottom = bar.getBoundingClientRect().bottom;
      const gridTop = grid.getBoundingClientRect().top;
      if (gridTop < barBottom) {
        window.scrollTo({
          top: window.scrollY + gridTop - barBottom - 16,
          behavior: prefersReducedMotion() ? "instant" : "smooth",
        });
      }
    });
  };

  const jumpTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    // Measure where the jump bar sits once stuck (under the header), not where it is right now.
    const header = document.getElementById("site-header");
    const nav = document.getElementById("project-section-nav");
    const stuckBottom = (header?.offsetHeight ?? 0) + (nav?.offsetHeight ?? 0);
    const top = window.scrollY + target.getBoundingClientRect().top - stuckBottom;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? "instant" : "smooth" });
  };

  return (
    <div>
      <PageHero
        eyebrow="Featured Projects · Teaching · Visual work"
        title="Projects."
        body="Featured projects, teaching, and visual work, each built with a real audience in mind."
      />

      {/* Sticky jump bar */}
      <nav
        id="project-section-nav"
        aria-label="Project sections"
        style={offsets ? { top: offsets.nav } : undefined}
        className="sticky top-[69px] z-20 border-b border-border bg-background md:top-[77px]"
      >
        <div className={`${container} flex flex-wrap gap-2 py-3`}>
          {sections.map((section) => {
            const active = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={active ? "location" : undefined}
                className={chipClass(active)}
                onClick={(event) => {
                  event.preventDefault();
                  jumpTo(section.id);
                }}
              >
                {section.title}
                <span
                  className={
                    active ? "text-xs text-primary-foreground/75" : "text-xs text-muted-foreground"
                  }
                >
                  {section.count}
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Featured Projects */}
      <section
        id="featured-projects"
        aria-labelledby="featured-projects-heading"
        className="py-14 md:py-16"
      >
        <div className={container}>
          <SectionHeading
            id="featured-projects-heading"
            title="Featured Projects"
            label="UX research · product · data systems"
          />
          <div className="grid gap-16 md:gap-20">
            {featuredProjectCards.map((project, index) => (
              <FeaturedRow key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Teaching — tinted band */}
      <section id="teaching" aria-labelledby="teaching-heading" className="bg-tint py-14 md:py-16">
        <div className={container}>
          <SectionHeading
            id="teaching-heading"
            title="Teaching"
            label="Lessons · workshops · student programs"
          />
          <div
            id="teaching-grid"
            aria-live="polite"
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {visibleTeaching.entries.map((entry, index) => (
              <TeachingCard key={entry.slug} entry={entry} index={index} />
            ))}
          </div>
          {(visibleTeaching.hasMore || visibleTeaching.canCollapse) && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                aria-expanded={teachingExpanded}
                aria-controls="teaching-grid"
                className={outlineButton}
                onClick={() => setTeachingExpanded((open) => !open)}
              >
                {teachingExpanded ? "Show less teaching" : "Show more teaching"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Visual work */}
      <section id="visual" aria-labelledby="visual-heading" className="py-14 md:py-16">
        <div className={container}>
          <SectionHeading id="visual-heading" title="Visual work" label="Physical · document" />
          {/* Filters stick under the jump bar while you scroll through Visual work, then leave with the section. */}
          <div
            ref={filterBarRef}
            style={offsets ? { top: offsets.filters } : undefined}
            className="sticky top-[130px] z-10 mb-5 bg-background py-3 md:top-[138px]"
          >
            <div role="group" aria-label="Filter visual work" className="flex flex-wrap gap-2">
              {visualFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={filter === item}
                  className={chipClass(filter === item)}
                  onClick={() => {
                    setFilter(item);
                    setExpanded(false);
                    revealGridTop();
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div
            ref={gridRef}
            id="visual-grid"
            aria-live="polite"
            className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-x-5"
          >
            {visible.entries.map((entry) => (
              <VisualCard key={entry.id} entry={entry} onOpen={() => setPreview(entry)} />
            ))}
          </div>
          {(visible.hasMore || visible.canCollapse) && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls="visual-grid"
                className={outlineButton}
                onClick={() => {
                  if (expanded) {
                    setExpanded(false);
                    revealGridTop();
                  } else setExpanded(true);
                }}
              >
                {expanded ? "Show less visual work" : "Show more visual work"}
              </button>
            </div>
          )}
        </div>
      </section>

      <Dialog
        open={preview !== null}
        onOpenChange={(open) => {
          if (!open) setPreview(null);
        }}
      >
        <DialogContent
          tabIndex={-1}
          // Focus the popup itself on open (not the first icon, which would pop its tooltip).
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            (event.currentTarget as HTMLElement | null)?.focus();
          }}
          className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-[20px] border-border bg-card shadow-none focus-visible:outline-none sm:rounded-[20px]"
        >
          {preview && (
            <>
              <div className="pr-8">
                {preview.method && <p className="label-tech text-link">{preview.method}</p>}
                <DialogTitle className="mt-1 font-display text-2xl font-semibold tracking-normal">
                  {preview.title}
                </DialogTitle>
              </div>
              {/* Same carousel as the card, with controls always visible and whole photos shown. */}
              <DesignMediaCarousel
                entry={preview}
                aspect="aspect-[3/2] max-h-[60dvh]"
                controls="always"
                fit="contain"
              />
              <DialogDescription>{preview.description}</DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
