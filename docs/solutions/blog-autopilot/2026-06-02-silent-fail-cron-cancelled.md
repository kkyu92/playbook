---
category: blog-autopilot
slug: silent-fail-cron-cancelled
status: 관찰 중
N: 2
first_seen: 2026-05-27
last_seen: 2026-06-02
---

# blog-autopilot 게시 cron silent-fail (cancelled)

## 증상

blog-autopilot auto-publish workflow 가 exit 0 success 보고 X — `cancelled` status 로 종료. 일부 niche/slot 미발행. silent fail risk label issue 자동 생성.

## 재발 이력 (N=2)

| # | 시점 | run | issue | 원인 추정 |
|---|---|---|---|---|
| 1 | 2026-05-27T22:07:04Z | #26530928245 | blog-autopilot#118 | timeout-minutes 180min 도달 또는 manual cancel |
| 2 | 2026-06-02 추정 | #26727366308 | blog-autopilot#152 | 동일 패턴 |

## 원인

`auto-publish` workflow `timeout-minutes: 180` (3시간) 한도 도달 시 GitHub Actions 가 `cancelled` 상태로 종료. exit 0 성공 보고 X — silent fail.

## 영향

- expected(15 slots) vs actual count 차이만큼 silent fail
- 미발행 niche/slot 회수 manual workflow_dispatch 필요
- 본 issue 자동 생성 = silent-fail 감지 layer 작동 (정상)

## 대응

### 임시 (manual)

1. `gh run view <run_id> --log` — 어느 슬롯에서 끊겼는지 확인
2. `sqlite3 $DATABASE_PATH "SELECT id, niche, keyword, status, published_at FROM published_posts WHERE published_at >= '<start_time>' ORDER BY id DESC"` — 실제 발행 row 확인
3. expected 와 actual 차이 = silent fail count
4. 미처리 niche/slot 만 manual workflow_dispatch 회수

### 항구화 (N=3+ 누적 시)

- timeout-minutes 늘리기 (180 → 240) — 시간 마진 확보
- slot 별 분할 workflow — 1 workflow 1 slot 패턴으로 timeout 회피
- 또는 cancel 감지 시 자동 회수 workflow chain

## 승격 조건

N=3 누적 시 _compiled-truth.md 작성 + 본 영역 항구화 (lib/script 또는 workflow yaml fix) 검토.
