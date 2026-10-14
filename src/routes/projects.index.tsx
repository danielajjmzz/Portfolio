import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { caseStudies, teaching, visualFilters, selectVisualWork, type VisualFilter } from "@/data/projects-page";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/")({
  head: () => ({ meta: [
    { title: "Projects — Daniela Jimenez" },
    { name: "description", content: "Case studies, teaching, and visual work, each built with a real audience in mind." },
    { property: "og:title", content: "Projects — Daniela Jimenez" },
    { property: "og:description", content: "Explore Daniela Jimenez’s case studies, student programs, physical designs, documents, and photography." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ProjectsIndex,
});

const sections = [
  { id: "case-studies", title: "Case studies", count: "3" },
  { id: "teaching", title: "Teaching", count: "3" },
  { id: "visual", title: "Visual work", count: "8+" },
] as const;
type Preview = { title: string; image: string; description: string };
const chipStyle = (active: boolean) => cn(
  "hairline h-9 shrink-0 rounded-sm px-3 text-sm shadow-none sm:px-4",
  active ? "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "bg-transparent text-muted-foreground hover:border-primary hover:bg-transparent hover:text-link",
);

function SectionHeading({ id, title, label }: { id: string; title: string; label: string }) {
  return <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
    <h2 id={id}>{title}</h2><p className="text-xs text-muted-foreground sm:text-sm">{label}</p>
  </div>;
}

function ProjectsIndex() {
  const [activeSection, setActiveSection] = useState<string>("case-studies");
  const [filter, setFilter] = useState<VisualFilter>("All");
  const [expanded, setExpanded] = useState(false);
  const [preview, setPreview] = useState<Preview | null>(null);
  const visible = selectVisualWork(filter, expanded);

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
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = "visual";
      setActiveSection(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div>
      <header className="mx-auto max-w-6xl px-5 pb-8 pt-10 md:px-8 md:pt-12">
        <h1>Projects</h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">Case studies, teaching, and visual work, each built with a real audience in mind.</p>
      </header>

      <nav id="project-section-nav" aria-label="Project sections" className="hairline-t hairline-b sticky top-[69px] z-20 bg-background sm:top-[79px]">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-3 md:px-8">
          {sections.map((section) => <Button key={section.id} asChild variant="outline" className={chipStyle(activeSection === section.id)}>
            <a href={`#${section.id}`} aria-current={activeSection === section.id ? "location" : undefined} onClick={(event) => {
              event.preventDefault();
              document.getElementById(section.id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
              window.history.replaceState(null, "", `#${section.id}`);
            }}>{section.title}<span className={cn("text-xs", activeSection === section.id ? "text-primary-foreground/70" : "text-muted-foreground")}>{section.count}</span></a>
          </Button>)}
        </div>
      </nav>

      <div className="mx-auto max-w-6xl space-y-14 px-5 pt-9 md:space-y-16 md:px-8">
        <section id="case-studies" aria-labelledby="case-studies-heading" className="scroll-mt-40">
          <SectionHeading id="case-studies-heading" title="Case studies" label="UX research · product · data systems" />
          <div className="grid gap-x-6 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((project, index) => <article key={project.slug} className="group min-w-0">
              <div className="relative">
                <Link to="/projects/$slug" params={{ slug: project.slug }} aria-label={`Read ${project.title}`} className="hairline block overflow-hidden rounded-sm bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <img src={project.coverImage} alt={project.title} width={900} height={600} loading={index === 0 ? "eager" : "lazy"} className="aspect-[3/2] w-full object-cover" />
                </Link>
                {(project.repo_url || project.live_url) && <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100">
                  {project.repo_url && <Button asChild variant="outline" size="icon" className="border-media-icon/60 bg-media-scrim text-media-icon hover:bg-media-scrim hover:text-primary"><a href={project.repo_url} aria-label="GitHub repository" target="_blank" rel="noreferrer"><Github /></a></Button>}
                  {project.live_url && <Button asChild variant="outline" size="icon" className="border-media-icon/60 bg-media-scrim text-media-icon hover:bg-media-scrim hover:text-primary"><a href={project.live_url} aria-label="Live website" target="_blank" rel="noreferrer"><ExternalLink /></a></Button>}
                </div>}
              </div>
              <p className="label-tech mt-4">{project.meta}</p>
              <h3 className="mt-2 leading-tight"><Link to="/projects/$slug" params={{ slug: project.slug }}>{project.title}</Link></h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
              <Link to="/projects/$slug" params={{ slug: project.slug }} className="mt-4 inline-flex items-center gap-2 text-sm text-link">Read the case study <ArrowRight className="size-4" aria-hidden="true" /></Link>
            </article>)}
          </div>
        </section>

        <section id="teaching" aria-labelledby="teaching-heading" className="scroll-mt-40">
          <SectionHeading id="teaching-heading" title="Teaching" label="Lessons · workshops · student programs" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teaching.map((entry) => <article key={entry.id} className="hairline min-w-0 overflow-hidden rounded-sm bg-card">
              <img src={entry.image} alt={`${entry.title} — blueprint placeholder for lesson documentation`} width={800} height={500} loading="lazy" className="aspect-[16/10] w-full border-b object-cover" />
              <div className="p-5">
                <h3 className="leading-tight">{entry.title}</h3>
                <dl className="mt-4 grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3 gap-y-3 text-xs leading-relaxed">
                  {[["For", entry.audience], ["Made", entry.made], ["Result", entry.result]].map(([label, value]) => <div key={label} className="contents"><dt className="text-muted-foreground">{label}</dt><dd>{value}</dd></div>)}
                </dl>
                {entry.href ? <a href={entry.href} className="mt-5 inline-flex items-center gap-2 text-sm text-link">See the lesson <ArrowRight className="size-4" aria-hidden="true" /></a> : <Button variant="link" className="mt-5 h-auto p-0 font-normal text-link" onClick={() => setPreview(entry)}>See the lesson <ArrowRight aria-hidden="true" /></Button>}
              </div>
            </article>)}
          </div>
        </section>

        <section id="visual" aria-labelledby="visual-heading" className="scroll-mt-40">
          <SectionHeading id="visual-heading" title="Visual work" label="Physical · document · photography" />
          <div role="group" aria-label="Filter visual work" className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0">
            {visualFilters.map((item) => <Button key={item} variant="outline" aria-pressed={filter === item} className={chipStyle(filter === item)} onClick={() => { setFilter(item); setExpanded(false); }}>{item}</Button>)}
          </div>
          <div aria-live="polite" className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-x-6">
            {visible.entries.map((entry) => <article key={entry.id} className="min-w-0">
              <Button variant="ghost" aria-label={`View ${entry.title}`} className="hairline block h-auto w-full overflow-hidden rounded-sm bg-card p-0 hover:bg-card" onClick={() => setPreview(entry)}>
                <img src={entry.image} alt={`${entry.title} — ${entry.category.toLowerCase()} preview`} width={600} height={600} loading="lazy" className="aspect-square w-full object-cover" />
              </Button>
              <h3 className="mt-3 text-lg leading-tight">{entry.title}</h3>
            </article>)}
          </div>
          {visible.hasMore && <div className="mt-8 flex justify-center"><Button variant="outline" className="rounded-sm shadow-none" onClick={() => setExpanded(true)}>Show more visual work</Button></div>}
        </section>
      </div>

      <Dialog open={preview !== null} onOpenChange={(open) => { if (!open) setPreview(null); }}>
        <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-sm border-rule bg-background shadow-none">
          {preview && <><DialogTitle className="pr-8 font-display text-2xl tracking-normal">{preview.title}</DialogTitle><img src={preview.image} alt={preview.title} className="max-h-[60dvh] w-full object-contain" /><DialogDescription>{preview.description}</DialogDescription></>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
