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
      ["Real Estate Management Database", "Beauty Formula Decoder", "Savvy"],
    );
  });
  test("featured cards label their number and year", () => {
    assert.deepEqual(
      featuredProjectCards.map((entry) => entry.meta),
      ["01 · 2025 · Featured", "02 · 2025 · Featured", "03 · 2023 · Featured"],
    );
  });
  test("teaching shows Python, Design Principles and Circuits first, with Portfolio and the AI workshop behind Show more", () => {
    const collapsed = selectTeaching();
    assert.equal(TEACHING_INITIAL_COUNT, 3);
    assert.deepEqual(
      collapsed.entries.map((entry) => entry.title),
      [
        "Intro to Python Programming",
        "Design Principles: PARC, Type & Color",
        "Intro to Circuits & Arduino",
      ],
    );
    assert.equal(collapsed.hasMore, true);
    const expanded = selectTeaching(true);
    assert.deepEqual(
      expanded.entries.slice(3).map((entry) => entry.title),
      ["Build Your First Portfolio", "STEM + AI Workshop"],
    );
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
  test("Document designs are hidden for now", () => {
    assert.equal(visualFilters.includes("Document designs" as never), false);
    assert.equal(
      visualWork.some((entry) => (entry.category as string) === "Document designs"),
      false,
    );
  });
  test("every visual work card has photos for the carousel", () => {
    for (const entry of visualWork) {
      assert.ok(entry.media.length > 0, `${entry.title} has no photos`);
    }
  });
  test("filters visual work without including teaching", () => {
    assert.equal(selectVisualWork("Physical designs", true).entries.length, 6);
    assert.equal(visualFilters.includes("Photography" as never), false);
    assert.equal(
      visualWork.some((entry) =>
        ["3D Printed Keychain Workshop", "Arduino Line-Following Robot"].includes(entry.title),
      ),
      false,
    );
    assert.equal(
      visualWork.every((entry) => ["Physical designs"].includes(entry.category)),
      true,
    );
  });
  test("visual work cards carry a method label and no project links", () => {
    for (const entry of visualWork) {
      assert.ok(entry.method, `${entry.title} has no method label`);
      for (const key of ["repoUrl", "liveUrl", "artifactUrl"]) {
        assert.equal(key in entry, false, `${entry.title} still has ${key}`);
      }
    }
  });
  test('featured project links are a real URL, "#" (coming soon) or empty (hidden)', () => {
    for (const card of featuredProjectCards) {
      for (const link of [card.repo_url, card.live_url, card.file_url]) {
        assert.ok(
          link === undefined || link === "" || link === "#" || /^https?:\/\//.test(link),
          `${card.title} has an unexpected link: ${link}`,
        );
      }
    }
  });
});
