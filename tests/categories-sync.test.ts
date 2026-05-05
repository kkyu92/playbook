import { describe, it, expect } from "vitest";
import { CATEGORIES as SCHEMA_CATEGORIES } from "../src/lib/schema";
// .mjs 단일 원천 — JS file
import {
  CATEGORIES as SCRIPT_CATEGORIES,
  CATEGORY_LABELS as SCRIPT_LABELS_RAW,
} from "../scripts/lib/categories.mjs";

const SCRIPT_LABELS = SCRIPT_LABELS_RAW as Record<string, string>;

describe("CATEGORIES sync — schema.ts ↔ scripts/lib/categories.mjs", () => {
  it("배열 길이 일치", () => {
    expect(SCRIPT_CATEGORIES.length).toBe(SCHEMA_CATEGORIES.length);
  });

  it("순서 + 값 모두 동일", () => {
    expect([...SCRIPT_CATEGORIES]).toEqual([...SCHEMA_CATEGORIES]);
  });

  it("CATEGORY_LABELS 는 모든 카테고리 커버", () => {
    for (const cat of SCRIPT_CATEGORIES) {
      expect(SCRIPT_LABELS).toHaveProperty(cat);
      expect(typeof SCRIPT_LABELS[cat]).toBe("string");
    }
  });
});
