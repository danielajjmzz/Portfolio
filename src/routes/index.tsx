import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CornerFrame, SectionRule } from "@/components/CornerFrame";
import { SkylineMotif } from "@/components/SkylineMotif";
import { SkillsExplorer } from "@/components/SkillsExplorer";
import { featuredProjects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Daniela Jimenez — UI/UX Designer & CS Student, Chicago" },
      {
        name: "description",
        content:
          "Creating spaces where people feel seen, supported, and informed. Selected UI/UX and program design work by Daniela Jimenez.",
      },
      {
        property: "og:title",
        content: "Daniela Jimenez — UI/UX Designer & CS Student, Chicago",
      },
      {
        property: "og:description",
        content:
          "Creating spaces where people feel seen, supported, and informed. Selected UI/UX and program design work by Daniela Jimenez.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const leadership = [
  {
    role: "Computer Science & Design Lead",
    org: "Exelon Summer Institute",
    body: "Built a four-week Python, AI, and design curriculum and led a TA team, guiding 20+ students from coding fundamentals through Figma and Framer wireframing to a completed portfolio site.",
  },
  {
    role: "Professional Development Chair",
    org: "SHPEtinas",
    body: "Lead 3+ events per semester engaging 160+ STEM and architecture students, and built partnerships with 3+ companies including Fortune 500 firms.",
  },
  {
    role: "Assistant Program Manager",
    org: "Exelon Summer Institute",
    body: "Placeholder — experience description coming soon.",
  },
  {
    role: "SHPEtinas Director",
    org: "Society of Hispanic Professional Engineers",
    body: "Placeholder — experience description coming soon.",
  },
  {
    role: "Audio & Visual Technician",
    org: "Illinois Institute of Technology — Event Services",
    body: "Placeholder — experience description coming soon.",
  },
];

const education = [
  { level: "High School", school: "Lane Tech" },
  { level: "University", school: "Illinois Institute of Technology" },
];

const homeFeaturedProjects = featuredProjects.slice(0, 3);

/** Very slow parallax drift of the skyline motif — moves slower than content. */
function useParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const el = ref.current;
        if (el) el.style.transform = `translate3d(0, ${window.scrollY * 0.12}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}

function Home() {
  const motifRef = useParallax();

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          ref={motifRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[65%] will-change-transform"
        >
          <SkylineMotif className="h-full w-full text-primary opacity-[0.13]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-10 md:px-8 md:pb-16 md:pt-12">
          <p className="label-tech">
            Daniela Jimenez · Chicago, Illinois · Portfolio 2026
          </p>

          <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)] md:items-center md:gap-14">
            <CornerFrame className="max-w-xs overflow-hidden bg-card md:max-w-xs">
              <img
                src="/images/portrait-placeholder.jpg"
                alt="Daniela Jimenez"
                width={900}
                height={1200}
                className="aspect-[3/4] w-full object-cover"
              />
            </CornerFrame>

            <div>
              <h1 className="hero-title font-display text-foreground">
                creating spaces where people feel seen, supported, and informed.
              </h1>
              <div className="mt-6 max-w-xl">
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  UI/UX designer and Computer Science student working at the
                  intersection of people, design, and technology. If you're
                  building something for a real community, I'd like to hear
                  about it.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brick"
                  >
                    Get in touch
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    to="/projects"
                    className="hairline inline-flex items-center rounded-sm px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    View all projects
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionRule />
        <div className="grid gap-2 pt-6 sm:flex sm:items-baseline sm:justify-between">
          <h2 className="font-display text-foreground">Selected Work</h2>
          <p className="label-tech">
            {homeFeaturedProjects.length} projects · 2023—2026
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {homeFeaturedProjects.map((project, i) => (
            <Link
              key={project.slug}
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="block"
            >
              <CornerFrame className="overflow-hidden bg-card">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  width={1600}
                  height={1000}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="aspect-[16/10] w-full object-cover"
                />
              </CornerFrame>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-display leading-tight text-foreground">
                  {project.title}
                </h3>
                <span className="label-tech shrink-0">{project.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-32">
        <SectionRule />
        <h2 className="mt-8 font-display text-foreground">Education</h2>
        <dl className="mt-8 grid gap-6 md:grid-cols-2">
          {education.map((entry) => (
            <div key={entry.level} className="hairline-t pt-5">
              <dt className="label-tech">{entry.level}</dt>
              <dd className="mt-2 font-display text-2xl leading-tight text-foreground">
                {entry.school}
              </dd>
            </div>
          ))}
        </dl>

        <SectionRule className="mt-16" />
        <h2 className="mt-8 font-display text-foreground">
          Leadership &amp; Experience
        </h2>
        <div className="mt-8 grid gap-10">
          {leadership.map((entry) => (
            <div
              key={entry.role}
              className="hairline-t grid gap-3 pt-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
            >
              <div>
                <h3 className="font-display leading-tight text-foreground">
                  {entry.role}
                </h3>
                <p className="label-tech mt-1">{entry.org}</p>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                {entry.body}
              </p>
            </div>
          ))}
        </div>

        <SectionRule className="mt-16" />
        <h2 className="mt-8 font-display text-foreground">Skills</h2>
        <div className="mt-8">
          <SkillsExplorer />
        </div>
      </section>
    </>
  );
}
