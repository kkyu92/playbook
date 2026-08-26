---
date: "2026-08-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d866019a31efbefaae8122d9653bbb43b938b88f"
---


subtype: cycle-retro
cycle_n: 2645
chain_selected: fix-incident
outcome: success
retro.summary: 마지막 발화(cycle 2615) gap 30/20 — 20-cycle 주기 보정 trigger 충족. pipeline_runs 직접 조회로 mlb_fancy_scrape FanGraphs 403 3일 연속(08-19~21, 이미 self-recover) 발견 — 근본원인은 cycle 2278 fix 잔여 tail 이라 재발 아님. 조사 확장 중 진짜 gap 발견: shouldAlertSilentDrift 가 MLB scrape mode 의 total fetch 실패(gamesFound=0+errors)를 alert 대상에서 놓치던 구조적 버그. MLB_SCRAPE_MODES 전용 분기 추가 + 테스트 5건. tsc/vitest(1214,+15)/lint clean. commit 2bc98e20, v0.5.62.164.
next_recommended_chain: info-architecture-review (gap 28/30) 또는 review-code(heavy) 복귀
next_recommended_reason: info-arch gap 이 30 임계 1사이클 앞으로 다가와 자연 도달권. review-code(heavy) 는 6연속 streak 후 diversity 1회(fix-incident) 확보했으니 복귀도 자연스러움.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
