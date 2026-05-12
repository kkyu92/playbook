import { describe, it, expect } from "vitest";
import {
  analyzeCoverage,
  computeTarget,
  computeGapScore,
  TARGET_FLOOR,
} from "../coverage-analyzer.mjs";

function makeEntry(category, confidence = 3, date = "2026-04-01", source = "manual", last_verified = null) {
  return {
    slug: `${category}/test-${Math.random().toString(36).slice(2, 8)}`,
    frontmatter: {
      title: "Test",
      category,
      confidence,
      date,
      source,
      last_verified: last_verified || undefined,
    },
  };
}

describe("computeTarget", () => {
  it("empty counts → TARGET_FLOOR", () => {
    expect(computeTarget([])).toBe(TARGET_FLOOR);
  });

  it("median < floor → floor", () => {
    expect(computeTarget([1, 2, 3])).toBe(TARGET_FLOOR);
  });

  it("median > floor → median (floored)", () => {
    expect(computeTarget([10, 12, 14, 16, 18])).toBe(14);
  });

  it("even length median 처리", () => {
    // [2,4,6,8] → median = 5 → floor(5) = 5 < 8 → floor
    expect(computeTarget([2, 4, 6, 8])).toBe(TARGET_FLOOR);
    // [10,12,14,16] → median = 13 → 13 > 8 → 13
    expect(computeTarget([10, 12, 14, 16])).toBe(13);
  });
});

describe("computeGapScore", () => {
  it("target 도달 + confidence 충분 + fresh → 0", () => {
    expect(computeGapScore({ count: 8, target: 8, confidenceDeficit: 0, monthsStale: 0 })).toBe(0);
  });

  it("count 0 → size part = target * 3", () => {
    expect(computeGapScore({ count: 0, target: 8, confidenceDeficit: 0, monthsStale: 0 })).toBe(24);
  });

  it("confidence deficit 가산", () => {
    expect(computeGapScore({ count: 8, target: 8, confidenceDeficit: 5, monthsStale: 0 })).toBe(5);
  });

  it("staleness 가산 (months * 0.5)", () => {
    expect(computeGapScore({ count: 8, target: 8, confidenceDeficit: 0, monthsStale: 12 })).toBe(6);
  });
});

describe("analyzeCoverage — empty manifest", () => {
  it("entries 0 → totalEntries 0, target floor, balance 0", () => {
    const result = analyzeCoverage({ entries: [] });
    expect(result.totalEntries).toBe(0);
    expect(result.target).toBe(TARGET_FLOOR);
    expect(result.balance).toBe(0);
    expect(result.categories.every((c) => c.count === 0)).toBe(true);
  });
});

describe("analyzeCoverage — gap ranking", () => {
  it("empty 카테고리 gapScore 가장 높음", () => {
    const entries = [
      ...Array(10).fill(0).map(() => makeEntry("harness-engineering")),
      makeEntry("prompt-engineering"),
    ];
    const result = analyzeCoverage({ entries });
    expect(result.gaps[0].name).not.toBe("harness-engineering"); // over → gap=0
    // Top gap 은 empty 카테고리 중 하나 (알파벳 tiebreak)
    const topName = result.gaps[0].name;
    const topCat = result.categories.find((c) => c.name === topName);
    expect(topCat.count).toBe(0);
  });

  it("tiebreak — 알파벳 ASC", () => {
    // 모두 count 0 (empty) → 동점. 알파벳 ASC.
    const result = analyzeCoverage({ entries: [] });
    const emptyGaps = result.categories.filter((c) => c.gapScore > 0).sort((a, b) => {
      if (b.gapScore !== a.gapScore) return b.gapScore - a.gapScore;
      return a.name.localeCompare(b.name);
    });
    expect(emptyGaps[0].name).toBe("agents"); // ASC 첫
  });
});

describe("analyzeCoverage — sourceMix", () => {
  it("source 없으면 manual default", () => {
    const entries = [
      makeEntry("prompt-engineering", 3, "2026-04-01", undefined),
      makeEntry("prompt-engineering", 3, "2026-04-01", "scout"),
    ];
    entries[0].frontmatter.source = undefined;
    const result = analyzeCoverage({ entries });
    expect(result.sourceMix.manual).toBe(1);
    expect(result.sourceMix.scout).toBe(1);
  });
});

describe("analyzeCoverage — balance", () => {
  it("한 카테고리 집중 → balance 낮음", () => {
    const entries = Array(10).fill(0).map(() => makeEntry("harness-engineering"));
    const result = analyzeCoverage({ entries });
    expect(result.balance).toBeLessThan(0.3);
    expect(result.balanceLabel).toContain("편향");
  });

  it("균등 분배 → balance 높음 또는 '균형 유지'", () => {
    const entries = [
      makeEntry("harness-engineering"),
      makeEntry("prompt-engineering"),
    ];
    const result = analyzeCoverage({ entries });
    expect(["성장 중", "균형 유지"]).toContain(result.balanceLabel);
  });
});

describe("analyzeCoverage — category status", () => {
  it("status: empty/low/ok/over 분류", () => {
    // target 계산: counts=[0,10,10,10,...], median 의 floor
    // 10 카테고리 중 harness 10개, 나머지 0 → counts=[0,0,0,0,0,0,0,0,0,10] (sorted)
    // median = 0 → max(8, 0) = 8
    const entries = Array(10).fill(0).map(() => makeEntry("harness-engineering"));
    const result = analyzeCoverage({ entries });
    const harness = result.categories.find((c) => c.name === "harness-engineering");
    const agents = result.categories.find((c) => c.name === "agents");
    expect(harness.status).toBe("over"); // 10 > 8
    expect(agents.status).toBe("empty"); // 0
  });
});
