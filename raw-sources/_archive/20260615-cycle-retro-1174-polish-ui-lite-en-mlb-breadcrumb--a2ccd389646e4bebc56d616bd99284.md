---
date: "2026-06-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a2ccd389646e4bebc56d616bd992845261f4faf5"
---


subtype: cycle-retro
cycle_n: 1174
chain: polish-ui (lite, /en/mlb English mirror i18n silent leak fix)
outcome: success

## Diagnosis

cycle 1173 next_recommended = review-code (heavy) / polish-ui. /en/mlb 11 page.tsx 7d 신규 (plan #21 ship cycle 1094 이후 첫 polish-ui 진단) → Korean leak grep:
- Breadcrumb.tsx:22 JSON-LD itemListElement[0].name = '홈' (hardcoded ko)
- Breadcrumb.tsx:51 visible link = '홈' (hardcoded ko)
- LanguageSwitch.tsx:26 '한국어' = target-lang convention (OK)

open hub-dispatch issues = 0. unprocessed approved plans = 0. alternation lock = no (distinct=5/8). ship-0 emergency stop = no (9/10 success).

## Execution

1. Breadcrumb.tsx: `locale?: 'ko' | 'en'` prop 추가 (default 'ko' backward compatible). homeLabel ko='홈' / en='Home'. homeHref ko='/' / en='/en/mlb'.
2. /en/mlb 11 pages: `locale="en"` 추가 (sed/awk batch)
3. Breadcrumb.test.tsx: 2 신규 test (locale='en' visible 'Home' + JSON-LD name='Home' + 절대 URL '/en/mlb')
4. type-check PASS / test 985 PASS
5. PR #1965 R7 squash merged at 04:48:59Z (commit e063ee3)

## Impact

- /en/mlb 11 pages 사용자 가시 breadcrumb '홈' → 'Home' (i18n correctness)
- Google BreadcrumbList JSON-LD name='Home' + item '/en/mlb' (영문 페이지 색인 language signal 정확)
- /ko default 'ko' 동작 영향 X (backward compatible)

## Skill Evolution Triggers Evaluation

1. chain-evolution accum = 8 (chronic, 과거 처리 완료, 본 cycle 신규 X)
2. same chain 5 fail consec = X
3. cycle 1174 % 50 = 24 (≠0)
4. meta-pattern body 'SKILL 갱신 필요' = X
5. trigger 5 zero-fire 20w inclusive (cycle 436 룰): review-code 6/20 in window 1155-1174 (sample 19/20 ≥10, 평가 대상 review-code 1개 fire OK) → 미충족

→ skill-evolution 자동 발화 X. signal next_n=8.

## Next

review-code (heavy) — silent drift family detection channel + i18n 같은 패턴 다른 shared 컴포넌트 (LanguageSwitch / EmptyState / RelatedLinks) audit possible. 또는 operational-analysis (lite) — cycle 1166→1173 7-cycle gap 후 자연 누적 baseline.
