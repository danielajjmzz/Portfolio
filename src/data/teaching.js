/**
 * Single source of truth for teaching material (cards on /projects and pages at /teaching/:slug).
 * To add a new teaching page: append one object to `teaching`. Nothing else to edit.
 *
 * Media slots: leave `src` empty ("") to show a labeled placeholder frame until the real
 * photo or video is ready; `label` is what the placeholder says.
 */

const slot = (label, extra = {}) => ({ type: "image", src: "", alt: "", label, ...extra });

const CIRCUITS = "/images/teaching/circuits";
const img = (file, alt, extra = {}) => ({
  type: "image",
  src: `${CIRCUITS}/${file}`,
  alt,
  label: file,
  ...extra,
});
/** Silent clip: the .mp4 files have no audio track, and MediaFrame also renders them muted. */
const clip = (file, poster, alt) => ({
  type: "video",
  src: `${CIRCUITS}/${file}`,
  poster: `${CIRCUITS}/${poster}`,
  alt,
  label: file,
});

const AI = "/images/teaching/ai-workshop";
const slide = (file, alt, extra = {}) => ({
  type: "image",
  src: `${AI}/${file}`,
  alt,
  label: file,
  ...extra,
});

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
    title: "Intro to Circuits & Arduino",
    summary:
      "Seven months of simulate-first circuit projects for the Exelon Summer Institute, so every incoming Illinois Tech freshman had a next build that matched their pace and interests.",
    cardMeta: "Exelon Summer Institute · Instructor",
    year: "2022 – 2023",
    role: "Instructor",
    audience: "Incoming Illinois Tech freshmen",
    tools: ["Tinkercad Circuits", "Arduino UNO", "Arduino IDE", "Serial Monitor"],
    cover: img(
      "inputs-hero.jpg",
      "A breadboard with green, yellow and red LEDs all lit, a hand at the black potentiometer knob, two push buttons on the right and jumpers running to an Arduino.",
    ),
    main: true,
    order: 3,
    context: {
      body: "The Exelon Summer Institute runs for four weeks every summer for incoming Illinois Tech freshmen. Students arrive with very different experience and interests: some have never touched a breadboard, others are ready for motors and sensors in week one. So I built more than seven months of circuit projects, from lighting a single LED to a model elevator. Everyone works through the core lessons, and students who move faster always have a more advanced project waiting in the area they care about. Every circuit starts in Tinkercad: students design and simulate it there before wiring it on a breadboard.",
      media: img(
        "overview-tinkercad-blink-sim.jpg",
        "A Tinkercad Circuits screen running a simulation of an Arduino Uno with one LED and resistor, next to the Blink sketch that switches the LED on and off.",
      ),
      caption: "Tinkercad simulation from the first lesson.",
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
      {
        lead: "Always have a next build.",
        body: "The program is four weeks, but the material runs seven months deep. A student who finishes early picks the next project in their interest instead of waiting.",
      },
    ],
    lessons: [
      {
        id: "lesson-1",
        label: "Traffic light",
        title: "A traffic light in three LEDs",
        dates: "Oct – Dec 2022",
        body: "The first lesson where code meets hardware. Three LEDs, each with its own resistor and digital pin, step green → yellow → red with timed pauses. Color-coded jumpers make the circuit readable at a glance. As an extension, the same circuit takes commands typed into the Serial Monitor: G, Y or R switches a light, O turns all on, X turns all off.",
        tags: ["Digital output", "Sequencing and timing", "Serial input"],
        note: "Same wires, new program. The circuit doesn't change, only the conversation with it does.",
        media: [
          img(
            "traffic-hero.jpg",
            "In a darkened room, green, yellow and red LEDs glow in a column on a breadboard, each wired through a resistor to an Arduino board.",
          ),
          clip(
            "traffic-sequence.mp4",
            "traffic-sequence.jpg",
            "The traffic-light circuit stepping through green, yellow and red.",
          ),
          img(
            "traffic-closeup.jpg",
            "Eye-level close-up of green, yellow and red LEDs in a breadboard, each with a small blue resistor and a matching colored jumper wire.",
          ),
          img(
            "traffic-serial-menu.jpg",
            "A Serial Monitor showing the G, Y, R, O and X command menu, followed by replies such as 'Green LED is ON' and 'All LEDs are OFF'.",
          ),
        ],
      },
      {
        id: "lesson-2",
        label: "Buttons and knobs",
        title: "Giving the circuit a sense of touch",
        dates: "Nov – Dec 2022",
        body: "Same three LEDs, new question: how does the board know what you want? First two push buttons, each with its own resistor, decide which LED lights. Then a potentiometer outputs any voltage between 0 and 5 volts, so turning the knob changes the LEDs gradually instead of just on and off.",
        tags: ["Digital input", "Pull-down resistors", "Analog input"],
        note: "Buttons answer yes or no. The knob answers 'how much', and that's the jump from digital to analog.",
        media: [
          img(
            "inputs-button-press.jpg",
            "A finger pressing one of two push buttons on a breadboard while the red LED in a row of three lights up.",
          ),
          clip(
            "inputs-knob.mp4",
            "inputs-header-wiring.jpg",
            "Turning the potentiometer knob to change the LEDs.",
          ),
          img(
            "inputs-button-layout.jpg",
            "Eye-level view of the button circuit: three LEDs on the left and two tactile push buttons on the right, each with a resistor.",
          ),
          img(
            "inputs-header-wiring.jpg",
            "Close-up of jumper wires plugged into the Arduino's pin headers, showing which pin each LED, button and the potentiometer connects to.",
          ),
        ],
      },
      {
        id: "lesson-3",
        label: "Stepper challenge",
        title: "The stepper motor design challenge",
        dates: "Jan 2023",
        body: "First, get a stepper motor turning through a driver board. Then a spec instead of instructions: motor off with no buttons pressed, 360° clockwise on LEFT, 720° counterclockwise on RIGHT. Students rewrite the sketch, add the two buttons, and prove it works by watching where the shaft stops.",
        tags: ["Motor drivers", "Requirements to design", "Testing against a spec"],
        note: "360 and 720 aren't random. They force you to work out how many steps make one full turn.",
        media: [
          img(
            "stepper-challenge-slide.jpg",
            "A lesson slide titled 'Stepper motor control design challenge' listing the three required behaviors.",
          ),
          clip(
            "stepper-demo.mp4",
            "stepper-demo.jpg",
            "A finger pressing a breadboard button while the stepper motor turns.",
          ),
          img(
            "stepper-hero.jpg",
            "The stepper setup: a blue stepper motor wired to a driver board, an Arduino on USB, a breadboard with a power module, and a 9V battery.",
          ),
          img(
            "stepper-buttons.jpg",
            "Close-up of two tactile push buttons on a breadboard, each with a resistor and red and brown jumper wires.",
          ),
        ],
      },
      {
        id: "lesson-4",
        label: "Distance in color",
        title: "Seeing distance in color",
        dates: "Jan – Feb 2023",
        body: "An ultrasonic sensor sends out a pulse and times the echo; half that time, multiplied by the speed of sound, is the distance. The program compares it to set limits and lights a color-changing LED blue, green or red. A hand moving closer is the test object.",
        tags: ["Time-of-flight sensing", "Thresholds", "Conditional output"],
        note: "It's the same trick bats use, which is an easy way to start the explanation.",
        media: [
          img(
            "ultrasonic-hero.jpg",
            "Top-down view of a breadboard where a color-changing LED glows green, with an ultrasonic distance sensor at the other end, wired to an Arduino.",
          ),
          clip(
            "ultrasonic-demo.mp4",
            "ultrasonic-blue.jpg",
            "The LED changing color as a hand moves toward the sensor.",
          ),
          img(
            "ultrasonic-sensor.jpg",
            "Close-up of an ultrasonic distance sensor, with its two round transducers, plugged into a breadboard.",
          ),
          img(
            "ultrasonic-red.jpg",
            "The color-changing LED glowing red while a hand is held in front of the sensor.",
          ),
        ],
      },
      {
        id: "lesson-5",
        label: "Servos + joystick",
        title: "From one servo to a joystick-driven pair",
        dates: "Feb – Apr 2023",
        body: "It starts with one micro servo: three wires, and the code sets an angle the horn swings to. Then a joystick, two knobs in one, drives a pair of larger servos on their own power supply. A second program reads single letters from the Serial Monitor and sends both servos a pulse width: 1500 microseconds means stop, 1300 means reverse.",
        tags: ["Servo control (PWM)", "Analog input to motion", "Serial commands"],
        note: "It's the potentiometer from lesson two again, now in two directions at once.",
        media: [
          img(
            "servo-hero.jpg",
            "A hand tilting a joystick module while two servo motors respond, with an Arduino, a breadboard power module and a 9V battery in frame.",
          ),
          clip(
            "servo-joystick.mp4",
            "servo-joystick-setup.jpg",
            "Tilting the joystick to steer both servos.",
          ),
          img(
            "servo-micro-a.jpg",
            "A small blue servo held in hand, wired to an Arduino, with its white horn at one position.",
          ),
          img(
            "servo-code.jpg",
            "Arduino code where an 's' case sets both servos to 1500 microseconds and prints 'Stop - 1500', with the Serial Monitor menu below.",
          ),
        ],
      },
      {
        id: "lesson-6",
        label: "IR remote",
        title: "Cracking the remote control",
        dates: "Mar 2023",
        body: "Every remote button flashes its own invisible pattern of infrared light. Students wire a receiver, decode each press with the IRremote library, and watch the command and raw hex data appear in the Serial Monitor. A worksheet turns those signals into a reference table: the code behind Power, VOL+, FUNC/STOP and the rest.",
        tags: ["Using a library", "Reading protocol data", "Documentation"],
        note: "Once you know the codes, any button can control anything.",
        media: [
          img(
            "ir-hero.jpg",
            "A hand holding a small infrared receiver module wired to an Arduino, with a black ELEGOO remote control beside it.",
          ),
          clip(
            "ir-decoding.mp4",
            "ir-serial-output.jpg",
            "Remote presses appearing as decoded commands in the Serial Monitor.",
          ),
          img(
            "ir-code.jpg",
            "Arduino code showing a loop that checks IrReceiver.decode() and calls IrReceiver.resume() after each press.",
          ),
          img(
            "ir-worksheet.jpg",
            "A worksheet titled 'Fill out the table below for the Elegoo Remote', pairing button names like Power and VOL+ with their hex codes.",
          ),
        ],
      },
    ],
    outcome: {
      body: "More than seven months of projects for a four-week program, documented in over 170 photos and videos. The six lessons above are the core path; the builds below are where faster students went next, ending with a model elevator that combined buttons, a motor driver and a distance sensor in one structure.",
      extrasLabel: "Also built along the way",
      extras: [
        img(
          "overview-battery-led.jpg",
          "A 9V battery plugged into a breadboard power module, powering a single lit red LED.",
          { caption: "Battery LED" },
        ),
        img(
          "overview-fan-spinning.jpg",
          "A finger pressing an input on a breadboard while a small DC motor's propeller blurs as it spins.",
          { caption: "DC motor fan" },
        ),
        img(
          "overview-photoresistors.jpg",
          "Two photoresistors on a breadboard, each with a resistor, wired to an Arduino.",
          { caption: "Photoresistors" },
        ),
        img(
          "overview-hero-elevator.jpg",
          "A two-level model elevator made of cardboard platforms on wooden dowels, with an Arduino, breadboard and ultrasonic sensor mounted on it.",
          { caption: "Elevator build" },
        ),
      ],
      change:
        "I photographed every build but didn't always film the finished result. The elevator was never captured running. Next time, I'd end every lesson with a ten-second clip of the circuit working.",
    },
  },
  {
    slug: "ai-workshop",
    title: "STEM + AI Workshop",
    summary:
      "A one-hour interactive workshop introducing incoming Illinois Tech STEM students to generative AI: what it is, how to prompt it, where it goes wrong, and how to use it ethically.",
    cardMeta: "Exelon Summer Institute · 2026",
    year: "Summer 2026",
    role: "Workshop designer & facilitator",
    audience: "21 incoming STEM freshmen",
    tools: ["PowerPoint", "Word", "NotebookLM"],
    cover: {
      type: "video",
      sound: true,
      src: `${AI}/stem-ai-recap.mp4`,
      poster: `${AI}/video-poster.jpg`,
      alt: "STEM + AI: Modern AI Landscape, a recap video of the workshop made with NotebookLM.",
      label: "stem-ai-recap.mp4",
    },
    main: false,
    order: 4,
    context: {
      body: "A one-day, 60-minute workshop for the Exelon Summer Institute, built for 21 incoming STEM freshmen at Illinois Tech. Almost everyone had used a generative AI tool, but few knew how it works, where it fails, or what responsible use looks like. I designed the slides and a full facilitator guide adapted from Illinois Tech's IPRO 497 Innovating with AI course, then made the video above with NotebookLM: a recap under ten minutes for students who missed the session and for everyone to keep for review.",
      media: slide(
        "guide-agenda.jpg",
        "The workshop agenda from the facilitator guide: fifteen timed sections from the Creative Tensions icebreaker at 0:00 to resources and closing at 0:57, each with a duration and format.",
      ),
      caption: "The minute-by-minute agenda from my facilitator guide.",
    },
    approach: [
      {
        lead: "Get students moving first.",
        body: "The workshop opens with a Creative Tensions exercise: students physically walk to one side of the room to show whether AI excites or terrifies them, then explain why.",
      },
      {
        lead: "Talk less than half the time.",
        body: "About 27 of the 60 minutes are interactive: a prompt-rewriting challenge, a small-group ethics scenario, quiet reflection and a closing poll.",
      },
      {
        lead: "Every claim has a source.",
        body: "Each definition, statistic and tool recommendation traces back to the course materials, tagged in the facilitator guide so nothing is made up.",
      },
      {
        lead: "Practice without shortcuts.",
        body: "Every prompting exercise uses a non-academic topic the student cares about, and the message throughout is to follow each instructor's AI policy.",
      },
    ],
    lessonsLabel: "Workshop",
    lessonItemLabel: "Part",
    lessonsIntro: "Six parts in 60 minutes. Pick one to see the slides.",
    lessonMediaAspect: "wide",
    lessons: [
      {
        id: "part-1",
        label: "Where do you stand?",
        title: "Creative Tensions icebreaker",
        dates: "0:00 – 0:07",
        body: 'I read statements with two sides, like "AI will create more jobs than it eliminates" versus "AI will eliminate more jobs", and students moved left, right or to the middle to show where they stood. Two or three explained their position, then we set the four goals for the hour: AI literacy, prompting skills, critical awareness and ethical thinking.',
        tags: ["Movement activity", "Learning goals"],
        note: "Remember where you stood. We come back to it at the end.",
        media: [
          slide(
            "slide-02.jpg",
            "Slide: Where Do You Stand? A Creative Tensions icebreaker, with how it works on the left and three opposing statements on the right.",
          ),
          slide(
            "slide-03.jpg",
            "Slide: What You'll Walk Away With Today, listing AI literacy, prompting skills, critical awareness and ethical thinking.",
          ),
        ],
      },
      {
        id: "part-2",
        label: "What AI is",
        title: "Predictive vs. generative AI",
        dates: "0:07 – 0:18",
        body: "AI splits into two domains: predictive AI forecasts from past patterns, like a weather app, and generative AI creates new text, code, images and audio. A show-of-hands poll checked who had used it, then four reasons why generative AI is different from every earlier technology, and who is building it, including the jagged frontier of what it does well and badly.",
        tags: ["AI literacy", "Show-of-hands poll"],
        note: "No one is an expert at this yet, not even the people who build it.",
        media: [
          slide(
            "slide-04.jpg",
            "Slide: What Is Artificial Intelligence? comparing predictive AI and generative AI side by side.",
          ),
          slide(
            "slide-05.jpg",
            "Slide: Why Is Generative AI a Big Deal? Four numbered reasons: different every time, no experts exist, democratizes technology, accelerating pace.",
          ),
          slide(
            "slide-06.jpg",
            "Slide: Who's Building Generative AI? Frontier labs versus tool companies, the jagged frontier, and free ways for students to access AI tools.",
          ),
        ],
      },
      {
        id: "part-3",
        label: "Prompting",
        title: "The art of talking to AI",
        dates: "0:18 – 0:28",
        body: 'Generative AI starts every conversation from zero, so the student\'s job is to be a good manager: research and collect context first, then execute. Four techniques (role and goal, examples, clear instructions, pointed feedback) went straight into a Think-Pair-Share challenge to rewrite the weak prompt "Tell me about renewable energy" about a topic they cared about.',
        tags: ["Prompt engineering", "Think-Pair-Share"],
        note: "The best prompts give the AI a role, your context, and one specific task.",
        media: [
          slide(
            "slide-07.jpg",
            "Slide: The Art of Talking to AI, with the 50 First Dates analogy, the 2-Step Dance, and four prompting techniques.",
          ),
          slide(
            "slide-08.jpg",
            "Slide: Think, Pair, Share prompt practice challenge, showing the weak prompt and the timed steps.",
          ),
        ],
      },
      {
        id: "part-4",
        label: "Limits & ethics",
        title: "When AI gets it wrong",
        dates: "0:28 – 0:43",
        body: "Hallucinations (confident, invented facts) and sycophancy (agreeing with you when you're wrong), each with a fix: ask it to cite and double-check, and invite disagreement. Then three layers of ethics: creation, operation and application. Small groups applied them to a scenario where an AI-written ad shipped with a fabricated statistic and an image trained on copyrighted art.",
        tags: ["Critical awareness", "Small-group discussion"],
        note: "Guardrails, not guidelines.",
        media: [
          slide(
            "slide-09.jpg",
            "Slide: When AI Gets It Wrong, explaining hallucinations and sycophancy and the fix for each.",
          ),
          slide(
            "slide-10.jpg",
            "Slide: Ethics and Governance, three numbered layers: creation, operation and application.",
          ),
          slide(
            "slide-11.jpg",
            "Slide: Scenario Discussion, a company's AI-generated marketing content with four questions for groups of three or four.",
          ),
        ],
      },
      {
        id: "part-5",
        label: "Careers",
        title: "Building your GenAI portfolio",
        dates: "0:43 – 0:48",
        body: "Hiring is shifting from credentials to skills. I shared what hiring managers say they want to see, the idea of Transparent Mastery (pairing AI with your own expertise to make something valuable), and what that looks like for CS majors, non-CS majors and everyone.",
        tags: ["Career readiness"],
        note: "",
        media: [
          slide(
            "slide-12.jpg",
            "Slide: Building Your GenAI Portfolio, with hiring manager quotes, Transparent Mastery, and skills for CS majors, non-CS majors and everyone.",
          ),
        ],
      },
      {
        id: "part-6",
        label: "Reflect & close",
        title: "Where do you stand now?",
        dates: "0:48 – 1:00",
        body: 'Two minutes of quiet writing: what surprised you most, and one ethical question to keep thinking about. Then the opening question again, "Personally, I am ___ by generative AI", with hands up for anyone whose position shifted, and five takeaways to leave with.',
        tags: ["Reflection", "Closing poll"],
        note: "You're not behind. You're right on time.",
        media: [
          slide(
            "slide-14.jpg",
            "Slide: Where Do You Stand NOW? revisiting the opening question on a spectrum from excited to terrified.",
          ),
          slide(
            "slide-13.jpg",
            "Slide: Personal Reflection, two minutes of quiet writing with two prompts.",
          ),
          slide(
            "slide-15.jpg",
            "Slide: Key Takeaways, five numbered points summarizing the workshop.",
          ),
        ],
      },
    ],
    outcome: {
      body: "A complete, one-hour workshop that anyone could run from the slides and guide alone, plus a ten-minute recap video so students who missed it could catch up. The facilitator guide includes the full script, activity instructions and a printed handout for all 21 students.",
      extrasLabel: "From the facilitator guide",
      extras: [
        slide(
          "guide-cover.jpg",
          "Cover of the facilitator guide: STEM + AI, Understanding the Modern AI Landscape, complete facilitator guide.",
          { caption: "Guide cover" },
        ),
        slide(
          "guide-script.jpg",
          "The opening of the facilitator script, with a source tag, setup notes and what to say for the icebreaker.",
          { caption: "Script with source tags" },
        ),
        slide(
          "guide-activities.jpg",
          "Activity instructions for the icebreaker and the Think-Pair-Share prompt practice.",
          { caption: "Activity instructions" },
        ),
        slide(
          "guide-handout.jpg",
          "The student handout summarizing generative AI, the 2-Step Dance, when AI gets it wrong, and three layers of ethics.",
          { caption: "Student handout" },
        ),
      ],
      change:
        "I asked students to raise their hand if their position shifted, but I didn't record where they stood. Next time, I'd tally both rounds of the Where do you stand? question so the change is measurable.",
    },
  },
];

export const sortedTeaching = [...teaching].sort((a, b) => a.order - b.order);

export function getTeachingBySlug(slug) {
  return teaching.find((entry) => entry.slug === slug);
}
