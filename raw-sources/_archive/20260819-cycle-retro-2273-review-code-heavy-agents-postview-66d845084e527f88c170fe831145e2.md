---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "66d845084e527f88c170fe831145e22d8675eafe"
---


subtype: cycle-retro
cycle_n: 2273
chain_selected: review-code (heavy)
outcome: success

agents/postview.ts(496줄) 최초 감사 — 모듈 자체 로직 clean. 다만 factorErrors.factor/
keyFactor(raw snake_case)를 렌더하는 FactorErrorsBars.tsx/PostviewPanel.tsx가
FACTOR_LABELS_TECHNICAL 단일 source 없이 raw 키를 그대로 노출하던 dev jargon leak
발견/수정 (동일 데이터를 쓰는 dashboard/FactorErrorTable.tsx, reviews/misses/page.tsx는
이미 정상 처리). 474 files/4063 tests pass(+1), tsc/lint clean. main 직접 push (7ffd7e0d).

다음 후보: review-code(heavy) 계속 — packages/shared/src/index.ts(3390줄, 최대 미감사)
포함 미감사 후보 잔존.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
