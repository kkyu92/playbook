---
date: "2026-05-29"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "3f4ea6f7ffae3e35657ef792a29346d97fceb6b1"
---


subtype: lesson
cycle_n: 1050
chain: fix-incident
mode: lite
case_id: 16
family: silent-drift-family-plan-frontmatter-status-field-stale

## 발견 evidence (cycle 1050 진단)

`~/.develop-cycle/plans/moneyballscore/{17,18}.md` 양쪽 frontmatter `status: approved` 박제 상태 유지 — 본 plan body Step (Step A doc 박제) 는 이미 ship 완료 (PR #1407 cycle 1032 plan #17 + PR #1415 cycle 1039 plan #18). retro 단계 frontmatter 자동 갱신 절차 부재 = silent retro drift.

| plan_n | ship cycle | ship PR | stale gap (cycle) | 갱신 후 status |
|---|---|---|---|---|
| 17 | 1032 | #1407 | 18 | doc_only_shipped_cycle_1032_pending_user_step_a |
| 18 | 1039 | #1415 | 11 | doc_only_shipped_cycle_1039_pending_user_step_b |

## SKILL.md unprocessed plan lookup risk

진단 단계 첫 step 이 `status: approved` plan 자율 매칭. 본 family silent 시 = 이미 ship 된 plan repeat 매칭 risk (silent re-process). cycle 1050 진단 첫 시도가 plan #17 매칭 → plan body 확인 후 이미 ship 발견 → fix-incident lite redirect 패턴 = mitigation.

## 대조 evidence (정상 status 갱신 케이스)

plan #11/#12/#13/#15/#16/#19 모두 frontmatter status 자연 갱신 완료. silent skip = plan #17 + #18 두 cycle 1032/1039 = 동일 패턴 (doc-only ship + 사용자 결정 wait carry-over). retro 단계 frontmatter 갱신 step 누락 layer.

## fix path (carry-over to skill-evolution chain)

develop-cycle SKILL.md retro 단계에 `cycle_state.execution.plan_n_processed=[N]` 박제 시 `~/.develop-cycle/plans/$SLUG/{N}.md` frontmatter `status:` field 자동 갱신 절차 박제. plans/ = repo 밖 = 본 메인 자체 retro 단계 의무 박제 layer (git commit 추적 불가).

## 본 cycle 자율 fix

- `~/.develop-cycle/plans/moneyballscore/17.md` status → `doc_only_shipped_cycle_1032_pending_user_step_a`
- `~/.develop-cycle/plans/moneyballscore/18.md` status → `doc_only_shipped_cycle_1039_pending_user_step_b`
- `memory/drift-cases.md` 사례 16 신규 박제 (in-repo)

related family:
- 사례 9 (vercel auto-deploy alias) — 운영 인프라 silent
- plan #N stale ref drift (cycle 1047+1048 13 occurrence) — plan body 미래 plan number 가정 stale
- 사례 16 = plan frontmatter status field stale — develop-cycle retro layer 자체 silent

Co-authored-by: Claude Opus 4.7 <noreply@anthropic.com>
