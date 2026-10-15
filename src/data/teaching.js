/**
 * Single source of truth for teaching material (cards on /projects and pages at /teaching/:slug).
 * To add a new teaching page: append one object to `teaching`. Nothing else to edit.
 *
 * Media slots: leave `src` empty ("") to show a labeled placeholder frame until the real
 * photo or video is ready; `label` is what the placeholder says.
 */

const slot = (label, extra = {}) => ({ type: "image", src: "", alt: "", label, ...extra });

const placeholderLesson = (number, label) => ({
  id: `lesson-${number}`,
  label,
  title: `[Lesson ${number} title]`,
  dates: "[Dates]",
  body: "[What students built in this lesson and the one new idea it introduced.]",
  tags: ["[Skill]", "[Skill]"],
  note: "",
  media: [slot(`Lesson ${number} photo`), slot(`Lesson ${number} clip`, { type: "video" })],
});

export const teaching = [
  {
    slug: "coding-material",
    title: "Coding Material",
    summary: "[One-line summary of the coding lessons and who they were for.]",
    cardMeta: "[Program] · [Years]",
    year: "[Years]",
    role: "[Role]",
    audience: "[Audience]",
    tools: ["[Tool]", "[Tool]"],
    cover: slot("Hero · coding cover"),
    main: true,
    order: 1,
    context: {
      body: "[Who you taught, for how long, and how the lessons were structured.]",
      media: slot("Context image"),
      caption: "[Caption]",
    },
    approach: [
      { lead: "[Principle one.]", body: "[Why it matters for students.]" },
      { lead: "[Principle two.]", body: "[Why it matters for students.]" },
      { lead: "[Principle three.]", body: "[Why it matters for students.]" },
    ],
    lessons: [1, 2, 3, 4].map((n) => placeholderLesson(n, `[Lesson ${n}]`)),
    outcome: {
      body: "[What came out of the lessons overall.]",
      extras: [slot("Extra 1"), slot("Extra 2"), slot("Extra 3"), slot("Extra 4")],
      change: "[One thing you would do differently next time.]",
    },
  },
  {
    slug: "design-material",
    title: "Design Material",
    summary: "[One-line summary of the design lessons and who they were for.]",
    cardMeta: "[Program] · [Years]",
    year: "[Years]",
    role: "[Role]",
    audience: "[Audience]",
    tools: ["[Tool]", "[Tool]"],
    cover: slot("Hero · design cover"),
    main: true,
    order: 2,
    context: {
      body: "[Who you taught, for how long, and how the lessons were structured.]",
      media: slot("Context image"),
      caption: "[Caption]",
    },
    approach: [
      { lead: "[Principle one.]", body: "[Why it matters for students.]" },
      { lead: "[Principle two.]", body: "[Why it matters for students.]" },
      { lead: "[Principle three.]", body: "[Why it matters for students.]" },
    ],
    lessons: [1, 2, 3, 4].map((n) => placeholderLesson(n, `[Lesson ${n}]`)),
    outcome: {
      body: "[What came out of the lessons overall.]",
      extras: [slot("Extra 1"), slot("Extra 2"), slot("Extra 3"), slot("Extra 4")],
      change: "[One thing you would do differently next time.]",
    },
  },
  {
    slug: "circuits-material",
    title: "Circuits Material",
    summary:
      "Simulate first, then build: teaching incoming college students to design a circuit before they wire it.",
    cardMeta: "Instructor · 2022–2023",
    year: "2022 – 2023",
    role: "Instructor",
    audience: "Incoming college students",
    tools: ["Tinkercad", "Arduino UNO"],
    cover: slot("Hero · overview-hero-elevator.jpg", {
      note: "Full-width cover, same as the Projects card",
    }),
    main: true,
    order: 3,
    context: {
      body: "I taught introductory circuits to incoming college students. Over seven months, the lessons grew from lighting a single LED to motors, sensors and a model elevator. Every circuit started in Tinkercad: students designed and simulated it there before wiring it on a breadboard.",
      media: slot("tinkercad-blink-sim.jpg"),
      caption: "Tinkercad simulation from the lesson.",
    },
    approach: [
      {
        lead: "Simulate before you build.",
        body: "A mistake in Tinkercad costs nothing, so students arrive at the breadboard already knowing what should happen.",
      },
      {
        lead: "Change one thing at a time.",
        body: "Each lesson adds one new part to a circuit students already understand: LEDs, then buttons, then a knob.",
      },
      {
        lead: "Make the invisible visible.",
        body: "Current and code can't be seen, so we print what the board is reading to the Serial Monitor and watch the numbers move.",
      },
    ],
    lessons: [
      {
        id: "lesson-1",
        label: "Traffic light",
        title: "A traffic light in three LEDs",
        dates: "Oct – Dec 2022",
        body: "Three LEDs, each with its own resistor and pin, programmed to step green → yellow → red. Later, the same circuit took commands typed into the Serial Monitor.",
        tags: ["Digital output", "Serial input"],
        note: "Same wires, new program. The circuit doesn't change, only the conversation with it does.",
        media: [
          slot("traffic-hero.jpg", { note: "Three LEDs glowing in a dark room" }),
          slot("Silent clip · traffic-sequence.mp4", { type: "video", note: "Muted, loops" }),
        ],
      },
      placeholderLesson(2, "Buttons and knobs"),
      placeholderLesson(3, "Stepper challenge"),
      placeholderLesson(4, "Distance in color"),
      placeholderLesson(5, "Servos + joystick"),
      placeholderLesson(6, "IR remote"),
    ],
    outcome: {
      body: "Seven months of lessons, documented in more than 170 photos and videos. Six lessons are shown here with the working circuit on camera.",
      extrasLabel: "Also built along the way",
      extras: [
        slot("battery-led.jpg", { caption: "Battery LED" }),
        slot("fan-spinning.jpg", { caption: "DC motor fan" }),
        slot("photoresistors.jpg", { caption: "Photoresistors" }),
        slot("elevator-driver.jpg", { caption: "Elevator build" }),
      ],
      change:
        "I photographed every build but didn't always film the finished result. Next time, I'd end every lesson with a ten-second clip of the circuit working.",
    },
  },
  {
    slug: "ai-workshop",
    title: "AI Workshop",
    summary: "[One-line summary of the AI workshop and who it was for.]",
    cardMeta: "[Program] · [Year]",
    year: "[Year]",
    role: "[Role]",
    audience: "[Audience]",
    tools: ["[Tool]", "[Tool]"],
    cover: slot("Hero · AI workshop cover"),
    main: false,
    order: 4,
    context: {
      body: "[Who you taught, for how long, and how the workshop was structured.]",
      media: slot("Context image"),
      caption: "[Caption]",
    },
    approach: [
      { lead: "[Principle one.]", body: "[Why it matters for students.]" },
      { lead: "[Principle two.]", body: "[Why it matters for students.]" },
      { lead: "[Principle three.]", body: "[Why it matters for students.]" },
    ],
    lessons: [1, 2, 3].map((n) => placeholderLesson(n, `[Activity ${n}]`)),
    outcome: {
      body: "[What came out of the workshop.]",
      extras: [slot("Extra 1"), slot("Extra 2"), slot("Extra 3"), slot("Extra 4")],
      change: "[One thing you would do differently next time.]",
    },
  },
];

export const sortedTeaching = [...teaching].sort((a, b) => a.order - b.order);

export function getTeachingBySlug(slug) {
  return teaching.find((entry) => entry.slug === slug);
}
