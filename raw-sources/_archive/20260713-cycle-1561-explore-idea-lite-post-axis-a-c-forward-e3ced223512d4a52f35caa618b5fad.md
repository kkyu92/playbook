---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "e3ced223512d4a52f35caa618b5fad2b19ebb4c4"
---


subtype: lesson
cycle: 1561
chain: explore-idea (lite)
motive: cycle 1547 spec 축 A (cycle 1550 완료) + 축 C (cycle 1549 완료) 이후 신규 forward path 박제. improvement saturation trigger fire (직전 15 사이클 review-code+fix-incident+polish-ui+info-arch 12/15 = threshold) → 신규 direction 점검.

## 완료 축 결과 요약
- **축 A** (cycle 1550): LLM 부가가치 5.0pp 확정 (CE 58.8% vs 비CE 63.8%, overlap 월 3/3 격차 identical → temporal bias 배제, Brier CE 0.3134 vs 비CE 0.2534)
- **축 C** (cycle 1549): n=178/n=165/n=187 = 시점별 스냅샷 + shadow/cohort 분리 = 자연 시간 흐름 (표본 미스매치 X)

## 신규 축 D — LLM debate 복구 후 CE cohort 자연 축소 monitor (op-analysis lite carry-over)
- 사용자 Anthropic 크레딧 충전 이행 후 debate 성공률 회복 monitor
- CE cohort 신규 유입 rate + overall Brier 개선 방향 예측

## 신규 축 E — CE cohort backfill 140건 재확인 (review-code lite carry-over)
- scripts/cohort-cleanup.ts --dry-run 우선
- hybrid criteria → 단일 criteria 재분류 안전성 진단

## Tier rubric
- 축 D/E = Tier 2 (사용자 크레딧 충전 or 사용자 결정 대기)
- 축 B (HOME_ADVANTAGE) = 사용자 결정 대기 유지, B-3 (v1.8 stay) 우세 방향 hint

self-verification: 5축 rubric 적용 / 자가 의심 X (evidence only) / 결정 X (사용자 영역 명시)

carry-over: 다음 op-analysis lite (축 D) / 다음 review-code lite (축 E) / plan #24 draft (축 A+B+D 통합 시)
