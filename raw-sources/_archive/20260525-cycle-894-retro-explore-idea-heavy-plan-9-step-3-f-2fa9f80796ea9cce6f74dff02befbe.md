---
date: "2026-05-25"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "2fa9f80796ea9cce6f74dff02befbeca6e61a9f3"
---


subtype: cycle-retro
cycle_n: 894
chain_selected: explore-idea (heavy)
outcome: success
pr_number: 1271
main_head: c14ffe0
plan_n_processed: 9 (Step 3 first slice)

retro.summary: |
  plan #9 Step 3 (/v2-preview 신규 hub) first slice ship. v2.1-B 가중치 재가중치
  적용 predictor (apps/moneyball/src/lib/predictions/v2Predictor.ts 79 line,
  pure fn + HOME_ADV 0.015 + clamp [0.15, 0.85] + missing factor 0.5 neutral) +
  내부 미리보기 hub (apps/moneyball/src/app/v2-preview/page.tsx 287 line, server
  component + ISR 24h + robots noindex + side-by-side v1.8 vs v2.1-B 카드 +
  가중치 비교 grid + disclaimer banner) + 14 신규 unit test (가중치 합 / clamp /
  누락 neutral / NaN/Infinity / computeDelta sign).
  pnpm test 604 PASS regression 0 + tsc 0 + lint 0. R7 MERGED.

next_recommended_chain: explore-idea (heavy)
next_recommended_reason: |
  plan #9 Step 3 second slice — OG image + twitter-image (사례 10 family fix
  path 정합 default + runtime + size + contentType + alt 명시 박제) + sitemap
  entry + NAV/Footer wire (robots noindex 유지 검토). 동시 fix 가능 = 사례 10
  family 잔존 instance (seasons/[year] + reviews/weekly/[week] twitter-image
  runtime re-export PR #1264) fix-incident redirect 후보.

trigger eval (cycle 894 retro 시점):
- T1 chain-evolution 5+ 누적: skip (신규 commit 0)
- T2 same chain 5 fail: false (전부 success streak)
- T3 cycle_n % 50: 44 ≠ 0
- T4 meta-pattern SKILL 갱신 신호: false
- T5 zero-fire chain in 20-window inclusive (cycle 436): valid pool=13 ≥ 10
  표본 임계 충족 / 평가 대상 = review-code (cycle 825 9 영구 opt-out 후 단독) /
  review-code fires=5 in window → trigger 미충족

ship-0 emergency stop: 직전 10 cycle partial streak=0 (전부 success).

carry-over (plan #9 잔여):
- Step 3 second slice (OG / twitter / sitemap / NAV / Footer wire)
- Step 4 X2 데이터 갱신 cron (.github/workflows/data-refresh-weekly.yml)

사례 9 family 사용자 영역 (vercel webhook auto-deploy silent skip) + 사례 10
family (seasons/[year] + reviews/weekly/[week] twitter-image runtime re-export
PR #1264) silent drift carry-over.

meta:
- silent layer 발견 0 (slice 1 scope 제한)
- v2.1-B vs v1.8 사용자 가시 첫 노출 path 박제 (noindex 유지 = surface signal 차단)
- HOME_ADVANTAGE / FACTOR_TOTAL 공식 정합 (packages/kbo-data predictor 와 동일)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
