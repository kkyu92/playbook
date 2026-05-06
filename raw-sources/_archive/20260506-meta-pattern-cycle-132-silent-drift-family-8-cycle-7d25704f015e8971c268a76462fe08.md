---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7d25704f015e8971c268a76462fe08a43139dc33"
---


subtype: meta-pattern
cycle_n: 132
pattern_name: silent drift family channel + R5 정정 (드리프트 사례 1/2 재현) 두 패턴 동시 박제

evidence:
silent drift family 8 cycle SUCCESS streak (cycle 125~132):
- cycle 125: fancy-stats.ts resolveTeamCode empty input silent drift + 첫 단위 테스트 PR #116
- cycle 126: ZERO_WEIGHT_FACTOR_LIST_PROMPT vacuous prompt PR #117
- cycle 127: daily.ts model_version silent drift PR #118
- cycle 128: fix-incident finalReasoning.homeWinProb decoupling PR #119
- cycle 129: buildMatchupProfile Korean particle silent drift PR #120
- cycle 130: factor-explanations Korean particle silent drift PR #121
- cycle 131: postview factor key schema mismatch silent drift PR #122
- cycle 132: KOREAN_FAMILY_NAMES 중복 '유' silent drift PR #123

R5 정정 누적 6건째 (드리프트 사례 1/2 재현):
- cycle 132 = validator.ts '단위 테스트 0건' 가설 → 실제 647줄 광범위 존재
- 신규 작업 가정 전 ls/find 확인 필수 룰 위반 (CLAUDE.md drift 사례 1/2 명시 박제)
- 동일 패턴 R5 정정 누적: cycle 81 (shared @types/node), cycle 83 (postview LLM 모킹),
  cycle 126 (3 stale carry-over 정정), cycle 132 (validator test 0건 가설 X)

영역 채굴 한계 신호:
cycle 132 = 가설 6건 (KOREAN_FAMILY_NAMES + NUMERIC_WHITELIST 누락 + checkClaimTypes
합산 weight + extractDetailValues regex + maskViolatedReasoning escape + 음수 처리) →
실제 silent drift 1건만 발견. silent drift family 채굴 ROI 한계 신호 박제. cycle 134
이후 다양성 chain (polish-ui / op-analysis / dimension-cycle / expand-scope /
design-system) 자연 발화 시점.

recommendation:
- silent drift family chain 자체는 강력 (PASS_ship 7→8 누적), 단 영역 채굴 한계 시점
- review-code (heavy) lite cap (5 연속 retro-only) 위험 X (8 연속 SUCCESS), 그러나 chain
  다양성 trigger 5 evidence 압도적 (0회 발화 chain 5개) → 다양성 redirect 자연
- R5 정정 패턴 = "신규 작업 가정 전 ls/find 확인 필수" 룰 SKILL.md 명문 강화 후보
  (cycle 134 skill-evolution cooldown 만료 후 자가 진화 9 trigger 검토 가능)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
