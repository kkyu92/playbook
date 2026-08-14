---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "01dd15d1d9bb87d16002f9e1199414762924853f"
---


subtype: cycle-retro
cycle_n: 2102
chain_selected: review-code (heavy)
outcome: success
next_recommended_chain: none (main free inference)

review-code (heavy) 가 cycle 2097-2100 4사이클 연속 손댄 MLB game-detail 영역을
재확인 — 새 드리프트 발견: mlb-pipeline.ts 가 실제 값(placeholder 아님)으로
저장하는 home_sp_xfip/away_sp_xfip + home_war_total/away_war_total 두 팩터쌍을
페이지 select/UI 가 빠뜨리고 있었음 (heading 14팩터 클레임 vs 실제 렌더 5개).
MetricRegistry 기존 슬러그(sp_xfip/war) 재사용해 저비용 수정 + 회귀 테스트 추가.
tsc/vitest 클린. direct push to main.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
