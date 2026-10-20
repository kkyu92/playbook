---
date: "2026-10-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d22782de2fd8a259f42968f5aa8a2ce7e7e52389"
---


subtype: cycle-retro
cycle_n: 3411
chain_selected: review-code (heavy)
outcome: success

daily.ts 최상위 Promise.all 와 fetchTeamStats 내부 Promise.all 이 겹쳐
/leaders/,/elo/ 각 2회 중복 fetch 하던 TOCTOU 를 URL 키 in-flight 캐시로 해소.
kbo-live.ts/kbo-pitcher.ts 메인 fetch 경로에 fetchWithRetry 적용 —
동일 엔드포인트 쓰는 kbo-official.ts 와 정합. kbo-data 1234 + moneyball 4731
tests 전부 PASS. 2-chain lock 미충족(직전8 3403-3410 distinct=3).
skill-evolution trigger 전부 미충족, ship-0 미충족(직전10 success 8건).

다음 사이클 추천 = review-code(heavy) 계속 또는 fix-incident/op-analysis/lotto/info-arch gap 자연 대기.
