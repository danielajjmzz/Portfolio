import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SkillsExplorer } from "@/components/SkillsExplorer";
import { featuredProjects } from "@/data/projects";
import { accentButton, cardClass, outlineButton, sectionHeadRow, tintCardClass } from "@/lib/ui";

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
  {
    level: "High School",
    school: "Albert G. Lane Technical College Preparatory High School",
    detail: "Concentration in Computer Science",
    note: "Graduated May 2023 · Summa Cum Laude",
  },
  {
    level: "University",
    school: "Illinois Institute of Technology",
    detail: "B.S. in Computer Science",
    note: "Expected graduation May 2027",
  },
];

const homeFeaturedProjects = featuredProjects.slice(0, 3);
const container = "mx-auto max-w-6xl px-5 md:px-8";

function Home() {
  return (
    <>
      <PageHero
        className="bg-tint dark:bg-background"
        eyebrow="Daniela Jimenez · Chicago, Illinois · Portfolio 2026"
        title="creating spaces where people feel seen, supported, and informed."
        body="UI/UX designer and Computer Science student working at the intersection of people, design, and technology. If you're building something for a real community, I'd like to hear about it."
        aside={
          <>
            {/* Light mode shows the greenhouse photo; dark mode keeps the original portrait. */}
            <img
              src="/images/portrait-light.jpg"
              alt="Daniela Jimenez"
              width={360}
              height={450}
              className="h-full w-full rounded-frame border border-border object-cover object-[50%_25%] dark:hidden"
            />
            <img
              src="/images/portrait.jpg"
              alt="Daniela Jimenez"
              width={800}
              height={1200}
              className="hidden h-full w-full rounded-frame border border-border object-cover object-[50%_20%] dark:block"
            />
          </>
        }
        actions={
          <>
            <Link to="/contact" className={accentButton}>
              Get in touch <span aria-hidden>→</span>
            </Link>
            <Link to="/projects" className={outlineButton}>
              View all projects
            </Link>
          </>
        }
      />

      {/* Selected Work */}
      <section className="py-14 md:py-16 dark:bg-tint" aria-labelledby="work-heading">
        <div className={container}>
          <div className={sectionHeadRow}>
            <h2 id="work-heading">Selected Work</h2>
            <p className="label-tech">{homeFeaturedProjects.length} projects · 2023–2026</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {homeFeaturedProjects.map((project, i) => (
              <Link
                key={project.slug}
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className={`${cardClass} group block p-3 transition-colors hover:border-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
              >
                <img
                  src={project.coverImage}
                  alt={project.title}
                  width={1600}
                  height={1000}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="aspect-[16/10] w-full rounded-frame border border-border object-cover"
                />
                <div className="mt-4 flex items-baseline justify-between gap-4 px-1 pb-1">
                  <h3 className="text-[1.375rem] text-foreground group-hover:text-link">
                    {project.title}
                  </h3>
                  <span className="label-tech shrink-0">{project.year}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section
        className="bg-tint py-14 md:py-16 dark:bg-background"
        aria-labelledby="education-heading"
      >
        <div className={container}>
          <h2 id="education-heading" className="mb-7">
            Education
          </h2>
          <dl className="grid gap-5 md:grid-cols-2">
            {education.map((entry) => (
              <div key={entry.level} className={`${tintCardClass} px-6 py-5`}>
                <dt className="label-tech">{entry.level}</dt>
                <dd className="mt-2 font-display text-[1.75rem] font-semibold leading-tight text-foreground">
                  {entry.school}
                </dd>
                <dd className="mt-3 text-[0.9375rem] font-semibold text-foreground">
                  {entry.detail}
                </dd>
                <dd className="mt-1 text-sm text-muted-foreground">{entry.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Leadership & Experience */}
      <section className="py-14 md:py-16" aria-labelledby="leadership-heading">
        <div className={container}>
          <h2 id="leadership-heading" className="mb-7">
            Leadership &amp; Experience
          </h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((entry, index) => (
              <li key={entry.role} className={`${cardClass} flex flex-col p-6`}>
                <span className="text-xs font-semibold tracking-wide text-link">
                  {String(index + 1).padStart(2, "0")}/
                </span>
                <h3 className="mt-3 text-[1.625rem] text-foreground">{entry.role}</h3>
                <p className="mt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-link">
                  {entry.org}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{entry.body}</p>
              </li>
            ))}
            <li aria-hidden className="placeholder-frame min-h-[180px] rounded-card">
              Photo · coming soon
            </li>
          </ol>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-tint py-14 md:py-16" aria-labelledby="skills-heading">
        <div className={container}>
          <h2 id="skills-heading" className="mb-7">
            Skills
          </h2>
          <SkillsExplorer />
        </div>
      </section>
    </>
  );
}
