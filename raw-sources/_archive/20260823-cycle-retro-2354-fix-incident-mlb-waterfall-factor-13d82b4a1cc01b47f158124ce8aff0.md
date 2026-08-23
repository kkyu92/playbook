---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "13d82b4a1cc01b47f158124ce8aff0ae4822a067"
---


subtype: cycle-retro
cycle_n: 2354
chain_selected: fix-incident
outcome: success

cycle 2353이 recent_form/head_to_head 를 predict_final 계산/persist 에 실측 wiring
했지만 명시적으로 남긴 다음 후보(waterfall/factor-detail/overview 표시 레이어 동기화)를
검증 — elo(cycle 2349→2352) 와 동일한 read-wiring 후 표시 미동기 silent drop 패턴이
재발함을 확인. MlbWaterfallInput 에 두 팩터 pair 필드 추가(head_to_head 는 단일
homeWinRate 를 대칭 pair 로 인코딩해 기존 pairTerms 루프 재사용) → game-detail
page.tsx(ko/en) select + GAME_DETAIL_FACTOR_ROWS(8→10행) + situational 분류/퍼센트
포맷 케이스 추가 + stale 캡션/주석 3곳 정정. 신규 회귀 테스트 4건. commit f15e5649
(코드) + 9ff97875(CHANGELOG/TODOS/version 보정 — 첫 커밋 문서 갱신 누락 즉시 보정).

다음 cycle 추천 = explore-idea 자연 발견 또는 op-analysis/lotto/info-arch 주기 trigger
도달 확인 (fix-incident/review-code MLB 실측 wiring 체인 완결, 다양성 redirect 권장).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
