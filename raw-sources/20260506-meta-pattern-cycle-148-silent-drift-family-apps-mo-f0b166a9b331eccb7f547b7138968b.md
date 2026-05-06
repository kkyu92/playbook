---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f0b166a9b331eccb7f547b7138968b2e10743821"
---


subtype: meta-pattern
cycle_n: 148
pattern: silent drift family detection 의 차원 진입 sequence — packages/kbo-data scrapers (cycle 137/138/145/146) → packages/kbo-data pipeline (cycle 141/142/143) → apps/moneyball lib (cycle 147 #137 첫) → apps/moneyball page (cycle 148 #138 첫). 각 차원 진입은 직전 차원 family detection 후속 + 같은 helper (assertSelectOk packages/shared 단일 소스) 적용 일관성 유지.

evidence:
- cycle 137 #128 fetchTeamStats totalWar=0 stub 가시화 (packages/kbo-data scrapers)
- cycle 138 #129 fetchEloRatings winPct=0.5 stub 가시화 (packages/kbo-data scrapers)
- cycle 141 #132 updateAccuracy write N+1 + .error 미체크 (packages/kbo-data pipeline)
- cycle 142 #133 buildDailySummary supabase .error 미체크 + ghost notification (packages/kbo-data pipeline)
- cycle 143 #134 daily.ts 잔존 .error 미체크 3개 영역 + assertSelectOk helper 통일 (packages/kbo-data pipeline)
- cycle 145 #135 fancy-stats.ts xfip fallback to fip silent drift 가시화 (packages/kbo-data scrapers)
- cycle 146 #136 fancy-stats.ts parseNum NaN fallback to 0 + 빈 결과 가드 (packages/kbo-data scrapers)
- cycle 147 #137 buildMatchupProfile teams + games select assertSelectOk shared 통일 (apps/moneyball lib 첫 진입 + helper packages/shared 로 이전)
- cycle 148 #138 analysis page getTodayBigMatch + getYesterdayGames assertSelectOk (apps/moneyball page 첫 진입)

핵심 메타: silent drift family detection chain 이 단일 helper 의 cross-package 단일 소스 정착 (cycle 147 #137) 후 자연 redirect — packages/kbo-data 폐쇄 영역에서 apps/moneyball 진입 가능 영역으로 확장. 같은 helper 가 cross-package 일관성 유지하므로 cycle 148 진입은 cycle 147 의 자연 후속.

차원 진입 잔존:
- apps/moneyball page 잔존 (dashboard / predictions/[date] / feed route inner-join silent drop)
- packages/kbo-data validator.ts 639 / postview.ts 463 (미review monolith)
- apps/moneyball lib/predictions/* 영역 (estimateTime / yesterdayDate / tierStats — 작은 helper 단위 silent drift)

cycle 135 dominance-positive streak 인정 룰 적용 — 같은 chain (review-code heavy) 11 연속 발화 (cycle 138~148, cycle 144 op-analysis 1 제외) outcome=success streak. 자가 의심 차단 — trigger 매우 명확한 자연 후속 시 dominance break 없이 진행 OK.

recommendation: 본 family chain 잔존 영역 (apps/moneyball page predictions!inner inner-join silent drop / lib/predictions/*) 자연 후속 OK. 단 14일+ 후 op-analysis lite 데이터 신선도 회복 시 다양성 redirect (cycle 144 baseline 미달 evidence 후속 분석) 권장.
