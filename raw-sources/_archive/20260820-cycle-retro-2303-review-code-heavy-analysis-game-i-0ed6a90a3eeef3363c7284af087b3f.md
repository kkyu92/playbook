---
date: "2026-08-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0ed6a90a3eeef3363c7284af087b3f575551296d"
---


subtype: cycle-retro
cycle_n: 2303
chain_selected: review-code (heavy)
outcome: success
pr: 3006 (merged 2f7c138a)

analysis/game/[id]/page.tsx computeCompositeDuel 호출에 h2hHomeWins/h2hAwayWins 누락 —
list page(analysis/page.tsx) 는 getSeasonH2HData 로 h2h 팩터 계산해 넘기지만 detail page 는
해당 인자 자체가 빠져있어 h2h 팩터가 이 페이지에서만 항상 invalid. validCount 최대 9/10 이라
FACTOR_PICK_COMPLETE(10, 전팩터 만장일치) 완전수렴 배지가 detail 페이지에서는 구조적으로
절대 표시될 수 없던 silent 불일치 — 같은 경기를 list 에서 볼 때와 detail 에서 볼 때 수렴
강도가 다르게 보일 수 있는 케이스. #1338 family(scoring_rule 필터 누락) 와는 다른 신규
클래스 — 팩터 인자 자체 누락.

list page(wave-333) 와 동일 getSeasonH2HData + pair key(sort+join) + H2H_MIN_GAMES 게이팅
으로 정정. 회귀 테스트 신규(source-read-assert 패턴, silent-drift-cycle-2292/2295 동일 구조).
488 files/4113 tests all pass, type-check/lint clean.

PR #3006 → gh pr merge --squash --auto --delete-branch 즉시 발화 → CI green → 실측 머지
완료(gh pr view 3006 --json state,mergedAt → MERGED, mergeCommit 2f7c138a) — 사례 18 교훈
(완료 서술 전 실측 확인) 준수.

다음 후보: review-code(heavy) 지속 또는 fix-incident(6-gap/20)/op-analysis(19-gap/25)/
lotto(10-gap/30)/info-arch(24-gap/30) 주기 trigger 대기.
