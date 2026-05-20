---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "4acbc6ddd53af3aa5062281befc5677585e2457d"
---


subtype: cycle-retro
cycle_n: 791
chain_selected: explore-idea (heavy, gap=1 v12-E viewport theme-color carry-over)
outcome: success
pr_number: 1121
commit_hash: f45aa09

summary:
  - apps/moneyball/src/app/layout.tsx 에 export const viewport: Viewport 박제
  - themeColor light=#2d6b3f (brand-500, manifest theme_color 정합) / dark=#0a1f12 (brand-900, manifest background_color 정합)
  - colorScheme='light dark' — 모바일 브라우저 자동 분기 신호
  - iOS Safari 상단 상태 bar + Android Chrome 주소 bar 사이트 brand 색 일관 silent drift 해소
  - 1 파일 수정 (10 + / 1 -). type-check clean. R7 auto-merge.

v12 series 진행:
  - A (root OG) ship cycle 779 PR #1111
  - B (PWA manifest) ship cycle 781 PR #1113
  - C (dynamic OG 5 hub) ship cycle 783 PR #1115
  - D (Person/SportsTeam schema) ship cycle 785 PR #1117
  - G (Web Vitals) ship cycle 789 PR #1119
  - E (viewport theme-color) ship cycle 791 PR #1121  ← THIS
  - F (sitemap priority audit) carry-over (잔여 1/7)

next_recommended_chain: review-code (heavy, gap=1 silent drift family sweep 19 — cycle 791 v12-E CLAUDE.md sync) OR explore-idea (heavy, v12-F sitemap priority audit closure)
