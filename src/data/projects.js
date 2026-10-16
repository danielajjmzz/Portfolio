import realEstateCover from "@/assets/real-estate-database.jpg";
import jpmCover from "@/assets/jp-morgan-dashboard.jpg";

/**
 * Single source of truth for all portfolio projects.
 * To add a project later: append one object to this array. Nothing else to edit.
 *
 * Project pages use the same layout as teaching pages. Optional extras:
 *   problemMedia   — one photo beside "01 The Problem"
 *   processSteps   — tabbed steps with photos for "02 My Process" (like a teaching page's lessons);
 *                    leave it out and "02 My Process" shows the `process` text instead
 *   solutionMedia  — photos under "03 The Solution"
 *   outcomeExtras  — small photo grid in "04 The Outcome", plus `change` ("What I'd change")
 *
 * Media: leave `src` empty ("") to show a labeled placeholder frame until the real
 * photo or video is ready; `label` is what the placeholder says.
 */

const ULTA = "/images/projects/ulta";
/** A real photo for the Ulta project, in public/images/projects/ulta. */
const ulta = (file, alt, extra = {}) => ({
  type: "image",
  src: `${ULTA}/${file}`,
  alt,
  label: file,
  ...extra,
});

/** Empty photo slot: shows a labeled placeholder frame until `src` is filled in. */
const slot = (label, note = "Photo coming soon") => ({
  type: "image",
  src: "",
  alt: "",
  label,
  note,
});
export const projects = [
  {
    slug: "real-estate-database",
    title: "Real Estate Management Database",
    summary:
      "A structured database and interface concept for managing property records, tenants, and listings.",
    year: "2025",
    role: "Designer & Developer",
    client: "Academic project — Illinois Tech",
    tools: ["SQL", "Figma"],
    coverImage: realEstateCover,
    order: 1,
    featured: true,
    problem:
      "Placeholder — project content coming soon. This section will describe the core problem the project set out to solve.",
    process:
      "Placeholder — project content coming soon. This section will walk through research, schema design, and interface iterations.",
    processSteps: [
      {
        id: "research",
        label: "Research",
        title: "Research",
        body: "Placeholder — project content coming soon.",
        tags: [],
        media: [slot("Research photo"), slot("Research photo")],
      },
      {
        id: "schema",
        label: "Schema design",
        title: "Schema design",
        body: "Placeholder — project content coming soon.",
        tags: ["SQL"],
        media: [slot("Schema diagram"), slot("Table design")],
      },
      {
        id: "interface",
        label: "Interface",
        title: "Interface iterations",
        body: "Placeholder — project content coming soon.",
        tags: ["Figma"],
        media: [slot("Interface draft"), slot("Interface final")],
      },
    ],
    solution:
      "Placeholder — project content coming soon. This section will describe the final designed solution.",
    outcome:
      "Placeholder — project content coming soon. This section will describe results and what came out of the work.",
    // "#" shows the icon as "coming soon" on the Projects card; replace with a real URL, or "" to hide it.
    repo_url: "#",
    live_url: "#",
    file_url: "#",
  },
  {
    slug: "ulta-beauty-ai",
    title: "Beauty Formula Decoder — AI Concept for Ulta Beauty",
    summary:
      "A generative AI concept that checks a shopper's skincare and makeup routine for ingredient conflicts and builds safe, personalized bundles. I came up with the idea, chose Ulta, interviewed an Ulta executive and wrote much of the research for a 6-person team.",
    year: "2025",
    role: "Concept lead & researcher",
    client: "Ulta Beauty (student concept, not affiliated)",
    tools: ["Playing to Win", "WWHTBT analysis", "Stakeholder interview"],
    coverImage: `${ULTA}/title-slide.jpg`,
    coverAlt:
      "Title slide: Beauty Formula Decoder, by Aahil Penwalla, Chandler Besse, Daniela Jimenez, Sara Pec, Shree Meher and Zachary Yujnovich, above Ulta Beauty Collection products on orange.",
    order: 2,
    featured: true,
    problem:
      "Skincare and makeup shoppers are buried in options. Searching for a fix turns up endless products and generic AI tips that never answer the real question: are these products safe to use together? Ulta has the products and the loyalty data to answer it, but nothing that guides a shopper through their own routine.",
    problemGallery: [
      ulta(
        "pain-point.jpg",
        "Presentation slide: The modern beauty pain point, with close-up photos of acne, forehead lines, eye wrinkles and smudged makeup.",
        { caption: "The pain point, from our Innovation Day presentation." },
      ),
      ulta(
        "overwhelming.jpg",
        "Presentation slide: Current solutions are overwhelming, with shoppers surrounded by products and tutorials, and a chatbot giving a generic list of products.",
        { caption: "Today's options: more products, more tutorials, generic AI lists." },
      ),
    ],
    process:
      "Chose Ulta, mapped its strategy and competitors, wrote four AI strategies, interviewed an Ulta executive, drafted an AI ethics policy and structured the prototype.",
    processIntro: "6 steps, from picking the client to the prototype. Pick one.",
    processMediaAspect: "wide",
    processSteps: [
      {
        id: "why-ulta",
        label: "Why Ulta",
        title: "Choosing the client",
        dates: "My idea",
        body: "Our IPRO course asked for a generative AI strategy for a real company, and I proposed Ulta: a US beauty retailer with 1,300+ stores, a huge loyalty program and personalization as a stated goal. We mapped Ulta's strategy with the Playing to Win framework, then did the same for Sally Beauty, CVS/Walgreens and Bluemercury to see where AI could set Ulta apart.",
        tags: ["Playing to Win", "Competitive analysis"],
        media: [
          ulta(
            "ulta-strategy.jpg",
            "Research deck slide: Ulta's Playing to Win strategy, with its winning aspiration, where to play, and how to win.",
          ),
          ulta(
            "competitor-sally.jpg",
            "Research deck slide: the same Playing to Win breakdown for competitor Sally Beauty.",
          ),
        ],
      },
      {
        id: "strategies",
        label: "Four strategies",
        title: "Four ways Ulta could use AI",
        body: "We wrote four AI strategies for Ulta, from a careful Fast Follower to a Bold Innovator, each with what would have to be true and the warning signs to watch. Plotting them by risk and by how much they would set Ulta apart narrowed us to two directions.",
        tags: ["Strategy", "WWHTBT analysis"],
        media: [
          ulta(
            "archetype-matrix.jpg",
            "Research deck slide: a two-by-two matrix placing four AI strategies by AI risk and strategic differentiation.",
          ),
          ulta(
            "bold-vs-builder.jpg",
            "Research deck slide comparing the Bold Innovator and Strategic Builder strategies, with initiatives, the bet and the risk for each.",
          ),
        ],
      },
      {
        id: "hero-moments",
        label: "Hero moments",
        title: "Two hero moments",
        body: "Each direction got a hero moment: one experience that shows the whole strategy. The first became the Beauty Formula Decoder. I proposed the second, Complete Color Ecosystem: photos in three kinds of light find a shopper's color season, and Ulta's app, site and stores filter every product to that palette.",
        tags: ["Concept design"],
        note: "Complete Color Ecosystem was my hero moment.",
        media: [
          ulta(
            "hero-moments.jpg",
            "Research deck slide describing two hero moments: the Beauty Formula Decoder and Complete Color Ecosystem.",
          ),
        ],
      },
      {
        id: "interview",
        label: "Ulta interview",
        title: "Interviewing Ulta",
        dates: "I ran the interview",
        body: "I wrote the questions and interviewed Ulta's Head of Corporate Development & New Growth. The biggest lesson: most of Ulta's real AI traction is in analytics and personalization, not generative content, and an established brand should take smart risks, not race to be first. That changed our pitch: the Decoder helps guests decide, with clear disclaimers, instead of auto-generating content.",
        tags: ["Stakeholder interview", "Research"],
        media: [
          ulta(
            "interview-questions.jpg",
            "Research deck slide listing our draft interview questions for Ulta.",
          ),
          ulta(
            "interview-ai-hype.jpg",
            "Research deck slide: interview notes on where AI is moving the needle in beauty retail and where it is mostly hype.",
          ),
          ulta(
            "interview-takeaways.jpg",
            "Research deck slide: key takeaways from the Ulta interview.",
          ),
        ],
        mediaAspect: "wide",
      },
      {
        id: "ethics",
        label: "Ethics policy",
        title: "Ethics before launch",
        body: "Before anything faced a shopper, we wrote an AI ethics and governance policy for the Decoder: bias testing across skin tones, consent for every photo, human review of sensitive advice, and risk tiers that decide how much oversight each feature needs.",
        tags: ["Responsible AI", "Governance"],
        media: [
          ulta(
            "ethics-principles.jpg",
            "Research deck slide: guiding principles on privacy, accountability and human oversight.",
          ),
          ulta(
            "risk-tiers.jpg",
            "Research deck slide: risk tiers from low to high with examples and the governance each requires, plus a sample AI disclosure.",
          ),
        ],
      },
      {
        id: "prototype",
        label: "Prototype",
        title: "Structuring the prototype",
        body: "I set up the prototype's structure: the flow from a shopper's concerns to an ingredient check to a safe, personalized bundle. My teammates designed and built the screens.",
        tags: ["Information architecture", "Prototyping"],
        note: "Visual design by my teammates.",
        media: [
          ulta(
            "prototype.jpg",
            "Presentation slide showing the Beauty Formula Decoder prototype's landing screen with a Start Your Journey button.",
          ),
        ],
      },
    ],
    solution:
      "The Beauty Formula Decoder: a shopper uploads their routine or scans any product, from Ulta or anywhere else. The AI checks the ingredients for conflicts, such as retinol with vitamin C, suggests the order to apply them, and builds a bundle of products that work together, with a plain reason for every pick and a beauty advisor to confirm it.",
    solutionMedia: [
      ulta(
        "future.jpg",
        "Presentation slide: What's the future, showing a lighting booth in an Ulta store, a purple consultation room with lit mirrors, and two shoppers browsing makeup.",
        {
          caption:
            "Our in-store vision: a lighting booth and consultation space for color and skin checks.",
        },
      ),
      ulta(
        "impact.jpg",
        "Presentation slide: Why it matters, with customer impact, business impact, validation and governance.",
        { caption: "Why it matters." },
      ),
      ulta(
        "transparency.jpg",
        "Presentation slide: AI transparency builds trust, with our sample AI disclosure.",
        { caption: "The AI disclosure shoppers would see." },
      ),
    ],
    outcome:
      "We presented the Decoder at Illinois Tech Innovation Day with a research deck, a poster and a working prototype. It taught me that the strongest AI idea is the one people can trust, and that one interview can change a whole pitch.",
    outcomeExtrasLabel: "From Innovation Day",
    outcomeExtras: [
      ulta("poster.jpg", "Our full Innovation Day poster.", { caption: "Our poster" }),
    ],
    change:
      "Test with real shoppers and Ulta beauty advisors instead of relying on secondary research and AI stand-in feedback. Next, I'm designing a mobile version of the prototype on my own.",
    // "#" shows the icon as "coming soon" on the Projects card; replace with a real URL, or "" to hide it.
    repo_url: "",
    live_url: "#",
    file_url: "#",
  },
  {
    slug: "jp-morgan-dashboard",
    title: "JP Morgan Chase — Student Finance Dashboard",
    summary:
      "Designed a student budgeting dashboard and identified pain points through user research.",
    year: "2023",
    role: "Project Lead",
    client: "JP Morgan Chase (P33 program)",
    tools: ["Moqups", "Figma"],
    coverImage: jpmCover,
    order: 3,
    featured: true,
    problem: "Students needed a clearer way to understand and manage their finances.",
    process:
      "Conducted user research to uncover student financial pain points. Designed wireframes in Moqups. Built multiple interactive prototypes in Figma. Ran usability testing and iterated based on feedback.",
    processSteps: [
      {
        id: "research",
        label: "User research",
        title: "User research",
        body: "Conducted user research to uncover student financial pain points.",
        tags: ["User research"],
        media: [slot("Research photo"), slot("Pain points")],
      },
      {
        id: "wireframes",
        label: "Wireframes",
        title: "Wireframes",
        body: "Designed wireframes in Moqups.",
        tags: ["Moqups", "Wireframing"],
        media: [slot("Wireframe"), slot("Wireframe")],
      },
      {
        id: "prototypes",
        label: "Prototypes",
        title: "Interactive prototypes",
        body: "Built multiple interactive prototypes in Figma.",
        tags: ["Figma", "Prototyping"],
        media: [slot("Prototype screen"), slot("Prototype screen")],
      },
      {
        id: "testing",
        label: "Usability testing",
        title: "Usability testing",
        body: "Ran usability testing and iterated based on feedback.",
        tags: ["Usability testing", "Iteration"],
        media: [slot("Testing session"), slot("Revised screen")],
      },
    ],
    solution:
      "A final interactive prototype of a student budgeting dashboard, refined across multiple rounds of testing.",
    outcome:
      "Presented to a 50+ person audience, achieved 90% usability satisfaction, and delivered all milestones on time.",
    // "#" shows the icon as "coming soon" on the Projects card; replace with a real URL, or "" to hide it.
    repo_url: "#",
    live_url: "#",
    file_url: "#",
  },
  {
    slug: "portfolio-website",
    title: "Daniela Jimenez Portfolio Website",
    summary:
      "A personal portfolio designed and built to present multidisciplinary featured projects, physical designs, and professional experience.",
    year: "2026",
    role: "Designer & Developer",
    client: "Personal project",
    tools: ["Figma", "React", "TypeScript"],
    coverImage: "/images/placeholder.jpg",
    order: 4,
    featured: true,
    problem:
      "Placeholder — project content coming soon. This section will describe the core problem the project set out to solve.",
    process:
      "Placeholder — project content coming soon. This section will walk through research, information architecture, visual design, and development.",
    processSteps: [
      {
        id: "research",
        label: "Research",
        title: "Research",
        body: "Placeholder — project content coming soon.",
        tags: [],
        media: [slot("Reference sites"), slot("Research notes")],
      },
      {
        id: "architecture",
        label: "Information architecture",
        title: "Information architecture",
        body: "Placeholder — project content coming soon.",
        tags: [],
        media: [slot("Site map"), slot("Page structure")],
      },
      {
        id: "visual",
        label: "Visual design",
        title: "Visual design",
        body: "Placeholder — project content coming soon.",
        tags: ["Figma"],
        media: [slot("Color and type"), slot("Page design")],
      },
      {
        id: "development",
        label: "Development",
        title: "Development",
        body: "Placeholder — project content coming soon.",
        tags: ["React", "TypeScript"],
        media: [slot("Code"), slot("Live page")],
      },
    ],
    solution:
      "Placeholder — project content coming soon. This section will describe the final designed and developed portfolio experience.",
    outcome:
      "Placeholder — project content coming soon. This section will describe results and what came out of the work.",
    // "#" shows the icon as "coming soon" on the Projects card; replace with a real URL, or "" to hide it.
    repo_url: "#",
    live_url: "#",
    file_url: "#",
  },
];

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

export const featuredProjects = sortedProjects.filter((p) => p.featured);

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
