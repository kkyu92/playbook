# TODOS

## [P3] embed-on-push incremental embedding

**What**: 변경된 entry 만 embed, 기존 embeddings.json 재사용
**Why**: 현재 매 push 마다 전체 재생성. 연 1440 entry 도달 시 ~15분 빌드 예상. GitHub Actions 타임아웃 리스크.
**Trigger**: 6개월 경과 또는 entry 500개 초과 시 전환
**Effort**: M (CC ~30분) — embed-content.mjs 를 sha hash 기반 cache 로 변경
**Depends on**: 본 pivot 1단계 배포 후 월간 entry 증가 관찰 (월 120 예상)
**Context**: 2026-04-21 eng review 에서 Section 4.2 에 flagged. 현재는 문제 없음 (연 9MB 증가율).

## [P0] Phase 4-pre — Prerequisite (inventory 정정 + schema 명시)

**What**: Phase 4a 진입 전 docs drift 정정 + schema 박제
- README inventory 정정 (Actions × 8 → 14 workflows 실 list)
- ARCHITECTURE 정정 (`daily-lesson.yml`, `generate-on-pick.yml` 미존재 사실)
- `auto-ingest.yml` lesson 도 fingerprint 권장 (현재 incident 만)
- `docs/setup-worker-integration.md` self-policy commit (D4) dispatch 예시 추가 — 기존 `worker-lesson` 의 subtype metadata

**Why**: 4-29 codex outside voice 가 발견 — README/ARCHITECTURE drift, schema 명시 부족. 이거 정정 안 하면 Phase 4a estimates unreliable. 4a cheap bolt-on 보장 위해 prerequisite.

**Effort**: ~30분 CC

**Reference**: eng plan v2 `~/.gstack/projects/kkyu92-playbook/eng-plans/2026-04-29-phase4-implementation.md`

## [P1] Phase 4a — D4 + D5 + D4 dual (~1.5h CC)

**What**: 4-29 codex review 후 재설계된 Phase 4a 3 항목 구현
- **D4** 워커 self-policy → 허브 dispatch — 기존 `worker-lesson` 의 subtype metadata 활용 (새 event_type X)
- **D5** Incident follow-up pressure — 기존 fingerprint correlation 활용. incident 후 N일 lesson 없으면 워커 측 reminder Issue (lesson 강제 자동 생성 X). E1 흡수
- **D4 dual** 허브→워커 sync trigger — 로컬 메커니즘만 (허브 SessionStart hook + 워커 SessionStart hook 비교 + optional crontab)

**Why**: 4-28 mid-review 의 *피드백 차원 missing* 1차 fix. 4-29 codex review 가 plan v1 의 schema/local-remote 혼재 발견 → v2 가 보존하면서 실현 가능 spec.

**E1 폐기**: codex #4 정합 — incident vs lesson 의도적 구분 보존. lesson 강제화 = draft-noise 재발 risk. D5 가 follow-up pressure 로 대체.

**Trigger**: Phase 4-pre ship 후 (별도 세션 권장)

**Effort**: ~1.5h CC

**Reference**: eng plan v2 동일

**Next step**: 별도 세션에서 4a impl 시작 → 4a ship + 1-2주 데이터 누적 → 4b

## [P1] Phase 4b — E2 measurement + E3 CLI (~1h CC, 4a 안정화 후)

**What**:
- **E2** measurement helper (Gemini 진단 layer X) — weekly cron + 8+7 vector 산출 + retro entry 자동 박제
- **E3** hub-bootstrap CLI — `~/bin/hub-bootstrap`, 새 워커 5분 부트

**Trigger**: 4a ship + lesson commit ≥ 3건/week + self-policy dispatch ≥ 5건/week + incident-lesson correlation ≥ 50% 신호 모두 충족 시

**Effort**: ~1h CC

**Reference**: eng plan v2 동일

## [P2] Phase 4c — Gemini 진단 + workflow test infra (deferred)

**What**: E2 의 Gemini 진단 layer + workflow test infra (Bats 또는 GH actions test harness) + E4 + D7

**Trigger**: 4b vector 안정화 후 / N≥3 lesson 재발 패턴 누적 후

**Effort**: E2 Gemini ~30분, workflow test infra ~1h, E4 XL ~3h, D7 M ~30분

**Reference**:
- eng plan v2 동일
- CEO plan: `~/.gstack/projects/kkyu92-playbook/ceo-plans/2026-04-28-mid-review-phase4-closed-loop.md`

