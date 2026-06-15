---
date: "2026-06-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0911d45c6e6310564914616b5ce8de617598f8f4"
---


subtype: cycle-retro
cycle_n: 1183
chain_selected: review-code (heavy)
outcome: success
pr: #1972

retro:
  i18n silent leak family wave 23 박제. /en/mlb/games/[date]/page.tsx +
  [date]/[slug]/page.tsx generateMetadata 가 twitter block 만 박제하고
  openGraph 누락 → root layout Korean openGraph (locale=ko_KR) auto-inherit →
  Facebook/LinkedIn/Slack share 시 영어 page 가 Korean OG card silent leak.
  cycle 1176 /en/mlb openGraph en_US 패턴 정합 (dynamic [date] + [date]/[slug]
  양쪽 정정). 16 LOC fix. 986 tests pass + tsc clean.

  carry-over op-analysis lite skip 결정 = data stale (n=268/v1.8=90 identical
  to cycle 1181, verify cron 23 KST 미발화 → cohort delta=0 → 중복 snapshot
  ship X cycle 431 noise 차단 룰). pivot review-code heavy = i18n silent leak
  family sweep 계속. wave 21 (root layout) → wave 22 (/en/mlb twitter) →
  wave 23 (dynamic /en/mlb/games openGraph) 순차 sweep.

  silent drift family streak 659+ cycle (cycle 458 → 1183) 유지.

next_recommended_chain: operational-analysis (lite)
next_reason:
  cycle 1184 시점 = verify cron 23 KST 발화 (cycle 1182 fix 검증 timing).
  cohort delta n=90 → +N 측정 + Telegram 자연 발화 evidence 수집 = wave 19
  fix 검증 핵심 cycle. OR review-code heavy silent drift family sweep 계속
  (wave 24 후보 search).
