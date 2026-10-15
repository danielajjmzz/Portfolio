import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { cardClass, chipClass, outlineButton, sectionHeadRow, tintCardClass } from "@/lib/ui";

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

const sections = [
  {
    id: "featured-projects",
    title: "Featured Projects",
    count: String(featuredProjectCards.length),
  },
  { id: "teaching", title: "Teaching", count: String(teaching.length) },
  { id: "visual", title: "Visual work", count: String(visualWork.length) },
] as const;
type Preview = MediaEntry & { description: string };
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
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjectCards.map((project, index) => {
              const [meta, ...tags] = project.meta.split(" · Featured");
              return (
                <article key={project.slug} className={`${cardClass} group min-w-0 p-3`}>
                  <div className="relative">
                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      aria-label={`Read ${project.title}`}
                      className="block overflow-hidden rounded-frame border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        width={900}
                        height={600}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="aspect-[3/2] w-full object-cover"
                      />
                    </Link>
                    {(project.repo_url || project.live_url) && (
                      <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100">
                        {project.repo_url && (
                          <Button
                            asChild
                            variant="outline"
                            size="icon"
                            className="border-media-icon/60 bg-media-scrim text-media-icon hover:bg-media-scrim hover:text-primary"
                          >
                            <a
                              href={project.repo_url}
                              aria-label="GitHub repository"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Github />
                            </a>
                          </Button>
                        )}
                        {project.live_url && (
                          <Button
                            asChild
                            variant="outline"
                            size="icon"
                            className="border-media-icon/60 bg-media-scrim text-media-icon hover:bg-media-scrim hover:text-primary"
                          >
                            <a
                              href={project.live_url}
                              aria-label="Live website"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ExternalLink />
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="px-2 pb-3 pt-4">
                    <p className="label-tech">
                      {meta}
                      {tags.length > 0 && (
                        <>
                          {" "}
                          · <span className="text-link">Featured</span>
                        </>
                      )}
                    </p>
                    <h3 className="mt-2 text-[1.75rem]">
                      <Link
                        to="/projects/$slug"
                        params={{ slug: project.slug }}
                        className="hover:text-link"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>
                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-link hover:underline"
                    >
                      View featured project <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
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
              <article key={entry.slug} className={`${tintCardClass} group min-w-0 p-3`}>
                <Link
                  to="/teaching/$slug"
                  params={{ slug: entry.slug }}
                  aria-label={`View ${entry.title}`}
                  className="block overflow-hidden rounded-frame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <MediaFrame
                    media={entry.cover}
                    className="aspect-[3/2]"
                    eager={index === 0}
                    still
                  />
                </Link>
                <div className="px-2 pb-3 pt-4">
                  <p className="label-tech">{entry.cardMeta}</p>
                  <h3 className="mt-2 text-[1.75rem]">
                    <Link
                      to="/teaching/$slug"
                      params={{ slug: entry.slug }}
                      className="hover:text-link"
                    >
                      {entry.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {entry.summary}
                  </p>
                  <Link
                    to="/teaching/$slug"
                    params={{ slug: entry.slug }}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-link hover:underline"
                  >
                    View the material <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
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
            className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:gap-x-5"
          >
            {visible.entries.map((entry) => (
              <article key={entry.id} className="min-w-0">
                <DesignMediaCarousel
                  entry={entry}
                  aspect="aspect-square"
                  onOpen={() => setPreview(entry)}
                />
                <h3 className="mt-2.5 font-sans text-sm font-medium leading-snug">{entry.title}</h3>
              </article>
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
              <DialogTitle className="pr-8 font-display text-2xl font-semibold tracking-normal">
                {preview.title}
              </DialogTitle>
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
