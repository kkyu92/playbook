import Link from "next/link";
import type { Metadata } from "next";
import { getManifest } from "@/lib/content";
import { analyzeCoverage, type CoverageResult, type CoverageCategory } from "@/lib/coverage";
import { EmptyState } from "./empty-state";
import styles from "./dashboard.module.css";

const STATUS_MAP: Record<string, { card: string; badge: string; fill: string }> = {
  empty: { card: styles.catEmpty, badge: styles.badgeEmpty, fill: styles.fillEmpty },
  low:   { card: styles.catLow,   badge: styles.badgeLow,   fill: styles.fillLow },
  ok:    { card: styles.catOk,    badge: styles.badgeOk,    fill: styles.fillOk },
  over:  { card: styles.catOver,  badge: styles.badgeOver,  fill: styles.fillOver },
};
const SOURCE_MAP: Record<"scout" | "gap-pull" | "manual", { className: string; cssVar: string }> = {
  scout:    { className: styles.sourceScout, cssVar: "var(--d-scout)" },
  "gap-pull": { className: styles.sourceGap, cssVar: "var(--d-gap)" },
  manual:   { className: styles.sourceManual, cssVar: "var(--d-manual)" },
};
const SOURCE_KEYS = Object.keys(SOURCE_MAP) as Array<keyof typeof SOURCE_MAP>;
const DOT_STYLE = { display: "inline-block", width: 8, height: 8, borderRadius: 2, marginRight: 6, verticalAlign: "middle" as const };

export const metadata: Metadata = {
  title: "Playbook Health",
  description: "Wiki coverage / 갭 분석 / source mix / staleness",
  alternates: { canonical: "/dashboard" },
};

const CATEGORY_SUBS: Record<string, string> = {
  "prompt-engineering": "프롬프트 설계 / 버전 관리",
  "context-engineering": "컨텍스트 주입 / 관리 전략",
  "harness-engineering": "자동화 / 드리프트 / 복리성장",
  agents: "에이전트 / MCP / 오케스트레이션",
  evaluation: "평가 / 벤치마크 / 품질 지표",
  infrastructure: "Sentry / 관측성 / CI-CD",
  "frontend-ai": "iOS / React / React Native",
  "project-ops": "릴리즈 / 모노레포 / 운영",
  "data-engineering": "파이프라인 / 임베딩 / 벡터",
  reports: "회고 / 리포트",
};

function buildDateRange(base: Date, count: number, ascending = false): string[] {
  const dates = Array.from({ length: count }, (_, i) => {
    const d = new Date(base);
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  });
  return ascending ? dates.reverse() : dates;
}

function formatCount(n: number): string {
  if (n < 1000) return String(n);
  if (n < 10_000) return `${(n / 1000).toFixed(1)}k`;
  return `${Math.round(n / 1000)}k`;
}

function formatKstNow(): string {
  return new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).replace(/\.\s/g, "-").replace(/\.$/, "");
}

