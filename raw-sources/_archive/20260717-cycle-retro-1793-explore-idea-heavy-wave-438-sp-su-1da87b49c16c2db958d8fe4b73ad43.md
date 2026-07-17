---
date: "2026-07-17"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1da87b49c16c2db958d8fe4b73ad438ef1134255"
---


subtype: cycle-retro
cycle_n: 1793
chain_selected: explore-idea (heavy)
outcome: success
commit: 27d7a09f

wave-438: 팩터 수렴 픽 sp_fip/sp_xfip 모두 비수렴 경기에서 선발투수 이름 행 추가.
기존 FIP/xFIP 행은 수렴 시에만 SP 이름 노출 — 비수렴 시 컨텍스트 gap 해소.
294 tests pass / lint+tsc clean / pre-push hook 통과.

next_recommended_chain: review-code (heavy)
next_recommended_reason: Feature-Drift Cycle — wave-438 직후 JSDoc/helper cleanup 예상

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
