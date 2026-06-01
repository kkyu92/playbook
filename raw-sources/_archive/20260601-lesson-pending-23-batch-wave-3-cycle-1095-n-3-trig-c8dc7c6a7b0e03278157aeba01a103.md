---
date: "2026-06-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "c8dc7c6a7b0e03278157aeba01a103ad8180fefa"
---


* lesson: lesson-pending 23건 batch wave 3 — hub D5 cron 주간 재발 패턴 (cycle 1095, N=3 trigger)

subtype: lesson
cycle_n: 1095
chain: fix-incident (lite)
wave: 3 (cycle 434 + 669 + 1095)

## 관찰

cycle 1095 진단 lesson-pending label open issue 23건 (#1457~#1479) 분류:
- ci-main-* 13건 (main branch CI flake — PR 머지 자연 회복)
- ci-develop-cycle-* 5건 (워커 자체 워크플로 실패 — Anthropic credit / API flake)
- ci-autoplan-* 1건 (autoplan retrospect 실패)
- ci-test-c2-megamenu-* 2건 (plan #14 megamenu test — ship 후 자연 회복)
- ci-fix-* 2건 (shadow/backfill commit CI flake — PR 머지 자연 회복)

→ 23건 모두 stale, 자연 회복 완료. 워커 실 작업 X.

## N=3 trigger 도달

cycle 434 (15건) → cycle 669 (86건) → cycle 1095 (23건) = 3회 동일 batch 패턴.
cycle 669 lesson body 안 명시 "N=3 도달 시 meta-pattern dispatch 자율 발화 후보" — 본 cycle 정확히 trigger.

## 박제

1. docs/lessons/2026-06-01-lesson-pending-23-batch-wave-3.md
2. 23 issue mass close + comment
3. memory: meta-pattern dispatch (별도 commit, hub D5 cron 영구 재발 evidence)
4. 영구 해결 hub repo 측 workflow 수정 (carry-over, 사용자 결정 영역)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>

* memory: meta-pattern hub-d5-cron-recurring-noise — N=3 trigger 도달 (cycle 434 + 669 + 1095)

subtype: meta-pattern
cycle_n: 1095
trigger: N=3 batch lesson 박제 (cycle 669 lesson 안 명시 "N=3 도달 시 meta-pattern dispatch 자율 발화 후보")

## 패턴 description

hub `incident-followup.yml` D5 cron 이 워커 lesson commit 박제 + reminder close 처리 후에도 동일 fingerprint 의 신규 reminder 를 주간 단위로 재발화. 직전 3회 batch 박제 evidence:

| 박제 cycle | 날짜 | 건수 | 직전 박제와 간격 |
|---|---|---|---|
| 434 | 2026-05-15 | 15 | 첫 박제 |
| 669 | 2026-05-19 | 86 | 4일 (235 cycle, 5.7×) |
| 1095 | 2026-06-01 | 23 | 13일 (426 cycle, 0.27×) |

총 124건 batch lesson 박제 + 워커 close 완료. hub D5 cron 영구 재발 = 워커 자율 영역 영구 해결 불가.

## 증거 (cycle_n list)

- cycle 434 (2026-05-15) — 15건 batch close + lesson docs/lessons/2026-05-15-lesson-pending-batch-resolved-incidents.md
- cycle 669 (2026-05-19) — 86건 batch close + lesson docs/lessons/2026-05-19-lesson-pending-86-batch-recurring-hub-d5-limit.md
- cycle 1095 (2026-06-01) — 23건 batch close + lesson docs/lessons/2026-06-01-lesson-pending-23-batch-wave-3.md

## 추천 행동 (사용자 결정 영역)

hub repo `incident-followup.yml` workflow 수정 후보:

1. 동일 fingerprint 의 closed worker issue 존재 시 신규 reminder 생성 skip
2. 14일 이상 stale reminder 자동 close (현재는 영구 open)
3. lesson commit body grep 시간 윈도우 확장 (현재 추정: ~7일 매칭)

워커 자율 영역 = 본 batch sweep 패턴 자체 반복 (영구 cleanup). 영구 해결 X.

## 워커 측 carry-over

다음 lesson-pending 누적 30+건 시 wave 4 sweep 자동 fire (fix-incident lite, 본 batch 패턴 정합).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>

---------

Co-authored-by: Claude Opus 4.7 <noreply@anthropic.com>
