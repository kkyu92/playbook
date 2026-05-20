---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a4a5d71788b68a2242becce1c85f0379e7efd483"
---


subtype: cycle-retro
cycle_n: 786
chain_selected: operational-analysis (lite, gap=11 v1.8 n carry-over 측정 cycle 775 carry-over)
outcome: success
chain_reason: 2-chain lock 발동 (직전 8 cycle distinct=2 explore-idea 5 + review-code 3 — 후보 제외 강제) + cycle 785 next_rec 3순위 명시 + cycle 775 carry-over 명확 + cooldown 0 (직전 4 fire success streak) + polish-ui cooldown 활성

진단:
- 2-chain lock 발동 — 직전 8 cycle distinct=2 (explore-idea 5 / review-code 3, cycle 778~785). 잠긴 chain 후보 제외 강제. fix-incident lock 안 들어가서 안전 무시 X
- carry-over 명확 — cycle 775 'n=35+ 재측정' 의도. 직전 4 fire (757/761/771/775) SUCCESS streak — cooldown 0
- 잔여 후보 trigger 약함 — polish-ui cooldown N=15 활성 / lotto 자체 trigger 1~5 미충족 (picks 박제 + data 갱신) / fix-incident gap=17 (cycle 20 미달성) / info-arch gap=28 (cycle 30 미달성)

실행:
- Supabase REST API 직접 query — predictions WHERE scoring_rule='v1.8' join games(game_date)
- 74 rows total / 30 verified / 44 unverified
- v1.8 accuracy = 13/30 = 43.3% (cycle 775 측정 일치 — verified 신규 +0)
- by mv: v1.8 credit-fail 9/22=40.9% / v2.0-debate real 4/8=50.0%. gap +9.1pp 유지
- 신규 발견 = 5/19 cohort verify 완료 = v1.8 credit-fail 4/5 = 80% (cycle 775 측정 시점 '0/5' 표기 = 미verify 상태였음). credit-fail path 도 quant-only fallback 강한 정확도 가능 evidence
- 코드 변경 0 / 신규 코드 X / lesson 박제 only

carry-over:
- cycle 775 'n=35+ 재측정' 미달성 — 5/20 데이터 verify pending (23:00 KST UTC 14 verify cron 후 n=35 도달 예상)
- 다음 op-analysis 재발화 trigger = 5/20 verify 완료 후

next_recommended_chain: review-code (heavy, gap=1 silent drift family sweep 17 cycle 785 v12-D Person/SportsTeam schema CLAUDE.md sync) OR explore-idea (heavy, v12-G Web Vitals tracking 2 파일 ROI 중) OR fix-incident (gap=18, close to trigger 5 cycle 20)

PR: N/A (lite, retro-only)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
