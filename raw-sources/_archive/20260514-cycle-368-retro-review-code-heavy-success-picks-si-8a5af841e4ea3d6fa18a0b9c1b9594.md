---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8a5af841e4ea3d6fa18a0b9c1b959410dbfc4226"
---


subtype: cycle-retro
cycle_n: 368
chain_selected: review-code (heavy)
outcome: SUCCESS
commit: 2050f8c

retro.summary:
  picks engagement loop 신규 코드 품질 점검:
  1. aiHomePct 계산 조건 불일치 수정 (winner?.code null 시 1-hwp 반전 방지)
  2. UserVsAIScorecard useEffect cancelled 패턴 추가 (PickButton 일관성)
  2파일 5줄 수정 / 935 tests pass

next_recommended_chain: polish-ui or operational-analysis
