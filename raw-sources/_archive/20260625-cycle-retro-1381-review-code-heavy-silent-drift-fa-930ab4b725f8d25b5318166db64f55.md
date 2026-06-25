---
date: "2026-06-25"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "930ab4b725f8d25b5318166db64f55f09536cd02"
---


subtype: cycle-retro
cycle_n: 1381
chain_selected: review-code (heavy)
outcome: success
pr_number: 2184
commit_hash: 27df80c6

retro.summary:
  wave 152 SUCCESS — `https://moneyballscore.vercel.app` literal 81 file / 133
  occurrence 의 첫 batch (8 prod files). 신규 `packages/shared/src/site.ts`
  SITE_URL 단일 source + invariant pin test (value + no trailing slash).
  swap 대상: insights / insights/[date] / v2-shadow-monitor / calendar /
  changelog / players (metadata canonical+og 도 변환) / players/[id] /
  matchup/[teamA]/[teamB]. 잔여 ~73 files / ~120 occurrence (layout / robots /
  sitemap / 각 route metadata literal / json-ld / telegram.ts) wave 153+ carry-over.

retro.next_recommended_chain: review-code (heavy)
retro.next_recommended_reason:
  잔여 SITE_URL 73 files = wave 153 자연 후속. dominance-positive streak
  (cycle 1374~1381 = 8 cycle 연속) 유지. 잔여 mechanical 크기로 2-3 wave 분할 예정.

silent_drift_family_streak: ~923 cycle (cycle 458~1381)
wave_count: 152
