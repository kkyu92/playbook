import { describe, it, expect } from "vitest";
import {
  validateLessonPayload,
  isKnownSubtype,
  listValidSubtypes,
} from "../lib/payload-validator.mjs";

describe("validateLessonPayload — D4 subtype schema (Phase 4a)", () => {
  it("subtype 미정의 → valid (기존 lesson backward-compat)", () => {
    const r = validateLessonPayload({ title: "x", body: "y" });
    expect(r.valid).toBe(true);
    expect(r.subtype).toBe(null);
    expect(r.errors).toEqual([]);
    expect(r.warnings).toEqual([]);
  });

  it("subtype=self-policy + fingerprint → valid", () => {
    const r = validateLessonPayload({ subtype: "self-policy", fingerprint: "abc1234" });
    expect(r.valid).toBe(true);
    expect(r.subtype).toBe("self-policy");
    expect(r.fingerprint).toBe("abc1234");
    expect(r.warnings).toEqual([]);
  });

  it("self-policy 인데 fingerprint 누락 → valid + warning", () => {
    const r = validateLessonPayload({ subtype: "self-policy" });
    expect(r.valid).toBe(true);
    expect(r.warnings).toHaveLength(1);
    expect(r.warnings[0]).toMatch(/fingerprint/);
  });

  it("unknown subtype → invalid + error (whitelist)", () => {
    const r = validateLessonPayload({ subtype: "random-thing" });
    expect(r.valid).toBe(false);
    expect(r.errors).toHaveLength(1);
    expect(r.errors[0]).toMatch(/unknown subtype/);
  });

  it("subtype=빈 문자열 → 미정의 처리 (subtype null)", () => {
    const r = validateLessonPayload({ subtype: "" });
    expect(r.valid).toBe(true);
    expect(r.subtype).toBe(null);
  });

  it("isKnownSubtype + listValidSubtypes — public API", () => {
    expect(isKnownSubtype("self-policy")).toBe(true);
    expect(isKnownSubtype("unknown")).toBe(false);
    expect(listValidSubtypes()).toContain("self-policy");
  });
});
