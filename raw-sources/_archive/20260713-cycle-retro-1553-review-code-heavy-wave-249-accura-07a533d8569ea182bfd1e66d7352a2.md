---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "07a533d8569ea182bfd1e66d7352a29ee981ee73"
---


subtype: cycle-retro
cycle: 1553
chain_selected: review-code (heavy)
outcome: success
next_recommended_chain: review-code (heavy)

## Summary

review-code (heavy) wave-249 = silent drift family 250th wave. accuracy 페이지 V18SubCohortPanel 안 CE/비CE cohort accuracy delta 문구 노출 (op-analysis 축 A 5.0pp 사용자 가시 반영, cycle 1550 heavy 결과 정합). CLAUDE.md dev-domain evidence 와 사용자 가시 채널 정합 회복.

## Key findings

1. op-analysis 축 A (cycle 1550 heavy) 결과 = CE 58.8% (97/165) vs 비CE 63.8% (30/47) = 5.0pp delta. CLAUDE.md 안 박제 but 사용자 가시 채널 (accuracy 페이지) 안 delta 문구 부재 = silent drift wave-249 candidate.
2. V18SubCohortPanel 개선 = 실시간 계산 (realDebate.accuracy - fallback.accuracy), n>=10 소표본 guard, dev jargon 없이 자연어 문구 ("AI 토론 활성 예측이 정량 fallback 대비 +X.Xpp 더 정확"), 음수 delta branch 지원.
3. silent drift family streak ~1095 cycle (cycle 458 → cycle 1553) 지속.
4. 직전 20 사이클 chain distinct=7, 2-chain lock 미발동. review-code dominance 자연 (detection channel).

## Metrics

- PR: #2626 merged 2026-07-13T06:19:57Z (9872c8b1)
- Files changed: 2 (accuracy/page.tsx +18, silent-drift-wave-249.test.ts +50 new)
- Tests: 1843 pass (204 files) / wave-249 guard 5 tests
- next_n: 12

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
