---
title: "Expand-Scope Cycle 39 — 허브 = 자가 큐레이션 자동 organism (B+D 통합)"
date: "2026-05-05"
cycle: 39
chain: expand-scope
phase: "office-hours + ceo-review"
status: draft
---

# Cycle 39 — 허브 자가 큐레이션 자동 organism

## Phase 0 — 토픽 선정 근거

본 expand-scope chain trigger:
- (1) 직전 4+ 사이클 small fix만 (cycle 33/35/36/37 retro-only 누적, 본 세션 N=10 후반 자율 source 고갈 명시)
- (4) 사용자 N=milestone (N=14 호출, B+D 통합 명시)

본 세션 cycle 35 meta-pattern 박제 (chain pool 26 사이클 분포) 가 본 토픽 자연 follow-up:
- curate 38% dominate
- polish-ui / design-system 0회
- skill-evolution 1회 retro-only (cycle 21 "현 SKILL 충분")
- meta-pattern / chain-evolution 0건 누적 (cycle 35 = 첫 박제)

**문제 정의**: 자율 사이클이 small fix 만 자율 처리. 메타 진화 (chain trigger 강화 / skill 자동 갱신 / 큐레이션 자동화) 는 사용자 N=milestone 호출에 의존. 자가 organism 정신 위반.

---

## Phase 1 — Office Hours (Builder mode, 6Q 자율 답변)

### Q1. Empathize — Who is the user?

| Tier | User | 사용 패턴 |
|---|---|---|
| 1 | 사용자 (kkyu92) | 매일 1~N회 호출, 매주 mid-review, 무한성장 자동화 비전 |
| 2 | 메인 (Claude Code Opus 4.7) | 자율 사이클 진행 시 chain pool / 메모리 / 위키 의존 |
| 3 | 워커 (moneyball / blog-autopilot / 미래 fork) | dispatch 인바운드 처리 받는 입장 |
| 4 | 미래 사용자 (공개 시) | 위키 reader, 외부 contributor — 현재 비공개 X |

→ 본 사이클 핵심 user = Tier 1+2. **자가 organism = Tier 2 가 Tier 1 의존도 ↓**.

### Q2. Define — What's the problem?

**근본 결손 4건** (cycle 35 meta + 본 세션 evidence):
1. **chain pool trigger 모호** — skill-evolution trigger #5 ("직전 20 사이클 chain 0회") 형식적 충족이지만 evidence 부족 시 자가 발화 회피. 정량 임계 X
2. **자율 source 고갈 = 자가 진단 결손** — small fix 영역 외 chain (expand-scope / design-system / polish-ui / skill-evolution) 자가 trigger 메커니즘 빈약. 사용자 호출만 트리거
3. **lazy enrichment 자동화 부재** — confidence 1 draft 도 검색 잡힘이지만 실 사용 시점 enrichment 트리거 메커니즘 X (`feedback_lazy_enrichment` 의도 vs 실제 manual)
4. **raw-sources 누적** — auto-ingest 후 archive 단계 결손 (TODOS [P2] cycle 7 부터 carry-over). 누적 비율 archive 12% 추세

**Composite framing**: 허브가 N=20 사이클 자율 진행하면 chain pool 분포 자연 imbalance + 새 source 부재 = retro-only 누적 → 자가 진화 정체.

### Q3. Ideate — Diverge (8 후보)

| # | 후보 | 영역 | 효과 |
|---|---|---|---|
| A | chain trigger 정량 임계 (0회 chain × 직전 N 사이클) | 메타 자동화 | skill-evolution 자가 발화 회복 |
| B | 자가 큐레이션 cron routine (isolated scan + connection 추론 + lint) | 큐레이션 자동화 | curate chain manual → 자동 |
| C | lazy enrichment trigger (search hit 카운터 → 임계 시 trigger) | enrichment | confidence 1 entries 자동 보강 |
| D | raw-sources auto-archive (auto-ingest workflow 끝 step) | 청소 | accumulation 차단 |
| E | closed-loop 4차원 dashboard entry (input/process/output/feedback metrics) | visibility | 자가 진단 source |
| F | SKILL.md self-update 메커니즘 (skill-evolution chain 자동 dispatch) | 메타 진화 | sustainable self-improvement |
| G | cross-project pattern detection (3 fork 사이 메타 박제) | 자동 학습 | hub-worker compounding ↑ |
| H | chain pool dynamic resize (사용 분포 임계 시 chain 추가/폐기) | 자기 조직화 | 11 → N (자연 진화) |

