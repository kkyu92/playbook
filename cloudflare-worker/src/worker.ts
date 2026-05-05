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
 * decideWorkflows 가 scheduledTime → workflow filename 배열 매핑.
 * 같은 시각에 여러 workflow 동시 dispatch 가능 (예: 일요일 21:00 = daily-ingest + promotion-scan).
 */

export interface Env {
  GH_REPO: string;
  GH_DISPATCH_PAT: string;
}

function decideWorkflows(scheduledTime: number): string[] {
  // wrangler.toml 의 cron 은 매시 정각 fire 1개. 분 정밀도는 여기서 판정 X (utcMin 항상 0).
  // 시각/요일/날짜만으로 매핑 — 매시 24회 fire 중 4시각만 dispatch, 나머지 즉시 return.
  const d = new Date(scheduledTime);
  const utcHour = d.getUTCHours();
  const utcDay = d.getUTCDay(); // 0=Sun, 5=Fri
  const utcDate = d.getUTCDate();

  const workflows: string[] = [];

  // UTC 00:00 매일 → curate-routine (KST 09:00, 자가 큐레이션 routine: raw-archive + future α-2)
  if (utcHour === 0) {
    workflows.push('curate-routine.yml');
  }

  // UTC 09:00 sun → weekly-report (KST 일요일 18:00)
  if (utcDay === 0 && utcHour === 9) {
    workflows.push('weekly-report.yml');
  }

  // UTC 14:00 매일 → embed-on-push (KST 23:00)
  if (utcHour === 14) {
    workflows.push('embed-on-push.yml');
  }

  // UTC 21:00 매일 → daily-ingest + incident-followup (Phase 4a D5)
  //   (+일요일=promotion-scan+weekly-triage, +금요일=pat-expiry-check, +매월1일=category-rebalance)
  // KST 06:00. 무료 플랜 cron 1개 회피 위해 다중 분기 통합.
  if (utcHour === 21) {
    workflows.push('daily-ingest-geeknews.yml');
    workflows.push('incident-followup.yml');
    if (utcDay === 0) {
      workflows.push('promotion-scan.yml');
      workflows.push('weekly-triage.yml');
    }
    if (utcDay === 5) workflows.push('pat-expiry-check.yml');
    if (utcDate === 1) workflows.push('category-rebalance.yml');
  }

  // UTC 23:00 매일 → gemini-key-health (KST 08:00, 기존 GH 08:37 → 37분 빨라짐, 무관)
  if (utcHour === 23) {
    workflows.push('gemini-key-health.yml');
  }

  return workflows;
}

async function dispatchWorkflow(env: Env, workflow: string): Promise<void> {
  const url = `https://api.github.com/repos/${env.GH_REPO}/actions/workflows/${workflow}/dispatches`;
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GH_DISPATCH_PAT}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'playbook-cron-worker',
      },
      body: JSON.stringify({ ref: 'main' }),
    });
    if (r.status === 204) {
      console.log(`[dispatch] ${workflow} OK`);
      return;
    }
    const body = await r.text().catch(() => '');
    console.error(`[dispatch] ${workflow} FAIL ${r.status} ${body.slice(0, 200)}`);
  } catch (e) {
    console.error(`[dispatch] ${workflow} fetch error:`, e);
  }
}

const handler = {
  async scheduled(
    event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    const workflows = decideWorkflows(event.scheduledTime);
    const ts = new Date(event.scheduledTime).toISOString();

    if (workflows.length === 0) {
      console.warn(`[scheduled] ${ts} no workflow mapped — check decideWorkflows`);
      return;
    }

    console.log(`[scheduled] ${ts} dispatching: ${workflows.join(', ')}`);
    // 모든 dispatch 병렬, 한쪽 실패해도 나머지 진행
    ctx.waitUntil(Promise.all(workflows.map((w) => dispatchWorkflow(env, w))));
  },

  // 헬스체크 + 수동 trigger 엔드포인트
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return Response.json({ ok: true, ts: new Date().toISOString() });
    }

    // GET /preview?ts=2026-04-28T21:00:00Z — 특정 시각이 어느 workflow 매핑되는지 미리보기
    if (url.pathname === '/preview') {
      const tsParam = url.searchParams.get('ts');
      const t = tsParam ? new Date(tsParam).getTime() : Date.now();
      return Response.json({
        scheduledTime: new Date(t).toISOString(),
        workflows: decideWorkflows(t),
      });
    }

    // POST /trigger?workflow=X — 디버그용 수동 dispatch (Bearer auth)
    if (url.pathname === '/trigger' && request.method === 'POST') {
      const auth = request.headers.get('authorization');
      if (auth !== `Bearer ${env.GH_DISPATCH_PAT}`) {
        return new Response('unauthorized', { status: 401 });
      }
      const w = url.searchParams.get('workflow');
      if (!w) return new Response('missing ?workflow=', { status: 400 });
      await dispatchWorkflow(env, w);
      return Response.json({ ok: true, dispatched: w });
    }

    return new Response('playbook-cron', { status: 200 });
  },
};

export default handler;
