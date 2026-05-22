---
date: "2026-05-22"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "62b21fcd77fdde8a609395f026ffe064befb9032"
---


subtype: cycle-retro
cycle_n: 881
chain_selected: review-code (heavy, sweep 50 — accuracy rate tier WINNER_PROB_CONFIDENT/LEAN source-of-truth 통합)
outcome: success
pr: #1237
merge_commit: 8f90dd1

retro_summary:
  cycle 881 review-code (heavy sweep 50) SUCCESS. accuracy rate tier
  (0.65/0.55) source-of-truth WINNER_PROB_CONFIDENT/LEAN 통합 —
  2 파일 9 insert/5 delete. silent drift family detection channel.
  cycle 879 sweep 48 + 880 sweep 49 정합 패턴 (5 consecutive sweep
  46→47→48→49→50 SUCCESS streak). accuracy rate vs winner-prob 개념
  차이 있으나 numeric threshold 동일 = silent drift 가능 영역 박제.

  3 instance 전수:
  - WeeklyTrendMini.tsx:32-33 barColor (rate>=0.65 success / >=0.55 warning)
  - buildMonthlyReview.ts:91 summary text (accuracyRate>=0.65)

  <= 0.45 mirror boundary raw 유지 (1 - WINNER_PROB_LEAN, source-of-truth
  상수 부재).

next_recommended_chain: lotto (lite, 2026-05-23 토 21:00 KST 추첨 직후 OOS 검증
  D-Day — 1225회 picks 박제 완료) OR review-code (heavy, sweep 51 — 다른
  silent drift family target grep, 예: getAccuracyColor/getConfidenceColor
  raw 65/55 pct 또는 accuracy/page.tsx:548 acc >= 0.55) OR fix-incident
  (사례 9 family quota reset 후) OR explore-idea (plan #5 옵션 carry-over)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
