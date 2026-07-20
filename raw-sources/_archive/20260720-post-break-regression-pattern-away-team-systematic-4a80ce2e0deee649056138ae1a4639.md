---
date: "2026-07-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "4a80ce2e0deee649056138ae1a46392ee20c7f44"
---


subtype: lesson
cycle_n: 1903

## 사례: KBO 올스타 브레이크 후 모델 회귀 (2026-07-16~19)

**발견**: n=205 v1.8, post-break acc=27.8% (5/18) vs pre-break 55.6% (10/18)

**패턴**:
- LG(home, Elo 1545) vs KT(Elo 1525): 모델 LG 예측, KT 4/4 연승
- 한화(home, Elo 1488) vs 키움(Elo 1440): 모델 한화 예측, 키움 3/3 연승
- NC(home, Elo 1501) vs 두산(Elo 1500): 모델 NC 예측, 두산 3/3 연승
- 10/10 원정팀 연승 (4일 연속, 3개 매치업)

**원인 가설**:
- H1: 브레이크 후 특정 팀 form 급변 (Elo/stats에 반영 안 됨)
- H2: 100% CE fallback (debate 없음) = 정량 stats 의존 → Elo 편향 증폭
- H3: home_win_prob > 0.5 (모든 홈팀 예측) + 홈팀 전패 = 구조적 anti-bias

**박제**:
- team_season_stats last_synced=2026-07-19 (fresh), 원인은 data staleness X
- 오늘 (July 20) KBO pipeline games=0 (games not found or rest day)
- Brier=0.2518, acc=57.1% (전체 n=205 기준)

**다음 액션**: fix-incident (heavy) — post-break regression root cause 규명
- 브레이크 후 LG/한화/NC 특이 사항 조사
- CE fallback 시 home bias 증폭 여부 확인
- July 20 games=0 원인 확인
