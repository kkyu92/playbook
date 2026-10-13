---
date: "2026-10-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "bd7f654870836631cfefb9df989497f412eb6aaf"
---


subtype: cycle-retro
cycle_n: 3131
chain_selected: review-code(heavy)
outcome: success
next_recommended_chain: review-code(heavy)

scripts/backfill-*.ts 8개(home-win-prob/is-correct-shadow-fix/kbo-confirmed-postponed/
kbo-stuck-verify/mlb-elo/mlb-factor-breakdown/mlb-schedule-status/tie-winner-null)
전수 read. 7개 drift 0건(1회성 스크립트, 이미 실행 완료 상태). backfill-home-win-prob.ts
만 sibling pagination 패턴(PAGE=1000 loop) 미적용 — .limit(500) 단일 조회로 500건
초과 시 silent truncation 가능 발견 + 수정(e11e0633). Supabase billing outage 로
DB 실측 재확인은 fetch failed(기존 known state, 신규 drift 아님). scripts/ 잔여
23개 미감사 — 다음 cycle op-analysis-*.ts 그룹(7개) 우선 권장.
