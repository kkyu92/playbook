---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d77c947d8c890e8d51b8c6576f64240986a1050a"
---


subtype: cycle-retro
cycle_n: 774
chain_selected: skill-evolution (forced — marker)
outcome: success
commit_hash: 5db5460
pr_number: 1108

trigger:
  - skill-evolution-pending marker (cycle 773 retro 박제, b2f7048)
  - trigger 5: window 754..773 lotto=0회 발화, 표본 19 ≥ 10 충족
  - 사유: lotto chain pool 정식 박제 (cycle 772) 직후 2 cycle 만에 trigger 5 즉시 fire = 구조적 false positive

execution:
  - spec write: docs/superpowers/specs/2026-05-20-cycle-774-skill-evolution-trigger5-lotto-permanent-opt-out.md
  - SKILL.md edits: line 6 history append / line 70 chain pool table (opt-out 7→8 / 평가 대상 3→2) / line 424 trigger 5 평가 명령 (slug 9→10, regex 에 lotto 추가)
  - MIGRATION-PATH.md: append-only cycle 774 entry
  - smoke test: pnpm test 431 tests passed (45 files) PASS
  - PR #1108 5db5460 squash + delete branch (fast-forward main 머지)

근거:
  - cycle 525 explore-idea opt-out 패턴 정합 — 외부 source 의존 chain 본질 + 자체 trigger 보유
  - lotto chain table trigger 6 = 30-cycle gap fire 보장
  - 외부 추첨 주기 (매주 토 21:00 KST) 의존
  - cooldown 만료 대기 X (cycle 525 룰: 외부 source 의존 chain = 영구 opt-out 즉시)

trigger 5 false positive 차단 layer (6번째):
  - cycle 422 표본 임계 (≥10)
  - cycle 436 inclusive 윈도우 (N-19..N)
  - cycle 484 polish-ui cooldown N=10
  - cycle 512 explore-idea cooldown 단독 (불충분 evidence 박제)
  - cycle 525 explore-idea 영구 opt-out
  - cycle 774 lotto 영구 opt-out (갓 추가된 chain 의 구조적 false positive 차단)

PASS_ship: 506 → 507 (cycle 774 기준, +1 ship)

next_recommended_chain: review-code (heavy, gap=1 cycle 774 SKILL.md 갱신 후속 CLAUDE.md silent drift sweep 13) OR explore-idea (heavy, saturation v12 inventory) OR operational-analysis (lite, v1.8 n=35+ 재측정 carry-over)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
