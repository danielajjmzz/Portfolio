import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  featuredProjectCards,
  teaching,
  visualWork,
  visualFilters,
  selectVisualWork,
  VISUAL_INITIAL_COUNT,
  selectTeaching,
  TEACHING_INITIAL_COUNT,
} from "./projects-page";
import { getTeachingBySlug } from "./teaching";

describe("Projects-page curation", () => {
  test("shows three featured projects in the requested order", () => {
    assert.deepEqual(
      featuredProjectCards.map((entry) => entry.title),
      [
        "Real Estate Management Database",
        "[Featured project 2 — finance]",
        "[Featured project 3 — retail AI]",
      ],
    );
  });
  test("teaching shows Coding, Design and Circuits first, with the AI workshop behind Show more", () => {
    const collapsed = selectTeaching();
    assert.equal(TEACHING_INITIAL_COUNT, 3);
    assert.deepEqual(
      collapsed.entries.map((entry) => entry.title),
      ["Coding Material", "Design Material", "Circuits Material"],
    );
    assert.equal(collapsed.hasMore, true);
    const expanded = selectTeaching(true);
    assert.equal(expanded.entries.at(-1)?.title, "AI Workshop");
    assert.equal(expanded.canCollapse, true);
  });
  test("every teaching card links to a page with all four sections", () => {
    for (const entry of teaching) {
      assert.ok(getTeachingBySlug(entry.slug), `${entry.slug} has no page`);
      assert.ok(
        entry.context.body && entry.approach.length && entry.lessons.length && entry.outcome.body,
      );
    }
  });
  test("shows one row of four visual items, then Show more reveals the rest", () => {
    assert.equal(VISUAL_INITIAL_COUNT, 4);
    const collapsed = selectVisualWork("All");
    assert.equal(collapsed.entries.length, 4);
    assert.equal(collapsed.hasMore, true);
    assert.equal(collapsed.canCollapse, false);
    const expanded = selectVisualWork("All", true);
    assert.equal(expanded.entries.length, visualWork.length);
    assert.equal(expanded.hasMore, false);
    assert.equal(expanded.canCollapse, true);
  });
  test("no toggle when a filter fits in one row", () => {
    assert.equal(selectVisualWork("Document designs").hasMore, false);
  });
  test("every visual work card has photos for the carousel", () => {
    for (const entry of visualWork) {
      assert.ok(entry.media.length > 0, `${entry.title} has no photos`);
    }
  });
  test("filters visual work without including teaching", () => {
    assert.equal(selectVisualWork("Physical designs", true).entries.length, 6);
    assert.equal(selectVisualWork("Document designs").entries.length, 2);
    assert.equal(visualFilters.includes("Photography" as never), false);
    assert.equal(
      visualWork.some((entry) =>
        ["3D Printed Keychain Workshop", "Arduino Line-Following Robot"].includes(entry.title),
      ),
      false,
    );
    assert.equal(
      visualWork.every((entry) =>
        ["Physical designs", "Document designs"].includes(entry.category),
      ),
      true,
    );
  });
});
