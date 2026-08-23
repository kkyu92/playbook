---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5b230b2c5fc53343570f9930222ffad53322e0cb"
---


subtype: cycle-retro
cycle_n: 2452
chain_selected: fix-incident
outcome: success

version-sync 3-way drift 5회 재발(cycle 2363/2437/2445 등)의 근본원인 —
pre-push hook이 lint+type-check만 실행하고 version-sync-guard.test.ts는
실행 안 해 수동 bump 실수가 CI(post-push)에서만 발견됨. scripts/install-hooks.sh
템플릿(tracked source)에 guard test 실행 추가(~0.9s), 로컬 hook 재설치 동기화.
pnpm --filter moneyball test 4217/4217 pass. 새 hook이 자기 검증하며
commit 21b4349d push 정상 통과.

다음 추천: review-code 신규 타겟 또는 gap trigger 근접 순(info-arch 28/30, lotto 13/30).
