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
    title: "Layered Vinyl Jarrito Sticker",
    image: "/images/projects/vinyl-sticker/sticker-01-sketch.jpg",
    media: [
      {
        type: "image",
        src: "/images/projects/vinyl-sticker/sticker-01-sketch.jpg",
        alt: "Colored pencil sketch of a blue and tan jarrito sticker at 2 by 2 inches, broken into four numbered layers with a color key: brown/tan, light blue, dark blue and white",
        caption: "Sketch and layer plan: 2 × 2 in, four colors",
      },
      {
        type: "image",
        src: "/images/projects/vinyl-sticker/sticker-02-layers.png",
        alt: "The four sticker layers drawn as separate black shapes in the cutting software, on a grid",
        caption: "Each color layer separated for cutting",
      },
      {
        type: "image",
        src: "/images/projects/vinyl-sticker/sticker-03-assembled.jpg",
        alt: "The full jarrito sticker design assembled in color in the cutting software",
        caption: "Full design assembled digitally",
      },
      {
        type: "image",
        src: "/images/projects/vinyl-sticker/sticker-04-finished-photo.jpg",
        alt: "The finished layered vinyl jarrito sticker on its backing sheet, on a wooden table",
        caption: "Finished layered vinyl sticker",
      },
      {
        type: "image",
        src: "/images/projects/vinyl-sticker/sticker-05-finished-scan.jpg",
        alt: "Close-up scan of the finished sticker showing the blue rim, leaf pattern and sunburst band",
        caption: "Scan of the finished sticker",
      },
    ],
    description:
      "A self-directed project to teach myself the vinyl cutter and how to build layered stickers. I sketched a jarrito at 2 × 2 inches and planned it in four colors (brown/tan, light blue, dark blue and white), separated each color into its own cut layer in the cutting software, assembled the full design digitally, then cut and layered the vinyl by hand into the finished sticker.",
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
  {
    id: "design-5",
    title: "Laser-Cut Cat Earrings",
    image: "/images/projects/laser-earrings/earrings-00a-design-sitting-cat.png",
    media: [
      {
        type: "image",
        src: "/images/projects/laser-earrings/earrings-00a-design-sitting-cat.png",
        alt: "Adobe Illustrator design of the sitting-cat earrings, with red cut lines around the outline and black engraved details",
        caption: "Sitting cat design in Adobe Illustrator",
      },
      {
        type: "image",
        src: "/images/projects/laser-earrings/earrings-00b-design-hanging-cat.png",
        alt: "Adobe Illustrator design of the hanging-cat earrings, with red cut lines around the outline and black engraved details",
        caption: "Hanging cat design in Adobe Illustrator",
      },
      {
        type: "image",
        src: "/images/projects/laser-earrings/earrings-01-assembly.jpg",
        alt: "Workbench with pliers, earring hooks and laser-cut cat pieces laid out for assembly",
      },
      {
        type: "video",
        src: "/images/projects/laser-earrings/earrings-02-laser-engraving.mp4",
        poster: "/images/projects/laser-earrings/earrings-02-laser-engraving-poster.jpg",
        alt: "Video of the laser cutter engraving cat faces onto a sheet of wood",
      },
      {
        type: "video",
        src: "/images/projects/laser-earrings/earrings-03-laser-cutting.mp4",
        poster: "/images/projects/laser-earrings/earrings-03-laser-cutting-poster.jpg",
        alt: "Video of the laser cutter cutting out a cat earring shape from the wood sheet",
      },
      {
        type: "image",
        src: "/images/projects/laser-earrings/earrings-04-sitting-cat.jpg",
        alt: "A pair of laser-cut wooden sitting-cat earrings with engraved faces, on a white background",
      },
      {
        type: "image",
        src: "/images/projects/laser-earrings/earrings-05-hanging-cat.jpg",
        alt: "A pair of laser-cut wooden hanging-cat earrings with long curled tails",
      },
      {
        type: "image",
        src: "/images/projects/laser-earrings/earrings-06-packaged.jpg",
        alt: "Finished cat earring pairs packaged in small bags, ready to sell at the Makers Lab fundraiser",
      },
    ],
    description:
      "My introduction to laser cutting. I designed two cat earrings in Adobe Illustrator, a sitting cat and a hanging cat, then engraved the faces and cut the shapes on the laser cutter from 11.87″ × 11.75″ sheets of cherry, alder, walnut and Baltic birch. I assembled each pair with earring hooks, and the finished earrings were packaged and sold to raise money for the Makers Lab.",
    order: 5,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
  },
  {
    id: "design-7",
    title: "Laser-Cut Butterfly Earrings",
    image: "/images/projects/laser-butterflies/butterflies-01-design-cutout.png",
    media: [
      {
        type: "image",
        src: "/images/projects/laser-butterflies/butterflies-01-design-cutout.png",
        alt: "Adobe Illustrator design of a pair of butterflies with cut-out wing patterns, outlined in red cut lines",
        caption: "Butterfly design with cut-out wings in Adobe Illustrator",
      },
      {
        type: "image",
        src: "/images/projects/laser-butterflies/butterflies-02-design-solid.png",
        alt: "Adobe Illustrator design of a pair of solid butterfly shapes outlined in red cut lines",
        caption: "Solid butterfly design in Adobe Illustrator",
      },
      {
        type: "image",
        src: "/images/projects/laser-butterflies/butterflies-03-finished-pink-acrylic.jpg",
        alt: "Three small laser-cut pink acrylic butterflies strung on a wire, held in an open hand",
        caption: "Finished butterflies cut from pink acrylic",
      },
    ],
    description:
      "A second laser-cutting design for the Makers Lab fundraiser, made with the same process as the cat earrings but cut from pink acrylic instead of wood. I designed the butterflies in Adobe Illustrator, cut them on the laser cutter, and assembled them into earrings to sell for the fundraiser.",
    order: 6,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
  },
  {
    id: "design-8",
    title: "Lane Tech Clock Tower Keychains",
    image: "/images/projects/clock-tower-keychains/keychain-01-design.png",
    media: [
      {
        type: "image",
        src: "/images/projects/clock-tower-keychains/keychain-01-design.png",
        alt: "Adobe Illustrator design of a round keychain showing the Lane Tech clock tower with butterflies rising up the tower, with a red cut line around the edge",
        caption: "Keychain design in Adobe Illustrator",
      },
      {
        type: "video",
        src: "/images/projects/clock-tower-keychains/keychain-02-laser-cutting.mp4",
        poster: "/images/projects/clock-tower-keychains/keychain-02-laser-cutting-poster.jpg",
        alt: "Video of the laser cutter engraving and cutting the clock tower keychains from a sheet of wood",
        caption: "Engraving and cutting on the laser cutter",
      },
      {
        type: "image",
        src: "/images/projects/clock-tower-keychains/keychain-03-butterflies-cut-out.jpg",
        alt: "Finished wooden clock tower keychain with the butterflies cut all the way through the wood",
        caption: "Version 1: butterflies cut out",
      },
      {
        type: "image",
        src: "/images/projects/clock-tower-keychains/keychain-04-butterflies-etched.jpg",
        alt: "Finished wooden clock tower keychain with the butterflies etched into the surface",
        caption: "Version 2: butterflies etched",
      },
      {
        type: "image",
        src: "/images/projects/clock-tower-keychains/keychain-05-two-sizes.jpg",
        alt: "A large and a small clock tower keychain side by side, showing the two sizes",
        caption: "Two keychain sizes",
      },
    ],
    description:
      "My most advanced laser-cutting design: Lane Tech’s clock tower, with butterflies representing DACA rising up the tower. I designed it in Adobe Illustrator and cut it from 11.87″ × 11.75″ sheets of cherry, alder, walnut and Baltic birch in two sizes and two versions, one with the butterflies cut out and one with them etched. I made the keychains while teaching about DACA, and sold them to raise money for the DREAMers Fund, a scholarship that helps a student afford university.",
    order: 7,
    repoUrl: "#",
    liveUrl: "#",
    artifactUrl: "#",
  },
  {
    id: "design-6",
    title: "Laser-Cut Quote Box",
    image: "/images/projects/laser-quote-box/box-01-sketch-template.png",
    media: [
      {
        type: "image",
        src: "/images/projects/laser-quote-box/box-01-sketch-template.png",
        alt: "Blank box template sheet with outlines for the back, right, bottom, front, left and top panels",
        caption: "Task 1: Sketch",
      },
      {
        type: "image",
        src: "/images/projects/laser-quote-box/box-02-artboard-size.png",
        alt: "Adobe Illustrator artboard settings: 11.87 by 11.75 inches, no bleed",
        caption: "Task 2: Prototype & Design.",
      },
      {
        type: "image",
        src: "/images/projects/laser-quote-box/box-03-final-design.jpg",
        alt: "Final box design in Adobe Illustrator: an open book with a reading figure, leafy branches, an open window and a quote panel",
        caption: "Task 3: Automate final design",
      },
      {
        type: "image",
        src: "/images/projects/laser-quote-box/box-04-quote-original.png",
        alt: "Original vector outline of the quote “Books are a uniquely portable magic” with connected letters",
        caption: "Original Design",
      },
      {
        type: "image",
        src: "/images/projects/laser-quote-box/box-05-quote-cut.jpg",
        alt: "The laser-cut quote in wood, with thin and cut-off letters circled in red",
        caption: "Thin & cut off letters.",
      },
      {
        type: "image",
        src: "/images/projects/laser-quote-box/box-06-book-original.png",
        alt: "Original design of the open book panel with swirls and stars rising from the pages",
        caption: "Original Design",
      },
      {
        type: "image",
        src: "/images/projects/laser-quote-box/box-07-book-cut.jpg",
        alt: "The laser-cut book panel, with thin swirls that came out weak circled in red",
        caption: "Weak due to how thin the design came out.",
      },
    ],
    description:
      "A laser-cut wooden box designed from scratch in Adobe Illustrator, with a quote of connected letters on top: “Books are a uniquely portable magic.”",
    order: 8,
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
    summary: "Documentation and visual studies from workshops, classrooms, Chicago, and Mexico.",
    entries: [...photography].sort((a, b) => a.order - b.order),
  },
];
