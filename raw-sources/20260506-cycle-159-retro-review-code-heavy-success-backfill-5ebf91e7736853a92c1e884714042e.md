---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5ebf91e7736853a92c1e884714042e5838c6e40f"
---


subtype: cycle-retro
cycle_n: 159
chain_selected: review-code (heavy)
outcome: success
commit: e0616fc
pr: 149

retro.summary:
cycle 159 = review-code (heavy) on packages/kbo-data backfill-sp.ts + snapshot-pitchers.ts SUCCESS — silent drift family detection 재진입 (cycle 137~143 packages/kbo-data 처리 후 family pattern 잔존). getKBOLeagueId + getTeamIdMap 4 select assertSelectOk 통일 (leagues/teams lookup pattern). cycle 158 (apps/moneyball page 차원 7 step sequence 완성: cycle 148 analysis → 153 dashboard → 154 predictions/[date]+reviews → 155 search → 156 analysis/game/[id] → 157 home → 158 api/health+sitemap+predictions/page) 후속 packages/kbo-data 차원 재진입 첫 step. cycle 49 룰 PASS_ship 누적 33 → 34. cycle 135 dominance-positive streak 룰 정확 작동 — review-code (heavy) silent drift family detection channel target 명확 + success streak 11 cycle 누적 (cycle 149~159).

silent drift 정의 재현 (cycle 143 박제):
  기존: const { data } = await db.from('leagues').select('id').eq('code', 'KBO').single();
        if (!data) throw new Error('KBO league not found');
  결함: result.error 미체크 → supabase 가 network/RLS/SQL syntax 오류 시 data=null silent fallback → 'KBO league not found' 위장 → 실제 원인 묻힘.
  fix: assertSelectOk(result, 'context') 통과 → result.error 즉시 throw + context 명시.

수정 4 select:
  - backfill-sp.ts:45 getKBOLeagueId → assertSelectOk<{ id: number }>
  - backfill-sp.ts:51 getTeamIdMap → assertSelectOk<{ id: number; code: string }[]>
  - snapshot-pitchers.ts:45 getKBOLeagueId (동일)
  - snapshot-pitchers.ts:51 getTeamIdMap (동일)

검증:
  - pnpm --filter @moneyball/kbo-data type-check OK
  - pnpm --filter @moneyball/kbo-data test 505/505 PASS
  - PR #149 R7 squash 머지 + main fast-forward e0616fc

skill-evolution trigger 평가 (모두 false):
  - trigger 1 chain-evolution commit ≥5: 0건 → false
  - trigger 2 같은 chain 5회 fail: 직전 5 cycle 전부 success → false
  - trigger 3 cycle_n % 50: 159 % 50 = 9 → false
  - trigger 4 meta-pattern body 'SKILL 갱신 필요': 본 cycle dispatch X → false
  - trigger 5 0회 chain: cycle 135 박제 0회 chain 5개 의도된 결과 항구화 + cycle 150 skill-evolution 직후 cooldown N=10 안 (cycle 159 - 150 = 9 < 10) → trigger 강화 X 항구화 정상 작동

ship-0 emergency stop 평가:
  - 직전 10 cycle (150~159) 모두 success → emergency stop X (정상 진행)

lite-chain retro-only cap 평가:
  - review-code 직전 5 cycle 모두 success → cap 적용 X (정상 진행)

retro.next_recommended_chain:
review-code (heavy) on packages/kbo-data 잔존 raw select 13건 — backfill-season + sync-batter-stats (4 select 자연) 또는 live.ts 2 select 또는 daily.ts 6 select (큰 monolith). 또는 다양성 redirect (op-analysis 14 cycle 직후 partial 위험 / explore-idea TODOS '큰 방향' 부재 = trigger 부족). cycle 135 dominance-positive streak 룰 적용 — silent drift family target 명확 시 자연 발화 OK.

cycle 49 룰 누적:
  - PASS_eval += 1 (cycle 50 박제 룰)
  - PASS_ship += 1 (33 → 34) — cycle 124 박제 PASS counter 분리 룰

cycle 124 룰 작동 정량 (cycle 125 이후 35 cycle 윈도우):
  - SUCCESS streak 35 cycle (cycle 125~159 ship 34 누적 + cycle 150 skill-evolution=success 누적)
  - emergency stop 0건 trigger / lite cap 0건 trigger
  - dominance-positive streak 정확 재실현 (review-code 18/20 직전 20 cycle)

todos_added:
  - 잔존 13 raw select cleanup carry-over (backfill-season 2 / sync-batter-stats 2 / live.ts 2 / daily.ts 6 / postview-daily 1)
  - daily.ts 6건 = monolith 안 분포 (line 68/76/87/339/1045/1058) — 단일 cycle 일괄 vs 분할 자율 판단

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
