import type { ProjectConfig } from "@/config/projects";

interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
}

interface PullRequest {
  number: number;
  title: string;
  state: string;
  author: string;
  url: string;
  updatedAt: string;
}

interface WorkflowRun {
  name: string;
  status: string;
  conclusion: string | null;
  url: string;
  createdAt: string;
}

interface Deployment {
  environment: string;
  state: string;
  url: string;
  createdAt: string;
}

export interface ProjectStatus {
  project: ProjectConfig;
  commits: Commit[];
  pullRequests: PullRequest[];
  ciRuns: WorkflowRun[];
  deployments: Deployment[];
  repoInfo: {
    defaultBranch: string;
    updatedAt: string;
    openIssues: number;
    language: string;
  } | null;
  error: string | null;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function githubFetch(endpoint: string) {
  if (!GITHUB_TOKEN) return null;

  try {
    const res = await fetch(`https://api.github.com${endpoint}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 300 }, // ISR 5분
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getProjectStatus(
  project: ProjectConfig
): Promise<ProjectStatus> {
  const { repo } = project;

  const [repoData, commitsData, prsData, runsData, deploymentsData] =
    await Promise.all([
      githubFetch(`/repos/${repo}`),
      githubFetch(`/repos/${repo}/commits?per_page=5`),
      githubFetch(`/repos/${repo}/pulls?state=all&per_page=5&sort=updated`),
      githubFetch(`/repos/${repo}/actions/runs?per_page=5`),
      githubFetch(`/repos/${repo}/deployments?per_page=3`),
    ]);

  const commits: Commit[] = (commitsData ?? []).map(
    (c: Record<string, unknown>) => ({
      sha: (c.sha as string).slice(0, 7),
      message: ((c.commit as Record<string, unknown>)?.message as string)
        ?.split("\n")[0]
        ?.slice(0, 80),
      author:
        (c.author as Record<string, unknown>)?.login ??
        ((c.commit as Record<string, unknown>)?.author as Record<string, unknown>)?.name ??
        "unknown",
      date: ((c.commit as Record<string, unknown>)?.author as Record<string, unknown>)
        ?.date as string,
    })
  );

  const pullRequests: PullRequest[] = (prsData ?? []).map(
    (pr: Record<string, unknown>) => ({
      number: pr.number as number,
      title: ((pr.title as string) ?? "").slice(0, 80),
      state: pr.state as string,
      author: (pr.user as Record<string, unknown>)?.login as string,
      url: pr.html_url as string,
      updatedAt: pr.updated_at as string,
    })
  );

  const workflowRuns = ((runsData as Record<string, unknown>)?.workflow_runs ?? []) as Record<string, unknown>[];
  const ciRuns: WorkflowRun[] = workflowRuns
    .slice(0, 5)
    .map((run: Record<string, unknown>) => ({
      name: run.name as string,
      status: run.status as string,
      conclusion: run.conclusion as string | null,
      url: run.html_url as string,
      createdAt: run.created_at as string,
    }));

  const deployments: Deployment[] = (deploymentsData ?? []).map(
    (d: Record<string, unknown>) => ({
      environment: d.environment as string,
      state: (d.statuses_url ? "active" : "unknown") as string,
      url: d.url as string,
      createdAt: d.created_at as string,
    })
  );

  const repoInfo = repoData
    ? {
        defaultBranch: repoData.default_branch,
        updatedAt: repoData.updated_at,
        openIssues: repoData.open_issues_count,
        language: repoData.language ?? "Unknown",
      }
    : null;

  return {
    project,
    commits,
    pullRequests,
    ciRuns,
    deployments,
    repoInfo,
    error: !GITHUB_TOKEN ? "GITHUB_TOKEN 미설정" : null,
  };
}
