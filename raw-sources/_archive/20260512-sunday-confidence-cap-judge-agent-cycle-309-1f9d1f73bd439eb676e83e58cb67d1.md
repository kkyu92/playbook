---
date: "2026-05-12"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "1f9d1f73bd439eb676e83e58cb67d12a866521b4"
---


subtype: lesson
cycle_n: 309

## 학습 내용

일요일 KBO 경기에서 calibration 역전이 반복됨. n≈20 일요일 적중률 ~15%,
calibration 0.55-0.59 구간 20% (정상 기대 55-59%).

n=150 전 전체 v2.0 가중치 확정은 보류하더라도, 일요일 confidence 상한 조정은:
- 단일 파라미터 변경 (judge-agent.ts parseResponse 이후 post-processing)
- 다른 팩터 가중치에 영향 없음
- calibrationApplied 필드로 추적 가능

## 구현 패턴 (재사용 가능)

비슷한 "특정 조건에서 과적합" 패턴 발견 시:
1. operational-analysis에서 데이터 근거 확인 (n ≥ 15+ 조건별)
2. judge-agent.ts의 `runJudgeAgent` 함수에 post-processing 추가
3. `calibrationApplied` 필드에 기록 → 운영 추적 가능
4. 테스트: 조건 충족/미충족/경계값/context없음 4케이스

## 박제 위치
- `packages/kbo-data/src/agents/judge-agent.ts` (Sunday cap 로직)
- `packages/kbo-data/src/__tests__/agents-judge-sunday-cap.test.ts` (8건)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
