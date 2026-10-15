import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  caseStudies,
  teaching,
  visualWork,
  visualFilters,
  selectVisualWork,
  VISUAL_INITIAL_COUNT,
} from "./projects-page";

describe("Projects-page curation", () => {
  test("shows three featured projects in the requested order", () => {
    assert.deepEqual(
      caseStudies.map((entry) => entry.title),
      [
        "Real Estate Management Database",
        "[Featured project 2 — finance]",
        "[Featured project 3 — retail AI]",
      ],
    );
  });
  test("moves process documentation and student showcase into three teaching cards", () => {
    assert.equal(teaching.length, 3);
    for (const title of ["Workshop Process Documentation", "Student Showcase Moments"]) {
      assert.equal(
        teaching.some((entry) => entry.title === title),
        true,
      );
      assert.equal(
        visualWork.some((entry) => entry.title === title),
        false,
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
  test("every visual work and teaching card has photos for the carousel", () => {
    for (const entry of [...visualWork, ...teaching]) {
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
