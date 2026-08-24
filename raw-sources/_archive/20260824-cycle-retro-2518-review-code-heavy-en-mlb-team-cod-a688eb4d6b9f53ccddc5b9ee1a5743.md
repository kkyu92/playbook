---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a688eb4d6b9f53ccddc5b9ee1a57433c0f565f8a"
---


subtype: cycle-retro
cycle_n: 2518
chain_selected: review-code (heavy)
outcome: success

진단: open issue 0, approved plan 0/23, 2-chain lock 해소(직전 8사이클 distinct=3), gap trigger 3종 미도달. cycle 2516 carry-over 후보 리스트 STALE 발견 -> wc -l 전체 재스캔으로 en/mlb/team/[code]/page.tsx(602줄, 미감사) 발굴.

발견: EN/KO 페어 3개(mlb/team/[code], mlb/team index, mlb/matchup) jsonLd inLanguage 필드 KO만 누락 (EN은 전부 보유) — 과거 parity fix 편도 적용 drift.

조치: KO 3페이지 inLanguage:"ko-KR" 추가 + 회귀 테스트 추가 + vitest 514/4277 pass + direct main push (e0e8b944).

next_recommended_chain: review-code (heavy) 계속 또는 operational-analysis (gap 13/25)
next_recommended_reason: carry-over 후보 리스트 재사용 시 wc -l + git log 재검증 필수 (본 사이클 교훈). en/mlb/matchup, en/mlb/reviews/monthly 미감사 후보 잔존.
