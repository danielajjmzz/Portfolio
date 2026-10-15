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
