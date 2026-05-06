---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b4c934e2361079bafa805a568cd60dd1af756b58"
---


subtype: meta-pattern
pattern: silent drift family detection apps/moneyball 차원 진입 5 step sequence — packages/kbo-data lib (cycle 137~146) → apps/moneyball lib (cycle 147 첫 진입 → cycle 151 두 번째 진입) → apps/moneyball page (cycle 148) → apps/moneyball route handler (cycle 149) → apps/moneyball static asset (cycle 151 첫 진입). cycle 148 메타 패턴 박제 (lib→page sequence) → cycle 149 sequence 4 step → cycle 150 milestone progression sequence 명문화 → cycle 151 = 한 PR 안 두 차원 동시 진입 (lib 두 번째 + static asset 첫 번째) 5 step sequence 완성.

cycles:
- cycle 137 fetchTeamStats stub 가시화 (packages/kbo-data lib 첫 진입)
- cycle 138 fetchEloRatings winPct stub 가시화
- cycle 139 buildMatchupProfile pre_game prediction 누락 final 경기 record silent drop
- cycle 140 computeWinnerTeamId 동점 final winner_team_id silent drift
- cycle 141 updateAccuracy write N+1 + .error 미체크
- cycle 142 buildDailySummary supabase .error 미체크 + ghost notification
- cycle 143 daily.ts 잔존 .error 미체크 3개 영역 (assertSelectOk helper 통일 시작)
- cycle 144 op-analysis lite v2.0-debate baseline 미달 측정 (interrupt — review-code 외 chain)
- cycle 145 fancy-stats parsePitchersFromHtml xfip fallback to fip
- cycle 146 fancy-stats parseNum NaN fallback to 0 + 빈 결과 가드
- cycle 147 buildMatchupProfile teams + games select assertSelectOk (apps/moneyball lib 첫 진입, cross-package shared 통일)
- cycle 148 analysis page assertSelectOk (apps/moneyball page 첫 진입)
- cycle 149 feed RSS route assertSelectOk (apps/moneyball route handler 첫 진입)
- cycle 150 skill-evolution 10 milestone progression sequence 명문화
- **cycle 151 buildTeamProfile + opengraph-image assertSelectOk (apps/moneyball lib 두 번째 + static asset 첫 번째 동시 진입 — 5 step sequence 완성)**

evidence: cycle 137~151 = 15 cycle silent drift family detection streak. cycle 144 op-analysis lite (interrupt) 만 review-code 외 chain. apps/moneyball 차원 진입 4 step 째 (lib 첫 진입 cycle 147 → page cycle 148 → route handler cycle 149 → static asset cycle 151 = 4 step).

opengraph-image silent 가시화 미세 차이 박제: assertSelectOk throw 패턴이 두 모드로 분기 — (a) page/lib 차원 = fail-loud OK (page boundary 처리), (b) static asset 차원 = fail-loud X (사용자 가시 image fail 시 더 나쁨) → catch console.error log 로 silent → observable 전환만, fallback 유지. cycle 151 첫 박제. 다음 static asset 차원 진입 시 (예: 다른 OG/twitter image, sitemap, robots.txt) 본 패턴 carry-over.

5 step sequence target audit (잔존 영역):
- apps/moneyball/src/app/dashboard/page.tsx (cycle 150 retro 인용 — page 차원 잔존)
- apps/moneyball/src/app/predictions/[date]/page.tsx (cycle 150 retro 인용 — page 차원 잔존)
- apps/moneyball/src/lib/predictions/* (cycle 150 retro 인용 — lib 차원 잔존)
- apps/moneyball/src/app/sitemap.ts / robots.ts (static asset 차원 잔존 가능성)

recommendation: cycle 152 자연 후속 = review-code (heavy) on dashboard/page.tsx 또는 predictions/[date]/page.tsx (page 차원 두 번째 진입). cycle 135 dominance-positive streak 인정 룰 적용 — silent drift family target 명확 시 자연 발화 OK. 또는 다양성 redirect (op-analysis lite 7 cycle 째 데이터 신선도 회복 시 — 신선 데이터 측정 가치).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
