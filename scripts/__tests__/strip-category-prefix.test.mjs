import { describe, it, expect } from "vitest";
import { stripCategoryPrefix } from "../generate-lesson.mjs";

describe("stripCategoryPrefix — slug 에서 category 중복 제거", () => {
  it("dash 분리된 prefix → 제거", () => {
    expect(stripCategoryPrefix("harness-engineering-foo-bar", "harness-engineering"))
      .toBe("foo-bar");
  });

  it("붙은 prefix (60자 truncate 로 뒤 잘린 실제 관찰 케이스) → 제거", () => {
    // 실 관찰: "harness-engineeringresponsible-vibe-coding-with-claude-harne"
    expect(stripCategoryPrefix("harness-engineeringresponsible-vibe-coding", "harness-engineering"))
      .toBe("responsible-vibe-coding");
  });

  it("정상 slug (prefix 없음) → no-op", () => {
    expect(stripCategoryPrefix("responsible-coding-with-claude", "harness-engineering"))
      .toBe("responsible-coding-with-claude");
  });

  it("prefix 만 있고 나머지 너무 짧음 → 원본 유지 (의도적 포함 방어)", () => {
    // cat=agents, slug="agents-ab" → stripped "ab" 길이 2 < 3 → 원본 유지
    expect(stripCategoryPrefix("agents-ab", "agents")).toBe("agents-ab");
  });

  it("짧은 카테고리명 (agents) + 붙은 케이스", () => {
    expect(stripCategoryPrefix("agentsmulti-agent-patterns", "agents"))
      .toBe("multi-agent-patterns");
  });

  it("empty slug 또는 cat → 그대로", () => {
    expect(stripCategoryPrefix("", "harness-engineering")).toBe("");
    expect(stripCategoryPrefix("foo", "")).toBe("foo");
  });
});
