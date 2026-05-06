---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8890e48f86419a62d2c6f5db03f18db772e2b280"
---


subtype: meta-pattern
pattern_name: silent-drift-family-channel-rotation
evidence_window: cycle 125 ~ cycle 131 (7 cycle 누적)
evidence_count: 7
recommendation: review-code heavy + fix-incident chain rotation 으로 silent drift 채굴 패턴 확립. 영역 고갈 evidence X = monolith N+ 잔존 + drift family 다양화 누적

evidence (7 cycle silent drift family):
  cycle 125 (review-code heavy): fancy-stats.ts resolveTeamCode '' silent (입력 boundary)
  cycle 126 (review-code heavy): ZERO_WEIGHT_FACTOR_LIST_PROMPT vacuous prompt 가드
  cycle 127 (review-code heavy): daily.ts model_version decoupling on debate failure
  cycle 128 (fix-incident): finalReasoning.homeWinProb decoupling on debate verdict
  cycle 129 (review-code heavy): Korean particle hard-coding (matchup buildSummary)
  cycle 130 (review-code heavy): Korean particle hard-coding (factor-explanations)
  cycle 131 (review-code heavy): production schema vs prompt example mismatch (postview)

drift family taxonomy (cycle 131 시점):
  1. 입력 boundary silent (cycle 125): empty string / null input → silent fallback to wrong default
  2. Vacuous prompt (cycle 126): empty 결과 가 prompt 안 vacuous 표현 (괄호 빈 string) → LLM noise
  3. State decoupling on failure (cycle 127, 128): try/catch 안 fallback path 가 success state 박제 → silent metric 오염
  4. Korean particle hard-coding (cycle 129, 130): 받침 무관 hard-coded 조사 (의/가/는 등) → 사용자 가시 어색한 한국어
  5. Schema mismatch (cycle 131): production schema 와 prompt example/test schema 불일치 → LLM 출력 inconsistent → downstream grouping silent skip

cycle 49 룰 PASS counter (cycle 124 skill-evolution 8 분리 박제 후):
  PASS_eval (자가 평가 누적): 9
  PASS_ship (실 ship 누적): 7
  decoupling 후 PASS_ship 7 streak (cycle 50/125/126/127/128/129/130/131)
  cycle 86~123 ship 0 streak break (cycle 125) 후속 모멘텀 안정

structural insight:
  - silent drift 영역 = monolith 큰 파일 (300+ 줄) heavy review 가 trigger source
  - drift family 는 새 cycle 마다 새로운 family 발견 (5 family 누적, 단순 재발 X)
  - chain rotation (review-code heavy + fix-incident 짝) 이 ROI 명확
  - 본 streak break 시점에 다양성 redirect (op-analysis / polish-ui) 평가 — 단 trigger 매핑 강력해야 함 (DESIGN.md mtime 0일 / 데이터 freshness 측정값 부재 = trigger 약함)
  - skill-evolution 8 의 PASS_ship 분리 박제 + ship-0 emergency stop + lite-chain cooldown 가 본 streak 발화의 구조적 backbone

next sweep candidates (review-code heavy 미review monolith):
  - validator.ts (637줄) — Layer 1 검증 critical path
  - page.tsx (551줄) — 홈페이지 UI
  - buildTeamProfile.ts (359줄) — buildXXXProfile family 잔존

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
