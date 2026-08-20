---
date: "2026-08-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "fd964b3f221c5690a410b4e48fc53402453ae063"
---


subtype: cycle-retro
cycle_n: 2306
chain_selected: fix-incident
outcome: success

cycle 2305 explore-idea(heavy) 가 wild-card 를 실시간 전환했지만 hub 카드/OG 이미지/
postseason cross-link 6곳에 stale ETA 2026-08 문구가 잔존 — review-code 관점 grep 으로
발견 + 정정. 동시에 root package.json version 이 1건 밀려 version-sync-guard.test.ts
가 FAIL 하던 것도 함께 발견/수정. 490 files/4124 tests all pass, PR #3009 실측 MERGED
(mergeCommit 6f737c37).

메타: shipped-feature cross-reference staleness = silent drift family 신규 하위 패턴
(기능 자체는 갱신되나 그 기능을 가리키는 다른 위치 문구는 누락). 다음 review-code 사이클
후보 = 다른 최근 shipped 기능(cycle 2296 division 매직넘버 등)도 동일 패턴 재확인.
