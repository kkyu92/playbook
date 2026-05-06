---
date: "2026-05-05"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "c39db1b72d54d190506972d4f4e4fa40a03856e2"
---


subtype: meta-pattern
cycle_n: 82
pattern: monolith heavy review chain 이 silent drift / 부정확한 주석 / dev 용어 leak / silent fail 을 발견 + 차단하는 패턴

evidence (5건 임계 도달):
- cycle 60: predictor.ts 주석 v1.7-revert 정정 (silent code drift)
- cycle 62: fancy-stats row-level silent fallback 차단 (errors 박제)
- cycle 70: validator annotateLowWeightFactorAttribution 제거 (dev 용어 leak 차단)
- cycle 72: daily.ts retention/postview cleanup silent fail 차단 (errors 박제)
- cycle 76: validator mask 5개 limit silent leak 차단 (extractDetailValues source 분리 부재)

cycle 60 lineage 9 사이클 누적 (60→62→64→66→67→70→72→73→76→82) — 매 ~3 사이클 1 silent 발견.

recommendation:
- 미review monolith 우선순위 — daily.ts 994 / postview.ts 403 / fancy-stats.ts 406 / buildMatchupProfile 370
- review-code heavy chain 발화 시 새 monolith 우선 (이미 review 한 영역 회피)
- 매 5 silent drift 임계 시 meta-pattern dispatch (잡음 가드)

발화 빈도 가드: 본 dispatch 후 다음 5건 누적까지 회피. SKILL 갱신 필요 X (현 chain 동작 충분).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
