---
date: "2026-09-03"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e0aaee72608426e39b48d7998eb12b5869adea3f"
---


subtype: cycle-retro
cycle_n: 2824
chain_selected: review-code(heavy)
outcome: success

13개 single-commit lib 파일 감사 → 2건 확정 drift 수정: (1) buildMlbFactorAccuracy.ts
stale exclusion 주석(elo/recent_form/head_to_head 를 4개월+ 전 가정대로 미구현
placeholder 취급) → cycle 2349/2353 실배선 반영해 재배선. (2) estimateTime.ts
stale cron 문서(정시 KST 10-22) → 2026-04-29 Cloudflare Worker 이관(17 0-14 * * *,
KST 09:17-23:17) 반영, PlaceholderCard 표시 ETA 17분 오차 수정. PR #3074 R7 머지.

다음 추천: review-code(heavy) 계속(single-commit 후보 ~92개 잔여).
