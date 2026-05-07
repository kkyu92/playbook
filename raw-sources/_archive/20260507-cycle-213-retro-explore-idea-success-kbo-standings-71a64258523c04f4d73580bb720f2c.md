---
date: "2026-05-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "71a64258523c04f4d73580bb720f2cf58e00f283"
---


subtype: cycle-retro
cycle_n: 213
chain_selected: explore-idea heavy
outcome: success
pr_number: 200
commit: 54dde02

retro.summary: |
  explore-idea heavy — 0-fire trigger (21 사이클 0회) + 직전 2 cycle next_recommended = explore-idea.
  /standings 페이지 신규 구현: fetchStandings() scraper (KBO TeamRankDaily.aspx, cheerio),
  buildStandings() wrapper, standings/page.tsx (ISR 1h, JSON-LD ItemList, Breadcrumb,
  순위 배지 gold/brand/plain, 최근10경기 컬러). 헤더 nav + 푸터 sitemap + sitemap.ts 연결.
  761 tests pass. ship → PR #200 squash merge (R7).

next_recommended_chain: review-code
ship_pass_total: 84
