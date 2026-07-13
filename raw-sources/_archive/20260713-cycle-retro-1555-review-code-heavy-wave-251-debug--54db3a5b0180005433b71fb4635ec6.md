---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "54db3a5b0180005433b71fb4635ec64eacdb4e64"
---


subtype: cycle-retro
cycle_n: 1555
chain_selected: review-code (heavy)
outcome: success
pr_number: 2629
commit_hash: 481b35a2

## Summary

wave-251 = /debug/model-comparison/page.tsx header <p> 텍스트 2곳 하드코딩
`v2.0-debate` → `${LLM_DEBATE_VERSION}` interpolation swap. wave-250 (accuracy
V18SubCohortPanel subLabel) 과 동일 pattern 재발. 페이지 UI 만 상수 참조 누락
이었고 compareModels.ts 는 이미 참조 중 = 뒤늦은 정합.

## Diagnosis

- last 20 cycles chain distribution: review-code 12 / explore-idea 2 / op-analysis 2 / polish-ui 1 / fix-incident 1 / lotto 1 / skill-evolution 1 = distinct 7
- last 8 cycles distinct 4 = no 2-chain alternation lock
- skill-evolution trigger 5 review-code 12 fires = OK (미충족)
- cycle_n 1555 % 50 = 5 (milestone X)
- no unprocessed plans (모두 completed_* status)
- no open hub-dispatch issues

## Execution

- Edit `/debug/model-comparison/page.tsx`: import LLM_DEBATE_VERSION + 라인 107/111 interpolation
- Write `silent-drift-wave-251.test.ts` (4 assertions)
- pnpm test: 1851 tests PASS
- PR #2629 --auto merged

## silent drift family streak

cycle 458 → cycle 1555 = 1097 cycle 누적. wave-251 = 252번째 wave.

## next_recommended_chain

review-code (heavy) — silent drift family sweep 지속 candidates 남음 (dev-facing 페이지 유사 pattern 후속).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
