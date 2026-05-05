---
title: "Expand-Scope Cycle 40 — eng-review + design-review lock-in"
date: "2026-05-05"
cycle: 40
chain: expand-scope (continuation)
phase: "eng-review + design-review"
status: locked-in
input_from: "cycle 39 spec (5 cherry-pick)"
---

# Cycle 40 — Architecture lock-in

cycle 39 spec 의 5 채택 (A/B/C/D/E) 을 구현 가능 architecture 로 락인. eng + design 두 차원.

---

## Phase 1 — Eng Review

### 1.1 컴포넌트 분해

| ID | 영역 | 신규 / 수정 | 자율 / R6 |
|---|---|---|---|
| **B1** | `scripts/curate-cron.mjs` (자가 큐레이션 routine 본체) | 신규 | 자율 |
| **B2** | `scripts/lib/connection-inference.mjs` (Gemini 호출 wrapper) | 신규 | 자율 |
| **D1** | `scripts/raw-archive.mjs` (raw-sources auto-archive 분리 스크립트) | 신규 | 자율 |
| **C1** | `scripts/lib/search-hit-counter.mjs` (search log → counter store) | 신규 | 자율 |
| **C2** | `scripts/search.mjs` 확장 — 매 hit 시 counter increment | 수정 | 자율 |
| **A1** | `~/.claude/skills/develop-cycle-hub/SKILL.md` — chain trigger 정량 임계 추가 | 수정 | 자율 단 사용자 review 권장 |
| **E1** | `content/reports/closed-loop-health.mdx` (4차원 dashboard entry) | 신규 | 자율 |
| **E2** | `scripts/dashboard-update.mjs` (cycle 별 metric 박제) | 신규 | 자율 |
| **R6-1** | `cloudflare-worker/src/worker.ts` — daily 09:00 KST decideMode 분기 추가 | 수정 | **R6 사용자 영역** |
| **R6-2** | `.github/workflows/curate-routine.yml` (workflow_dispatch trigger only) | 신규 | **R6 사용자 영역** |

### 1.2 데이터 흐름

```
[자율 영역]
B1 curate-cron.mjs
  ├── D1 raw-archive (auto-ingest 처리됨 raw → _archive/)
  ├── lint-content.mjs scan (이미 존재) → isolated journals list
  ├── B2 connection-inference (Gemini API)
  │     └── isolated journal frontmatter content + 후보 entry list → connections 추론
  ├── C1 search-hit-counter scan → confidence 1 entries enrichment 후보
  └── INDEX 재생성 + commit + PR

[자율 영역, develop-cycle-hub SKILL.md]
A1 chain trigger 정량 임계
  ├── 매 사이클 retro 단계
  │   ├── 0회 chain × 직전 20 cycles + meta-pattern 1+ 누적 = skill-evolution-pending 마커
  │   └── E2 dashboard-update 호출 → metric 박제
  └── 다음 사이클 진단 단계 = 마커 발견 시 skill-evolution chain 자동 발화

[R6 영역, 사용자 PR]
R6-1 Cloudflare worker daily 09:00 KST
  └── workflow_dispatch → R6-2 → 자율 영역 routine fire
```

### 1.3 Edge case + 테스트 전략

| Risk | Mitigation | Test |
|---|---|---|
| Gemini API rate limit (B2) | exponential backoff + 1회 retry. 실패 시 partial outcome (해당 entry skip) | mock B2 unit test |
| connection-inference hallucination (B2) | 결과 connections 가 실제 존재하는 entry slug 인지 validator | validator unit test |
| search-hit counter race (C1) | atomic file write (`writeFileSync` + `tmp + rename`) | concurrent write test |
| raw-archive idempotency (D1) | fingerprint 기반 — 이미 archive 면 skip | idempotency test |
| chain-evolution 5건 누적 false-trigger | "subtype: chain-evolution" prefix grep 정확 매치 + N 임계 1건씩 검증 | unit test |
| dashboard 누적 file size 폭주 (E1) | 직전 100 cycles 만 보존 (FIFO) | rotate test |

### 1.4 PR 분리 전략

cycle 41 구현 시 sub-PR 분리:
- **PR α (B+D+C 통합)**: scripts/curate-cron.mjs / raw-archive.mjs / search-hit-counter.mjs / connection-inference.mjs + 단위 테스트
- **PR β (A)**: develop-cycle-hub SKILL.md 갱신 (chain trigger 정량 임계)
- **PR γ (E)**: dashboard entry 신규 + dashboard-update 스크립트
- (R6) 사용자 PR (Cloudflare worker + workflow yaml)

α/β/γ 머지 후 R6 사용자 PR 머지 시 자가 organism 활성.

