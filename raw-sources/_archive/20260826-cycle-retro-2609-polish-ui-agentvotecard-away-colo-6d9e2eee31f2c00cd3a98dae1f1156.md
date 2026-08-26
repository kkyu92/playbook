---
date: "2026-08-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "6d9e2eee31f2c00cd3a98dae1f11567fececf0d4"
---


subtype: cycle-retro
cycle_n: 2609
chain_selected: polish-ui
outcome: success

진단: 2-chain alternation lock (review-code/operational-analysis, 직전8 distinct=2) → lock 규칙 따라 폴백 chain 재평가 → 전 pool trigger 부재(fix-incident 3연속 negative, info-arch/lotto gap 미도달, design-system negative, explore-idea saturation 미충족) → polish-ui 강제 발화.

발견: transition-duration/badge padding/icon square 축 재점검 clean(twin 구조). hardcoded hex 전수 grep 중 AgentVoteCard.tsx awayColor fallback "#c5872a" 리터럴 — globals.css --color-away 재사용값이라 값 자체는 정상(최초 brand[300] 치환 오판, 즉시 원복), 실제 drift는 10+ 파일이 쓰는 var(--color-away) 대신 raw literal 중복 박제한 참조 방식.

실행: var(--color-away) 참조로 정렬 + 회귀 테스트 2건 신규. tsc/vitest(559f/4446t)/lint 전부 green. version 145→146. 직접 main commit+push(R4/R7).

메타: 다음 사이클 = op-analysis gap 근접 또는 review-code/operational-analysis lock 해제(cooldown N=1) 자연 재개.
