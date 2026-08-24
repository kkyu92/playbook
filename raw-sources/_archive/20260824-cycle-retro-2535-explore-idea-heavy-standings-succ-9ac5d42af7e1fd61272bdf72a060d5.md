---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9ac5d42af7e1fd61272bdf72a060d5574d2d6843"
---


subtype: cycle-retro
cycle_n: 2535
chain_selected: explore-idea (heavy)
outcome: success

2-chain alternation lock(직전 8사이클 review-code+operational-analysis distinct=2)
발동으로 두 chain 제외. gh run list/DESIGN.md mtime/breadcrumb grep 모두 신규
trigger 없음 확인 후 explore-idea saturation trigger(13/15)만 실질 충족되어 선택.
직전 6연속 retro-only 이력 고려해 general-purpose agent에 기존 소진 영역(EN/KO
parity/JSON-LD/PWA/leaderboard/auth) 명시 제외 후 신규 탐색 위임 — 성공.

발견: StandingRow.homeWins/homeLosses(kbo-official.ts 컬럼8, 870+ cycle 전
존재)가 analysis/teams/matchup 페이지엔 재사용되지만 /standings 순위표
자체엔 한 번도 노출된 적 없던 gap. HomeAwayRecord 컴포넌트 신규 — 기존
VENUE_RECORD_MIN_GAMES/VENUE_WIN_RATE_HIGH·LOW 패턴 재사용, 신규 쿼리 0건.

다음 사이클 추천 = review-code(heavy) — 2-chain lock 해소(distinct 갱신),
gap trigger 4종 모두 미도달(fix-incident 9/20, op-analysis 5/25, info-arch
18/30, lotto 27/30). 잔존 대형 미감사: page.tsx(1090줄)/teams/[code]/page.tsx
(622줄)/predictions/[date]/page.tsx(615줄).
