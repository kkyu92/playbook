---
date: "2026-05-08"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7cd49211fb15a427058952453154094a88c2fc77"
---


subtype: cycle-retro
cycle_n: 276
chain_selected: review-code (heavy)
outcome: success
commit_hash: 23daf00

retro:
  - 직전 5 cycle next_rec = operational-analysis 5x (강한 신호) 였으나 cycle 256 직후
    4 예측만 추가 (n=72→76) = "carry-over read first" 룰 적용 → 재실행 ROI 낮음 → review-code 선택
  - validator.ts (642 줄) silent drift 2 발견:
    (1) top docstring 이 "팀 에이전트 JSON" 만 cover 하는 것처럼 적힘 — 실제로는
        team-agent / judge-agent / postview / mask + Sentry notify 4 경로 모두 cover.
        cycle 27 (P1 judge) / cycle 29 (P4 attribution) / cycle 76 (mask) / cycle 83 (postview reasoning)
        으로 파일 스코프가 자라났으나 docstring 미갱신.
    (2) validateFactorAttribution 끝나고 notifyValidationViolations 헤더 사이 free-floating
        2 줄 주석 — 의미상 attribution function 문서이나 함수 뒤에 위치 = 발견難.
        postview.ts callsite 주석과 substance 중복.
  - fix: docstring 4 LLM 경로 + Sentry mask 명시 / P4 헤더 주석에 Sentry-only 원칙 통합 + free-floating 제거
  - 562 tests pass, type-check pass
  - 직접 push main (R7 squash + auto merge X — main 직접 push)

next_recommended_chain: operational-analysis (gap 21 → trigger 7 25 cycle 임계 4 cycle 남음, n=80 추정)
next_recommended_reason: |
  cycle 256 직후 짧은 gap 였으나 본 cycle 까지 5x 누적 next_rec. 다음 cycle 까지 데이터
  freshness 늘리고, n=100 milestone 가까워지면 heavy 권장. 단 review-code dominance 8/21
  지속 시 cycle 135 dominance-positive streak break trigger 도 자율 판단.

PASS_ship: 143
review-code heavy success streak: cycle 268, 270, 274, 275, 276 = 5 (cycle 135 dominance-positive 인정)
silent drift family detection 채널: 7번째 진입 (250+ cycle 누적 family — KOREAN_FAMILY_NAMES /
postview factor schema / Korean particle / model_version / homeTeamAccuracy / buildGameOverview /
daily.ts cron / shortTeamName / connectNulls / FactorRow / validator docstring)
