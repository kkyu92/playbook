---
date: "2026-06-11"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b125d35ea537963119d1feaf6ec0a065bfefc1bb"
---


subtype: cycle-retro
cycle: 1160
chain: review-code (heavy)
outcome: success
pr: #1948
commit: ebd42ed

진단:
- cycle 1159 op-analysis lite PARTIAL (cohort 1일 fresh delta=0) → next_rec 첫 후보 review-code (heavy, knip 18 cleanup)
- knip 실제 surface 33건 (cycle 1159 박제 18건 vs 33건 — false positive 포함 surface)
- 직전 8 distinct=6 (lock X) / lite cap streak 0
- 9건 안전 제거 식별 + 24건 false positive 사전 분류

cleanup 9건:
1. WaitlistForm.tsx 파일 삭제 (사용처 0)
2. breadcrumb.tsx 파일 삭제 (shadcn 미사용)
3. engine/weights.ts 파일 삭제 (FACTOR_TOTAL export 사용처 0)
4. @radix-ui/react-slot dep 제거 (breadcrumb 만 사용)
5. archive.ts readArchive export 제거 (readArchiveVariants 만 사용)
6. picks-loader.ts listLottoPicksDates export 제거 (사용처 0)
7. buildShadowCalibration.ts CalibrationSeries interface 제거 (사용처 0)
8. design-tokens.ts accent 객체 제거 (직접 import 0)
9. design-tokens.ts brandExternal 객체 제거 (직접 import 0)

검증:
- knip 33→22 (-11, false positive 만 잔존)
- pnpm type-check green (3 workspaces)
- pnpm lint green
- pnpm test green (915 + 895 = 1810 tests)
- -320 lines / 3 file 삭제 + 5 file 변경
- PR #1948 auto-merge 활성화

잔여 false positive 분류 22건:
- sw.js (ServiceWorkerRegister runtime register)
- axe-core (a11y 테스트 2개 사용)
- @supabase/supabase-js × 8 (scripts/ entry knip config 누락)
- tsx × 4 (workflow yml 직접 호출)
- evaluateThreeWay (backtest-v2-candidate.ts 사용)
- lotto-data-schema 7 types (Zod schema 함께 보존)
- CURRENT_SCORING_RULE | QUANT_PREGAME_VERSION (intentional alias)

silent drift family detection:
- readArchive (cycle 946 mix 우선 추가 후 readArchiveVariants 로 대체된 잔존 함수)
- design-tokens accent/brandExternal (DESIGN.md token 갱신 후 잔존)
- listLottoPicksDates (사용처 0 박제 stale)
- WaitlistForm.tsx (MLB 출시 후 미사용 컴포넌트)
- silent drift family streak 누적 (cycle 458 → cycle 1160)

next_recommended_chain:
- lotto (6/13 토 추첨 후 OOS 검증 — cycle 1162 즈음, timing critical D-2)
- operational-analysis (cycle 1161 2일 fresh 측정)
- fix-incident (사례 14 family 13th monitor)
- polish-ui (cycle 1157 후 3 cycle gap, /accuracy /lotto source check)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
