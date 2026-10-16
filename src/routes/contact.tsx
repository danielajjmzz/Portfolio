import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { accentButton } from "@/lib/ui";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Daniela Jimenez" },
      {
        name: "description",
        content:
          "Get in touch with Daniela Jimenez — UI/UX designer and Computer Science student in Chicago. Email, LinkedIn, GitHub, and resume.",
      },
      { property: "og:title", content: "Contact — Daniela Jimenez" },
      {
        property: "og:description",
        content: "Email, LinkedIn, and resume for Daniela Jimenez, UI/UX designer in Chicago.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const links: {
  label: string;
  value: string;
  href?: string;
  Icon: LucideIcon;
  external?: boolean;
}[] = [
  {
    label: "Email",
    value: "danielajjmzz@gmail.com",
    href: "mailto:danielajjmzz@gmail.com",
    Icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/djjimenz/",
    href: "https://www.linkedin.com/in/djjimenz/",
    Icon: Linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/danielajjmzz",
    href: "https://github.com/danielajjmzz",
    Icon: Github,
    external: true,
  },
  {
    label: "Open to work in",
    value: "Chicago · Boston · Mexico · Remote",
    Icon: MapPin,
  },
];

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about what you're building."
        body="Internships, entry-level roles, freelance, and community projects in Chicago, Boston, Mexico, or remote."
      />

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-24">
        <div className="grid gap-4 rounded-card border border-border bg-card p-4 sm:p-5 lg:grid-cols-2 lg:gap-6">
          {/* Left: availability, contact cards, resume */}
          {/* No inner padding, so its first line and last edge line up with the form panel. */}
          <div className="flex flex-col gap-3">
            <p className="mb-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
              Open to internships, entry-level jobs, freelance, design collaborations, and community
              projects in Chicago, Boston, Mexico (Acapulco, San Luis Potosi) or remote. I usually
              reply within a couple of days.
            </p>

            {links.map(({ label, value, href, Icon, external }) => {
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile bg-tint text-link">
                    <Icon aria-hidden className="size-[18px]" strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs tracking-[0.04em] text-muted-foreground">
                      {label}
                    </span>
                    <span className="block break-words text-[0.9375rem] font-semibold text-foreground">
                      {value}
                    </span>
                  </span>
                </>
              );
              const cls =
                "flex items-center gap-4 rounded-frame border border-border bg-card px-4 py-3.5";
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className={`${cls} transition-colors hover:border-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                >
                  {content}
                </a>
              ) : (
                <div key={label} className={cls}>
                  {content}
                </div>
              );
            })}

            {/* Grows to fill the column, so there's no gap above it and the button lines up with the form's bottom. */}
            <div className="flex flex-1 flex-col items-start rounded-frame bg-tint p-5 sm:p-6">
              <h2 className="text-[1.75rem]">Resume</h2>
              <p className="mb-5 mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                A one-page PDF covering design work, engineering coursework, and leadership roles.
              </p>
              <a href="#" className={`${accentButton} mt-auto`}>
                Download resume <span aria-hidden>↓</span>
              </a>
            </div>
          </div>

          {/* Right: pink form panel */}
          <div className="rounded-card bg-form p-6 sm:p-9">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
