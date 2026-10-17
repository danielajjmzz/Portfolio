import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SkillsExplorer } from "@/components/SkillsExplorer";
import { ProjectLinks } from "@/components/ProjectLinks";
import { ProjectTags } from "@/components/ProjectTags";
import { useViewCursor } from "@/components/ViewCursor";
import { featuredProjects, type Project } from "@/data/projects";
import {
  accentButton,
  cardClass,
  cardImageZoom,
  interactiveCard,
  outlineButton,
  sectionHeadRow,
  stretchedLink,
  cardTitle,
  itemTitle,
} from "@/lib/ui";
import { responsiveImage } from "@/lib/images";
import { cn } from "@/lib/utils";

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

/** Leadership & Experience, from the resume. Most recent first. */
const leadership = [
  {
    role: "SHPEtinas Director",
    org: "Society of Hispanic Professional Engineers (SHPE-IIT)",
    dates: "May 2026 – Present",
    body: "Built a $2.6K budget proposing 11 events for 2026–27, nearly doubling the 6 funded in Spring 2026. Launched our social media (120+ followers) and opened a semester-based exec role to freshmen.",
  },
  {
    role: "Audio & Visual Technician",
    org: "Illinois Institute of Technology — Event Services",
    dates: "May 2026 – Present",
    body: "Joined the Event Services crew in May 2024 and moved up to AV technician in May 2026.",
  },
  {
    role: "Computer Science & Design Lead",
    org: "Exelon Summer Institute",
    dates: "Jul – Aug 2026",
    body: "Designed a four-week Python, AI and design curriculum for 21 students, reaching 95% concept mastery. Led 2 TAs through coding, design principles and Figma and Framer wireframing, so every student presented a portfolio.",
  },
  {
    role: "Assistant Program Manager",
    org: "Exelon Summer Institute",
    dates: "Jul – Aug 2025",
    body: "Managed an $89K budget after funding cuts while keeping all 28 staff roles. Coordinated 3 trainings with 92% attendance, and planned 11 student outings, 6 of them free, within an $8.5K budget.",
  },
  {
    role: "Professional Development Chair",
    org: "Society of Hispanic Professional Engineers (SHPE-IIT)",
    dates: "Sept 2024 – May 2026",
    body: "Co-developed SHPEtinas' first professional development events, running 3+ per semester for 160+ STEM and architecture students, and built partnerships with 3+ companies, including Fortune 500 firms.",
  },
  {
    role: "Computer Science Teaching Assistant",
    org: "Exelon Summer Institute",
    dates: "Jul – Aug 2024",
    body: "Taught 15+ Python and circuit fundamentals lectures to 30+ students through hands-on projects, and helped each student debug their code and circuits.",
  },
];

const education = [
  {
    level: "High School",
    school: "Albert G. Lane Technical College Preparatory High School",
    detail: "Concentration in Computer Science",
    note: "Graduated May 2023 · Summa Cum Laude",
    image: "/images/home/lane-tech-campus.jpg",
    alt: "Aerial view of Lane Tech's red-brick campus and football field, with the Chicago skyline behind it.",
  },
  {
    level: "University",
    school: "Illinois Institute of Technology",
    detail: "B.S. in Computer Science",
    note: "Expected graduation May 2027",
    image: "/images/home/illinois-tech-campus.jpg",
    alt: "Aerial view of Illinois Tech's campus at dusk, with S.R. Crown Hall lit up in front and the Chicago skyline behind it.",
  },
];

const homeFeaturedProjects = featuredProjects.slice(0, 3);

/**
 * A Selected Work card: the same effects as the Projects page cards (lift, pink ring, image
 * zoom, "View" cursor, project link icons), in a compact 3-across layout. The project's short
 * description slides up over the image on hover or keyboard focus, and stays visible on touch.
 */
