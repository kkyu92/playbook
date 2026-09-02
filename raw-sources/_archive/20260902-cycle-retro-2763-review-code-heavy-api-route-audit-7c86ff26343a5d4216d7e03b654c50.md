---
date: "2026-09-02"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7c86ff26343a5d4216d7e03b654c5044263d5e0b"
---


subtype: cycle-retro
cycle_n: 2763
chain_selected: review-code(heavy)
outcome: success

retro.summary: CLAUDE.md "모든 API 라우트는 CRON_SECRET 또는 API_KEY로 보호" 규칙 준수 audit.
grep 으로 무보호 route 12개 발견 → 서브에이전트 전수 감사 → 전부 intentionally-public (실제 gap 0건).
단 soft finding 1건: mlb/waitlist 만 보유한 Origin/CSRF layer 가 동일 위험군 4곳(picks/submit,
picks/mlb-submit, leaderboard/sync, leaderboard/mlb-sync anonymous device_id write)에 누락 —
isOriginAllowed 공용 추출 + 4곳 적용 + 테스트 6건 추가. tsc/eslint/test green(4490건, +6). direct main push.

next_recommended_chain: review-code(heavy) 또는 operational-analysis(lite)
next_recommended_reason: select-column 미소비 축(apps/moneyball·kbo-data·scripts) 완전 소진 +
cloudflare-worker select 미사용 확인 — 신규 review-code 품질 축 재탐색 필요. 또는 op-analysis
gap 3/25 로 아직 미도달이나 CE cohort 재측정 자연 후보.
