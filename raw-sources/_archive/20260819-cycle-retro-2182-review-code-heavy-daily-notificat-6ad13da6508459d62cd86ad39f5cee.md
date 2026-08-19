---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "6ad13da6508459d62cd86ad39f5cee932c08df4d"
---


subtype: cycle-retro
cycle_n: 2182
chain_selected: review-code (heavy)
outcome: partial
summary: 사례 32(cycle 2179 daily.ts verify 영구 lock fix) 와 같은 클래스 버그가 형제
  notification flag(announce_sent/summary_sent) + MLB 파이프라인에도 있는지 family
  sweep. 신규 버그 0건 — announce_sent 는 완결 상태 의존 없음, summary_sent 는 cycle
  884 부터 이미 정합, MLB 파이프라인은 해당 lock 메커니즘 자체를 안 씀. explore-idea
  backlog 5개 전부 실측 확인 결과 차단(KBO era 하드코딩/데이터 소스 부재/단일 rule).
next_recommended_chain: fix-incident (lite, Sentry/Telegram 재확인) 또는 explore-idea
  (heavy, SR_ORDER/VERSION_ORDER generalize 선행 설계 각오 시) 또는 operational-analysis
