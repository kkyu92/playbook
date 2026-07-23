---
date: "2026-07-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5e6210db8da6203be17d1727d9de3a2024c23b32"
---


subtype: cycle-retro
cycle_n: 1998
chain_selected: review-code (heavy)
outcome: success

explore-idea 후보로 조사한 /reviews/weekly day-of-week split 확장은 wave-602가
의도적으로 제외한 구조적 표본 부족 케이스(한 주 요일당 최대 1~2경기,
CONVERGENCE_DAY_OF_WEEK_MIN_PICKS=3 구조적 미달)로 판명 — 코드 주석 + wave-602
test guard로 확인 후 가짜 gap 구현을 취소. convergence-pick split 시리즈
(팀별/홈어웨이/요일별 × hub/monthly/weekly)는 이제 구조적으로 완전 propagate,
explore-idea 이 축 소재는 소진.

대신 analysis/page.tsx(2964줄, 앱 최대 monolith) 직접 정독 → SP FIP/xFIP/
불펜FIP/타선wOBA/Elo/최근폼/WAR/SFR 8개 팩터 강세/약세/중립 색상 ternary가
24회+ 그대로 복붙된 것 발견 — wave-574가 승률 pct 버전(computeWinRateColorClass)
만 추출하고 원본 팩터 수치 버전은 누락됐던 것. statColorClassHigherBetter /
-HigherBetterStrict(Elo neutral-band) / -LowerBetter 3개 순수 함수로 추출,
원본 comparator(>=/<=  vs  </>) 보존해 동작 변화 없음. PR #2855 → 46a04384
(226줄 삭제/38줄 추가, wave-604-stat-color-class.test.ts 13 cases 신규,
전체 vitest 3587 tests 통과).

next_recommended_chain: explore-idea (heavy) or review-code (heavy)
next_recommended_reason: convergence badge matrix 축은 소진됐으나 analysis/page.tsx
2964줄 중 이번에 정독한 건 일부뿐 — review-code 여지 잔존 가능성 높음.
explore-idea는 반복 팩터 배지 패턴 외 새 축 발굴 필요. 다음 진단 시점 자유 판단.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
