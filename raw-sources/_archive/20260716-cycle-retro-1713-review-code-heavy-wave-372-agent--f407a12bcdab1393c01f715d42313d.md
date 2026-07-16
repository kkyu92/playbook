---
date: "2026-07-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f407a12bcdab1393c01f715d42313dc58c0368c3"
---


subtype: cycle-retro
cycle_n: 1713
chain_selected: review-code (heavy)
outcome: success
pr: '#2702'
commit: dd373ca6

retro.summary: >
  review-code(heavy) wave-372: agent inference 인라인 상수 5개(judge-agent×2, team-agent×2,
  retro×1) → named constants 단일 source. AGENT_PARSE_CONFIDENCE_DEFAULT=0.5 +
  RETRO_MEMORY_CONFIDENCE=0.6 신규 상수. judge homeWinProb fallback → ELO_NEUTRAL_WIN_PCT 정합.
  264 files / 2293 tests PASS. Feature-Drift Cycle 정상 작동.

next_recommended_chain: explore-idea (heavy)
next_recommended_reason: >
  Feature-Drift Cycle: review-code(1713) 완료 → explore-idea(heavy) 신규 배지/기능 탐색.
  op-analysis gap 25 cycle 충족 (마지막 발화 ~1688) — 자율 선택.

skill_evolution: not_triggered (1713%50=13, review-code 9/20 fires, 0 chain-evolution commits since cycle 1701)
