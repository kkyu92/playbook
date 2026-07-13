---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5a8baf99a23f1e910c8376d0af832f8598ef71fe"
---


subtype: cycle-retro
cycle: 1549
chain: review-code (heavy)
outcome: success

축 C (Tier 1) 즉시 fire 완주. cycle 1547 explore-idea (lite) spec carry-over.

DB 실측 (scripts/measure-n178-vs-n165.ts 신규):
- v1.8 only: n=187 acc=59.9%
- v1.8-credit-fail: n=25 acc=60.0%
- v2.1-B-shadow: n=52 (rejected)
- v2.0-shadow: n=5
- 히스토릭 (v1.5~v1.7-revert): n=96
- 총 verified pre_game: n=365

원인 규명: n=178 (cycle 1460 7/6) / n=165 (cycle 1545 7/13 아침) / n=187 (cycle 1549 7/13 저녁)
각각 시점별 자연 snapshot. 표본 미스매치 X.

근본 fix: methodology page.tsx 하드코딩 n=165 → n=150+ 임계 라벨 + /accuracy 실시간 참조.
silent-drift-wave-247 regression guard 신규 (4 assertions).
CLAUDE.md L179 박제 갱신.

PR #2622 merged. 1836 tests pass. review-code (heavy) 14 wave streak 지속.

next_recommended_chain: explore-idea (lite) or op-analysis (lite)
next_recommended_reason: silent drift wave 247 지속 중. 축 A carry-over 진척 또는 신규 탐색.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
