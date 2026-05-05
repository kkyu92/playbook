---
date: "2026-05-04"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "22590112dce19daffdb676c99725f7856d6b1485"
backfilled_by: "cycle 29 fix-incident (issue #179 push race recovery)"
---


subtype: meta-pattern
pattern: skill-evolution chain 첫 자동 발화 → fix-incident stop 강화 → R5 정정 6번째 차단

evidence:
  - cycle 45 meta-pattern: R5 정정 5건 누적 박제
  - cycle 45 trigger #5 충족: 직전 20 사이클 5개 chain 0회 발화
  - cycle 45 skill-evolution-pending 마커 박제
  - cycle 46 자동 발화: skill-evolution chain 강제 (메인 자율 X)
  - cycle 46 PR #86 (29e331d): SKILL.md fix-incident chain stop 강화

변경 diff:
  | Before | After |
  |---|---|
  | PR 생성 + CI green 또는 root cause 미해결 | PR 생성 + CI green + (실측 fire 1회 PASS 또는 사용자 자연 발화 검증) 후 success 박제. isolated smoke 단독 = success 박제 X |

새 룰 적용 (cycle 47+):
  - isolated smoke + 실측 fire 1회 PASS → success
  - isolated smoke 만 PASS → partial (실측 fire 또는 사용자 검증 대기)
  - partial outcome 발견 시 다음 사이클 = 같은 영역 fix-incident chain 회피

작동 메커니즘:
  - 가짜 신뢰 차단 강제 (메인 자율 PASS 박제 X)
  - 실측 fire 또는 사용자 자연 발화 신호 부재 = partial 자동 박제
  - chain 다양성 자연스럽게 증가 (회귀 차단)

추천 행동: cycle 47+ 매 fix-incident chain 시 본 룰 자동 적용. 새 R5 정정
6번째 발견 = 본 룰의 catch 효과 검증.

다음 skill-evolution 발화 후보:
  - 0회 발화 chain trigger source 강화 (cycle 47+ 누적 데이터 보고 결정)
  - 진단 source 균형 룰 (직전 5 사이클 같은 chain 3+회 시 다른 chain 우선)
