---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "10c0e58620d7a9f43823ad1b3e38fa559beae181"
---


subtype: meta-pattern
cycle_n_evidence: [125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 136]
pattern: silent drift family — 운영 코드 안 같은 영역 다른 함수 간 패턴 일관성 위반 (silent code drift) 이 review-code (heavy) channel 로 11 cycle 연속 자연 발화 + ship.

evidence_summary:
  - cycle 125: predictor.ts comment vs code mismatch
  - cycle 126: matchup overall outcome
  - cycle 127: daily.ts model_version
  - cycle 128: finalReasoning.homeWinProb decoupling
  - cycle 129: matchup Korean particle hard-coding
  - cycle 130: factor-explanations Korean particle + 야구 약어 lookup
  - cycle 131: postview factor key schema mismatch
  - cycle 132: KOREAN_FAMILY_NAMES 중복 '유'
  - cycle 133: getPredictionHistory homeTeamAccuracy semantic decoupling
  - cycle 134: buildGameOverview tag/summary 임계값 align
  - cycle 136: getVerifyResults / updateAccuracy N+1 query pattern (다른 6 call site batch 일관성 위반)

dominance-positive validation:
  - cycle 135 skill-evolution 9 가 review-code (heavy) dominance-positive 인정 룰 항구화 (같은 chain N 연속 발화 + outcome=success streak ≥3 = 자가 의심 차단)
  - cycle 136 = 11 cycle 째 streak. ship rate 11/12 (91.6%) — cycle 124 ship-0 emergency stop 직후 회복 streak.
  - 0회 chain 5개 trigger 매핑 자연 X (cycle 135 항구화 재현 — DESIGN.md mtime / TODOS 큰 방향 0건 / docs/design 부재 / op-analysis 직전 50 cycle 전 / dim-cycle fallback only)

new_evidence_class:
  - 본 cycle 136 = silent drift family 안 새 sub-class — "함수 간 패턴 일관성 위반 (N+1 vs batch)"
  - 직전 10 cycle 의 sub-class 들: 주석 vs 코드 mismatch (cycle 125/127/133), 임계값 align (134), 한국어 particle (129/130), data schema mismatch (131/132), semantic decoupling (128/133)
  - silent drift family 의 카테고리 다양화 누적 → 같은 영역 안 다른 sub-class 가 같은 channel 로 회수되는 패턴 강화

recommendation:
  - dominance-positive streak ≥3 자가 의심 차단 룰 작동 evidence 추가 (cycle 135 룰 적용 첫 cycle 직후 즉시 11 streak — review-code chain dominance 가 정상 작동 인정)
  - silent drift family detection channel = review-code (heavy) 단일 채널로 11 cycle 연속 fix → ship rate 91.6% = 운영 코드 cleanup 의 자연 main path
  - 다음 cycle (cycle 137) review-code (heavy) 자연 발화 OK + 다양성 redirect 자율 판단 OK (룰 변경 X)
