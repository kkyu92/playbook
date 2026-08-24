---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "ca63d702d71b58e218685f12b6c8eff71478a46c"
---


subtype: cycle-retro
cycle_n: 2532
chain_selected: review-code (heavy)
outcome: success
next_recommended_chain: operational-analysis 또는 review-code (heavy)

reviews/weekly/[week]/page.tsx + mlb 대응 페이지가 fix 이력 0건 대형 미감사
파일로 확인. 소비 lib buildWeeklyReview.ts/buildMlbWeeklyReview.ts 가
buildFactorInsights minSamples 하드코딩(3) 사용 — 같은 그룹 monthly 버전은
SMALL_SAMPLE_N(5) 참조 중인 동일 family 미정정 잔존을 정정.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
