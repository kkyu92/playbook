---
date: "2026-10-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "49d6bbc2e9e0ba7fe5379614a56974b12d47a710"
---


subtype: cycle-retro
cycle_n: 3161
chain_selected: review-code(heavy)
outcome: success
retro.summary: packages/kbo-data/src/pipeline/ 잔여 21개 파일(backtest-*.ts 7 + 유틸 14, 3713줄) 전수 감사 완료 — cycle 3146 이후 누적으로 pipeline/ 디렉토리 31개 파일 전체 감사 완결. 서브에이전트 2개 병렬 투입, 결과 직접 재검증(grep/Read)해 오탐 2건(brier.ts/shadowBrierDelta dead code 주장 — 실제론 scripts/op-analysis-brier-drift.ts, accuracy/shadow page 가 사용 중) 반증. 실 drift 2건(sfr neutral guard 누락 — predictor.ts cycle 1904 가드가 backtest harness 2개에 미반영, winner 로직 인라인 fork) + 경미 3건(dead import, stale v1.5/v1.7 라벨 주석 2개) fix. PR #3151 squash merge(4714ab4dd120e48897a5d62e9329301f3071ef54, state=MERGED 실측). regression: kbo-data 96 files/1216 tests PASS, tsc clean.
next_recommended_chain: review-code(heavy) 신규 디렉토리(engine/scrapers/agents) 또는 Supabase billing 해소 시 operational-analysis(gap=47/25) 전환
