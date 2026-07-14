---
date: "2026-07-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8313db33192fa709ca72ebd5e86afe227e73f0b5"
---


subtype: cycle-retro
cycle_n: 1663
chain_selected: explore-idea (heavy) wave-329
outcome: success
commit_hash: 916e1226
pr_number: 2679

retro.summary: |
  KBO standings column 8(홈 성적) 파싱 → 경기 카드에 원정팀 원정 성적/홈팀 홈 성적 배지.
  wave-327(시즌 전체 성적 표시) → wave-329(구장별 성적)으로 업그레이드.
  VENUE_RECORD_MIN_GAMES=7 상수 추가. Feature-Drift Cycle 패턴 유지.
  3334 tests PASS / lint PASS / TypeScript PASS.

next_recommended_chain: review-code (heavy) wave-330
next_recommended_reason: Feature-Drift Cycle explore-idea → review-code natural. wave-329 constants/venueMap 추출 검증.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
