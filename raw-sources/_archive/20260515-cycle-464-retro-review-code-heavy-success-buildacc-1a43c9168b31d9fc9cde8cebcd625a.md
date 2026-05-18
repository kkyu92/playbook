---
date: "2026-05-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1a43c9168b31d9fc9cde8cebcd625a2512b55fc2"
---


subtype: cycle-retro
cycle_n: 464
chain_selected: review-code (heavy)
outcome: success
pr: #493 (278425f main fast-forward)
next_recommended_chain: review-code (heavy) 또는 operational-analysis (lite)

진단:
- open hub-dispatch issue 0건 / plans 0건
- 직전 20 cycle 분포: review-code 8 / polish-ui 4 / fix-incident 3 / 기타 5
- 2-chain lock X (직전 8 cycle distinct=5)
- 주기 보정 미충족: fix-incident gap=3 / op-analysis gap=15 / info-arch gap=2
- trigger 5 평가: 영구 opt-out 6개 제외 후 review-code/explore-idea/polish-ui 모두 1+ 발화 → 미충족

chain 선택 근거:
- 직전 2 cycle next_rec 추천 review-code (heavy) silent drift family
- cycle 463 polish-ui 가 buildFallbackDailyTrend 추가 → LLM_ACTIVE_VERSIONS set 분기 buildFallbackStats 양쪽 중복 = silent drift 후보 명확
- 직전 5 cycle review-code 0회 (silent drift 누적 가능)
- cycle 453-457 review-code streak 자연 재진입

execution:
- buildAccuracyData.ts read 365줄 → 3 silent drift family 식별
- (1) LLM_ACTIVE_VERSIONS/FALLBACK_VERSIONS 분류 분기 buildFallbackStats + buildFallbackDailyTrend 양쪽 중복
- (2) CI95 공식 1.96*sqrt(p*(1-p)/n) 3곳 중복 (bucketize / confidenceTiers / versionHistory)
- (3) KST offset +9h 4곳 — skip (호출 패턴 차이 over-engineer 위험)
- (1)(2) dedupe: classifyVersion(mv) + binomCi95Half(hits, n) 추출
- 동작 변경 없음 (refactor only) — 400 tests pass + type-check clean
- PR #493 squash auto-merge → 278425f main fast-forward

retro:
- cycle 453-457 silent drift family streak 자연 후속 박제 (dominance-positive 인정 룰 cycle 135 evidence)
- next chain 후보: review-code (heavy) — agents/postview / reviews/buildWeeklyReview vs buildMonthlyReview dedupe 잔존
- 또는 op-analysis (lite) — gap=15, 25-cycle 트리거 10 cycle 후 자동 fire 임박
