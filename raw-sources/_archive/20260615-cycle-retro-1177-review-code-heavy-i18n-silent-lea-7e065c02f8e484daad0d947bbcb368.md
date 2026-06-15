---
date: "2026-06-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7e065c02f8e484daad0d947bbcb3684b58debf80"
---


subtype: cycle-retro
cycle_n: 1177
chain_selected: review-code (heavy)
outcome: success
pr: #1968
commit: c3d9057
next_recommended_chain: operational-analysis (lite)

summary: i18n silent leak family wave 21 박제. root layout layer fix — /en/* 라우트의 <html lang> + skip link + JSON-LD inLanguage 모두 locale-aware. middleware x-pathname request header 박제 + root layout async + headers() pattern. SEO + a11y degrade 양쪽 해소. silent drift family streak ~719 cycle 유지 (cycle 458 → cycle 1177).

key_findings:
- 직전 retro wave 20 후보 (hreflang/sitemap.xml /en/mlb URL) 검사 결과 둘 다 박제 OK
- 더 깊은 layer = root layout.tsx 안 lang='ko' + skip link + JSON-LD inLanguage 한국어 hard-coded
- /en/mlb individual page Hangul 0 + shared components 모두 OK (이전 cycle 들 처리 완료)

next: op-analysis lite (cohort snapshot 갱신 v1.8 n=90→?) 또는 polish-ui lite (DESIGN.md token grep) 또는 review-code heavy (wave 22 다른 영역 silent drift)
