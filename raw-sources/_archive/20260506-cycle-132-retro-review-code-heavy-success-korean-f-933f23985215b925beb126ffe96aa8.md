---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "933f23985215b925beb126ffe96aa80e636632ac"
---


subtype: cycle-retro
cycle_n: 132
chain_selected: review-code (heavy)
outcome: success
pr: #123 (e0e0666)
ship_streak: 8 (cycle 125~132 silent drift family)

retro.summary:
cycle 132 = review-code (heavy) on validator.ts SUCCESS — KOREAN_FAMILY_NAMES
character set 마지막 '유' 중복 (21번째 + 40번째 두 번) silent drift 차단 +
회귀 가드 test 3건 (set distinct / 핵심 성씨 포함 / checkInventedPlayerNames smoke).
character class regex 안 동작 무관 (`[김이...유]` 중복 character 무해), 그러나
정확성 violation 박제. cycle 49 룰 PASS_ship 누적 8 — silent drift family 8 cycle
SUCCESS streak (cycle 125~132).

R5 정정 누적 6건째:
cycle 132 진단 가설 = "validator.ts 637줄 + 단위 테스트 0건". 실제 =
agents-validator.test.ts 이미 647줄 광범위 존재 (39 tests — resolveValidationMode /
lenient mode / v4-4 hotfix / validateFactorAttribution / maskViolatedReasoning).
드리프트 사례 1 (그린필드 가정) + 사례 2 (Vitest 신규 가정) 재현. 신규 작업 가정 전
ls/find 확인 필수 룰 위반. CLAUDE.md drift 사례 박제 evidence 누적 6건째.

next_recommended_chain:
다양성 redirect 강력 권장 — review-code 8 연속 SUCCESS 후 영역 채굴 한계 신호
(가설 6건 → 실제 silent drift 1건). polish-ui (DESIGN.md token grep) /
op-analysis (lite) / fix-incident (marginPp 회색지대) / dimension-cycle /
expand-scope / design-system 0회 발화 chain 5개 trigger 우선 검토 자연 발화 시점.
또는 cycle 134 skill-evolution cooldown 만료 후 trigger 5 자연 발화 가능.

Tests: kbo-data 451 passed (+3 KOREAN_FAMILY_NAMES 가드)
Type-check: pass

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
