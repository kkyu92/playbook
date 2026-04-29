# TODOS

## [P3] embed-on-push incremental embedding

**What**: 변경된 entry 만 embed, 기존 embeddings.json 재사용
**Why**: 현재 매 push 마다 전체 재생성. 연 1440 entry 도달 시 ~15분 빌드 예상. GitHub Actions 타임아웃 리스크.
**Trigger**: 6개월 경과 또는 entry 500개 초과 시 전환
**Effort**: M (CC ~30분) — embed-content.mjs 를 sha hash 기반 cache 로 변경
**Depends on**: 본 pivot 1단계 배포 후 월간 entry 증가 관찰 (월 120 예상)
**Context**: 2026-04-21 eng review 에서 Section 4.2 에 flagged. 현재는 문제 없음 (연 9MB 증가율).

## [DONE] Phase 4-pre — Prerequisite (inventory + schema 정정)

**Shipped**: 2026-04-29 PR #60
- README "Actions × 8" → 14 정정
- ARCHITECTURE drift (`daily-lesson.yml` / `generate-on-pick.yml` 미존재) 박제
- `auto-ingest.yml` lesson 도 fingerprint 권장
- `docs/setup-worker-integration.md` subtype self-policy 예시 추가

**Reference**: eng plan v2 `~/.gstack/projects/kkyu92-playbook/eng-plans/2026-04-29-phase4-implementation.md`

## [DONE] Phase 4a — D4 + D5 + D4 dual

**Shipped**: 2026-04-29
- **PR #61** (kkyu92/playbook): D4 lib + auto-ingest subtype 분기 + D5 incident-followup workflow + lib + Vitest 16 tests + Cloudflare worker.ts 매핑 + inventory bump 14→15
- **PR #62** (kkyu92/playbook): D4 dual hub SessionStart auto-pull hook (main 만 fire) + jominho stale paths cleanup
- **PR #14** (kkyu92/moneyballscore): submit-lesson `lesson:`+`policy:`+`feedback:`+`memory:` prefix 확장 + subtype/fingerprint dispatch + D4 dual SessionStart hub-sync hook
- **PR #41** (kkyu92/blog-autopilot): 같은 워커 변경
- Cloudflare worker 재배포 (incident-followup KST 06:00 매핑)

**D5 즉시 가치 검증**: smoke test 1 reminder 자동 생성 — `vercel-deploy-1e80b78` (moneyballscore Issue #15, 4-26 incident 3+일 미해결).

**E1 폐기**: codex finding #4 정합. D5 follow-up pressure 흡수.

**Memory 갱신**: `project_phase4_closed_loop_scope.md` — 4a ship 결과 + codex 7 findings 정합 + 4b 진입 조건.

## [P1] Phase 4b — E2 measurement + E3 CLI (~1h CC, 4a 안정화 후)

**What**:
- **E2** measurement helper (Gemini 진단 layer X) — weekly cron + 8+7 vector 산출 + retro entry 자동 박제
- **E3** hub-bootstrap CLI — `~/bin/hub-bootstrap`, 새 워커 5분 부트

**Trigger**: 4a ship (2026-04-29 ✅) + 1-2주 운영 데이터 누적 후 진입 조건 측정 — lesson commit ≥ 3건/week + self-policy dispatch ≥ 5건/week + incident-lesson correlation ≥ 50% 모두 충족 시. **다음 측정**: ~2026-05-13 (scheduled agent 박제 권장)

**Effort**: ~1h CC

**Reference**: eng plan v2 동일

## [P2] Phase 4c — Gemini 진단 + workflow test infra (deferred)

**What**: E2 의 Gemini 진단 layer + workflow test infra (Bats 또는 GH actions test harness) + E4 + D7

**Trigger**: 4b vector 안정화 후 / N≥3 lesson 재발 패턴 누적 후

**Effort**: E2 Gemini ~30분, workflow test infra ~1h, E4 XL ~3h, D7 M ~30분

**Reference**:
- eng plan v2 동일
- CEO plan: `~/.gstack/projects/kkyu92-playbook/ceo-plans/2026-04-28-mid-review-phase4-closed-loop.md`

