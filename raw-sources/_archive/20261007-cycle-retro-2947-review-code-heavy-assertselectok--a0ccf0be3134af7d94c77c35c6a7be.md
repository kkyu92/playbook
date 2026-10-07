---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a0ccf0be3134af7d94c77c35c6a7be0a3c304620"
---


subtype: cycle-retro
cycle_n: 2947
chain_selected: review-code(heavy)
outcome: success

cycle 2946 carry-over(assertSelectOk degrade 미적용 ~16개 파일 전수 감사) 수행.
live curl + vercel logs 실측으로 /about, /v2-preview 가 현재 production 에서
실시간 500 임을 발견(egress quota uncaught throw) — 가정이 아닌 실측 기반 진단.
나머지 15개 라우트도 매 요청 동일 에러를 던지고 있었으나 ISR stale-cache 가
200 으로 우연히 가리고 있던 상태였음을 vercel logs 로 확인.

17개 파일(about/v2-preview/search/accuracy(+shadow)/analysis-game-id/
teams-recent/predictions(+date)/reviews/mlb·en-mlb predictions·games·
games-slug) 전부 captureFallback 또는 try/catch 적용. 과거 "fail-loud →
error.tsx boundary" 의도 주석 2곳(reviews, predictions/[date])은 그 전제가
cycle 2946 실측으로 이미 반증됐음을 근거로 degrade 전환(주석 갱신).
dashboard/page.tsx 는 의도적 설계 확인 후 미변경.

tsc/eslint/vitest(584/4610) clean. 배포 후 /about,/v2-preview 200 복구 실측
확인, 기존 15개 라우트 200 유지.

next_recommended_chain: review-code(heavy) — /analysis page.tsx(2836줄) +
analysis-data.ts(983줄) 동일 패턴, 스코프 커서 다음 cycle 로 명시 이월.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
