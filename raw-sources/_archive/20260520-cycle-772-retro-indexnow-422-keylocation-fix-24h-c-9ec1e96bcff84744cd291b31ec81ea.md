---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9ec1e96bcff84744cd291b31ec81eac6bcf65482"
---


subtype: cycle-retro-amend
cycle_n: 772
amends: fa64701 (initial retro)
additional_prs: [#1104 .vercelignore drift fix, #1105 keyLocation root fix]
status_change: success → success (3 PR 누적 ship + carry-over blocked)

amendment 사유:
- 사용자 자율 처리 요청 (INDEXNOW_KEY env 박제 + workflow fire 검증) 진행
- 첫 fire 시 IndexNow API 422 InvalidRequestParameters 발견 + 즉시 진단
- root cause: keyLocation 비표준 path → Bing site ownership 거부
- fix 박제 (PR #1105, e00e182) — root level [indexnowKey].txt 동적 route + keyLocation = https://HOST/KEY.txt + indexnowResponse body 박제 (silent 422 차단)
- 부가 발견: silent drift 사례 9 — cycle 763~772 main push 자동 production deploy 미발생 (vercel webhook / git connection 의심)
- 임시 해소: .vercelignore 박제 (PR #1104) + vercel --prod 수동 1회. fix #1105 prod 반영 = Vercel free tier 일 100 deploy 한도 초과로 24h carry-over

carry_over_blocked_until: 2026-05-21T05:32:00Z
carry_over_actions:
  1. vercel --prod --yes 강제 deploy 1회 (PR #1105 prod 반영)
  2. gh workflow run indexnow-ping.yml → log 확인 (ok=true + urlCount=1459 + indexnowResponse 정상)
  3. Bing Webmaster Tools `submitted via IndexNow` baseline 측정 (사용자 외부 SaaS 계정)

next_recommended_chain: review-code heavy gap=1 — silent drift family sweep 12번째 자연 후속 (cycle 772 신규 endpoint + .vercelignore + 사례 9 박제 CLAUDE.md sync). fix-incident 는 24h reset 대기.

silent_drift_evidence:
  - 마지막 prod Ready = 2h 전 cycle 762 retro (a2a73e6)
  - main HEAD = cycle 772 retro 직전 (7c47738) → 9 PR + 10 retro commit 미반영
  - root cause 미확정 — vercel.com dashboard 사용자 영역

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
