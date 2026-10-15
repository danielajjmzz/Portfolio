import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CornerFrame, SectionRule } from "@/components/CornerFrame";
import { getProjectBySlug } from "@/data/projects";
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

const sections = [
  { id: "problem", label: "Problem", title: "01 The Problem" },
  { id: "process", label: "Process", title: "02 My Process" },
  { id: "solution", label: "Solution", title: "03 The Solution" },
  { id: "outcome", label: "Outcome", title: "04 The Outcome" },
] as const;

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

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="hairline-t pt-3">
      <dt className="label-tech">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{value}</dd>
    </div>
  );
}

function SubNav({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Project sections"
      className={cn("-mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0", className)}
    >
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="hairline shrink-0 rounded-sm px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-link"
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}

function CaseSection({ id, title, body }: { id: string; title: string; body: string }) {
  return (
    <section
      id={id}
      className="grid scroll-mt-32 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
    >
      <div>
        <h2 className="font-display leading-tight text-foreground">{title}</h2>
      </div>
      <p className="text-base leading-relaxed text-muted-foreground">{body}</p>
    </section>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const heroRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPinned(entry ? !entry.isIntersecting : false),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className={cn(
          "hairline-b fixed inset-x-0 top-[64px] z-20 bg-background/95 backdrop-blur-[2px] transition-all duration-300 md:top-[76px]",
          pinned
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
        aria-hidden={!pinned}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-2.5 md:px-8">
          <p className="min-w-0 truncate font-display text-lg leading-none text-foreground">
            {project.title}
          </p>
          <SubNav className="ml-auto min-w-0" />
        </div>
      </div>

      <article className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Link to="/projects" className="label-tech hover:text-link">
          ← Projects
        </Link>

        <div ref={heroRef}>
          <CornerFrame className="mt-6 overflow-hidden bg-card">
            <img
              src={project.coverImage}
              alt={project.title}
              width={1600}
              height={1000}
              className="aspect-[16/9] w-full object-cover"
            />
          </CornerFrame>
        </div>

        <div className="mt-10 max-w-4xl">
          <h1 className="font-display text-foreground">{project.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{project.summary}</p>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-4">
          <MetaCell label="Year" value={project.year} />
          <MetaCell label="Role" value={project.role} />
          <MetaCell label="Client" value={project.client} />
          <MetaCell label="Tools" value={project.tools.join(", ")} />
        </dl>

        <SubNav className="mt-10" />

        <SectionRule className="mt-8" />

        <div className="mt-14 grid gap-14">
          {sections.map((s, i) => (
            <div key={s.id} className="grid gap-14">
              {i > 0 && <SectionRule />}
              <CaseSection id={s.id} title={s.title} body={project[s.id]} />
            </div>
          ))}
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
