/**
 * Playbook Hub — Cloudflare Cron Worker
 *
 * GH Actions schedule 의 cluster 충돌·drop 문제 해결.
 * 이 worker 는 timing 만 담당. 실제 작업은 GH Actions 가 수행.
 *
 * Flow:
 *   [Cloudflare cron] → scheduled handler → POST /workflows/{X}/dispatches
 *                                            → [GH Actions runner] → 실제 작업
 *
 * decideJobs 가 scheduledTime → WorkflowJob 배열 매핑.
 * 같은 시각에 여러 workflow 동시 dispatch 가능 (예: 일요일 21:00 = daily-ingest + promotion-scan).
 */

export interface Env {
  GH_REPO: string;                  // kkyu92/playbook
  GH_DISPATCH_PAT: string;          // playbook 전용 fine-grained PAT
  GH_REPO_SILVER: string;           // kkyu92/silver-autopilot
  GH_DISPATCH_PAT_SILVER: string;   // silver-autopilot 전용 fine-grained PAT
}

interface WorkflowJob {
  workflow: string;
  repo: string;
  pat: string;
}

function decideJobs(scheduledTime: number, env: Env): WorkflowJob[] {
  // wrangler.toml 의 cron 은 매시 정각 fire 1개. 분 정밀도는 여기서 판정 X (utcMin 항상 0).
  // 시각/요일/날짜만으로 매핑 — 매시 24회 fire 중 실제 dispatch 는 필요한 시각만.
  const d = new Date(scheduledTime);
  const utcHour = d.getUTCHours();
  const utcDay = d.getUTCDay(); // 0=Sun, 5=Fri
  const utcDate = d.getUTCDate();

  const jobs: WorkflowJob[] = [];
  const pb = (workflow: string) => ({ workflow, repo: env.GH_REPO, pat: env.GH_DISPATCH_PAT });
  const sv = (workflow: string) => ({ workflow, repo: env.GH_REPO_SILVER, pat: env.GH_DISPATCH_PAT_SILVER });

  // UTC 00:00 매일 → curate-routine (KST 09:00)
  if (utcHour === 0) jobs.push(pb('curate-routine.yml'));

  // UTC 09:00 sun → weekly-report (KST 일요일 18:00)
  if (utcDay === 0 && utcHour === 9) jobs.push(pb('weekly-report.yml'));

  // UTC 14:00 매일 → embed-on-push (KST 23:00)
  if (utcHour === 14) jobs.push(pb('embed-on-push.yml'));

  // UTC 16:00 매일 → silver-autopilot run-pipeline (KST 01:00)
  if (utcHour === 16) jobs.push(sv('run-pipeline.yml'));

  // UTC 21:00 매일 → daily-ingest + incident-followup (KST 06:00)
  //   (+일요일=promotion-scan+weekly-triage, +금요일=pat-expiry-check, +매월1일=category-rebalance)
  if (utcHour === 21) {
    jobs.push(pb('daily-ingest-geeknews.yml'));
    jobs.push(pb('incident-followup.yml'));
    if (utcDay === 0) {
      jobs.push(pb('promotion-scan.yml'));
      jobs.push(pb('weekly-triage.yml'));
    }
    if (utcDay === 5) jobs.push(pb('pat-expiry-check.yml'));
    if (utcDate === 1) jobs.push(pb('category-rebalance.yml'));
  }

  // UTC 23:00 매일 → gemini-key-health (KST 08:00)
  if (utcHour === 23) jobs.push(pb('gemini-key-health.yml'));

  return jobs;
}

async function dispatchWorkflow(job: WorkflowJob): Promise<void> {
  const url = `https://api.github.com/repos/${job.repo}/actions/workflows/${job.workflow}/dispatches`;
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${job.pat}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'playbook-cron-worker',
      },
      body: JSON.stringify({ ref: 'main' }),
    });
    if (r.status === 204) {
      console.log(`[dispatch] ${job.repo}/${job.workflow} OK`);
      return;
    }
    const body = await r.text().catch(() => '');
    console.error(`[dispatch] ${job.repo}/${job.workflow} FAIL ${r.status} ${body.slice(0, 200)}`);
  } catch (e) {
    console.error(`[dispatch] ${job.repo}/${job.workflow} fetch error:`, e);
  }
}

const handler = {
  async scheduled(
    event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    const jobs = decideJobs(event.scheduledTime, env);
    const ts = new Date(event.scheduledTime).toISOString();

    if (jobs.length === 0) {
      console.warn(`[scheduled] ${ts} no workflow mapped — check decideJobs`);
      return;
    }

    console.log(`[scheduled] ${ts} dispatching: ${jobs.map((j) => `${j.repo}/${j.workflow}`).join(', ')}`);
    // 모든 dispatch 병렬, 한쪽 실패해도 나머지 진행
    ctx.waitUntil(Promise.all(jobs.map((j) => dispatchWorkflow(j))));
  },

  // 헬스체크 + 수동 trigger 엔드포인트
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return Response.json({ ok: true, ts: new Date().toISOString() });
    }

    // GET /preview?ts=2026-04-28T16:00:00Z — 특정 시각이 어느 workflow 매핑되는지 미리보기
    if (url.pathname === '/preview') {
      const tsParam = url.searchParams.get('ts');
      const t = tsParam ? new Date(tsParam).getTime() : Date.now();
      const jobs = decideJobs(t, env);
      return Response.json({
        scheduledTime: new Date(t).toISOString(),
        jobs: jobs.map(({ workflow, repo }) => ({ workflow, repo })),
      });
    }

    // POST /trigger?workflow=X&repo=playbook|silver — 디버그용 수동 dispatch (Bearer auth)
    if (url.pathname === '/trigger' && request.method === 'POST') {
      const auth = request.headers.get('authorization');
      if (auth !== `Bearer ${env.GH_DISPATCH_PAT}`) {
        return new Response('unauthorized', { status: 401 });
      }
      const w = url.searchParams.get('workflow');
      if (!w) return new Response('missing ?workflow=', { status: 400 });
      const repoKey = url.searchParams.get('repo');
      const job: WorkflowJob =
        repoKey === 'silver'
          ? { workflow: w, repo: env.GH_REPO_SILVER, pat: env.GH_DISPATCH_PAT_SILVER }
          : { workflow: w, repo: env.GH_REPO, pat: env.GH_DISPATCH_PAT };
      await dispatchWorkflow(job);
      return Response.json({ ok: true, dispatched: `${job.repo}/${w}` });
    }

    return new Response('playbook-cron', { status: 200 });
  },
};

export default handler;
