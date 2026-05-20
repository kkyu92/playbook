---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "3a5d30ba9aacb1d03a5d06726cf96c85359b399b"
---


subtype: cycle-retro
cycle_n: 775
chain_selected: operational-analysis (lite)
outcome: success
shipped: false
code_change: false

진단:
- 직전 20 cycle 분포 (755-774): explore-idea 7 / review-code 6 / op-analysis 3 / skill-evolution 1 / polish-ui 1 / info-arch 1 / fix-incident 1
- distinct=5 lock X / cooldown X / open issue 0 / unprocessed plan 0
- cycle 771 carry-over: v1.8 n=35+ 재측정
- cycle 774 next_rec #3 op-analysis lite consistency

execution:
- v1.8 cohort: total 74 / verified 30 / correct 13 (43.3%) / Brier 0.2241
  - vs cycle 632: 25 verified 0.327 Brier → +5 verified, Brier -0.103 개선
- credit/real split: 22/8 (cycle 632 17/8 → real-debate +0 stuck)
  - real-debate gap +20.6pp → +9.1pp 좁혀짐 (credit-fail 누적 흡수)
- v1.8 일자: 5/13(5/5 real) / 5/14(5/0) / 5/15(5/0) / 5/16(5/2) / 5/17(5/1) / 5/19(5/0)
  - 가설 강화: weekday morning credit-fail / 수요일 reset 후 real-debate
- full cohort scoring_rule: v1.5 12/16(75%) / v1.6 17/46(37%) / v1.7-revert 17/32(53.1%) / v1.8 13/30(43.3%)
- total n=124 / v2.0 임계 n=150 까지 gap 26 (5~6일 페이스)

오늘 5/20 pipeline_runs:
- UTC 00~05 (6건): KBO parse error (HTML 응답) — cycle 769 fix 머지 (UTC 04:39) 후 vercel auto-deploy 지연
  - drift 사례 9 (vercel CLI .gitignore 무시 + webhook silent skip) reproducible evidence
- UTC 06: success / window_too_early skip (정상)
- UTC 07~09: Anthropic 529 1건 + validator hallucinated_number:hard 2건 (strict 정상 작동)
- UTC 10~11: success / window_too_late skip
- 5/19 baseline: 15 cron 전부 success → 5/20 UTC 00~05 fail = 일시적 deploy lag

retro:
- v1.8 측정 cycle 771 → 775 (gap=4) 신선 데이터 +5 = 측정 가치 충분
- real-debate stuck 8 = credit timing 가설 강화 (주중 morning credit-fail)
- drift 사례 9 reproducible evidence = root cause 조사 carry-over (사용자 영역)
- validator strict 정상 작동 확인 (silent drift X)

skill-evolution trigger 5 fire 박제:
- window 756-775 polish-ui = 0 fire (cycle 755 polish-ui 가 window roll-out)
- ~/.develop-cycle/skill-evolution-pending 마커 박제 (775: 03e245b)
- cycle 776 자동 skill-evolution chain 강제 발화 예정

next_recommended_chain (cycle 776 skill-evolution 후속):
- review-code heavy gap=2 silent drift family sweep 13 (drift 사례 9 reproducible evidence + v1.8 측정 박제)
- OR explore-idea heavy v12 inventory 신규 후보 발견
- OR fix-incident heavy drift 사례 9 root cause (사용자 영역 carry-over)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
