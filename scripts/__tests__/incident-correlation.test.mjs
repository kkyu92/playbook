import { describe, it, expect } from "vitest";
import {
  extractFingerprint,
  findUnacknowledgedIncidents,
} from "../lib/incident-correlation.mjs";

describe("extractFingerprint — Issue title 파싱 (Phase 4a D5)", () => {
  it("표준 [fp:xxxx] 패턴 추출", () => {
    expect(
      extractFingerprint("🟠 Inbound incident: Foo (from bar) [fp:abc12345]"),
    ).toBe("abc12345");
  });

  it("fingerprint 없는 title → null", () => {
    expect(extractFingerprint("🟡 Inbound raw: Foo (from bar)")).toBe(null);
  });

  it("hyphen 포함 fingerprint", () => {
    expect(extractFingerprint("title [fp:user-defined-key-123]")).toBe(
      "user-defined-key-123",
    );
  });

  it("null/undefined 안전 — null", () => {
    expect(extractFingerprint(null)).toBe(null);
    expect(extractFingerprint(undefined)).toBe(null);
  });
});

describe("findUnacknowledgedIncidents — D5 reminder 트리거 (Phase 4a)", () => {
  const NOW = new Date("2026-04-29T00:00:00Z");

  function mkIssue(num, title, daysAgo) {
    const created = new Date(NOW.getTime() - daysAgo * 24 * 3600 * 1000);
    return { number: num, title, createdAt: created.toISOString() };
  }

  it("incident 만 있고 lesson 없음 + 3일 이상 지남 → reminder 대상", () => {
    const incidents = [mkIssue(1, "incident: foo [fp:aaa1]", 5)];
    const lessons = [];
    const r = findUnacknowledgedIncidents(incidents, lessons, NOW);
    expect(r).toHaveLength(1);
    expect(r[0].number).toBe(1);
  });

  it("incident + 같은 fingerprint 의 lesson 존재 → 제외", () => {
    const incidents = [mkIssue(1, "incident: foo [fp:aaa1]", 5)];
    const lessons = [mkIssue(2, "📓 Auto-Ingest: Journal 010 — foo [fp:aaa1]", 2)];
    const r = findUnacknowledgedIncidents(incidents, lessons, NOW);
    expect(r).toHaveLength(0);
  });

  it("incident 가 3일 안 지남 → 제외 (cutoff 미달)", () => {
    const incidents = [mkIssue(1, "incident: foo [fp:aaa1]", 1)];
    const r = findUnacknowledgedIncidents(incidents, [], NOW);
    expect(r).toHaveLength(0);
  });

  it("fingerprint 추출 불가 incident → 제외 (추적 불가)", () => {
    const incidents = [mkIssue(1, "incident: foo (no fingerprint)", 5)];
    const r = findUnacknowledgedIncidents(incidents, [], NOW);
    expect(r).toHaveLength(0);
  });

  it("reminderDays=7 커스텀 → 5일 incident 도 cutoff 미달", () => {
    const incidents = [mkIssue(1, "incident: foo [fp:aaa1]", 5)];
    const r = findUnacknowledgedIncidents(incidents, [], NOW, 7);
    expect(r).toHaveLength(0);
  });

  it("여러 incident 중 일부만 매칭 lesson → 미해결만 반환", () => {
    const incidents = [
      mkIssue(1, "i1 [fp:aaa1]", 5),
      mkIssue(2, "i2 [fp:bbb2]", 5),
      mkIssue(3, "i3 [fp:ccc3]", 5),
    ];
    const lessons = [mkIssue(99, "lesson [fp:bbb2]", 1)];
    const r = findUnacknowledgedIncidents(incidents, lessons, NOW);
    expect(r.map((x) => x.number).sort()).toEqual([1, 3]);
  });
});
