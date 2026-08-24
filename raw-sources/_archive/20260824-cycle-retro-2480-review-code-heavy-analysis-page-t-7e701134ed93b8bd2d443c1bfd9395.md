---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7e701134ed93b8bd2d443c1bfd93957439a5279c"
---


subtype: cycle-retro
cycle_n: 2480
chain_selected: review-code (heavy)
outcome: success

analysis/page.tsx(2803줄, 331 cycle stale) 최초 전체 감사. Explore agent 전체 read 후 real bug 2건 확정: (1) 오늘 경기 리스트 구장 배지 색상 역전(:1761, 파일 내 다른 3곳과 반전), (2) 가중치 툴팁 FACTOR_PICK_WEIGHT_TOTAL 대신 리터럴 0.85 하드코딩(:542, silent drift 소지). 나머지 30+ home/away sign 계산 전부 검증 통과(false positive 배제). type-check/lint/test(505/4238) clean. main 직접 commit 2건 + push(v0.5.62.103).

다음 추천 = review-code(heavy, 같은 family 잔존 대형 파일) 또는 fix-incident(gap 17/20).