---

## Phase 2 — Design Review (closed-loop-health.mdx)

### 2.1 Persona + 사용 시나리오

| Persona | 사용 시점 | Need |
|---|---|---|
| 사용자 (kkyu92) | 매주 mid-review | 4차원 metric 한 페이지 — 자가 organism 건강도 |
| 메인 (Claude Code) | 사이클 진단 단계 | 직전 metric 추세 read → chain 선택 input |
| 미래 contributor | 위키 reader | 본 시스템 작동 방식 이해 |

### 2.2 Layout (Pretext-native, 단일 entry mdx)

```
# Closed-Loop Health Dashboard

> 자동 갱신 (cron daily + 사이클 retro). 마지막 업데이트: <auto>

## 4차원 Metric (현재 vs 추세)

| 차원 | Metric | 현재 | 7일 변동 | 추세 |
|---|---|---|---|---|
| Input | dispatch 누적 (lesson/meta-pattern/chain-evolution) | 6/1/0 | +2/+1/0 | ↑ |
| Process | chain pool 분포 (curate%/fix-incident%/retro-only%) | 38/8/27 | +0/+0/+13 | retro-only ↑ |
| Output | PR ship / 사이클 (직전 N=10 평균) | 0.5 | -0.2 | ↓ |
| Feedback | skill-evolution 자동 발화 | 1 | 0 | flat |

## Trigger 평가 (skill-evolution)

| # | 조건 | 현재 | 임계 | 상태 |
|---|---|---|---|---|
| 1 | chain-evolution commit 누적 | 0 | ≥5 | ❌ |
| 2 | 같은 chain 5회 연속 fail | N/A | 5 | ❌ |
| 3 | cycle_n % 50 == 0 | 38 | 50 | ❌ |
| 4 | meta-pattern body "SKILL 갱신 필요" | 0 | 1+ | ❌ |
| 5 | 0회 chain × 직전 20 + meta-pattern 1+ 누적 | 2 chain × 1 meta | 임계 | ✅ 형식 |

## 최근 cycle (직전 5)

| Cycle | Chain | Outcome | PR |
|---|---|---|---|
| 38 | dimension-cycle | retro-only | — |
| 37 | explore-idea | retro-only | — |
| 36 | review-code | retro-only | — |
| 35 | closed-loop-design | success | meta-pattern dispatch |
| 34 | curate | success | #189 |

## 자율 진단 (자동 갱신)

- ✅ retro-only 비율 27% — 정상
- ⚠️ skill-evolution trigger #5 형식 충족, evidence 강화 필요 (cycle 39 expand-scope 진행)
- ⚠️ design-system / polish-ui 0회 — 공개 GO 시점 trigger 별도

## 다음 진화 후보

(자동 추출 from meta-pattern + chain-evolution dispatch)

- chain pool dynamic resize (cycle 50 milestone)
- design-system 공개 lens (사용자 GO 시점)
```

### 2.3 시각 일관성 (DESIGN.md 부재 — Pretext default)

- table 위주 (4차원 metric / trigger 평가 / 최근 cycle / 진화 후보)
- 단순 emoji indicator (↑↓ flat / ✅⚠️❌)
- Mermaid graph X (text table 가독성 우선, render 비용 최소)
- mobile responsive (table → 반응형 collapse 로 자동 — Tailwind default)

### 2.4 디자인 차원 평가 (10-point lens)

| 차원 | Score | 10-star gap |
|---|---|---|
| 정보 밀도 | 8 | 7일 변동 column 추가 시 9 |
| 가독성 | 9 | Pretext default 정합 |
| 자가 갱신 | 7 | E2 dashboard-update 자동화 후 9 |
| 추세 시각화 | 6 | Mermaid sparkline 도입 시 8 (단 비용 ↑) — defer |
| 진단 품질 | 8 | meta-pattern 자동 추출 후 9 |

→ MVP score 7.6/10. 후속 사이클 (cycle 50 milestone) 에 sparkline 도입 검토.

---

## Phase 3 — Cycle 41 입력 spec

**구현 순서** (cycle 41 = 1 사이클):
1. **PR α 구현** — scripts 4개 + 단위 테스트 (~1h work)
2. **PR β 구현** — SKILL.md chain trigger 정량 임계 (~30min)
3. **PR γ 구현** — closed-loop-health.mdx 신규 + dashboard-update 스크립트 (~30min)

cycle 41 outcome 예상: success (3 PR ship) 또는 partial (PR α/γ 만, β 사용자 review 보류).

cycle 42 = R6 사용자 영역 carry-over 정리 (TODOS 박제) + dogfood retro + meta-pattern 박제.
