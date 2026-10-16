import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CornerFrame, SectionRule } from "@/components/CornerFrame";
import {
  MetaCell,
  Section,
  SectionChips,
  StickySectionBar,
  bodyText,
  useStickyBar,
  type DetailSection,
} from "@/components/DetailPage";
import { MediaFrame } from "@/components/MediaFrame";
import { StepGallery } from "@/components/StepGallery";
import { getProjectBySlug } from "@/data/projects";
import type { TeachingMedia } from "@/data/teaching";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Daniela Jimenez" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} — Daniela Jimenez` },
        { name: "description", content: project.summary },
        { property: "og:title", content: `${project.title} — Daniela Jimenez` },
        { property: "og:description", content: project.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetail,
});

const sections: DetailSection[] = [
  { id: "problem", label: "Problem", title: "01 The Problem" },
  { id: "process", label: "Process", title: "02 My Process" },
  { id: "solution", label: "Solution", title: "03 The Solution" },
  { id: "outcome", label: "Outcome", title: "04 The Outcome" },
];

function ProjectNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 md:px-8">
      <h1 className="font-display text-foreground">That project isn't here</h1>
      <p className="mt-4 text-muted-foreground">
        The project you're looking for may have been renamed.
      </p>
      <Link to="/projects" className="mt-8 inline-block text-link">
        ← Back to projects
      </Link>
    </section>
  );
}

/** Two-column photo grid with captions; an odd count lets the first photo lead at full width. */
function MediaGrid({ items }: { items: TeachingMedia[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-5 grid grid-cols-2 gap-3">
      {items.map((media, index) => (
        <li key={index} className={cn(items.length % 2 === 1 && index === 0 && "col-span-2")}>
          <MediaFrame media={media} className="aspect-[16/9]" />
          {media.caption && <p className="mt-1.5 text-xs text-muted-foreground">{media.caption}</p>}
        </li>
      ))}
    </ul>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const bar = useStickyBar();
  const steps = project.processSteps ?? [];
  const extras = project.outcomeExtras ?? [];
  const solutionMedia = project.solutionMedia ?? [];

  return (
    <>
      {/* Sticky section bar: appears once the hero scrolls away, same as teaching pages. */}
      <StickySectionBar
        title={project.title}
        sections={sections}
        ariaLabel="Project sections"
        bar={bar}
      />

      <article className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Link to="/projects" className="label-tech hover:text-link">
          ← Projects
        </Link>

        <div ref={bar.heroRef}>
          <CornerFrame className="mt-6 overflow-hidden bg-card">
            <MediaFrame
              media={{
                type: "image",
                src: project.coverImage,
                alt: project.coverAlt ?? project.title,
                label: "Cover image",
              }}
              rounded="rounded-none"
              eager
              className="aspect-[16/9] border-0"
            />
          </CornerFrame>
        </div>

        <div className="mt-10 max-w-4xl">
          <h1 className="font-display text-foreground">{project.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{project.summary}</p>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-4">
          <MetaCell label="Year" value={project.year} />
          <MetaCell label="Role" value={project.role} />
          <MetaCell label="Client" value={project.client} />
          <MetaCell label="Tools" value={project.tools.join(", ")} />
        </dl>

        {project.mediaNote && (
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">About the images:</strong>{" "}
            {project.mediaNote}
          </p>
        )}

        <SectionChips sections={sections} ariaLabel="Project sections" className="mt-10" />
        <SectionRule className="mt-8" />

        <div className="mt-14 grid gap-14">
          <Section id="problem" title={sections[0]!.title}>
            <p className={bodyText}>{project.problem}</p>
            {project.problemMedia && (
              <figure className="mt-5 flex items-center gap-4">
                <MediaFrame
                  media={project.problemMedia.media}
                  className="aspect-[4/3] w-40 shrink-0 sm:w-48"
                />
                <figcaption className="text-sm text-muted-foreground">
                  {project.problemMedia.caption}
                </figcaption>
              </figure>
            )}
            <MediaGrid items={project.problemGallery ?? []} />
          </Section>

          <SectionRule />

          {steps.length > 0 ? (
            /* Sticks just under the site header and the section bar. */
            <StepGallery
              id="process"
              title={sections[1]!.title}
              intro={project.processIntro ?? `${steps.length} steps. Pick one.`}
              steps={steps}
              ariaLabel="Process steps"
              itemLabel="Step"
              mediaAspect={project.processMediaAspect}
              stickyTop={bar.stickyTop}
            />
          ) : (
            <Section id="process" title={sections[1]!.title}>
              <p className={bodyText}>{project.process}</p>
            </Section>
          )}

          <SectionRule />

          <Section id="solution" title={sections[2]!.title}>
            <p className={bodyText}>{project.solution}</p>
            <MediaGrid items={solutionMedia} />
          </Section>

          <SectionRule />

          <Section id="outcome" title={sections[3]!.title}>
            <p className={bodyText}>{project.outcome}</p>
            {extras.length > 0 && (
              <>
                <p className="label-tech mt-6">
                  {project.outcomeExtrasLabel ?? "From the project"}
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {extras.map((media, index) => (
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
            {project.change && (
              <p className={cn(bodyText, "mt-6")}>
                <strong className="font-bold text-foreground">What I'd change:</strong>{" "}
                {project.change}
              </p>
            )}
          </Section>
        </div>

        <SectionRule className="mt-16" />
        <div className="mt-6 grid gap-4 sm:flex sm:items-center sm:justify-between">
          <Link to="/projects" className="text-link hover:text-foreground">
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
