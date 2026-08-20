---
date: "2026-08-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "180d41c0fba595bcbbe525409e495a412230fc9d"
---


subtype: cycle-retro
cycle_n: 2308
chain_selected: review-code (heavy)
outcome: success

MLB_HEAD_TO_HEAD_PAIRS 상수(matchup 페이지 이미 정상 사용) vs methodology 페이지(ko+en)
하드코딩 "30팀 435개 매치업" 발견 + 정정. commit 11ee8d4d 직접 main 커밋+push. 490/4124
tests pass, type-check/lint clean.

메타: sibling-file 매직넘버 family sweep(cycle 2296/2306/2307 계열) 이 이번 발견으로
사실상 소진 조짐 — standings(clean)/postseason(구조적 고정값, drift 아님) 확인 완료.
다음 사이클 info-architecture-review(28-gap/30, 근접) 또는 다른 chain 권장.
