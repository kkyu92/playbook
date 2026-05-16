import { Suspense } from "react";
import { getManifest } from "@/lib/content";
import { CONFIDENCE_RANGE } from "@/lib/schema";
import { KnowledgeGraph } from "@/components/knowledge-graph";
import { MobileCategories } from "@/components/mobile-categories";
import { Header } from "@/components/header";

function GraphSkeleton() {
  return (
    <div className="h-full w-full animate-pulse bg-surface/30 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {CONFIDENCE_RANGE.map((i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full bg-border animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
        <p className="text-sm text-muted">그래프 로딩 중...</p>
      </div>
    </div>
  );
}

export default function Home() {
  const manifest = getManifest();
  const entryCount = manifest.entries.length;
  const roadmapCount = manifest.stats?.roadmapCount ?? 0;
  const avgConfidence =
    entryCount > 0
      ? (
          manifest.entries.reduce(
            (sum, e) => sum + e.frontmatter.confidence,
            0
          ) / entryCount
        ).toFixed(1)
      : "0";
  const categories = new Set(manifest.entries.map((e) => e.frontmatter.category));

  return (
    <div className="min-h-screen bg-bg">
      <Header fixed />

      {/* Graph hero — desktop */}
      <div
        className="hidden lg:block"
        style={{ height: "calc(100vh - 56px)", marginTop: 56 }}
      >
        <Suspense fallback={<GraphSkeleton />}>
          <KnowledgeGraph
            nodes={manifest.graph.nodes}
            edges={manifest.graph.edges}
          />
        </Suspense>
      </div>

      {/* Mobile categories — mobile/tablet */}
      <div className="lg:hidden pt-14">
        <div className="px-4 py-6">
          <h2 className="font-display text-3xl font-black tracking-tight mb-2">
            Playbook Hub
          </h2>
          <p className="text-muted mb-6">
            개인 지식 허브 + 프로젝트 관제탑 — AI 에이전트 활용 패턴을 엔트리로 누적
          </p>
        </div>
        <MobileCategories manifest={manifest} />
      </div>

      {/* Stats bar */}
      <div className="border-t border-border bg-surface/50 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-8 px-4 py-3">
          <div className="text-center">
            <div className="font-data text-lg font-semibold text-text">
              {entryCount}
              <span className="text-sm text-muted font-normal">
                /{entryCount + roadmapCount}
              </span>
            </div>
            <div className="text-xs text-muted">작성 / 전체</div>
          </div>
          <div className="text-center">
            <div className="font-data text-lg font-semibold text-text">
              {roadmapCount}
            </div>
            <div className="text-xs text-muted">예정</div>
          </div>
          <div className="text-center">
            <div className="font-data text-lg font-semibold text-text">
              {categories.size}
            </div>
            <div className="text-xs text-muted">카테고리</div>
          </div>
          <div className="text-center">
            <div className="font-data text-lg font-semibold text-text">
              {avgConfidence}
            </div>
            <div className="text-xs text-muted">평균 Confidence</div>
          </div>
        </div>
      </div>
    </div>
  );
}
