import { Header } from "@/components/header";
import { PROJECTS } from "@/config/projects";
import { getProjectStatus, type ProjectStatus } from "@/lib/github-projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "프로젝트 관제탑 — 워커 프로젝트들의 실시간 상태",
};

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

function CIBadge({ conclusion }: { conclusion: string | null }) {
  if (!conclusion) return <span className="text-yellow-400">● 진행중</span>;
  if (conclusion === "success") return <span className="text-green-400">✓ 성공</span>;
  if (conclusion === "failure") return <span className="text-red-400">✗ 실패</span>;
  return <span className="text-gray-400">○ {conclusion}</span>;
}

function ProjectCard({ status }: { status: ProjectStatus }) {
  const { project, commits, pullRequests, ciRuns, repoInfo, error } = status;

  if (error) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-bold text-[var(--text)]">{project.name}</h2>
        <p className="mt-2 text-[var(--text-secondary)]">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--text)]">{project.name}</h2>
          <p className="text-sm text-[var(--text-secondary)]">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
          >
            사이트
          </a>
          <a
            href={`https://github.com/${project.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Repo Info */}
      {repoInfo && (
        <div className="flex gap-4 text-sm text-[var(--text-secondary)]">
          <span>{repoInfo.language}</span>
          <span>이슈 {repoInfo.openIssues}개</span>
          <span>업데이트 {timeAgo(repoInfo.updatedAt)}</span>
        </div>
      )}

      {/* CI Status */}
      {ciRuns.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">CI/CD</h3>
          <div className="space-y-1">
            {ciRuns.slice(0, 3).map((run, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <CIBadge conclusion={run.conclusion} />
                  <a
                    href={run.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text)] hover:underline truncate max-w-[300px]"
                  >
                    {run.name}
                  </a>
                </div>
                <span className="text-[var(--text-secondary)]">{timeAgo(run.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Commits */}
      {commits.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">최근 커밋</h3>
          <div className="space-y-1">
            {commits.map((commit, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <code className="text-[var(--accent)] shrink-0">{commit.sha}</code>
                  <span className="text-[var(--text)] truncate">{commit.message}</span>
                </div>
                <span className="text-[var(--text-secondary)] shrink-0 ml-2">{timeAgo(commit.date)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pull Requests */}
      {pullRequests.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">PR</h3>
          <div className="space-y-1">
            {pullRequests.slice(0, 3).map((pr) => (
              <div key={pr.number} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={
                      pr.state === "open"
                        ? "text-green-400"
                        : pr.state === "closed"
                          ? "text-red-400"
                          : "text-purple-400"
                    }
                  >
                    #{pr.number}
                  </span>
                  <a
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text)] hover:underline truncate"
                  >
                    {pr.title}
                  </a>
                </div>
                <span className="text-[var(--text-secondary)] shrink-0 ml-2">{timeAgo(pr.updatedAt)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Production Link */}
      <div className="pt-2 border-t border-[var(--border)]">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--accent)] hover:underline"
        >
          {project.url} →
        </a>
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  const statuses: ProjectStatus[] = await Promise.all(
    PROJECTS.map((p) => getProjectStatus(p))
  );

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--text)]">프로젝트 관제탑</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            워커 프로젝트들의 실시간 상태. 5분마다 갱신.
          </p>
        </div>

        {statuses.length === 0 ? (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
            <p className="text-[var(--text-secondary)]">
              프로젝트를 추가하세요. src/config/projects.ts에서 설정.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {statuses.map((status) => (
              <ProjectCard key={status.project.repo} status={status} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
