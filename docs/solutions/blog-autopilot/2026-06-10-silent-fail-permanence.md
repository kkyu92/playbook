---
category: blog-autopilot
slug: silent-fail-permanence
status: 항구화 완료
N: 3
first_seen: 2026-05-27
last_seen: 2026-06-09
ship_commit: blog-autopilot@35dae95
---

# blog-autopilot 게시 cron silent-fail 항구화 (N=3)

## N=3 도달 evidence

| # | 시점 | issue | run |
|---|---|---|---|
| 1 | 2026-05-27 | #118 | 26530928245 |
| 2 | 2026-05-31 | #152 | 26727366308 |
| 3 | 2026-06-09 | #199 | 27226752486 |

3건 모두 동일 패턴: `timeout-minutes: 180` 도달 cancelled. 약 ~10일 주기 outlier 재발.

## 항구화 fix

`.github/workflows/auto-publish.yml`:
```yaml
- timeout-minutes: 180  # 162min baseline + 18min 마진 부족 (outlier ≥30min slot 시 SIGKILL)
+ timeout-minutes: 240  # 162min baseline + 78min 마진 (outlier 대응)
```

ship: blog-autopilot@35dae95 (hub cycle 1072 closed-loop-design)

## 후속 검토 (N=5+ 재발 시)

- slot parallel execution (9 sequential → 3 batch × 3 parallel) = total ~60min
- slot 분할 workflow (1 cron 1 slot) = timeout 무관
- 240min 도달 시 = slot 자체 hang 의심, 별도 root cause 진단

## 본 항구화 status

- 240min 마진 첫 cron fire 후 silent-fail 재발 없으면 항구화 OK
- 재발 시 위 후속 검토 진행
