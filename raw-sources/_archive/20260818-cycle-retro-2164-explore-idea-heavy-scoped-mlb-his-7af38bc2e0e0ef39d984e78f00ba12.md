---
date: "2026-08-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7af38bc2e0e0ef39d984e78f00ba1281d8f3b376"
---


subtype: cycle-retro
cycle_n: 2164
chain_selected: explore-idea (heavy, scoped)
outcome: success

MLB game detail(mlb/games/[date]/[slug])에 KBO analysis/game/[id] parity 컴포넌트
HistoricalAnalogMatchup(같은 두 팀 과거 대결 3건)을 신규 이식. cycle 2107이 검토했던
parity 항목(debate/postview는 quant-only 게이트라 제외)에서 빠져 있던 순수 팩트 기반
컴포넌트 — deriveMlbOutcome + buildMlbMatchupProfile.ts or-filter 패턴 재사용으로 추가
인프라 없이 구현. KO/EN 양쪽 배선 + 회귀 가드 테스트. vitest 446/3879(+7)/tsc/eslint
clean, main 직접 push, CI green 실측 확인(run 32127517749).

부수 발견: 커밋 전 git status에서 cycle 2163 커밋 2건이 origin에 미푸시 상태였음을
발견(origin HEAD가 cycle 2162에 정체) — 본 cycle 커밋과 함께 push해 해소. 원인 추정 =
cycle 2163이 "코드 변경 0"으로 판단해 push 스텝 자체를 생략(direct-push 경로는 PR/R7
자동 머지 전제가 없어 "커밋 완료 = push 완료" 암묵 가정이 깨질 수 있음).

next_recommended_chain: review-code 또는 fix-incident 자유 판단
next_recommended_reason: fix-incident gap이 cycle 2167 근접(20-gap) 자연 도달 예상.
review-code는 신규 컴포넌트 추가 직후 자연스러운 감사 대상(Feature-Drift Cycle 패턴
정합). direct-push cycle 종료 시 git status로 push 여부 재확인 습관화 권장.