function HomeProjectCard({ project, index }: { project: Project; index: number }) {
  const view = useViewCursor();
  return (
    <article
      {...view.handlers}
      className={cn(
        cardClass,
        interactiveCard,
        view.activeClass,
        "group flex min-w-0 flex-col p-3 md:max-lg:grid md:max-lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:max-lg:items-center md:max-lg:gap-6",
      )}
    >
      <div ref={view.zoneRef} className="relative">
        <div className="relative overflow-hidden rounded-frame border border-border bg-card">
          <img
            src={project.coverImage}
            {...responsiveImage(project.coverImage, index !== 0)}
            alt=""
            width={1600}
            height={900}
            loading={index === 0 ? "eager" : "lazy"}
            className={cn("aspect-[16/10] w-full object-cover", cardImageZoom)}
          />
          {project.subtitle && (
            <p className="absolute inset-x-0 bottom-0 translate-y-full border-t-2 border-primary bg-background/90 px-4 py-3 text-sm leading-snug text-foreground opacity-0 backdrop-blur-[2px] transition-[transform,opacity] duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
              {project.subtitle}
            </p>
          )}
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
      <div className="flex flex-1 flex-col px-1 pb-1 pt-4 md:max-lg:py-2">
        <ProjectTags tags={project.tags} />
        <h3 className={cn("mt-2", cardTitle)}>
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className={cn(stretchedLink, "transition-colors group-hover:text-link")}
          >
            {project.title}
          </Link>
        </h3>
        <p className="label-tech mt-auto pt-4 md:max-lg:mt-0">
          {project.year.match(/\d{4}/)?.[0] ?? project.year} · {project.role}
        </p>
      </div>
    </article>
  );
}
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
              // Lazy so dark mode (the default) never downloads this hidden photo.
              loading="lazy"
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
          <div className="grid gap-5 lg:grid-cols-3">
            {homeFeaturedProjects.map((project, i) => (
              <HomeProjectCard key={project.slug} project={project} index={i} />
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
          {/*
            No cards: both entries sit on the page side by side, each with a small campus photo.
            On desktop the two entries sit side by side and share one row grid (subgrid), so the label, school,
            degree and dates line up across both columns even when one name wraps.
          */}
          <ul className="grid gap-y-10 lg:grid-cols-2 lg:grid-rows-[repeat(4,auto)] lg:gap-x-24 lg:gap-y-0">
            {education.map((entry) => (
              <li
                key={entry.level}
                className="grid grid-cols-[5.5rem_minmax(0,1fr)] content-start gap-x-5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-x-6 lg:row-span-4 lg:grid-rows-subgrid"
              >
                <img
                  src={entry.image}
                  alt={entry.alt}
                  width={640}
                  height={640}
                  loading="lazy"
                  className="row-span-4 aspect-square w-full self-start rounded-frame border border-border object-cover"
                />
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {entry.level}
                </p>
                <h3 className={cn("mt-2 text-balance text-foreground", itemTitle)}>
                  {entry.school}
                </h3>
                <p className="mt-3 text-[0.9375rem] font-semibold text-foreground">
                  {entry.detail}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{entry.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Leadership & Experience */}
      <section className="py-14 md:py-16" aria-labelledby="leadership-heading">
        <div className={container}>
          <h2 id="leadership-heading" className="mb-7">
            Leadership &amp; Experience
          </h2>
          <div className="grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12">
            <figure className="m-0">
              <img
                src="/images/home/shpetinas-team.jpg"
                alt="The SHPEtinas team at Illinois Tech in matching pink polos on white steps; Daniela is in the front row, on the right."
                width={983}
                height={1400}
                loading="lazy"
                className="h-auto w-full rounded-frame border border-border"
              />
              <figcaption className="mt-3 text-sm text-muted-foreground">
                The SHPEtinas team at Illinois Tech. I'm front row, on the right.
              </figcaption>
            </figure>

            {/* Role and organization on every line; a description only where one is written. */}
            <ol className="self-start">
              {leadership.map((entry) => (
                <li
                  key={entry.role}
                  className="border-t border-border py-5 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <h3 className={cn(itemTitle, "text-foreground")}>{entry.role}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {entry.org}
                    <span className="text-dimmed"> · {entry.dates}</span>
                  </p>
                  {entry.body && (
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {entry.body}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
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
