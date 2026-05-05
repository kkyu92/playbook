---
date: "2026-05-05"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "80197dda4fb4a3a213a9e16eb9acf87e47102d20"
---


subtype: lesson
discovery_cycle: 60
review_target: packages/kbo-data/src/scrapers/fancy-stats.ts:327-331

### 사례

cycle 60 review-code chain 으로 fancy-stats.ts 코드 read 중 발견. fetchEloRatings 함수 (line 296-337) 가 KBO Fancy Stats /elo/ 페이지 파싱 후 fallback 처리:

```typescript
ratings.push({
  team,
  elo: elo || 1500,
  winPct: 0.5,
  woba: woba || 0.320,
  fip: fip || 4.00,
  sfr: sfr || 0,
});
```

`parseNum()` 이 빈 셀/NaN 시 0 리턴 → `||` 단락 평가로 fallback 진입. **진짜 데이터 부재 vs 진짜 SFR=0 / wOBA=0 구분 불가**.

### 잠재 위험

1. 페이지 구조 변경 (table cells 순서 / 셀 텍스트 포맷) 시 모든 팀 SFR=0 / wOBA=0.320 silent fallback. cells.length<6 reject 하지만 셀 위치 shift 시 안전 X
2. fancy-stats.ts:18 박제 사례 = 2026-04 "KIA Tigers" → "Kia Tigers" drift 1팀 누락 — case-insensitive resolveTeamCode 로 해결됐지만 원본 사고 메커니즘 동일 (조용한 데이터 quality 저하)
3. cycle 59 prod 30일 N=67 sfr/h2h CI 0 배제 (systematic confirmed) 의 잠재 원인 후보 — 가중치 0.05/0.04/0.05 활성 상태에서 systematic bias 측정. SFR=0 fallback 진입 비율이 일부라도 있으면 CI 폭 + bias 방향 모두 영향

### 대응 (cycle 61+ 결정)

- A) fallback 유지 + 측정 추가: pipeline_runs metadata 또는 sfr_confirmation_log (가칭) 신설. fetchEloRatings 결과 중 SFR=0 row 카운트 + 알림 임계값
- B) fallback 명시적 throw: SFR=0 발견 시 throw → cron silent fail → /debug/pipeline 에서 가시화. trade-off = scrape 정상이지만 SFR 진짜 0 팀 (수비력 평균)도 throw
- C) 별도 source 검증: KBO 공식 또는 FanGraphs 에서 보조 SFR 가져와서 cross-check. 비용 = 3소스 → 4소스

cycle 56 spec section 6 위험 평가 1번 (변경 후 47% → <45% 추가 악화) 의 하부 layer 후보 = 데이터 quality 부터 검증한 후 가중치 변경. 즉시 fix X — 측정 우선.

### 박제 위치

- 본 lesson commit (subtype=lesson)
- cycle 60 cycle_state.retro.todos_added[0]
- predictor.ts 주석 정정 PR #97 description carry-over 섹션
