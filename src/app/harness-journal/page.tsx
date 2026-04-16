import Link from "next/link";
import { Header } from "@/components/header";
import { getManifest } from "@/lib/content";
import { HarnessJournalClient } from "./harness-journal-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playbook Journal",
  description:
    "프로젝트 운영과 AI 엔지니어링 학습을 한 사이클씩 기록하는 저널 시리즈.",
};

function extractEpisodeNumber(slug: string, prefix: string): number | null {
  const escaped = prefix.replace(/-/g, "\\-");
  const match = slug.match(new RegExp(`${escaped}(\\d+)`));
  return match ? parseInt(match[1], 10) : null;
}

export default function HarnessJournalPage() {
  const manifest = getManifest();

  // playbook-journal-* 에피소드
  const episodes = manifest.entries
    .filter((e) => {
      const tags = e.frontmatter.tags || [];
      return tags.includes("playbook-journal") || e.slug.includes("playbook-journal-");
    })
    .map((e) => ({
      slug: e.slug,
      frontmatter: e.frontmatter,
      episode: extractEpisodeNumber(e.slug, "playbook-journal-"),
    }))
    .filter((e): e is typeof e & { episode: number } => e.episode !== null)
    .sort((a, b) => a.episode - b.episode);

  const allDates = episodes.map((e) => e.frontmatter.date).filter(Boolean).sort();
  const firstDate = allDates[0];
  const lastDate = allDates[allDates.length - 1];

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-black tracking-tight mb-3">
            Playbook Journal
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-4">
            프로젝트 운영과 AI 엔지니어링 학습을{" "}
            <span className="text-text font-semibold">한 사이클씩</span> 기록하고 박제하는 저널 시리즈.
          </p>
          <p className="text-base text-muted leading-relaxed">
            매 사이클은 한 가지 명확한 변화 + 한 가지 명확한 메시지.
          </p>
        </div>

        {/* Client: 에피소드 목록 */}
        <HarnessJournalClient
          episodes={episodes}
          firstDate={firstDate}
          lastDate={lastDate}
        />

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-border text-sm text-muted leading-relaxed">
          <p>
            저널은{" "}
            <code className="font-code text-xs bg-surface px-1.5 py-0.5 rounded">
              playbook-journal-NNN-...mdx
            </code>{" "}
            형식으로 추가됩니다.
          </p>
          {episodes.length > 0 && (
            <p className="mt-2">
              시리즈 정의와 운영 규칙은{" "}
              <Link
                href={`/wiki/${episodes[0].slug}`}
                className="text-accent hover:underline"
              >
                Episode 000 — 부트스트랩
              </Link>
              을 참조.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
