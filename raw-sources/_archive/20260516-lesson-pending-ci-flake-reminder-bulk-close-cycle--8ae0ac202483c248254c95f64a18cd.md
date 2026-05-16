---
date: "2026-05-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "8ae0ac202483c248254c95f64a18cd1083c85ca5"
---


subtype: lesson
fingerprint: lesson-pending-ci-flake-bulk
cycle: 487
chain: operational-analysis (lite)

## 사례

2026-05-15 D5 cron (`incident-followup.yml`) 1회 fire = 50개 lesson-pending
reminder 일괄 생성. 분포:
- ci-main: 35건 (70%)
- ci-develop: 14건 (28%)
- vercel-deploy: 1건 (2%)

50건 모두 외부 CI/deploy flake fingerprint. 우리 코드 회수 불가능.

## 원인 패턴

CI flake (runner image / network / dep mirror 일시 장애) 와 Vercel
transient deploy 실패는 **본 워커 코드 변경으로 회수 불가**. 그러나 허브
D5 cron 은 `lesson:` commit 부재 시 자동 reminder 발행 → 일괄 누적.
50건/일 잡음 = lesson-pending 신호 가치 희석.

## 정책

1. **즉시**: 본 commit 하나로 50건 일괄 close. issue body 자체 안내사항
   2번 ("외부 요인이라 회수 불가능하면 → 본 reminder close") 적용.
2. **본 lesson commit fingerprint**: `lesson-pending-ci-flake-bulk`. 본
   commit 으로 동일 fingerprint 그룹 묶음 lesson 박제. 추후 D5 fingerprint
   매칭 시 본 commit 으로 자동 close 인식 X (fp 다름) — 잡음 cap 위해
   허브 workflow 측 ci-*/vercel-deploy-* prefix skip 추가가 진짜 fix.
3. **후속**: 허브 `incident-followup.yml` 갱신 후보 — fp prefix 가
   `ci-main`/`ci-develop`/`vercel-deploy` 면 reminder skip. carry-over.

## 박제 위치

본 commit + memory/feedback channel dispatch.

## How to apply

- 다음 D5 cron 발화 후 lesson-pending 누적 시 본 lesson commit reference 후
  bulk close 반복 가능 (외부 flake 한정).
- 진짜 코드 회수 가능 incident (e.g. type-check / test fail / 명시적 코드
  버그) 는 본 정책 적용 X. 개별 `lesson:` commit 박제.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
