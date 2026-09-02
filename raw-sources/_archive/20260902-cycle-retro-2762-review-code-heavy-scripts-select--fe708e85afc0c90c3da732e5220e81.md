---
date: "2026-09-02"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "fe708e85afc0c90c3da732e5220e8183026b5c91"
---


subtype: cycle-retro
cycle_n: 2762
chain_selected: review-code(heavy)
outcome: success

진단: open issue 0, unprocessed plan 0/23. fix-incident gap5/20·op-analysis gap2/25·info-arch gap23/30·lotto gap10/30 전부 미도달. 직전8 distinct=3 — 2-chain lock 미충족.
신규 축 = scripts/ (22개 admin/backfill/op-analysis 스크립트). Explore 서브에이전트 전수 감사 → 7개 파일 확정 미소비 select 컬럼 제거: cohort-cleanup.ts / measure-n178-vs-n165.ts / op-analysis-ce-cohort.ts / op-analysis-mlb-elo-backtest.ts / op-analysis-postbreak-full.ts / op-analysis-postbreak.ts / op-analysis-war-check.ts.
row 통째 전달 패턴(backtest-v2-candidate.ts/export-predictions-tabpfn.ts/update-stale-data.ts) 는 검증 불가로 skip.
eslint(scripts) clean, pnpm test 571파일 4484건 green. direct main push.
next_recommended_chain: review-code(heavy) 신규 미감사 후보(cloudflare-worker/) 또는 operational-analysis(gap 2/25 근접)
