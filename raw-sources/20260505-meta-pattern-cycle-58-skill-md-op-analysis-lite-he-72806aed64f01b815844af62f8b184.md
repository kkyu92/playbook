---
date: "2026-05-05"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "72806aed64f01b815844af62f8b1849808f9da06"
---


subtype: meta-pattern
cycle_n: 58
chain: skill-evolution

변경 diff 영역 (~/.claude/skills/develop-cycle/SKILL.md):

1. chain pool table operational-analysis 행 — lite/heavy 모드 분리
   before: "/weekly-review → /extract-pattern → /compound | 회고 박제 또는 lesson PR"
   after: "lite: /weekly-review → /extract-pattern → /compound (lesson + retro 박제만, 신규 코드 X) / heavy: backtest harness 직접 실행 / bootstrap CI 측정 / 시뮬레이션 코드 작성 + 실행 + R8 데이터 결정 | lite: 신선 데이터 ≥ N 임계 + lesson 박제 (success) / 직후 재진단 = 데이터 부족 (partial). heavy: 코드 실행 + 통계 결정 박제 (success). 모드 선택 = 직전 op-analysis 사이클 outcome / 데이터 신선도 (≥7일 lite OK, <7일 heavy 권장) / 결정 기준 미측정 항목 존재 (heavy). cycle 52 lite=success / cycle 54 lite=partial (3일 후 재진단) / cycle 57 heavy=success (3 partial → success break 박제)"

2. skill-evolution 행 trigger 5 — self-loop 차단 텍스트 강화
   before: "(5) 직전 20 사이클 동안 chain 1개 0회 발화"
   after: "(5) 직전 20 사이클 동안 chain pool 의 chain 1개 0회 발화 (skill-evolution 자체 제외 — self-loop 차단)"

3. description (line 3) — milestone 누적 갱신
   before: "cycle 46/49/51 skill-evolution 3회 자가 진화 + cycle 50 cycle 49 룰 ... 첫 자연 발화 검증 PASS"
   after: "cycle 46/49/51/58 skill-evolution 4회 자가 진화 + cycle 49 룰 ... 검증 PASS 2회 (cycle 50 polish-ui / cycle 56 explore-idea) + cycle 57 success break (3 partial → 1 success, op-analysis heavy 모드)"

4. 마이그레이션 path table 단계 3 — cycle 58 후속 박제
   before: "잔여 0회 chain 3개 (explore-idea / dimension-cycle / design-system) carry-over"
   after: "cycle 56 explore-idea = cycle 49 룰 PASS 2번째 (cycle 50 polish-ui 1번째 PASS 후속). 잔여 0회 chain 2개 (dimension-cycle / design-system) carry-over. cycle 58 trigger 5 (chain 0회 발화) 자동 발화 = skill-evolution 4회째 자가 진화 — op-analysis lite/heavy 모드 분리 + cycle 56 PASS 박제"

핵심 학습 (cycle 52/54/57 3 sample 직접 evidence):
- lite mode 적용 조건: 신선 데이터 ≥7일 + lesson 박제 가치 충분 → success
- lite mode 직후 재진단: 데이터 부족 → partial (cycle 54 사례)
- heavy mode 적용 조건: 결정 기준 미측정 / backtest harness 직접 실행 필요 → success (데이터 신선도 무관)

cycle 59 = op-analysis prod CI 측정 (cycle 57 retro next_rec) 자연 발화 시 본 갱신의 heavy 모드 직접 적용 = R5 진짜 PASS 4번째 후보 (cycle 50/56 누적 후속).

evidence:
- cycle 46 meta-pattern: skill-evolution 첫 발화 변경 diff
- cycle 49 meta-pattern: SKILL.md chain 균형 trigger 강화 변경 diff
- cycle 51 meta-pattern: SKILL.md milestone 50 + cycle 49 룰 cycle 50 PASS 변경 diff
- cycle 58 meta-pattern (본 commit): SKILL.md op-analysis lite/heavy 모드 분리 변경 diff
