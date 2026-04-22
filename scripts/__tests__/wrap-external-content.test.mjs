import { describe, it, expect } from "vitest";
import { wrapExternalContent, isDailyQuotaError } from "../lib/gemini-client.mjs";

describe("isDailyQuotaError — daily vs transient 분기", () => {
  it("'limit: 0' 포함 → daily quota", () => {
    const err = new Error("Quota exceeded for metric: generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash");
    expect(isDailyQuotaError(err)).toBe(true);
  });

  it("'PerDayPerProjectPerModel' 포함 → daily quota", () => {
    const err = new Error('quotaId: "GenerateRequestsPerDayPerProjectPerModel-FreeTier"');
    expect(isDailyQuotaError(err)).toBe(true);
  });

  it("일반 503 → daily 아님", () => {
    expect(isDailyQuotaError(new Error("503 Service Unavailable"))).toBe(false);
  });

  it("per-minute rate limit → daily 아님 (backoff 로 복구)", () => {
    expect(isDailyQuotaError(new Error("Please retry in 4s"))).toBe(false);
  });

  it("일반 429 단독 → daily 아님 (limit/PerDay 없음)", () => {
    expect(isDailyQuotaError(new Error("429 Too Many Requests"))).toBe(false);
  });

  it("string err 지원", () => {
    expect(isDailyQuotaError("limit: 0 model: gemini")).toBe(true);
  });
});

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
