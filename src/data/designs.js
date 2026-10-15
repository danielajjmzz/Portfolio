const placeholder = "/images/placeholder.jpg";

const placeholderMedia = (title) =>
  [1, 2, 3].map((number) => ({
    type: "image",
    src: placeholder,
    alt: `${title} blueprint preview ${number}`,
  }));

/**
 * Single source of truth for design entries on the Projects page.
 * To add a future lesson, physical design, document design, or photo:
 * append one object to the matching array.
 * Admin editing is intentionally skipped for now; these source fields are editable later.
 */
export const lessons = [
  {
    id: "lesson-1",
    title: "Python Portfolio Foundations",
    media: placeholderMedia("Python Portfolio Foundations"),
    description:
      "Placeholder — a four-week sequence helping students move from coding basics to a personal portfolio site.",
    order: 1,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
    artifactLabel: "Exelon Summer Institute teaching artifact",
  },
  {
    id: "lesson-2",
    title: "AI + Design Studio Lesson",
    media: placeholderMedia("AI and Design Studio Lesson"),
    description:
      "Placeholder — students explored responsible AI prompts, user needs, and low-fidelity design concepts.",
    order: 2,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
    artifactLabel: "Exelon Summer Institute teaching artifact",
  },
  {
    id: "lesson-3",
    title: "Maker Safety & Prototyping Lab",
    media: placeholderMedia("Maker Safety and Prototyping Lab"),
    description:
      "Placeholder — a hands-on lesson covering safe tool use, iteration, and how to document a prototype process.",
    order: 3,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
    artifactLabel: "Exelon Summer Institute teaching artifact",
  },
];

export const designs = [
  {
    id: "design-1",
    title: "3D Printed Keychain Workshop",
    image: placeholder,
    media: placeholderMedia("3D Printed Keychain Workshop"),
    description:
      "Placeholder — students modeled a personal keychain in TinkerCAD and prepared it for classroom printing.",
    order: 1,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
  },
  {
    id: "design-2",
    title: "Arduino Line-Following Robot",
    image: placeholder,
    media: placeholderMedia("Arduino Line-Following Robot"),
    description:
      "Placeholder — teams assembled a small rover and tuned its sensors against a taped course.",
    order: 2,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
  },
  {
    id: "design-3",
    title: "Vinyl Sticker Vector Set",
    image: placeholder,
    media: placeholderMedia("Vinyl Sticker Vector Set"),
    description:
      "Placeholder — a lesson translating clean vector artwork into cut vinyl sticker sheets.",
    order: 3,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
  },
  {
    id: "design-4",
    title: "Carved Wood Nameplate",
    image: "/images/projects/3d-carving/nameplate-01-carved.jpg",
    media: [
      {
        type: "image",
        src: "/images/projects/3d-carving/nameplate-01-carved.jpg",
        alt: "Aspen wood nameplate on the carving machine bed with the name Daniela and leaf designs carved in",
      },
      {
        type: "image",
        src: "/images/projects/3d-carving/nameplate-02-clamped.jpg",
        alt: "Block of aspen wood clamped onto the bed of an X-Carve CNC carving machine before carving",
      },
      {
        type: "video",
        src: "/images/projects/3d-carving/nameplate-03-carving.mp4",
        poster: "/images/projects/3d-carving/nameplate-03-carving-poster.jpg",
        alt: "Video of the carving bit cutting the lettering into the wood nameplate",
      },
      {
        type: "image",
        src: "/images/projects/3d-carving/nameplate-04-setup.jpg",
        alt: "Makerspace workstation with the Easel design software open on the computer next to the carving machine",
      },
    ],
    description:
      "Placeholder — toolpaths, bit selection, and safe setup for carving a personalized wood nameplate.",
    order: 4,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
  },
];

export const documentDesigns = [
  {
    id: "document-design-1",
    title: "Organization Flyer Series",
    image: placeholder,
    media: placeholderMedia("Organization Flyer Series"),
    description:
      "Placeholder — a collection of event and outreach flyers designed for student organizations.",
    order: 1,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
  },
  {
    id: "document-design-2",
    title: "Document Design Class Assignments",
    image: placeholder,
    media: placeholderMedia("Document Design Class Assignments"),
    description:
      "Placeholder — editorial layouts and information-design exercises created for document design coursework.",
    order: 2,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
  },
];

export const photography = [
  {
    id: "photo-1",
    title: "Workshop Process Documentation",
    image: placeholder,
    media: placeholderMedia("Workshop Process Documentation"),
    description:
      "Placeholder — photos capturing students sketching, testing, and revising their maker projects.",
    order: 1,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
  },
  {
    id: "photo-2",
    title: "Chicago Texture Study",
    image: placeholder,
    media: placeholderMedia("Chicago Texture Study"),
    description:
      "Placeholder — architecture, trains, murals, and material details that inform Daniela's design eye.",
    order: 2,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
  },
  {
    id: "photo-3",
    title: "Student Showcase Moments",
    image: placeholder,
    media: placeholderMedia("Student Showcase Moments"),
    description:
      "Placeholder — final presentation moments from classroom demos and portfolio reviews.",
    order: 3,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
  },
];

export const designSections = [
  {
    id: "lessons",
    title: "Lessons",
    summary:
      "Teaching materials, classroom sequences, and proof of learning work from student programs.",
    entries: [...lessons].sort((a, b) => a.order - b.order),
  },
  {
    id: "physical-designs",
    title: "Physical Designs",
    summary:
      "A shift from software design to physical design — hands-on maker projects across 3D printing, robotics, vinyl cutting, and 3D carving.",
    entries: [...designs].sort((a, b) => a.order - b.order),
  },
  {
    id: "document-designs",
    title: "Document Designs",
    summary:
      "Organization flyers and document design class assignments focused on clear, purposeful visual communication.",
    entries: [...documentDesigns].sort((a, b) => a.order - b.order),
  },
  {
    id: "photography",
    title: "Photography",
    summary:
      "Documentation and visual studies from workshops, classrooms, Chicago, and Mexico.",
    entries: [...photography].sort((a, b) => a.order - b.order),
  },
];
