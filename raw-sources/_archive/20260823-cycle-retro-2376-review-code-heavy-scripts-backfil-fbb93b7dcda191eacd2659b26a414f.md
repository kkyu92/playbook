---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "fbb93b7dcda191eacd2659b26a414feb50e775f9"
---


subtype: cycle-retro
cycle: 2376
chain_selected: review-code (heavy)
outcome: retro-only

진단: open issue 0건, approved plan 0/22, 주기 trigger 4종 미도달, 2-chain lock 미충족,
review-code lite-cap streak 4/5(cooldown 미도달). 일요일 로또 1234회 이미 처리 완료.
review-code 소진 target 풀 확산 계속 — scripts/ 디렉토리 미감사 backfill 스크립트 2건
(backfill-kbo-confirmed-postponed.ts / backfill-kbo-stuck-verify.ts, 8/18 생성, CHANGELOG
grep 0) 로 감사 범위 전환.

감사 결과: 양쪽 전체 read, 신규 이슈 없음. stuck-verify.ts 의 predictions select 필터가
daily.ts (cycle 1022 hotfix, #1342) 의 PRODUCTION_COHORT_RULES 패턴과 정확히 동일 —
shadow-row Map last-wins 오염 우려 false-positive 확인. confirmed-postponed.ts 의
is_canceled 마킹도 backfill-season.ts 기존 관행과 일치.

4연속 review-code(heavy) retro-only(2373~2376). 다음 후보 = calibration-agent.ts 또는
apps/moneyball 신규 라우트(mlb/en wave-660+) 또는 주기 trigger 대기.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
