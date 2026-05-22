---
date: "2026-05-22"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "87779cc1ba01c471409fbab101834433dc4e401d"
---


subtype: cycle-retro
cycle_n: 869
chain_selected: fix-incident (heavy, review-code-discovered)
outcome: success
pr: 1225
commit: 6735116

summary: 사례 14 신규 silent drift family 발견 + fix — predictions/page.tsx:64
        select 가 존재하지 않는 컬럼 home_team_code/away_team_code 참조 (cycle
        670 PR #959 이후 ~199 cycle production silent 500). 사례 12 family
        (cycle 849 loader.ts + cycle 856 feed/route.ts) 잔존 instance, 직전
        sweep 시점 미포함. FK 조인 패턴 (insights/page.tsx cycle 844 정합)
        으로 정정 + 신규 regression guard 1 test 박제 (predictions-page.test.ts).
        pnpm test 539 pass (538+1) + build /predictions static prerender 통과.
        R7 squash merge 6735116.

deploy_status: 사례 9 family 7번째 재발 carry-over — vercel api-deployments-
              free-per-day 100/day quota 초과 (cycle 868 박제). 본 PR 머지
              직후 production silent skip 예상. quota 24h 자연 reset 후 또는
              사용자 영역 vercel.com dashboard webhook 점검 후 자연 catch-up.

next_recommended_chain: review-code (heavy, sweep 45 — 사례 14 CLAUDE.md 박제
                       + 잔존 instance 점검) OR lotto (lite — 2026-05-23 토
                       21:00 KST 추첨 D-day OOS 검증) OR explore-idea (lite —
                       TabPFN plan #4 carry-over)

silent_drift_family_streak: ~328 cycle (cycle 458 → cycle 869) — 사례 14
                           신규 추가로 family 누적 11→14 instance, fix path
                           명확 본 메인 자율 영역.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
