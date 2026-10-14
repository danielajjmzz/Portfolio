import { createFileRoute } from "@tanstack/react-router";
import { CornerFrame, SectionRule } from "@/components/CornerFrame";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Daniela Jimenez" },
      {
        name: "description",
        content:
          "Get in touch with Daniela Jimenez — UI/UX designer and Computer Science student in Chicago. Email, LinkedIn, and resume.",
      },
      { property: "og:title", content: "Contact — Daniela Jimenez" },
      {
        property: "og:description",
        content:
          "Email, LinkedIn, and resume for Daniela Jimenez, UI/UX designer in Chicago.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const links = [
  {
    label: "Email",
    value: "danielajjmzz@gmail.com",
    href: "mailto:danielajjmzz@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/djjimenz/",
    href: "https://www.linkedin.com/in/djjimenz/",
  },
];

function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="label-tech">Contact</p>
      <h1 className="mt-4 max-w-[20ch] font-display text-foreground">
        Let's talk about what you're building.
      </h1>
      <p className="mt-6 max-w-xl text-muted-foreground">
        Open to internships, entry-level jobs, freelance, design collaborations,
        and community projects in Chicago, Boston, Mexico (Acapulco, San Luis
        Potosi) or remote. I usually reply within a couple of days.
      </p>

      <SectionRule className="mt-12" />

      <dl className="mt-12 grid gap-8 md:grid-cols-2">
        {links.map((link) => (
          <div key={link.label} className="hairline-t pt-4">
            <dt className="label-tech">{link.label}</dt>
            <dd className="mt-2">
              <a
                href={link.href}
                target={link.label === "LinkedIn" ? "_blank" : undefined}
                rel={link.label === "LinkedIn" ? "noreferrer" : undefined}
                className="font-display text-2xl text-link transition-colors hover:text-foreground"
              >
                {link.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <CornerFrame className="mt-14 max-w-xl bg-card p-6 md:p-8">
        <h2 className="font-display text-foreground">Resume</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A one-page PDF covering design work, engineering coursework, and
          leadership roles.
        </p>
        <a
          href="#"
          className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Download resume
          <span aria-hidden>↓</span>
        </a>
      </CornerFrame>
    </section>
  );
}
