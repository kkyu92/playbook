"use client";

import Link from "next/link";

interface JournalEntry {
  slug: string;
  episode: number;
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    tags?: string[];
  };
}

interface HarnessJournalClientProps {
  episodes: JournalEntry[];
  firstDate?: string;
  lastDate?: string;
}

export function HarnessJournalClient({
  episodes,
  firstDate,
  lastDate,
}: HarnessJournalClientProps) {
  return (
    <>
      {/* Stats */}
      <div className="rounded-[var(--radius-md)] border border-accent/20 bg-accent/5 p-5 mb-8">
        <div className="flex flex-wrap items-start gap-6 text-sm">
          <div>
            <div className="text-xs text-muted">총 에피소드</div>
            <div className="font-data text-2xl font-semibold text-text">{episodes.length}</div>
          </div>
          {firstDate && (
            <div>
              <div className="text-xs text-muted">시작</div>
              <div className="font-data text-base font-medium text-text">{firstDate}</div>
            </div>
          )}
          {lastDate && (
            <div>
              <div className="text-xs text-muted">마지막 업데이트</div>
              <div className="font-data text-base font-medium text-text">{lastDate}</div>
            </div>
          )}
          <div className="flex-1 min-w-[200px] text-xs text-muted leading-relaxed border-l border-border pl-4">
            Compound Engineering 원칙 —{" "}
            <span className="text-text font-semibold">
              행동에 박는 가드 &gt; 기억에 의존하는 가드
            </span>
          </div>
        </div>
      </div>

      {/* Episode timeline */}
      {episodes.length > 0 ? (
        <div className="space-y-6">
          {episodes.map((entry, idx) => {
            const isLast = idx === episodes.length - 1;
            return (
              <div key={entry.slug} className="relative">
                {!isLast && (
                  <div
                    className="absolute left-[39px] top-[80px] w-[2px] h-[calc(100%-40px)] bg-border"
                    aria-hidden="true"
                  />
                )}
                <Link
                  href={`/wiki/${entry.slug}`}
                  className="flex gap-5 items-start group"
                >
                  <div className="shrink-0 h-20 w-20 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center group-hover:bg-accent/15 group-hover:border-accent transition-colors">
                    <div className="text-center">
                      <div className="text-[10px] text-muted font-code uppercase">Ep</div>
                      <div className="font-data text-2xl font-bold text-accent">
                        {String(entry.episode).padStart(3, "0")}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 rounded-[var(--radius-md)] border border-border bg-surface p-5 group-hover:border-accent transition-colors">
                    <div className="text-xs text-muted font-code mb-1">
                      {entry.frontmatter.date}
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {entry.frontmatter.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {entry.frontmatter.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {(entry.frontmatter.tags || []).slice(0, 6).map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full bg-bg px-2 py-0.5 text-[10px] text-muted font-code border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-muted py-12">
          아직 에피소드가 없습니다.
        </div>
      )}
    </>
  );
}
