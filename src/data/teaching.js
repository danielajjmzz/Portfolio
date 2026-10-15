/**
 * Single source of truth for teaching material (cards on /projects and pages at /teaching/:slug).
 * To add a new teaching page: append one object to `teaching`. Nothing else to edit.
 *
 * Media: leave `src` empty ("") to show a labeled placeholder frame until the real
 * photo or video is ready; `label` is what the placeholder says.
 */

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

const CD = "/images/teaching/coding";
const cd = (file, alt, extra = {}) => ({
  type: "image",
  src: `${CD}/${file}`,
  alt,
  label: file,
  ...extra,
});
const DP = "/images/teaching/design-principles";
const PF = "/images/teaching/portfolio";
const dp = (file, alt, extra = {}) => ({
  type: "image",
  src: `${DP}/${file}`,
  alt,
  label: file,
  ...extra,
});
const pf = (file, alt, extra = {}) => ({
  type: "image",
  src: `${PF}/${file}`,
  alt,
  label: file,
  ...extra,
});
const AI = "/images/teaching/ai-workshop";
const slide = (file, alt, extra = {}) => ({
  type: "image",
  src: `${AI}/${file}`,
  alt,
  label: file,
  ...extra,
});

export const teaching = [
  {
    slug: "coding-material",
    title: "Intro to Python Programming",
    summary:
      "Four days that took incoming Illinois Tech freshmen from saving a file and opening a terminal to writing their own Python functions and if/else logic.",
    cardMeta: "Exelon Summer Institute · 2026",
    year: "Summer 2026",
    role: "CS Lead",
    audience: "Incoming Illinois Tech freshmen",
    tools: ["Python", "VS Code", "Terminal", "Google Classroom"],
    cover: cd(
      "slide-41.jpg",
      "Lecture slide: writing a new function, with the function name, parameters, rule and indentation labeled on the code, and its expected outputs.",
    ),
    main: true,
    order: 1,
    context: {
      body: "Week 2 of the Exelon Summer Institute was the coding foundation for incoming Illinois Tech freshmen, most of whom had never written a program. Before any Python, they needed to be comfortable with their own computer: saving files, unzipping a folder, using the terminal. Then, one idea a day: variables, functions, and if/else logic. I wrote the slides, fifteen practice files, a step-by-step computer skills guide, and a teacher's guide with speaker notes, timing and answer keys for the two TAs.",
      media: cd(
        "syllabus-week2.jpg",
        "The Week 2 schedule from the course syllabus: AI workshop, setup and intro to variables, variables and data types, functions, and if/else statements.",
      ),
      caption: "Week 2 at a glance, from the course syllabus.",
    },
    approach: [
      {
        lead: "= means SET, not equals.",
        body: 'The single most important idea of the week. x = x + 5 looks impossible in algebra, so we read every = out loud as "set to" until it sticks.',
      },
      {
        lead: "Read code like a computer.",
        body: "One line at a time, top to bottom. Every practice file is solved by tracing the value of each variable after each line.",
      },
      {
        lead: "Use it before you build it.",
        body: "Students call built-in functions as black boxes, judging them only by input and output, before writing a function of their own.",
      },
      {
        lead: "Practice right after every idea.",
        body: "Each concept is followed by a numbered practice file with a time estimate and difficulty level, and TAs coach students to explain their thinking instead of handing out answers.",
      },
    ],
    lessonMediaAspect: "wide",
    lessons: [
      {
        id: "computer-skills",
        label: "Computer skills",
        title: "Computer skills first",
        dates: "Day 10 · Tue Jul 14",
        body: "Before writing a line of code, everyone practiced the basics they would need all summer: screenshots, saving from the browser, zipping and unzipping files, flash drives, navigating the file system in the terminal, and installing Python and VS Code. A checklist and a step-by-step guide for both Windows and Mac walked them through it.",
        tags: ["Terminal", "File system", "Setup"],
        note: "",
        media: [
          cd(
            "slide-09.jpg",
            "Slide: Topics covered, from screenshots and file compression to installing Python and VS Code and running a Python script.",
          ),
          cd(
            "computer-skills-checklist.jpg",
            "Page 1 of the Computer Skills Checklist assignment.",
            { fit: "contain" },
          ),
        ],
      },
      {
        id: "variables",
        label: "Variables",
        title: "Variables and expressions",
        dates: "Day 11 · Wed Jul 15",
        body: "A variable has two parts, a name and a value, just like the variables students tracked in a science lab. We named a car's speed, created variables in code, traced a short program line by line, and combined values with operators into expressions.",
        tags: ["Variables", "Integers", "Operators", "Expressions"],
        note: "The equal sign is not the EQUAL operator, it is the SET operator.",
        media: [
          cd(
            "slide-14.jpg",
            "Slide: Variables, initialization, possible names for a car's speed and the rule that = is the SET operator.",
          ),
          cd(
            "slide-12.jpg",
            "Slide: Variables, parts of a variable, a name and a value, compared to variables in a science lab.",
          ),
          cd(
            "slide-15.jpg",
            "Slide: Reading code like a computer, one line at a time from top to bottom, ignoring comments.",
          ),
          cd(
            "slide-17.jpg",
            "Slide: Variables, operators, add, subtract, multiply, divide, mod and parentheses.",
          ),
          cd(
            "slide-18.jpg",
            "Slide: Variables, initialization and expressions, setting a variable to the value of an expression.",
          ),
        ],
      },
      {
        id: "set-operator",
        label: "SET operator",
        title: "Updating a variable",
        dates: "Day 11 · Wed Jul 15",
        body: "When you set a variable to a new value, the old one is gone. So how do you add 20 to a speed you already have? speed = speed + 20: the right side is calculated first with the old value, then stored back, just like updating a lab data sheet. The day ended with the longest practice, 03_SetOP.py.",
        tags: ["SET operator", "Tracing"],
        note: "Right side first, then SET.",
        media: [
          cd(
            "slide-22.jpg",
            "Slide: Updating a variable should be like updating a variable in a lab data sheet.",
          ),
          cd(
            "slide-20.jpg",
            "Slide: SET operator behavior, a new value replaces the old one, which is lost.",
          ),
          cd(
            "code-setop-wide.jpg",
            "The practice file 03_SetOP.py in Python: questions that update a variable several times and ask for its final value.",
          ),
          cd(
            "slide-23.jpg",
            "Practice slide: Set operator and summary, 03_SetOP.py, individual with group, 20 to 30 minutes.",
          ),
        ],
      },
      {
        id: "functions",
        label: "Functions",
        title: "Calling functions",
        dates: "Day 12 · Thu Jul 16",
        body: "Functions in code work a lot like f(x) in math: an input, a rule, and maybe an output. Students called min, max, abs, pow and print as black boxes, predicted each result, and learned the difference between a function that returns a value and one that only prints. Then they passed variables in as arguments and used function results inside expressions.",
        tags: ["Function calls", "Arguments", "Return values"],
        note: "If a function has an output, store it somewhere if you want to use it.",
        media: [
          cd(
            "slide-25.jpg",
            "Slide: Functions, comparing math functions and CS functions with an input, rule and output diagram.",
          ),
          cd(
            "slide-26.jpg",
            "Slide: Calling functions in code, the name followed by arguments in parentheses.",
          ),
          cd(
            "slide-27.jpg",
            "Slide: Black box practice, given inputs 5 and 10 and an expected output of 5, which function is it?",
          ),
          cd(
            "slide-33.jpg",
            "Slide: Functions and variables, using variables instead of literal values as arguments.",
          ),
          cd(
            "slide-35.jpg",
            "Slide: Expressions and functions, with the order of operations including function calls.",
          ),
        ],
      },
      {
        id: "writing-functions",
        label: "Writing functions",
        title: "Writing your own function",
        dates: "Day 12 · Thu Jul 16",
        body: "We turned a math problem into code: given two angles of a triangle, find the third. Name the function, choose its parameters, write the rule, indent it, and predict the output before running it. Students then wrote their own, ending with a distance formula and a compound interest calculator.",
        tags: ["Parameters", "Return", "Problem solving"],
        note: "What job does this function do? What does it need? What does it give back?",
        media: [
          cd(
            "slide-40.jpg",
            "Slide: Demo writing a new function, the goal, name and parameters for missingAngle.",
          ),
          cd(
            "slide-41.jpg",
            "Slide: Demo writing a new function, the code with its name, parameters, rule and indentation labeled.",
          ),
          cd(
            "code-missing-angle-wide.jpg",
            "The demo file 05_WritingFunctionsEX.py: the missingAngle function and four calls to it.",
          ),
          cd(
            "slide-45.jpg",
            "Slide: Practice instructions, a distance formula and a future value formula to implement.",
          ),
          cd(
            "code-complex-functions-wide.jpg",
            "The practice file 07_WritingComplexFunctions.py: four empty functions for students to complete.",
          ),
        ],
      },
      {
        id: "if-else",
        label: "If/else",
        title: "Making decisions with if/else",
        dates: "Day 13 · Fri Jul 17",
        body: "Booleans, comparison operators, and code that only runs when a condition is true. Every example started with two questions: what is the condition, and what happens if it's true? A biker breaking a speed record became an if statement, and a soccer player's bicycle kick became an if/else. The final practice updates a game's level, points and lives.",
        tags: ["Booleans", "Conditions", "Branching"],
        note: "== is not the same as =.",
        media: [
          cd(
            "slide-48.jpg",
            "Slide: If statements, conditions that decide which part of a process runs.",
          ),
          cd(
            "slide-50.jpg",
            "Slide: Simple conditional operators, less than, greater than, is equal to and is not equal to.",
          ),
          cd(
            "slide-53.jpg",
            "Slide: Writing an if, a biker going for a speed record, with the condition and what happens if it is true.",
          ),
          cd(
            "slide-56.jpg",
            "Slide: Writing if/else, a soccer player earns extra points for a bicycle kick and normal points otherwise.",
          ),
          cd(
            "code-ifs-game-wide.jpg",
            "The practice file 01_IFs.py: game functions to complete for updating the level, checking for a mission item and restoring a life.",
          ),
        ],
      },
    ],
    outcome: {
      body: "Four days of material that a new instructor could pick up and teach: a 58-slide deck, fifteen practice files from tracing variables to a small game, a computer skills checklist with a Windows and Mac guide, and a teacher's guide with what to say, how long to spend, common mistakes and an answer key for every file. The same if/else lesson came back the next week, when students planned their portfolio wireframes.",
      extrasLabel: "Practice files and teaching guides",
      extras: [
        cd(
          "teachers-guide-cover.jpg",
          "Cover of the teacher's guide and speaker notes for Days 11 to 13. TA names are blocked out.",
          { fit: "contain", caption: "Teacher's guide" },
        ),
        cd(
          "teachers-guide-functions.jpg",
          "A page of the teacher's guide for Day 12, functions, with timing, speaker notes and answers.",
          { fit: "contain", caption: "Speaker notes + answers" },
        ),
        cd("functions-documentation.jpg", "The functions practice documentation handout.", {
          fit: "contain",
          caption: "Functions handout",
        }),
        cd(
          "code-functions-variables.jpg",
          "The practice file 02_FunctionsAndVariables1.py, with an example and questions that call functions on variables.",
          { fit: "contain", caption: "02_FunctionsAndVariables1.py" },
        ),
        cd("code-initialization.jpg", "The practice file 00_Initialization.py.", {
          fit: "contain",
          caption: "00_Initialization.py",
        }),
        cd(
          "slide-16.jpg",
          "Practice slide: variable initialization, 00_Initialization.py, five to ten minutes, beginner level.",
          { fit: "contain", caption: "Practice: beginner" },
        ),
        cd(
          "slide-19.jpg",
          "Practice slide: expressions, 01 and 02_Expressions.py, five to ten minutes, beginner level.",
          { fit: "contain", caption: "Practice: expressions" },
        ),
        cd(
          "slide-43.jpg",
          "Practice slide: writing simple functions, ten to twenty minutes, medium difficulty.",
          { fit: "contain", caption: "Practice: medium" },
        ),
      ],
      change:
        "I kept the practice files but not the students' finished versions. Next time I'd collect one traced file per student each day, so I could see where the SET operator still tripped people up.",
    },
  },
  {
    slug: "design-material",
    title: "Design Principles: PARC, Type & Color",
    summary:
      "Five lectures and a hands-on exercise that taught incoming Illinois Tech freshmen to design with intent: proximity, alignment, repetition and contrast, plus type and color fundamentals.",
    cardMeta: "Exelon Summer Institute · 2026",
    year: "Summer 2026",
    role: "CS & Design Lead",
    audience: "Incoming Illinois Tech freshmen",
    tools: ["Google Slides", "Google Classroom", "Google Drawings", "Adobe Color"],
    cover: dp(
      "slide-077.jpg",
      "Lecture slide: a full color palette built from one base color on the 12-color wheel, with its complementary, triad, split-complementary and analogous swatches.",
    ),
    main: true,
    order: 2,
    context: {
      body: "Week 3 of the Exelon Summer Institute introduced graphic design to incoming Illinois Tech freshmen who would design and publish their own portfolio the following week. They needed a framework they could apply quickly and use to explain their choices, because, as the syllabus puts it, design choices should have a reason. I built the week around the PARC method, after Robin Williams' design principles, then extended it into typography, color theory and visual culture.",
      media: dp(
        "syllabus-week3.jpg",
        "The Week 3 schedule from the course syllabus: design principles, typography and legibility, images and color, portfolio moodboard and wireframes, one topic a day.",
      ),
      caption: "Week 3 at a glance, from the course syllabus.",
    },
    approach: [
      {
        lead: "Show bad next to good.",
        body: "Every principle is taught by comparison, like three versions of one warning label, so students see the difference before they hear the rule.",
      },
      {
        lead: "Color is a system, not a favorite.",
        body: "Students build a full palette step by step from one base color, then use color to direct attention and group information.",
      },
      {
        lead: "Research before you design.",
        body: "The exercise asks students to study one era and one designer from it before choosing a single font or color.",
      },
      {
        lead: "Practice for the real thing.",
        body: "The period board is a rehearsal for each student's portfolio design board the following week, using the same process.",
      },
    ],
    lessonsLabel: "Lectures",
    lessonItemLabel: "Part",
    lessonsIntro: "Five lectures and one exercise. Pick one to see the slides.",
    lessonMediaAspect: "wide",
    lessons: [
      {
        id: "parc",
        label: "PARC",
        title: "The PARC method of design",
        dates: "Week 3 · Monday",
        body: "Proximity, alignment, repetition and contrast, taught with side-by-side examples. The same shapes read as one group or two depending on spacing, and three versions of a hazard label go from muddy to unmistakable. Students then analyzed real examples of good and poor design, and talked about when breaking the rules works.",
        tags: ["Proximity", "Alignment", "Repetition", "Contrast"],
        note: "Make things that should be different very different.",
        media: [
          dp(
            "slide-020.jpg",
            "Slide: Contrast, three versions of the same product warning label, two marked bad example and one marked good example.",
          ),
          dp(
            "slide-009.jpg",
            "Slide: Proximity, the same row of triangles spaced so they read as two worlds apart or as one group.",
          ),
          dp(
            "slide-021.jpg",
            "Slide: Contrast, the good warning label annotated to show how size, weight and spacing create hierarchy.",
          ),
        ],
      },
      {
        id: "type",
        label: "Type",
        title: "Typefaces and legibility",
        dates: "Week 3 · Tuesday",
        body: "How type works: x-height, baseline, serif versus sans serif, display versus body fonts, and the major font categories. Students compared body fonts set with the same paragraph, learned why default fonts signal an unconsidered choice, and saw how the right font in the wrong context fails.",
        tags: ["Legibility", "Font pairing", "Display vs. body"],
        note: "Serifs guide the eye. Sans serif headings and serif body is a pairing that works.",
        media: [
          dp(
            "slide-035.jpg",
            "Slide: Letter height and positioning, the word Sphinx labeled with ascender, cap height, x-height, baseline and descender.",
          ),
          dp(
            "slide-030.jpg",
            "Slide: Legibility example, the same paragraph set in Source Sans and Century Schoolbook, with the book standard marked good example.",
          ),
          dp(
            "slide-048.jpg",
            "Slide: Font types, geometric sans serif shown with Century Gothic, with its origin and what it is useful for.",
          ),
          dp(
            "slide-055.jpg",
            "Slide: Consider context, the same messages set in mismatched fonts and then in fonts that fit.",
          ),
        ],
      },
      {
        id: "color-wheel",
        label: "Color wheel",
        title: "Building a palette",
        dates: "Week 3 · Wednesday",
        body: "The 12-color wheel and its harmonies: complementary, triad, split-complementary, analogous and monochromatic, each shown on a small graphic. Then a full palette built one step at a time from a single base color, finished with neutrals.",
        tags: ["Color harmony", "Palettes", "Neutrals"],
        note: "",
        media: [
          dp(
            "slide-066.jpg",
            "Slide: Split complementary triad on the color wheel, applied to an extreme heat advisory graphic.",
          ),
          dp("slide-065.jpg", "Slide: Triad on the color wheel, applied to a safety first sign."),
          dp(
            "slide-068.jpg",
            "Slide: Analogous colors on the color wheel, applied to a close doors sign.",
          ),
        ],
      },
      {
        id: "color-function",
        label: "Color as a tool",
        title: "Color in information hierarchy",
        dates: "Week 3 · Wednesday",
        body: "Four functional uses of color: directing attention, grouping, showing magnitude and establishing continuity. Spot color, ledger lines, safety colors and choropleth maps, ending with a four-step method for annotating an interface screenshot.",
        tags: ["Spot color", "Grouping", "UI annotation"],
        note: "",
        media: [
          dp(
            "slide-103.jpg",
            "Slide: Combining techniques, step four of a UI annotation, using lines and boxes to connect notes to parts of a download page.",
          ),
          dp(
            "slide-086.jpg",
            "Slide: Four uses of color, direct attention, group objects, indicate severity or magnitude, and establish continuity.",
          ),
          dp(
            "slide-096.jpg",
            "Slide: Safety colors, four warning triangles in a standardized color scale.",
          ),
        ],
      },
      {
        id: "zeitgeist",
        label: "Zeitgeist",
        title: "Promotional graphics and zeitgeist",
        dates: "Week 3 · Wednesday",
        body: "Culture as a design tool: the zeitgeist, nostalgia versus camp, and the life cycle of a trend, from mainstream popularity to historical interest. Case studies showed how long-running campaigns modernize a look while keeping what people remember.",
        tags: ["Visual culture", "Trends"],
        note: "Nostalgia comes back around every ten years or so.",
        media: [
          dp(
            "slide-109.jpg",
            "Slide: The life cycle of trends, five stages from mainstream popularity to historical interest.",
          ),
          dp(
            "slide-107.jpg",
            "Slide: Capturing cultural zeitgeist, with a definition of zeitgeist.",
          ),
          dp("slide-108.jpg", "Slide: Nostalgia versus camp, defined side by side."),
        ],
      },
      {
        id: "exercise",
        label: "Period exercise",
        title: "Creating a period aesthetic",
        dates: "Posted Jul 22 · due Jul 26",
        body: "Students picked one era, Mid-century Modern or the 1970s, researched one designer from it, and built a board with at least two fonts, one piece of linework, three colors and three images, plus a short note on the designer. I wrote the brief, the template and the rubric, and made an Art Deco example board to work from.",
        tags: ["Design research", "Moodboard"],
        note: "This same process of collecting is what you'll use for your portfolio moodboard.",
        media: [
          dp(
            "exercise-brief.jpg",
            "The Google Classroom post for the practical exercise: creating a period aesthetic, with the full brief and designer research requirement.",
            { fit: "contain" },
          ),
          dp(
            "template.jpg",
            "The period aesthetic template, with labeled areas for fonts, color, linework and images.",
            { fit: "contain" },
          ),
          dp("rubric.jpg", "The grading rubric for the period aesthetic exercise.", {
            fit: "contain",
          }),
        ],
      },
    ],
    outcome: {
      body: "Fourteen students submitted a period board, and six included written research on a designer of their era. A selection is below, shared with names blocked out. The research habit carried straight into the next week, when the same students built design boards for their own portfolios.",
      extrasLabel: "Student period boards",
      extras: [
        dp(
          "student-period-1.jpg",
          "A student's 1970s board with a note on artist Judy Chicago, retro display fonts and a labeled color palette.",
          { caption: "1970s · Judy Chicago note" },
        ),
        dp(
          "student-period-2.jpg",
          "A student's 1970s board with psychedelic posters, four display fonts and a note on Peter Max.",
          { caption: "1970s · Peter Max note" },
        ),
        dp(
          "student-period-3.jpg",
          "A student's 1970s board with a note on illustrator David Klein and bold display fonts.",
          { caption: "1970s · David Klein note" },
        ),
        dp(
          "student-period-4.jpg",
          "A student's 1970s board with fashion photographs and a note on designer Willi Smith. The student's name is blocked out.",
          { caption: "1970s · Willi Smith note" },
        ),
        dp(
          "student-period-5.jpg",
          "A student's 1970s board with patterned linework, swash fonts and an earthy palette.",
          { caption: "1970s" },
        ),
        dp(
          "student-period-6.jpg",
          "A student's 1970s board with funk display type, an orange and brown palette and interiors.",
          { caption: "1970s" },
        ),
        dp(
          "student-period-7.jpg",
          "A student's 1970s board with concert posters, display fonts and a muted palette.",
          { caption: "1970s" },
        ),
        dp(
          "student-period-8.jpg",
          "A student's Mid-century Modern board with a note on Jackson Pollock, architecture sketches and period ads.",
          { caption: "Mid-century Modern" },
        ),
      ],
      change:
        "The files show who submitted, but not how well. Next time I'd keep rubric scores and a line of feedback for each board, so I could show how the work improved.",
    },
  },
  {
    slug: "portfolio-material",
    title: "Build Your First Portfolio",
    summary:
      "A two-phase unit that took incoming Illinois Tech freshmen from a design board and written plan to wireframes and a published Framer portfolio in about a week.",
    cardMeta: "Exelon Summer Institute · 2026",
    year: "Summer 2026",
    role: "CS & Design Lead",
    audience: "Incoming Illinois Tech freshmen",
    tools: ["Figma", "Framer", "Google Docs", "Adobe Color Contrast Analyzer"],
    cover: pf(
      "student-board-1.jpg",
      "A student's portfolio design board: a pink and green palette with hex codes, a heading and body type scale, and annotated screen mockups. Names are blocked out.",
    ),
    main: false,
    order: 2.5,
    context: {
      body: "Right after the design-principles week, students had about a week to go from no plan to a live portfolio site. Improvising fonts and colors mid-build produces inconsistent sites, so I taught a repeatable order: decide the visual system, write the content, map the structure, then build. That way the finished site is consistent and every student can explain each choice.",
      media: pf(
        "classroom-deadlines.jpg",
        "The Portfolio section in Google Classroom: six assignments from the assets file proof to the final portfolio URL, with due dates from July 24 to July 30.",
        { fit: "contain" },
      ),
      caption: "Six deliverables in one week, from asset folder to live URL.",
    },
    approach: [
      {
        lead: "Plan before you build.",
        body: "A design board and a written copy document come first, and the written plan is graded separately from the live site.",
      },
      {
        lead: "Grey boxes first.",
        body: "Wireframes strip out color on purpose so students judge structure, not decoration. If it works in grey boxes, it works in color.",
      },
      {
        lead: "PARC in a live build.",
        body: "My Framer guide maps each principle onto padding, stacks, reused styles and contrast, and has students build sections by hand before using import shortcuts.",
      },
      {
        lead: "Accessibility at every step.",
        body: "Colors are tested for WCAG contrast on the design board, and the guide adds what the tutorial skips: responsive layout, alt text and semantic headings.",
      },
    ],
    lessonsLabel: "Unit",
    lessonItemLabel: "Step",
    lessonsIntro: "Two phases, six steps. Pick one to see the slides and student work.",
    lessonMediaAspect: "wide",
    lessons: [
      {
        id: "design-board",
        label: "Design board",
        title: "Create your design board",
        dates: "Phase 1 · Week 3 Thursday",
        body: "The visual foundation of the portfolio: a mood, a color palette tested with the Adobe Contrast Analyzer, fonts confirmed available in Framer, a text hierarchy and interaction ideas. Below the slides are two students' boards: one with hex codes, a type scale and notes on hover and page transitions, the other assigning each of three fonts a role.",
        tags: ["Visual direction", "WCAG contrast", "Type system"],
        note: "Think about your portfolio before you build it.",
        media: [
          pf(
            "slide-04.jpg",
            "Slide: Step 1, create your design board, with a checklist and questions about the feeling a portfolio should give.",
          ),
          pf(
            "slide-05.jpg",
            "Slide: Choose your colors, with example moods and the requirement to test contrast against WCAG standards.",
          ),
          pf(
            "slide-06.jpg",
            "Slide: Choose your fonts, with headings, subheadings, body text and captions, checked in Framer first.",
          ),
          pf(
            "student-board-1.jpg",
            "A student's design board: hex color palette, heading and body type scale, and annotated screen mockups with hover and transition notes. The student's name and email are blocked out.",
            { fit: "contain" },
          ),
          pf(
            "student-board-2.jpg",
            "A student's design board: a four-color palette with hex codes and three fonts, each assigned to headings, captions or body text.",
            { fit: "contain" },
          ),
        ],
      },
      {
        id: "copy",
        label: "Portfolio copy",
        title: "Write it before you build it",
        dates: "Phase 1 · Week 3 Thursday",
        body: "All the writing happens in a Google Doc first, not inside the website builder: an introduction, project descriptions with metadata (dates, role, tools, skills, links), reserved sections for future work, and the questions every case study should answer. The goal is two or three strong projects instead of many small ones.",
        tags: ["Content planning", "Case studies"],
        note: "Show, don't just tell.",
        media: [
          pf(
            "slide-10.jpg",
            "Slide: Create your portfolio copy, a Google Doc that holds all the writing for the site, with its benefits.",
          ),
          pf("slide-11.jpg", "Slide: Include metadata, the fields every project should list."),
          pf(
            "slide-17.jpg",
            "Slide: Start thinking about case studies, eight questions a good case study answers.",
          ),
          pf(
            "slide-18.jpg",
            "Slide: Your goal, aim for two or three strong case studies instead of many small projects.",
          ),
          pf(
            "planning-template.jpg",
            "The Portfolio Planning Template: visual direction, portfolio structure, portfolio copy, future sections and asset library.",
            { fit: "contain" },
          ),
        ],
      },
      {
        id: "wireframes",
        label: "Wireframes",
        title: "What a wireframe is for",
        dates: "Phase 2 · Week 3 Friday",
        body: "A wireframe is the blueprint of the site: grey boxes for layout and flow, no color or final fonts. We covered why to wireframe first, the blocks every portfolio needs (hero, navigation with five items at most, about, projects, contact) and the anatomy of a landing page.",
        tags: ["Low-fidelity", "Layout"],
        note: "Think floor plan, not finished house.",
        media: [
          pf(
            "slide-22.jpg",
            "Slide: What is a wireframe? A grey-box blueprint of layout and flow.",
          ),
          pf("slide-26.jpg", "Slide: Why wireframe before you build, with four reasons."),
          pf(
            "slide-27.jpg",
            "Slide: What every portfolio wireframe needs, the non-negotiable blocks.",
          ),
          pf(
            "slide-28.jpg",
            "Slide: Anatomy of a landing page, the blocks in order from top to bottom.",
          ),
        ],
      },
      {
        id: "structure",
        label: "Structure",
        title: "One page or many?",
        dates: "Phase 2 · Week 3 Friday",
        body: "Students mapped where every page leads, then chose between a one-page site and a multi-page site using a quick gut-check: a few projects and a fast launch point to one page; lots of work or long case studies point to several.",
        tags: ["Information architecture", "Page flow"],
        note: "You are not marrying this decision. Pick the one that gets you launched fastest.",
        media: [
          pf(
            "slide-34.jpg",
            "Slide: Option A, a one-page website, with what it is good for and what to watch out for.",
          ),
          pf(
            "slide-35.jpg",
            "Slide: Option B, a multi-page website, with what it is good for and what to watch out for.",
          ),
        ],
      },
      {
        id: "tools",
        label: "Tools & tips",
        title: "Wireframing tools and tips",
        dates: "Phase 2 · Week 3 Friday",
        body: "Free tools to sketch with (Excalidraw, Figma, Canva, Penpot, Whimsical, Wireframe.cc) and the habits that make a wireframe useful: stay greyscale, label every box, sketch desktop then mobile, and annotate where each link goes. Then what else to plan for: responsive layout, load speed, accessibility and SEO.",
        tags: ["Figma", "Responsive", "Accessibility"],
        note: "If a stranger can read the boxes, you're done.",
        media: [
          pf(
            "slide-40.jpg",
            "Slide: Wireframing tips, stay greyscale, label boxes, desktop then mobile, real hierarchy, annotate the links.",
          ),
          pf(
            "slide-38.jpg",
            "Slide: Free tools for planning, a short description of six wireframing tools.",
          ),
          pf(
            "slide-41.jpg",
            "Slide: What else to consider for your site, including responsive design, load speed, accessibility and SEO.",
          ),
        ],
      },
      {
        id: "build",
        label: "Build in Framer",
        title: "From wireframe to live site",
        dates: "Week 4",
        body: "Students sketched their landing page, chose a structure, wireframed each page and the mobile version, then built in Framer. My companion guide to the Framer tutorial ties each step back to PARC and lists what the video skips. The week ended with peer feedback, a short paper explaining design choices, and a showcase.",
        tags: ["Framer", "Peer feedback"],
        note: "This is the PARC method in a live build.",
        media: [
          pf(
            "slide-42.jpg",
            "Slide: Today's task, four steps from sketching the landing page to the mobile version.",
          ),
          pf(
            "framer-guide-1.jpg",
            "Page 1 of my Getting Started in Framer guide, connecting the tutorial to proximity, alignment, repetition and contrast.",
            { fit: "contain" },
          ),
          pf(
            "framer-guide-2.jpg",
            "Page 2 of the Framer guide, listing what the tutorial skips: responsive layout, accessibility, semantic headings and layer naming.",
            { fit: "contain" },
          ),
        ],
      },
    ],
    outcome: {
      body: "Students turned their boards into wireframes in Figma and Framer, and several published live portfolio sites by the end of the program. A selection of their boards and wireframes is below, shared with names blocked out.",
      extrasLabel: "Student boards and wireframes",
      extras: [
        pf(
          "student-wireframe-1.jpg",
          "A student's six-page Figma wireframe set built on their own design board colors: landing, projects, project detail, skills, experience and contact.",
          { fit: "contain", caption: "6-page Figma set" },
        ),
        pf(
          "student-wireframe-2.jpg",
          "A student's dark-theme wireframe of an About page with consistent navigation.",
          { fit: "contain", caption: "About page" },
        ),
        pf(
          "student-wireframe-3.jpg",
          "The same student's Projects page, keeping the layout and navigation consistent.",
          { fit: "contain", caption: "Projects page" },
        ),
        pf("student-wireframe-6.jpg", "The same student's Awards page.", {
          fit: "contain",
          caption: "Awards page",
        }),
        pf(
          "student-wireframe-4.jpg",
          "A student's low-fidelity scrolling wireframe: hero, project cards and about section.",
          { fit: "contain", caption: "Low-fi scroll" },
        ),
        pf(
          "student-wireframe-5.jpg",
          "A student's grey-box Figma wireframe of a home page and a personal projects section.",
          { fit: "contain", caption: "Grey-box Figma" },
        ),
        pf(
          "student-board-3.jpg",
          "A student's design board: a blue and green palette, a monospace and sans serif font pair, and interface linework.",
          { fit: "contain", caption: "Design board" },
        ),
        pf(
          "student-board-4.jpg",
          "A student's retro-terminal design board: terminal color themes with hex codes and a single display font.",
          { fit: "contain", caption: "Retro-terminal board" },
        ),
      ],
      change:
        "I didn't keep the design-explanation papers or peer feedback, which are the best evidence of students explaining their choices. Next time I'd collect both alongside the final URLs.",
    },
  },
  {
    slug: "circuits-material",
    title: "Intro to Circuits & Arduino",
    summary:
      "Seven months of simulate-first circuit projects for the Exelon Summer Institute, so every incoming Illinois Tech freshman had a next build that matched their pace and interests.",
    cardMeta: "Exelon Summer Institute · 2025",
    year: "Summer 2025",
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
        id: "intro",
        label: "What is a circuit?",
        title: "What is a circuit?",
        dates: "Day 1",
        body: "Every student started from the same place, whatever their experience. A circuit is a complete path for electricity: from a power source, through a path, and back again. If the loop is broken, nothing flows. Before any code, students proved it with a single red LED on a 9V battery and a breadboard.",
        tags: ["Closed circuits", "LED polarity"],
        note: "A source, a load and a path back: that's all a circuit is.",
        mediaAspect: "wide",
        media: [
          img(
            "slide-title.jpg",
            "Title slide from my lesson deck: Introduction to Circuits, ESI Summer 2025, illustrated with a light bulb, a warning sign and a plug.",
          ),
          img(
            "slide-what-is-a-circuit.jpg",
            "Lesson slide: What is a circuit? A complete path for electricity to flow from a power source, through a path, and back again.",
          ),
          img(
            "overview-battery-led.jpg",
            "A 9V battery plugged into a breadboard power module, powering a single lit red LED.",
          ),
        ],
      },
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
      body: "More than seven months of projects for a four-week program, documented in over 170 photos and videos. The lessons above are the core path; the builds below are where faster students went next, ending with a model elevator that combined buttons, a motor driver and a distance sensor in one structure.",
      extrasLabel: "Also built along the way",
      extras: [
        img(
          "overview-elevator-driver.jpg",
          "A motor driver board with four indicator LEDs mounted inside the cardboard elevator shaft.",
          { caption: "Elevator motor driver" },
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
