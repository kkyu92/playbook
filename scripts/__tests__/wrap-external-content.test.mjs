import { describe, it, expect } from "vitest";
import { wrapExternalContent } from "../lib/gemini-client.mjs";

describe("wrapExternalContent — prompt injection 방어", () => {
  it("delimiter 를 정확한 순서로 감쌈", () => {
    const result = wrapExternalContent("hello world", "RSS");
    expect(result).toBe("<<<BEGIN_RSS>>>\nhello world\n<<<END_RSS>>>");
  });

  it("default label = RSS", () => {
    const result = wrapExternalContent("x");
    expect(result).toContain("<<<BEGIN_RSS>>>");
    expect(result).toContain("<<<END_RSS>>>");
  });

  it("label 변경 시 양쪽 모두 반영", () => {
    const result = wrapExternalContent("body", "ARTICLES");
    expect(result).toContain("<<<BEGIN_ARTICLES>>>");
    expect(result).toContain("<<<END_ARTICLES>>>");
    expect(result).not.toContain("<<<BEGIN_RSS>>>");
  });

  it("content 에 delimiter 자체가 포함돼도 그대로 감쌈 (callers responsibility)", () => {
    // 주의: 이건 설계 상 caller 가 content 내부의 delimiter 는 sanitize 안 함.
    // 현 구현은 raw concatenation 이므로 delimiter 중복 가능.
    // test: 아직 이 정도는 허용, 문서화 포인트.
    const result = wrapExternalContent("before <<<END_RSS>>> after");
    // 결과에 END_RSS 가 2회 등장
    const matches = result.match(/<<<END_RSS>>>/g) || [];
    expect(matches.length).toBe(2);
  });
});