### Q4. Prototype — Narrow

**Narrow path** = **B + D + C** 통합 = "자가 큐레이션 cron routine":
- 단계: raw-sources scan → archive 처리됨 raw → isolated scan → connection inference (Gemini) → low-confidence search hit 카운터 + enrichment trigger → INDEX 재생성 → 1 PR per run
- Cron: Cloudflare worker (이미 인프라 있음)
- 빈도: daily 1회 (자율 영역만 처리, R6 사용자 영역 X)

**High-impact path** = **A + F** = "skill-evolution chain 자동화":
- chain trigger 정량 임계 (0회 chain in last 20 cycles + meta-pattern 1+ 박제 = 자동 fire)
- SKILL.md self-update PR (메인 자율 변경, 사용자 review)

### Q5. Test — How to know it works

- **Before/After metric**:
  - isolated journals: 0 유지 (현재 0, 신규 entry 자동 connection)
  - confidence 1 entries enrichment율: 0% → 자동 trigger 시 50%+ 목표
  - raw-sources archive 비율: 12% → 80%+
  - skill-evolution 자동 발화 횟수: 0 → 임계 충족 시 fire
  - retro-only 비율: 27% → 15% 목표 (자가 source 회복)

- **Validation 방법**:
  - 4 사이클 dogfood (cycle 39~42)
  - dispatch 통계 변동 (meta-pattern + chain-evolution 누적 ↑)

### Q6. Reflect — What's missed

- **B+D 의 의존성**: B (chain trigger 자동화) 가 D (큐레이션 자동화) 데이터 source 가 될 수 있음 (자가 큐레이션 metric → chain 분포 자가 진화 input). 즉 **B → D → B feedback loop = closed-loop 자체 prototype**
- **R6 영역 분리 명시** — workflow yaml 변경 = 사용자 영역. 자율 진행 가능 부분 = scripts + lib + cron worker (Cloudflare worker 도 R6)
- **위키 공개 lens 미적용** — design-system / polish-ui 0회 vs 자가 organism 우선순위. 공개 시점 trigger 별도 spec 후보 (cycle 39 scope 외)

---

## Phase 2 — CEO Review (SCOPE EXPANSION 강제)

### 2.1 Premise critique

> "자가 큐레이션 routine + skill-evolution 자동화" = 메타 자동화 인프라.
> 본 platonic ideal 은? **12개월 후 vivid**:
> - 사용자 매주 1회 mid-review (~30분)
> - 그 외 7일 = 허브 자가 회전 (cron routine + dispatch 자동화 + chain pool 자가 진화)
> - 워커 3 fork 가 hub 에 dispatch → 자동 흡수 → 분류 → 박제 → 메타 패턴 자가 추출
> - SKILL.md / chain pool / 메모리 가 사용자 input 없이 정기 자가 갱신

### 2.2 10-star check

본 narrow (B+D+C 통합) = 7-star. 10-star 도달 위해:

| Gap | Expansion |
|---|---|
| `자가 진단 source` 부재 | E (4차원 dashboard) → input metric 자체 보드, 자율 사이클 source 회복 |
| `cross-project compounding` 미활용 | G (3 fork 메타 패턴 detection) → 워커 self-policy + meta-pattern 자동 cluster |
| `chain pool 정체` (11 고정) | H (dynamic resize) — 50 milestone 시 자동 fire / chain 폐기 |

