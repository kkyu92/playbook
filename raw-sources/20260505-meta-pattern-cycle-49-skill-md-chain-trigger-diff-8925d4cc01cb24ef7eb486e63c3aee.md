---
date: "2026-05-05"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8925d4cc01cb24ef7eb486e63c3aee2bbaa185c0"
---


subtype: meta-pattern
pattern: SKILL.md 자가 갱신은 매 발화마다 직전 누적 데이터의 가장 명확한 빈자리에 응답
evidence:
  - cycle 46 (첫 발화): R5 정정 5건 누적 → fix-incident chain stop 조건 강화 (PR #86, 29e331d)
  - cycle 49 (두 번째 발화): 0회 발화 chain 4개 누적 → trigger source 강화 (PR #88, a318ce8)
  - 두 발화 모두 직전 20 사이클 데이터의 직접 응답 = trigger 평가 기반 발화 자연성 박제

변경 diff (cycle 49):
  - chain pool table: explore-idea / polish-ui / dimension-cycle / design-system trigger 정의 강화 (4 chain, 자동 측정 명령 + 사용자 발화 키워드 + GH issue 키워드 명시)
  - 진단 source table: 누락 chain 3행 추가 (expand-scope / design-system / skill-evolution)
  - 단계 1 진단 첫 step: 0회 발화 chain trigger 우선 검토 룰 신설 (직전 20 cycle chain 분포 측정 명령 명시)

recommendation: cycle 50+ 진단 시 본 갱신 효과 측정 → cycle 68 시점 distinct chain count ≥ 7/9 도달 시 R5 진짜 PASS 박제. 미달 시 다음 skill-evolution 후보 = 진단 source 자체 보강 (사용자 입력 의존성 약화).

reflexive_signal: skill-evolution chain 자체가 SKILL 갱신 → 다음 사이클부터 SKILL 적용 → trigger 재평가 → 누적 시 다음 발화. cycle 46 → 49 = 3 사이클 간격 (마커 박제 47, skip 48, 발화 49). 본 패턴 = 정상 reflexive cadence.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
