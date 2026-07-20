---
date: "2026-07-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "afb5db79c6ab01049d69c9dde241be8a6414893c"
---


subtype: lesson
cycle: 1905

## 사례: post-break WAR data gap compound effect (2026-07-16~19)

**발견**: cycle 1903 post-break acc=27.8% (5/18). cycle 1905 heavy 분석에서 복합 원인 규명.

**원인 체인**:
1. Fancy Stats /leaders/ top-50 batter limit → Doosan/KT/Lotte/Kiwoom 타자 미포함
2. team_season_stats total_war=0 for id={4,5,7,10} (2026-07-19 sync 기준 현재도)
3. pre-wave-533 WAR normalize bug: awayWar=0 → homeWar/(homeWar+0)=1.0 → max home advantage
4. 결과: 홈팀 예측 과다 (83.3%), 실제 어웨이 우위 시리즈에서 연속 오예측

**post-break 구조** (5개 시리즈 중 4개가 WAR=0 away팀):
- LG vs KT(WAR=0): 0/4 → WAR bug로 KT 약팀 취급 → 실제 KT 4연승
- NC vs Doosan(WAR=0): 1/3 → 동일 패턴
- Hanwha vs Kiwoom(WAR=0): 1/3 → 동일 패턴
- Samsung vs Lotte(WAR=0): 2/3 → 비교적 정상 (Samsung 실제로도 강함)

**대응**:
- wave-533 (cycle 1904): totalWar=0 시 0.5 neutral → bias 제거 ✓
- 근본 fix (carry-over): Fancy Stats 대체 소스 for full-team WAR

**재발 방지 지표**:
- op-analysis-war-check.ts: WAR=0 팀 수 모니터링 (≥3 시 경고)
- op-analysis-postbreak-full.ts: pre/post-break CE acc 격차 >20pp 시 경고

**교훈**:
- Fancy Stats top-50 제한 = 하위권 팀 WAR 데이터 구조적 누락
- WAR normalize bug + 실제 away 우위 + CE fallback = 삼중 compound
- wave-533 neutral fix 는 data gap 보완이 아닌 bias 차단 (WAR=0 팀들은 여전히 WAR=0)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
