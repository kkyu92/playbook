---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e00fffc4812ea0c7b25754dd89ceab415acaa7b6"
---


subtype: cycle-retro
cycle: 2950
chain_selected: review-code(heavy)
outcome: success
pr: #3132 (merged, commit 1dc5bb22)

summary: lib/mlb/ 하위 15개 빌더 파일(buildMlbStandings/buildMlbTeamProfile/
buildMlbTeamAccuracy 등)의 assertSelectOk 호출 32곳 전부 uncaught 상태 발견.
cycle 2945-2948 이 page.tsx(20개)와 analysis 데이터 레이어(19개)를 전수감사했지만
lib/mlb/ 빌더 레이어는 스코프 밖이었던 신규 영역 — 동일 silent drift family.
buildMlbTeamProfile.ts 에 "assertSelectOk wrap 완료"라는 거짓 주석도 발견해 정정.
egress_quota 장애(cycle 2939~ 지속)를 vercel logs 로 live 재확인, /mlb/standings 등은
현재 ISR stale-cache 로 200 이나 캐시 미스 시 500 가능한 상태였음(cycle 2947 /analysis
사례와 동일 구조). 32개 호출 전부 try/catch + captureFallback 적용, 연동 12개 테스트
파일의 .rejects.toThrow() 단언을 degrade 계약으로 갱신. tsc/eslint/vitest(584/4610) clean.

next_recommended_chain: operational-analysis 또는 info-architecture-review
next_recommended_reason: operational-analysis gap 27-cycle(마지막 2924) 지만 egress_quota
장애로 DB 재측정 불가 지속(billing 조치 대기, 반복 확인만 가능). info-architecture-review
gap 29-cycle(마지막 2922)로 30 임계 근접 — 다음 사이클 자연 trigger 유력. review-code(heavy)
는 lib/mlb/ assertSelectOk 패밀리 소진, 다음 heavy 는 신규 스코프 재탐색 필요.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
