// scripts/coverage-analyzer.mjs TypeScript wrapper.
// 이유: dashboard (src/app/...) 에서 scripts/ 를 직접 import 할 때 TS 타입이 any. 여기서 한 번 typed.
// 런타임은 scripts/coverage-analyzer.mjs 그대로 재사용.

export { analyzeCoverage } from "../../scripts/coverage-analyzer.mjs";

export type CoverageCategory = {
  name: string;
  count: number;
  avgConfidence: number;
  lowConfidenceCount: number;
  confidenceDeficit: number;
  oldestVerified: string | null;
  monthsStale: number;
  gapScore: number;
  status: "empty" | "low" | "ok" | "over";
};

export type CoverageResult = {
  totalEntries: number;
  target: number;
  targetFloor: number;
  balance: number;
  balanceLabel: string;
  categories: CoverageCategory[];
  gaps: CoverageCategory[];
  staleEntries: Array<{
    slug: string;
    frontmatter: {
      title: string;
      category: string;
      last_verified?: string;
      date: string;
    };
  }>;
  sourceMix: { scout: number; "gap-pull": number; manual: number };
};
