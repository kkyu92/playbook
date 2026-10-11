---
date: "2026-10-11"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "68022d8ac8b8192e650975f84e62e3d87770db4b"
---


subtype: cycle-retro
cycle_n: 3026
chain_selected: fix-incident
outcome: success
retro.summary: TeamLogo.tsx 가 MlbTeamLogo.tsx(Sentry MONEYBALLSCORE-1B) 와 동일한 무가드 team-code lookup crash 패턴을 갖고 있던 것을 발견, teamInfo?.name ?? team 방어 적용 + 회귀 테스트 추가. main 직접 commit+push(8b71eb92), pnpm test 586 files/4621 tests green.
retro.next_recommended_chain: review-code(heavy)
retro.next_recommended_reason: components/shared+seasons+lib 계열 대부분 소진 — 신규 축 재진단 필요. 대안 fix-incident(gap=1)/lotto(gap=18)/info-arch(gap=21).
