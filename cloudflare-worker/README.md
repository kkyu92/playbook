# Playbook Hub — Cloudflare Cron Worker

GH Actions schedule 의 cluster 충돌·high-load drop 문제 해결.

## 배경

GitHub Actions schedule 은 동시각 다수 cron 충돌 시 일부를 silent drop. 2026-04-28 진단:
- `promotion-scan` (일요일 UTC 21:00): schedule trigger 0건 (한 번도 발사 안 함)
- `weekly-triage` (일요일 UTC 21:05): -3h offset 적용 후 첫 일요일 누락
- `gemini-key-health` (매일 UTC 23:37): 4-27/28 누락

→ Cloudflare Workers Cron Triggers 로 timing 책임 이관. GH Actions 는 실제 작업만 수행.

## 아키텍처

```
[Cloudflare cron]
   ↓ scheduled handler
[POST /repos/.../actions/workflows/{X}/dispatches]
   ↓
[GH Actions workflow run] (기존 코드 그대로)
```

`decideWorkflows(scheduledTime)` 가 시각 → workflow filename 매핑. 같은 시각에 여러 workflow 동시 dispatch 가능.

## 1회 셋업

### 1) 의존성 설치

```bash
cd cloudflare-worker
pnpm install
```

(monorepo 워크스페이스 외 단독 디렉토리.)

### 2) Wrangler 로그인

```bash
npx wrangler login
```

(머니볼 워커와 동일 계정 — 한 번 로그인하면 재사용.)

### 3) Secret 등록

```bash
npx wrangler secret put GH_DISPATCH_PAT
# 프롬프트에 fine-grained PAT 값 붙여넣기
# 권한: Actions = Read and Write, Metadata = Read (그 외 불요)
# Repo: kkyu92/playbook
```

`GH_REPO` 는 `wrangler.toml` `[vars]` 평문.

### 4) 배포

```bash
pnpm deploy
```

Cloudflare 대시보드 → Workers & Pages → `playbook-cron` → Triggers 에서 cron 활성화 확인.

### 5) 헬스체크

```bash
curl https://playbook-cron.<your-subdomain>.workers.dev/health
# {"ok":true,"ts":"2026-04-28T..."}
```

### 6) Cron 매핑 미리보기

```bash
curl 'https://playbook-cron.<sub>.workers.dev/preview?ts=2026-04-26T21:00:00Z'
# {"scheduledTime":"2026-04-26T21:00:00.000Z","workflows":["daily-ingest-geeknews.yml","promotion-scan.yml"]}
```

(일요일 UTC 21:00 → daily-ingest + promotion-scan 동시 dispatch 확인)

### 7) GH Actions schedule 비활성화 (검증 후)

각 workflow 의 `on.schedule` 블록 제거, `workflow_dispatch:` 만 남김. 1주 운영 후 일괄 PR.

## 운영

### 실시간 로그

```bash
npx wrangler tail
```

### 수동 dispatch (디버그)

```bash
curl -X POST 'https://playbook-cron.<sub>.workers.dev/trigger?workflow=pat-expiry-check.yml' \
  -H "Authorization: Bearer $GH_DISPATCH_PAT"
```

## Cron 매핑

wrangler.toml 의 cron 표현식은 **매시 정각 1개** (`0 * * * *`). worker.ts 의 `decideWorkflows` 가 시각별 매핑:

| UTC 시각 | KST | 매핑 workflow |
|---|---|---|
| 09:00 sun | 일요일 18:00 | weekly-report |
| 14:00 매일 | 매일 23:00 | embed-on-push |
| **21:00 매일** | 매일 06:00 | daily-ingest-geeknews (+ 일요일 = promotion-scan + weekly-triage, + 금요일 = pat-expiry-check, + 매월1일 = category-rebalance) |
| 23:00 매일 | 매일 08:00 | gemini-key-health |
| 그 외 20시각 | — | 0개 매핑 (즉시 return) |

총 1 cron trigger → 8 workflow 분기 dispatch.

**Cloudflare Workers Free cron 5개/account 제한** (머니볼 워커 4개 점유 → 우리 1개):
- 매시 fire 24/day × 30 = 720/월 invocation. Free 100k req/day 대비 0.024%, 비용 무관.
- 분 정밀도 손실: gemini-key-health KST 08:37 → 08:00 (37분 차이, 무관).
- 시간 통합 (이미 GH 시절):
  - weekly-triage: 06:05 → 06:00 (5분 차이 무관)
  - category-rebalance: 매월1일 09:00 → 매월1일 06:00 (월 1회 docs 점검, 시각 민감도 0)

## 메타 교훈

T7 (`-3h offset`) 폐기. GitHub scheduler 의 +2~3h 평균 지연 + cluster drop 패턴은 우회 불가능했음. Cloudflare Worker 는 분 단위 정확도 + drop 사실상 0.
