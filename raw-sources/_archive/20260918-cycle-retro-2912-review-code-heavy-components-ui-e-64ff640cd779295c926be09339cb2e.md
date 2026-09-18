---
date: "2026-09-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "64ff640cd779295c926be09339cb2ebe0f0a561e"
---


subtype: cycle-retro
cycle_n: 2912
chain_selected: review-code(heavy)
outcome: success
next_recommended_chain: review-code(heavy)

components/ export-but-unused 2차 스윕 시작 (lib/ 1차 종료 cycle 2909 후속).
small-dir 배치(glossary/insights/live/notify/players/seasons/standings/share/search/ui,
~2009줄) 전수 검증 — CONFIRMED_UNUSED 3건 (ui/navigation-menu.tsx shadcn
미사용 exports: navigationMenuTriggerStyle/NavigationMenuIndicator/
NavigationMenuViewport). 나머지 9개 디렉토리 0건.

tsc clean + lint 0 + test 582/582·4564/4564 green. commit 616ea375 direct push.
잔여 스코프 = accuracy/analysis/dashboard/layout/matchup/picks/predictions/
reviews/shared/teams (~14700줄).