### 2.3 SCOPE EXPANSION — 12 후보 → 5 cherry-pick + 4 absorbed + 2 deferred + 1 dropped

**채택 5 (Phase 3 implementation)**:
- **B**: 자가 큐레이션 cron routine (narrow 기반)
- **C**: lazy enrichment trigger (B 의 sub-step)
- **D**: raw-sources auto-archive (B 의 sub-step)
- **A**: chain trigger 정량 임계 (skill-evolution 자가 발화 회복)
- **E**: closed-loop 4차원 dashboard entry (자가 진단 source 회복)

**자연 흡수 4 (B/E 부산물)**:
- F (SKILL.md self-update) → A 작동 시 cycle 47+ 머니볼 워커 패턴 자연 흡수
- G (cross-project pattern) → E dashboard 의 dispatch 통계 자연 추출
- (closed-loop visibility) → E 본체
- (lazy enrichment) → C 본체

**정합 시점 도달 deferred 2**:
- H (chain pool dynamic resize): cycle 50 milestone 후 평가 (현재 N=39, 11 cycles 후)
- 공개 lens design-system: 사용자 공개 GO 시점 별도 trigger

**폐기 1**:
- (chain pool 11 일괄 갱신): H deferred 와 중복

### 2.4 5 채택 architecture (Phase 3 lock-in 대상)

```
[Cron daily] (Cloudflare worker)
   ↓
[자가 큐레이션 routine] (scripts/curate-cron.mjs)
   ├── 1. raw-sources scan + archive (D)
   ├── 2. isolated journals scan + Gemini connection inference (B)
   ├── 3. confidence 1 entries: search hit 카운터 read → 임계 시 enrichment flag (C)
   ├── 4. INDEX.md regenerate
   └── 5. 1 PR per run (자율 머지)

[Cycle 끝 retro 단계 강화] (develop-cycle-hub SKILL.md)
   ├── chain trigger 정량 임계 평가 (A)
   │   └── 0회 chain × 직전 20 cycles + meta-pattern 1+ 누적 = skill-evolution-pending 마커 자동
   └── 4차원 dashboard entry update (E)
       └── content/reports/closed-loop-health.mdx (cycle 별 metric 누적)
```

---

## Phase 3 — Phase 4 결정 (eng-review + design-review 사이클 40 입력)

본 spec = **lock-in 후보 5 채택 architecture**. 다음 사이클 40:
- **eng-review**: scripts 구현 path / Cloudflare worker 통합 / SKILL.md 변경 영역 / 테스트 전략
- **design-review**: closed-loop dashboard entry 시각 (페이지 디자인 / metric 표 / Mermaid 다이어그램)

다음 사이클 41 = 구현 + ship (1 큰 PR or 분리 PR).
다음 사이클 42 = 1차 dogfood + retro + meta-pattern 박제.

---

## Phase 4 — Risk + Carry-over

**R6 사용자 영역 carry-over**:
- Cloudflare worker (`cloudflare-worker/src/worker.ts`) 변경 = 사용자 PR
- workflow yaml 변경 (auto-ingest.yml self-policy push race fix, 기존 carry-over) = 사용자 PR
- secrets / env (Gemini key 추가 사용 영역) = 사용자 영역

**자율 진행 가능 영역**:
- `scripts/curate-cron.mjs` 신규 (자율 코드)
- `scripts/scan-isolated.mjs` 또는 `lint-content.mjs` 확장 (자율 코드)
- `~/.claude/skills/develop-cycle-hub/SKILL.md` 변경 = skill-evolution chain 영역. 자율 단 사용자 review 권장
- `content/reports/closed-loop-health.mdx` 신규 entry (자율 콘텐츠)

**비용 가드**:
- Gemini API call 빈도 (daily routine + 사이클 retro) — 임계 monitor 필요
- Cloudflare worker cron slot 1 (decideMode 분기로 단일 expression — 메모리 `feedback_cloudflare_cron_slot_conservation` 정합)
