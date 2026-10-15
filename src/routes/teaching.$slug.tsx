import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CornerFrame, SectionRule } from "@/components/CornerFrame";
import { MediaFrame } from "@/components/MediaFrame";
import { getTeachingBySlug, type TeachingEntry } from "@/data/teaching";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/teaching/$slug")({
  loader: ({ params }) => {
    const entry = getTeachingBySlug(params.slug);
    if (!entry) throw notFound();
    return { entry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Teaching material not found — Daniela Jimenez" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { entry } = loaderData;
    return {
      meta: [
        { title: `${entry.title} — Daniela Jimenez` },
        { name: "description", content: entry.summary },
        { property: "og:title", content: `${entry.title} — Daniela Jimenez` },
        { property: "og:description", content: entry.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: TeachingNotFound,
  component: TeachingDetail,
});

function sectionsFor(entry: TeachingEntry) {
  const lessons = entry.lessonsLabel ?? "Lessons";
  return [
    { id: "context", label: "Context", title: "01 The Context" },
    { id: "approach", label: "Approach", title: "02 My Approach" },
    { id: "lessons", label: lessons, title: `03 The ${lessons}` },
    { id: "outcome", label: "Outcome", title: "04 The Outcome" },
  ];
}

function TeachingNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 md:px-8">
      <h1 className="font-display text-foreground">That material isn't here</h1>
      <p className="mt-4 text-muted-foreground">
        The teaching material you're looking for may have been renamed.
      </p>
      <Link to="/projects" hash="teaching" className="mt-8 inline-block text-link">
        ← Back to projects
      </Link>
    </section>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="hairline-t pt-3">
      <dt className="label-tech">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{value}</dd>
    </div>
  );
}

function SubNav({ entry, className }: { entry: TeachingEntry; className?: string }) {
  return (
    <nav
      aria-label="Material sections"
      className={cn("-mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0", className)}
    >
      {sectionsFor(entry).map((s) => (
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

/** Two-column section row, same proportions as the featured project page. */
function Section({
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
      <div>
        <h2 id={`${id}-heading`} className="font-display leading-tight text-foreground">
          {title}
        </h2>
        {aside}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

const bodyText = "text-base leading-relaxed text-muted-foreground";

function Lessons({ entry }: { entry: TeachingEntry }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const lesson = entry.lessons[active]!;
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const wide = entry.lessonMediaAspect === "wide";

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = entry.lessons.length - 1;
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
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section
      id="lessons"
      title={sectionsFor(entry)[2]!.title}
      aside={
        <>
          <p className="label-tech mt-3">
            {entry.lessonsIntro ?? `${entry.lessons.length} lessons, one new idea each. Pick one.`}
          </p>
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label={entry.lessonsLabel ?? "Lessons"}
            className="mt-5 grid gap-2"
          >
            {entry.lessons.map((item, index) => {
              const selected = index === active;
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
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className={cn(
                    "flex items-center gap-3 border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected
                      ? "border-link bg-secondary font-medium text-foreground"
                      : "border-border-strong bg-card text-muted-foreground hover:border-link hover:text-link",
                  )}
                >
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </div>
        </>
      }
    >
      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className="focus-visible:outline-none"
      >
        <div className="grid grid-cols-2 gap-3">
          {lesson.media.map((media, index) => (
            <MediaFrame
              key={`${lesson.id}-${index}`}
              media={media}
              className={cn(
                wide ? "aspect-[16/9]" : "aspect-square",
                // Wide slides: an odd count lets the first slide lead at full width.
                wide && lesson.media.length % 2 === 1 && index === 0 && "col-span-2",
              )}
            />
          ))}
        </div>
        <p className="label-tech mt-5">
          {entry.lessonItemLabel ?? "Lesson"} {String(active + 1).padStart(2, "0")} · {lesson.dates}
        </p>
        <h3 className="mt-2 text-[1.625rem] text-foreground">{lesson.title}</h3>
        <p className={cn(bodyText, "mt-3")}>{lesson.body}</p>
        {lesson.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skills">
            {lesson.tags.map((tag, index) => (
              <li
                key={`${tag}-${index}`}
                className="border border-border-strong bg-card px-2.5 py-1 text-xs text-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        {lesson.note && (
          <blockquote className="mt-5 border-l-2 border-link pl-3 text-sm italic text-link">
            {lesson.note}
          </blockquote>
        )}
      </div>
    </Section>
  );
}

function TeachingDetail() {
  const { entry } = Route.useLoaderData();
  const sections = sectionsFor(entry);
  const heroRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number | null>(null);

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

  return (
    <>
      {/* Sticky section bar: appears once the hero scrolls away, same as featured project pages. */}
      <div
        style={headerHeight !== null ? { top: headerHeight } : undefined}
        className={cn(
          "fixed inset-x-0 top-[69px] z-20 border-b border-border bg-background transition-all duration-300 motion-reduce:transition-none md:top-[77px]",
          pinned
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
        aria-hidden={!pinned}
        inert={!pinned}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-2.5 md:px-8">
          <p className="min-w-0 truncate font-display text-lg leading-none text-foreground">
            {entry.title}
          </p>
          <SubNav entry={entry} className="ml-auto min-w-0 md:ml-0" />
        </div>
      </div>

      <article className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Link to="/projects" hash="teaching" className="label-tech hover:text-link">
          ← Projects
        </Link>

        <div ref={heroRef}>
          <CornerFrame className="mt-6 overflow-hidden bg-card">
            <MediaFrame
              media={entry.cover}
              rounded="rounded-none"
              eager
              className="aspect-[16/9] border-0"
            />
          </CornerFrame>
        </div>

        <div className="mt-10 max-w-4xl">
          <h1 className="font-display text-foreground">{entry.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{entry.summary}</p>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-4">
          <MetaCell label="Year" value={entry.year} />
          <MetaCell label="Role" value={entry.role} />
          <MetaCell label="Audience" value={entry.audience} />
          <MetaCell label="Tools" value={entry.tools.join(", ")} />
        </dl>

        <SubNav entry={entry} className="mt-10" />
        <SectionRule className="mt-8" />

        <div className="mt-14 grid gap-14">
          <Section id="context" title={sections[0]!.title}>
            <p className={bodyText}>{entry.context.body}</p>
            <figure className="mt-5 flex items-center gap-4">
              <MediaFrame
                media={entry.context.media}
                className="aspect-[4/3] w-40 shrink-0 sm:w-48"
              />
              <figcaption className="text-sm text-muted-foreground">
                {entry.context.caption}
              </figcaption>
            </figure>
          </Section>

          <SectionRule />

          <Section id="approach" title={sections[1]!.title}>
            <div className="grid gap-4">
              {entry.approach.map((point, index) => (
                <p key={index} className={bodyText}>
                  <strong className="font-bold text-foreground">{point.lead}</strong> {point.body}
                </p>
              ))}
            </div>
          </Section>

          <SectionRule />

          <Lessons entry={entry} />

          <SectionRule />

          <Section id="outcome" title={sections[3]!.title}>
            <p className={bodyText}>{entry.outcome.body}</p>
            {entry.outcome.extras.length > 0 && (
              <>
                <p className="label-tech mt-6">
                  {entry.outcome.extrasLabel ?? "Also built along the way"}
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {entry.outcome.extras.map((media, index) => (
                    <li key={index}>
                      <MediaFrame media={media} className="aspect-[4/3]" rounded="rounded-tile" />
                      {media.caption && (
                        <p className="mt-1.5 text-xs text-muted-foreground">{media.caption}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <p className={cn(bodyText, "mt-6")}>
              <strong className="font-bold text-foreground">What I'd change:</strong>{" "}
              {entry.outcome.change}
            </p>
          </Section>
        </div>

        <SectionRule className="mt-16" />
        <div className="mt-6 grid gap-4 sm:flex sm:items-center sm:justify-between">
          <Link to="/projects" hash="teaching" className="text-link hover:text-foreground">
            ← Back to all projects
          </Link>
          <Link to="/contact" className="label-tech hover:text-link">
            Work with me →
          </Link>
        </div>
      </article>
    </>
  );
}
