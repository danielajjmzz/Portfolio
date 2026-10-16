import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CornerFrame, SectionRule } from "@/components/CornerFrame";
import {
  MetaCell,
  Section,
  SectionChips,
  StickySectionBar,
  useStickyBar,
} from "@/components/DetailPage";
import { MediaFrame } from "@/components/MediaFrame";
import { bodyText } from "@/lib/ui";
import { StepGallery } from "@/components/StepGallery";
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

function TeachingDetail() {
  const { entry } = Route.useLoaderData();
  const sections = sectionsFor(entry);
  const bar = useStickyBar();

  return (
    <>
      {/* Sticky section bar: appears once the hero scrolls away, same as featured project pages. */}
      <StickySectionBar
        title={entry.title}
        sections={sections}
        ariaLabel="Material sections"
        bar={bar}
      />

      <article className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Link to="/projects" hash="teaching" className="label-tech hover:text-link">
          ← Projects
        </Link>

        <div ref={bar.heroRef}>
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

        <SectionChips sections={sections} ariaLabel="Material sections" className="mt-10" />
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

          {/* Sticks just under the site header and the section bar. */}
          <StepGallery
            id="lessons"
            title={sections[2]!.title}
            intro={
              entry.lessonsIntro ?? `${entry.lessons.length} lessons, one new idea each. Pick one.`
            }
            steps={entry.lessons}
            ariaLabel={entry.lessonsLabel ?? "Lessons"}
            itemLabel={entry.lessonItemLabel ?? "Lesson"}
            mediaAspect={entry.lessonMediaAspect}
            stickyTop={bar.stickyTop}
          />

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
                        <p className="mt-1.5 text-xs text-muted-foreground [overflow-wrap:anywhere]">
                          {media.caption}
                        </p>
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