function daysAgoLabel(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  const diff = Math.round((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "TODAY";
  if (diff === 1) return "YESTERDAY";
  return dateStr;
}

function CategoryCoverage({ coverage, medianVal, binding }: { coverage: CoverageResult; medianVal: number; binding: string }) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>Category Coverage</span>
        <span className={styles.panelNote}>
          {coverage.categories.length} categories · target {coverage.target} ({binding}: floor {coverage.targetFloor} · median {medianVal})
        </span>
      </div>
      <div className={styles.catGrid}>
        {coverage.categories.map((c: CoverageCategory) => {
          const pct = Math.min(100, coverage.target > 0 ? Math.round((c.count / coverage.target) * 100) : 0);
          const gapDelta = c.count - coverage.target;
          const sm = STATUS_MAP[c.status];
          return (
            <Link
              key={c.name}
              href={`/wiki#category-${c.name}`}
              className={`${styles.catCard} ${sm.card}`}
            >
              <div className={styles.catTopRow}>
                <div>
                  <div className={styles.catName}>{c.name}</div>
                  <div className={styles.catSub}>{CATEGORY_SUBS[c.name] || ""}</div>
                </div>
                <span className={`${styles.catBadge} ${sm.badge}`}>
                  {c.status.toUpperCase()}
                </span>
              </div>
              <div className={styles.catBottomRow}>
                <div className={styles.catCountRow}>
                  <span className={styles.catCount}>{c.count}</span>
                  <span className={styles.catTarget}>/ {coverage.target}</span>
                </div>
                <div className={styles.catBar}>
                  <div
                    className={`${styles.catFill} ${sm.fill}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className={styles.catMeta}>
                  conf {c.count > 0 ? c.avgConfidence.toFixed(1) : "—"} · gap {gapDelta >= 0 ? `+${gapDelta}` : gapDelta}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function RecentAdditions({ entries, today }: { entries: ReturnType<typeof getManifest>["entries"]; today: Date }) {
  const days = buildDateRange(today, 3);

  const byDate: Record<string, typeof entries> = {};
  for (const d of days) byDate[d] = [];
  for (const e of entries) {
    if (byDate[e.frontmatter.date]) byDate[e.frontmatter.date].push(e);
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>Recent Additions</span>
        <span className={styles.panelNote}>last 3 days</span>
      </div>
      {days.map((d) => {
        const items = byDate[d];
        const label = daysAgoLabel(d);
        return (
          <div key={d} className={styles.recentGroup}>
            <div className={styles.recentDate}>
              {label === d ? d : `${label} · ${d}`}
            </div>
            {items.length === 0 ? (
              <div className={styles.recentEmpty}>no entries added</div>
            ) : (
              items.map((e) => {
                const rawSrc = e.frontmatter.source || "manual";
                const src = (rawSrc in SOURCE_MAP ? rawSrc : "manual") as keyof typeof SOURCE_MAP;
                return (
                  <div key={e.slug} className={styles.recentItem}>
                    <Link href={`/wiki/${e.slug}`} className={styles.recentItemTitle}>
                      {e.frontmatter.title}
                    </Link>
                    <div className={styles.recentItemMeta}>
                      <span>{e.frontmatter.category}</span>
                      <span className={`${styles.sourceTag} ${SOURCE_MAP[src].className}`}>{rawSrc}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        );
      })}
    </div>
  );
}

function GrowthChart({ entries, today }: { entries: ReturnType<typeof getManifest>["entries"]; today: Date }) {
  const days = buildDateRange(today, 30, true);

  const counts: Record<string, { scout: number; "gap-pull": number; manual: number }> = {};
  for (const d of days) counts[d] = { scout: 0, "gap-pull": 0, manual: 0 };

  for (const e of entries) {
    const date = e.frontmatter.date;
    if (!counts[date]) continue;
    const src = (e.frontmatter.source || "manual") as "scout" | "gap-pull" | "manual";
    if (src in counts[date]) counts[date][src]++;
  }

  const total30 = days.reduce((acc, d) => acc + counts[d].scout + counts[d]["gap-pull"] + counts[d].manual, 0);
  const maxCount = Math.max(1, ...days.map((d) => counts[d].scout + counts[d]["gap-pull"] + counts[d].manual));
  const pxPerCount = 60 / maxCount;

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>Growth — last 30 days</span>
        <span className={styles.panelNote}>+{total30} entries</span>
      </div>
      <div className={styles.growthRow}>
        {days.map((d) => {
          const c = counts[d];
          return (
            <div key={d} className={styles.growthBar} title={`${d}: ${c.scout + c["gap-pull"] + c.manual}`}>
              {c.scout > 0 && <span style={{ background: SOURCE_MAP.scout.cssVar, height: c.scout * pxPerCount }} />}
              {c["gap-pull"] > 0 && <span style={{ background: SOURCE_MAP["gap-pull"].cssVar, height: c["gap-pull"] * pxPerCount }} />}
              {c.manual > 0 && <span style={{ background: SOURCE_MAP.manual.cssVar, height: c.manual * pxPerCount }} />}
            </div>
          );
        })}
      </div>
      <div className={styles.growthAxis}>
        <span>{days[0]}</span>
        <span>{days[14]}</span>
        <span>{days[29]}</span>
      </div>
      <div className={styles.legendInline}>
        {SOURCE_KEYS.map((src) => (
          <span key={src}><span style={{ ...DOT_STYLE, background: SOURCE_MAP[src].cssVar }} />{src}</span>
        ))}
      </div>
    </div>
  );
}

function SourceMix({ sourceMix, total }: { sourceMix: { scout: number; "gap-pull": number; manual: number }; total: number }) {
  const CIRC = 100; // stroke-dasharray fraction denominator
  const scoutPct = total > 0 ? (sourceMix.scout / total) * CIRC : 0;
  const gapPct = total > 0 ? (sourceMix["gap-pull"] / total) * CIRC : 0;
  const manualPct = total > 0 ? (sourceMix.manual / total) * CIRC : 0;

  const scoutOffset = 0;
  const gapOffset = -scoutPct;
  const manualOffset = -(scoutPct + gapPct);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>Source Mix</span>
        <span className={styles.panelNote}>{total} entries</span>
      </div>
      <div className={styles.donutWrap}>
        <svg className={styles.donut} viewBox="0 0 42 42">
          <circle cx="21" cy="21" r="15.91" fill="transparent" stroke="var(--d-surface-2)" strokeWidth="5" />
          {sourceMix.scout > 0 && (
            <circle cx="21" cy="21" r="15.91" fill="transparent"
              stroke={SOURCE_MAP.scout.cssVar} strokeWidth="5"
              strokeDasharray={`${scoutPct} ${CIRC - scoutPct}`}
              strokeDashoffset={scoutOffset}
              transform="rotate(-90 21 21)" />
          )}
          {sourceMix["gap-pull"] > 0 && (
            <circle cx="21" cy="21" r="15.91" fill="transparent"
              stroke={SOURCE_MAP["gap-pull"].cssVar} strokeWidth="5"
              strokeDasharray={`${gapPct} ${CIRC - gapPct}`}
              strokeDashoffset={gapOffset}
              transform="rotate(-90 21 21)" />
          )}
          {sourceMix.manual > 0 && (
            <circle cx="21" cy="21" r="15.91" fill="transparent"
              stroke={SOURCE_MAP.manual.cssVar} strokeWidth="5"
              strokeDasharray={`${manualPct} ${CIRC - manualPct}`}
              strokeDashoffset={manualOffset}
              transform="rotate(-90 21 21)" />
          )}
        </svg>
        <div className={styles.donutLegend}>
          {SOURCE_KEYS.map((src) => {
            const count = sourceMix[src];
            return (
              <div key={src} className="row" style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span><span style={{ ...DOT_STYLE, background: SOURCE_MAP[src].cssVar }} />{src}</span>
                <span className="num" style={{ color: "var(--d-muted)", fontVariantNumeric: "tabular-nums" }}>
                  {count} · {Math.round((count / Math.max(1, total)) * 100)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StaleRow({ staleEntries }: { staleEntries: CoverageResult["staleEntries"] }) {
  const count = staleEntries.length;
  return (
    <div className={styles.staleFull}>
      <div className={styles.staleLeft}>
        <span className={styles.staleTitle}>Stale · last_verified &gt; 6mo</span>
        {count === 0 ? (
          <>
            <span className={styles.okDot} />
            <span className={styles.staleStatus}>모든 엔트리가 최근 6개월 내 검증됨</span>
          </>
        ) : (
          <span className={styles.staleStatus}>
            {staleEntries.slice(0, 3).map((e) => e.frontmatter.title).join(", ")}
            {count > 3 ? ` 외 ${count - 3}개` : ""}
          </span>
        )}
      </div>
      <span className={styles.staleCount}>{count} entries</span>
    </div>
  );
}

function computeMedian(counts: number[]): number {
  if (counts.length === 0) return 0;
  const sorted = [...counts].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const m = sorted.length % 2
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
  return Math.floor(m);
}

export default function DashboardPage() {
  const manifest = getManifest();
  const coverage = analyzeCoverage(manifest) as CoverageResult;

  if (coverage.totalEntries === 0) return <EmptyState />;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split("T")[0];
  const todayCount = manifest.entries.filter((e) => e.frontmatter.date === todayStr).length;

  // coverage-analyzer returns target but not median directly — recompute for display
  const medianVal = computeMedian(coverage.categories.map((c) => c.count));
  const binding = coverage.target === coverage.targetFloor ? "floor" : "median";

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <header className={styles.top}>
          <h1 className={styles.h1Title}>
            <span className={styles.slash}>/</span>playbook-health
          </h1>
          <div className={styles.sync}>last sync · {formatKstNow()} KST</div>
        </header>

        <div className={styles.statusStrip}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>total entries</span>
            <span className={styles.statNum}>{formatCount(coverage.totalEntries)}</span>
            <span className={`${styles.statDelta} ${todayCount > 0 ? styles.statDeltaOk : ""}`}>
              {todayCount > 0 ? `+${todayCount} today` : "no new today"}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>target / cat</span>
            <span className={styles.statNum}>{coverage.target}</span>
            <span className={styles.statDelta}>
              {binding}: floor {coverage.targetFloor} · median {medianVal}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>balance</span>
            <span className={styles.statNum}>{coverage.balance.toFixed(2)}</span>
            <span className={styles.statDelta}>{coverage.balanceLabel}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>stale</span>
            <span className={styles.statNum}>{coverage.staleEntries.length}</span>
            <span className={styles.statDelta}>
              {coverage.staleEntries.length === 0 ? "all fresh" : "needs verify"}
            </span>
          </div>
        </div>

        <div className={styles.main}>
          <CategoryCoverage coverage={coverage} medianVal={medianVal} binding={binding} />
          <RecentAdditions entries={manifest.entries} today={today} />
        </div>

        <div className={styles.bottom}>
          <GrowthChart entries={manifest.entries} today={today} />
          <SourceMix sourceMix={coverage.sourceMix} total={coverage.totalEntries} />
        </div>

        <StaleRow staleEntries={coverage.staleEntries} />
      </div>
    </div>
  );
}
