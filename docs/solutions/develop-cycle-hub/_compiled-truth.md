# [develop-cycle-hub] Compiled Truth

## 종합 (3건, 최종 갱신 2026-06-11)

- **재발 횟수**: 3개 카테고리, 합계 3건
- **현재 최선 해결책**: 각 패턴별 방어 (아래 요약)
- **코드 게이트 승격**: ✅ 패턴 #2 — `scripts/lib/develop-cycle-hub-check.mjs` `checkConnectionPrefix()` + `lint-content.mjs` 통합 (2026-06-15, cycle 1097)
- **마지막 발생**: 2026-06-10 (INDEX.md rebase conflict, cycle 1084)

### 주요 교훈 요약

| # | 문제 | 핵심 해결 | 반복? |
|---|------|-----------|-------|
| 1 | 본 메인 1-session-N-cycle 룰 위반 + empty commit fake batch | SKILL.md `1-session-1-cycle` + dispatch signal next_n 매 cycle 강제 | 2nd 재발 (cycle 495-585, hub 495-585) |
| 2 | connections slug `<category>/<slug>` 접두사 누락 → orphan | MDX connections 작성 시 `<category>/` prefix 필수 체크 ✅ `checkConnectionPrefix()` 코드 게이트 완료 | 2nd 재발 (cycle 1083 4건 수정) |
| 3 | INDEX.md rebase conflict (BRANCHED + auto-ingest PR 동시 수정) | `node scripts/generate-content-manifest.mjs` 재생성으로 즉시 해소 | 3rd+ 재발 (merge 마다 간헐적) |

### 메타 패턴

1. **생성 파일 = 수동 충돌 해소 X**: INDEX.md / content-manifest.json 처럼 스크립트 생성 파일은 충돌 시 재생성이 항상 최선. 3-way merge 시도 = 시간 낭비.
2. **BRANCHED steady-state = 간헐 충돌 구조**: moneyball auto-ingest + hub cycle = 양방향 분산 구조. R6 (merge/rebase) 시점마다 INDEX.md 충돌 가능. `generate-content-manifest.mjs` 를 R6 후처리 표준 step 으로 인식.
3. **commit body 강제 박제 = 자기 검열 방어**: fake batch 패턴은 SKILL 룰이 있어도 context 누적 시 재발. dispatch signal 구조 (매 cycle next_n 박제) 가 외부 강제 메커니즘으로 더 강건.

## 개별 솔루션 목록

1. [fake-batch-anti-pattern](2026-05-14-fake-batch-anti-pattern.md) — 1-session-N-cycle 위반 + empty commit
2. [connections-slug-orphan-category-prefix](2026-05-20-connections-slug-orphan-category-prefix.md) — orphan 링크 category 접두사 누락
3. [index-md-rebase-conflict-auto-regenerate](2026-06-11-index-md-rebase-conflict-auto-regenerate.md) — INDEX.md 충돌 → 재생성 해소
