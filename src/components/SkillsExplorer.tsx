import { useState, type KeyboardEvent } from "react";
import {
  Boxes,
  Braces,
  Brush,
  Clock,
  Code2,
  Cpu,
  Figma,
  FileCode2,
  Github,
  Hammer,
  Languages,
  LayoutTemplate,
  Lightbulb,
  MessageSquare,
  MousePointerClick,
  PenTool,
  Presentation,
  Printer,
  Puzzle,
  Ruler,
  Scissors,
  Search,
  Shapes,
  SquarePen,
  Terminal,
  Users,
  type LucideIcon,
} from "lucide-react";
import { chipClass } from "@/lib/ui";

type Skill = { label: string; alt: string; Icon: LucideIcon };

const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Design & UX",
    skills: [
      {
        label: "UI & UX Design",
        alt: "Layout icon representing UI and UX design skills",
        Icon: LayoutTemplate,
      },
      {
        label: "UX Research",
        alt: "Magnifying glass icon representing UX research skills",
        Icon: Search,
      },
      {
        label: "Wireframing",
        alt: "Pen tool icon representing wireframing and low-fidelity prototyping skills",
        Icon: PenTool,
      },
      {
        label: "Visual Design",
        alt: "Ruler icon representing visual design and layout skills",
        Icon: Ruler,
      },
      {
        label: "Interaction Design",
        alt: "Cursor click icon representing interaction design skills",
        Icon: MousePointerClick,
      },
    ],
  },
  {
    title: "Technical & Hardware",
    skills: [
      {
        label: "Python",
        alt: "Terminal icon representing Python programming skills",
        Icon: Terminal,
      },
      {
        label: "Java",
        alt: "Code icon representing Java programming skills",
        Icon: Code2,
      },
      {
        label: "C",
        alt: "Braces icon representing C programming skills",
        Icon: Braces,
      },
      {
        label: "JavaScript",
        alt: "File of code icon representing JavaScript programming skills",
        Icon: FileCode2,
      },
      {
        label: "HTML & CSS",
        alt: "Markup icon representing HTML and CSS skills",
        Icon: SquarePen,
      },
      {
        label: "SQL",
        alt: "Stacked boxes icon representing SQL and database skills",
        Icon: Boxes,
      },
      {
        label: "3D Printing",
        alt: "3D printer icon representing 3D printing skills",
        Icon: Printer,
      },
      {
        label: "3D Carving",
        alt: "Carving tool icon representing 3D carving skills",
        Icon: Hammer,
      },
      {
        label: "Laser Cutting",
        alt: "Scissors icon representing laser cutting skills",
        Icon: Scissors,
      },
      {
        label: "Arduino",
        alt: "Microchip icon representing Arduino electronics skills",
        Icon: Cpu,
      },
    ],
  },
  {
    title: "Tools",
    skills: [
      { label: "Figma", alt: "Figma", Icon: Figma },
      {
        label: "Moqups",
        alt: "Wireframe icon representing Moqups",
        Icon: LayoutTemplate,
      },
      {
        label: "Adobe Illustrator",
        alt: "Vector pen icon representing Adobe Illustrator",
        Icon: PenTool,
      },
      {
        label: "Framer",
        alt: "Shapes icon representing Framer",
        Icon: Shapes,
      },
      {
        label: "Onshape",
        alt: "3D shapes icon representing Onshape CAD software",
        Icon: Boxes,
      },
      {
        label: "TinkerCAD",
        alt: "Blocks icon representing TinkerCAD 3D modeling",
        Icon: Puzzle,
      },
      { label: "GitHub", alt: "GitHub", Icon: Github },
      {
        label: "VS Code",
        alt: "Code editor icon representing Visual Studio Code",
        Icon: Code2,
      },
      {
        label: "Canva",
        alt: "Brush icon representing Canva design tool",
        Icon: Brush,
      },
    ],
  },
  {
    title: "Professional Skills",
    skills: [
      {
        label: "Time Management",
        alt: "Clock icon representing time management skills",
        Icon: Clock,
      },
      {
        label: "Communication",
        alt: "Speech bubble icon representing communication skills",
        Icon: MessageSquare,
      },
      {
        label: "Presenting",
        alt: "Presentation board icon representing public presenting skills",
        Icon: Presentation,
      },
      {
        label: "Problem-Solving",
        alt: "Lightbulb icon representing problem-solving skills",
        Icon: Lightbulb,
      },
      {
        label: "Team Leadership",
        alt: "Group of people icon representing team leadership skills",
        Icon: Users,
      },
      {
        label: "English & Spanish",
        alt: "Languages icon representing bilingual English and Spanish fluency, Illinois Seal of Biliteracy",
        Icon: Languages,
      },
    ],
  },
];

const ALL = "All skills";

/** "Design & UX" -> "design-ux", for tab ids. */
const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function SkillsExplorer() {
  const [active, setActive] = useState(ALL);
  const group = skillGroups.find((g) => g.title === active);
  const tabs = [ALL, ...skillGroups.map((g) => g.title)];

  /** Arrow keys, Home and End move between tabs, as screen reader users expect. */
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, title: string) => {
    const index = tabs.indexOf(title);
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % tabs.length
        : event.key === "ArrowLeft"
          ? (index - 1 + tabs.length) % tabs.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? tabs.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    const nextTitle = tabs[next] ?? ALL;
    setActive(nextTitle);
    document.getElementById(`skills-tab-${slug(nextTitle)}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Skill groups" className="flex flex-wrap gap-2">
        {tabs.map((title) => (
          <button
            key={title}
            role="tab"
            type="button"
            id={`skills-tab-${slug(title)}`}
            aria-controls="skills-panel"
            aria-selected={title === active}
            tabIndex={title === active ? 0 : -1}
            onKeyDown={(event) => onTabKey(event, title)}
            onClick={() => setActive(title)}
            className={chipClass(title === active)}
          >
            {title}
          </button>
        ))}
      </div>

      {!group && (
        // All skills: a compact list, five per row on wide screens, grouped in reading order.
        <div role="tabpanel" id="skills-panel" aria-labelledby={`skills-tab-${slug(ALL)}`}>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5">
            {skillGroups
              .flatMap((g) => g.skills)
              .map(({ label, alt, Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 border-b border-border py-3 text-sm text-foreground"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-tile bg-tint-card">
                    <Icon
                      role="img"
                      aria-label={alt}
                      className="h-4 w-4 text-link"
                      strokeWidth={1.6}
                    />
                  </span>
                  <span className="min-w-0">{label}</span>
                </li>
              ))}
          </ul>
        </div>
      )}

      {group && (
        <div
          role="tabpanel"
          id="skills-panel"
          aria-labelledby={`skills-tab-${slug(group.title)}`}
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5"
        >
          {group.skills.map(({ label, alt, Icon }) => (
            <div key={label} className="group flex flex-col items-center gap-3 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-tile bg-tint-card transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none">
                <Icon role="img" aria-label={alt} className="h-6 w-6 text-link" strokeWidth={1.4} />
              </span>
              <span className="text-sm text-foreground">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
