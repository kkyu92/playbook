---
date: "2026-08-10"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b3681c67ca7471fa03e52eb2e07d54e5dcc2e083"
---


subtype: cycle-retro
cycle_n: 2043
chain_selected: review-code (heavy)
outcome: success
pr_number: 2902
commit_hash: 8dec7453

retro.summary: cycle 2042가 명시적으로 넘긴 carry-over(팀/맞대결 스트릭 로직 재평가)를
처리. computeTeamStreak/computeMatchupStreak 함수 자체 통합은 리턴 타입 상이(win/loss
결과 vs 상대 teamCode)로 부적절함을 재확인해 cycle 2042 판단과 정합, 대신 양쪽에 주석
상호참조로만 묶여있던 MIN_LENGTH=2 상수를 packages/shared WIN_LOSS_STREAK_MIN_LENGTH로
단일화 — H2H_MIN_GAMES/VENUE_RECORD_MIN_GAMES/CONVERGENCE_STREAK_MIN_LENGTH 기존
패턴과 동일. PR #2902 squash 머지 실측 확인(8dec7453).

next_recommended_chain: explore-idea
next_recommended_reason: Feature-Drift Cycle 교대 패턴 지속 — review-code 직후는
자연히 explore-idea. op-analysis(23/25)·fix-incident(13/20) gap 근접 중이므로
다음 몇 cycle 안 자연 fire 가능성.
