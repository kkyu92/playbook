---
date: "2026-05-21"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1b78fcb3f1703196a167555c06b6f6720045c718"
---


subtype: cycle-retro
cycle_n: 850
chain_selected: fix-incident (heavy, gap=1 carry-over)
outcome: success

진단:
- prod /api/version commit_sha=7bb776b (cycle 846 retro) vs main HEAD=624c582 (cycle 849 retro) gap=4 commit silent skip
- vercel ls --prod 14m 전 ● Error (5auvfp7vh) 21:27:51 KST = cycle 847~848 commit build = "column games_1.home_team_code does not exist" PostgreSQL 42703
- cycle 849 fix commit time 21:37 = Error deploy 이후 머지 = fix 코드 정확 (loader.ts + insights/page.tsx FK alias 패턴 정합, predictions/[date]/page.tsx working pattern 매칭) 하지만 vercel webhook auto-deploy 채널 silent skip
- 사례 9 family 5번째 재발 (cycle 838 첫 발견 → 840 재발 → 842 재재발 → 843 재재재발 → 850 재재재재발). gap=1 cycle 가속 패턴 (843→850 gap=7 cycle 일시 정상 후 재발).

조치:
- 수동 vercel --prod --yes → dpl_B5MxZUXGowEwV4Fs46rCDvNbmfuw 2m Ready → alias swap → moneyballscore.vercel.app
- /api/version commit_sha=624c582 (= main HEAD) gap=0 검증
- /insights HTTP 200 + /insights/2026-05-16 HTTP 200 + /insights/2026-05-21 HTTP 200 (cycle 847 ship daily archive prerender 정상 작동 입증)
- gh workflow run deploy-drift-alert.yml 수동 dispatch (run 26226856192) 14s success = alert channel 5번째 작동 evidence (cycle 840 run 26222762877 11s 패턴 정합)

검증:
- cycle 849 fix 코드 정확성 입증 (loader.ts FK alias 패턴 + insights/page.tsx 동일 + regression guard 2 test PASS = source 진단 정확)
- 본 cycle 코드 변경 X — 수동 fire only = retro-only commit 1건

root cause 미확정 (carry-over):
- vercel webhook auto-deploy 채널 간헐 silent skip 본질 = vercel.com dashboard 사용자 영역 (본 메인 진단 범위 외)
- cycle 843 retro 박제 "본 메인 자율 영역 closed loop 내 fix path 부재" 패턴 정합

다음 cycle 후보:
- explore-idea (lite, plan #3 Step 6 twitter-image.tsx parity 5 line re-export — cycle 817 v13-G 패턴)
- explore-idea (mid, plan #3 Step 4 RSS /feed insights items — cycle 810 v13-E 패턴)
- review-code (heavy, sweep 39 CLAUDE.md 사례 9 family 5번째 재발 evidence + cycle 850 박제 sync)

next_recommended: explore-idea (plan #3 진행 자연 우선)
