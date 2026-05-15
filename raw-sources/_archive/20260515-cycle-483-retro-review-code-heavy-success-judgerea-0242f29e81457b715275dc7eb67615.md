---
date: "2026-05-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0242f29e81457b715275dc7eb6761508a444aa6d"
---


subtype: cycle-retro
cycle_n: 483
chain_selected: review-code (heavy)
outcome: success
pr: #508 (squash merged → 209ae6e)
next_recommended_chain: review-code (heavy) 또는 다양성 redirect

summary:
silent drift family streak 25 cycle 가족 closure (cycle 478 박제) 후 잔존 가족원 발견 → resume.
judgeReasoning.test.ts 5 fixture + judgeReasoning.ts:2 주석 'v1.8' 하드코딩 6 location.
런타임 debate.ts:84 (`정량 모델 ${CURRENT_SCORING_RULE} 결과 사용.`) 와 fixture mismatch — fixture lies about runtime.
isFallbackReasoning prefix matching version-independent → 기능 변화 X, source align 만.

trigger 평가:
- 2-chain LOCK distinct=3 (미발동)
- 0회 발화 chain (review-code/explore-idea/polish-ui) 전부 발화 (trigger 5 미충족)
- lite cap 미발동
- ship-0 emergency 1 non-success / 10 (정상 진행)
- fix-incident gap=2 / op-analysis gap=11 / info-arch gap=21 — 모두 임계 미만
- improvement saturation 11 / 12 (1 부족)

변경:
1. judgeReasoning.ts:2-4 주석 'v1.8' → '${CURRENT_SCORING_RULE}' literal, "v1.8 용어 leak 차단" → "scoring_rule leak 차단"
2. judgeReasoning.test.ts — import CURRENT_SCORING_RULE + PREGAME_FALLBACK/POSTVIEW_FALLBACK 상수 추출 + 5 fixture 일괄 참조 + 테스트 이름 version-agnostic + regex assertion v2.\d 도 차단 (v1→v2 migration drift 대비)

테스트:
- pnpm --filter moneyball test -- --run judgeReasoning → 401 tests PASS (43 files)
- pnpm --filter moneyball type-check PASS

next_recommended_reason:
silent drift family streak 26 cycle. 잔존 후보:
(a) buildAccuracyData.ts:331-336 VERSION_META label==key 중복 (v1.7-revert 만 label='v1.7' 차이) — label 필드 제거 ergonomic
(b) buildAccuracyData.ts:335 note 'ELO 10%↑ / head_to_head 3%↓' v1.8 전용 metadata 동기
(c) accuracy/page.tsx:188 주석 'v2-persona4' 잔존
다양성 redirect 시 info-arch gap=22 임박 (gap 30 자동 발화) / op-analysis gap=12 (gap 25 자동 발화).
