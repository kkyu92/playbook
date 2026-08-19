---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "eb13ed886daf4ed3ba4a2c20f09d3e90bceff31b"
---


subtype: cycle-retro
cycle_n: 2200
chain_selected: explore-idea (heavy)
outcome: success
pr: 2966
merge_commit: fdce1fbd

diagnosis: open issue 0건, approved plan 0건 (10~24 전량 종료, plan25 archived —
  MLB Elo phase3 gate 보류 확정), 2-chain lock 없음(직전8 distinct=3), CI green
  (fix-incident trigger 부재), next_recommended_chain(explore-idea or
  fix-incident) 따라 explore-idea 선택. KBO /accuracy vs MLB /mlb/accuracy
  컴포넌트 diff grep으로 TeamBiasTable(팀별 예측 편향) parity gap 발견 —
  FactorAccuracyTable/TeamMatchupCards는 이미 완료.
execution: buildMlbTeamBiasAnalysis() 신규(mlb_schedule final 스코어로 직접
  derive, 외부 standings 스크래퍼 불필요) + TeamBiasTable을 TeamMatchupCards/
  FactorAccuracyTable 이미 확립한 shortName/locale prop 패턴으로 일반화(KBO
  호출부 무변경) + /mlb/accuracy, /en/mlb/accuracy 양쪽 배선. 신규 테스트 5건.
  전체 테스트 448 files/3908 tests + lint + type-check(3 packages) 통과.
  PR #2966 squash 머지(fdce1fbd) 확인 후 retro 박제.
next_recommended_chain: fix-incident or review-code
next_recommended_reason: MLB/KBO accuracy 페이지 parity 완전 종료(factor-accuracy/
  matchup/bias 모두 shipped) — 다음 explore-idea는 새 KBO측 기능 찾아야 함.
  Feature-Drift Cycle 패턴상 review-code(heavy)가 신규 TeamBiasTable 일반화 +
  buildMlbTeamBiasAnalysis 감사하기 좋은 타이밍. fix-incident는 gap 계속 추적
  (last 2198, gap=2).

skill_evolution_trigger: trigger3(cycle_n % 50 == 0) = 2200 % 50 == 0 → TRUE.
  cycle 2051/사례19 mitigation 따라 trigger5와 독립적으로 우선 평가, marker
  즉시 박제 (다음 cycle 2201이 skill-evolution 강제 발화 + milestone 문서 갱신).
