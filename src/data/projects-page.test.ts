import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  caseStudies,
  teaching,
  visualWork,
  selectVisualWork,
  VISUAL_INITIAL_COUNT,
} from "./projects-page";

describe("Projects-page curation", () => {
  test("shows three case studies in the requested order", () => {
    assert.deepEqual(
      caseStudies.map((entry) => entry.title),
      ["Real Estate Management Database", "[Case study 2 — finance]", "[Case study 3 — retail AI]"],
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
  test("shows eight visual items, then Show more reveals the rest", () => {
    assert.equal(VISUAL_INITIAL_COUNT, 8);
    const collapsed = selectVisualWork("All");
    assert.equal(collapsed.entries.length, Math.min(8, visualWork.length));
    assert.equal(collapsed.hasMore, visualWork.length > 8);
    assert.equal(collapsed.canCollapse, false);
    const expanded = selectVisualWork("All", true);
    assert.equal(expanded.entries.length, visualWork.length);
    assert.equal(expanded.hasMore, false);
    assert.equal(expanded.canCollapse, visualWork.length > 8);
  });
  test("no toggle when a filter has eight or fewer items", () => {
    assert.equal(selectVisualWork("Physical designs").hasMore, false);
    assert.equal(selectVisualWork("Physical designs", true).canCollapse, false);
  });
  test("filters visual work without including teaching", () => {
    assert.equal(selectVisualWork("Physical designs").entries.length, 4);
    assert.equal(selectVisualWork("Document designs").entries.length, 2);
    assert.equal(
      selectVisualWork("Photography").entries.some(
        (entry) => entry.title === "Chicago Texture Study",
      ),
      true,
    );
    assert.equal(
      visualWork.every((entry) =>
        ["Physical designs", "Document designs", "Photography"].includes(entry.category),
      ),
      true,
    );
  });
});
