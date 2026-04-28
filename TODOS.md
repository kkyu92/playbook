# TODOS

## [P3] embed-on-push incremental embedding

**What**: 변경된 entry 만 embed, 기존 embeddings.json 재사용
**Why**: 현재 매 push 마다 전체 재생성. 연 1440 entry 도달 시 ~15분 빌드 예상. GitHub Actions 타임아웃 리스크.
**Trigger**: 6개월 경과 또는 entry 500개 초과 시 전환
**Effort**: M (CC ~30분) — embed-content.mjs 를 sha hash 기반 cache 로 변경
**Depends on**: 본 pivot 1단계 배포 후 월간 entry 증가 관찰 (월 120 예상)
**Context**: 2026-04-21 eng review 에서 Section 4.2 에 flagged. 현재는 문제 없음 (연 9MB 증가율).

## [P1] Phase 4 — Closed Loop 진입 (5 항목 implementation)

**What**: 4-28 mid-review SCOPE EXPANSION ceremony 결과 채택된 5 항목 구현
- **E1** lesson 변환율 100% 자동 트리거 (M ~30분)
- **E2** closed loop 자동 회전 — *platonic hub* (L ~2시간)
- **E3** hub-bootstrap CLI 5분 워커 부트 (S ~15분)
- **D4** 워커 self-policy commit 자동 hub-dispatch (S ~15분)
- **D5** lesson 강제화 알림 (S ~10분)

**Why**: 4-19 Phase 1 plan 에 *피드백 차원* (자기 개선 루프) 누락. mid-review 에서 *시스템 결함이 아니라 plan 의 scope 한계* 발견. Phase 4 = 무한성장 자동화 enabling condition. E2 가 hub — 다른 4개의 enabling.

**Trigger**: 다음 세션 (별도 세션 분리 권장 — 이번 mid-review 사이클 종료 후)

**Effort**: ~3시간 CC + ~1.25시간 user review

**Depends on**: 4-29 KST 06:00+ 자연 cron 검증 결과 (1주일 운영 데이터 누적 후 시작 권장)

**Reference**:
- CEO plan: `~/.gstack/projects/kkyu92-playbook/ceo-plans/2026-04-28-mid-review-phase4-closed-loop.md`
- mid-review entry: `content/reports/mid-review-2026-04-28.mdx`
- memory: `project_phase4_closed_loop_scope.md` (자동 로드)

**Next step**: `/plan-eng-review` 로 5 항목 implementation plan 작성 → 구현

## [P2] Phase 4 — Deferred 정합 시점 도달 시 진행

**What**: E4 (Gemini 정책 자가 도출) + D7 (rule 본문 자가 강화) — 정합 시점 도달 시
**Trigger**: E1+D4 데이터 누적 + E2 자동 회전 후 / N≥3 lesson 재발 패턴 누적
**Effort**: E4 XL ~3시간, D7 M ~30분
**Reference**: `~/.gstack/projects/kkyu92-playbook/ceo-plans/2026-04-28-mid-review-phase4-closed-loop.md`

