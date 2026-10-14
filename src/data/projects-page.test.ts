import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { caseStudies, teaching, visualWork, selectVisualWork } from "./projects-page";

describe("Projects-page curation", () => {
  test("shows three case studies in the requested order", () => {
    assert.deepEqual(caseStudies.map((entry) => entry.title), ["Real Estate Management Database", "[Case study 2 — finance]", "[Case study 3 — retail AI]"]);
  });
  test("moves process documentation and student showcase into three teaching cards", () => {
    assert.equal(teaching.length, 3);
    for (const title of ["Workshop Process Documentation", "Student Showcase Moments"]) {
      assert.equal(teaching.some((entry) => entry.title === title), true);
      assert.equal(visualWork.some((entry) => entry.title === title), false);
    }
  });
  test("initially shows eight visual items and reveals the remainder", () => {
    assert.equal(selectVisualWork("All").entries.length, 8);
    assert.equal(selectVisualWork("All").hasMore, true);
    assert.ok(selectVisualWork("All", true).entries.length > 8);
    assert.equal(selectVisualWork("All", true).hasMore, false);
  });
  test("filters visual work without including teaching", () => {
    assert.equal(selectVisualWork("Physical designs").entries.length, 4);
    assert.equal(selectVisualWork("Document designs").entries.length, 2);
    assert.equal(selectVisualWork("Photography").entries.some((entry) => entry.title === "Chicago Texture Study"), true);
    assert.equal(visualWork.every((entry) => ["Physical designs", "Document designs", "Photography"].includes(entry.category)), true);
  });
});