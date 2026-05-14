---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5329798d6a085fc18da3a9c342cfc57fde3f9308"
---


subtype: cycle-retro
cycle_n: 387
chain_selected: operational-analysis lite
outcome: partial
commit_companion: e028625 (lesson/TODOS update)

진단:
- 384~386 next_rec carry-over 3 cycle 연속 op-analysis lite
- 직전 8 distinct=5 (lock 미발동) / lite cap STREAK=1
- 5/14 today pre_game fire = label 강등 검증 적기

측정 결과:
- n=99 verified / 49.5% / Brier 0.2587 (cycle 378 박제 동일 — 5/14 미verify)
- scoring_rule: v1.5=75%(16) / v1.6=37.0%(46) / v1.7-revert=53.1%(32) / v1.8=60%(5)
- 5/14 5 pre_game 모두 mv='v1.8' (정정 라벨) — PR #372+#413+#414+#415 fix 작동 검증 PASS
- but conf=0.30 + reasoning="에이전트 토론 불가" = root cause 2일째 미해결

신규 발견:
- v1.6 anomaly: n=46 37% (coinflip 13%p 이하), high/low conf 양쪽 random 이하
- ROOT cause = ANTHROPIC_API_KEY credit (외부 SaaS, code fix 불가)
- user action 필요: Vercel+Cloudflare env 확인 + 충전/재발급

박제:
- docs/lessons/2026-05-14-anthropic-credit-silent-fallback-v18.md 후속 evidence 섹션
- TODOS.md v1.8 경고 갱신 + v1.6 anomaly 신규 + user action 명시

next_recommended_chain: explore-idea lite or review-code heavy
reason: op-analysis 2회 연속 partial — 3회 도달 시 lite cap 위험. credit-independent 영역 자연 redirect.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
