# Changelog

본 허브의 굵직한 변경만 기록. 일별 디테일은 `git log` 또는 `~/.gstack/projects/kkyu92-playbook/` 의 retro / health 히스토리.

형식: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) 기반.

## [0.5.81] — 2026-05-14

### Added
- **wiki 검색 score threshold 0.88** — `scripts/search.mjs` SCORE_THRESHOLD 추가. 오답 반환 차단 ("no match" 정직 모드). 데이터 기반 calibration (정답 0.89+ / 오답 0.84~0.87)
- **develop-cycle-hub skill 통합** — 4 chain (explore-idea/curate/fix-incident/worker-incident-triage) 시퀀스 첫 step에 `pnpm search` 추가. JIT 검색 강제 메커니즘 + ROI 측정 baseline 박제 (cycle 493 = 43 queries / 사이클당 0.087, target N=10 후 ≥ 51 / ≥ 0.8)

### Changed
- `public/embeddings.json` 재생성 (994 → 1246 chunks, +252)
- curate cycle 494 — wiki lint CLEAN (156 entries) + skill 통합 dogfood 첫 발화 + memory 갱신 + TODOS BRANCHED 재발 박제 (N=380 batch 92/380)

### Background
- 벤치마크 (5 쿼리 실측): 오답 반환 2/5 → 0/5, honest no-match 0/5 → 3/5
- 자가검증 4차례 반복 (모델 업그레이드 → skill 통합 → threshold 먼저 → 데이터 기반 0.88) 으로 정답 도달

## [0.5.80] — 2026-05-13

### Changed
- curate cycle 491 — wiki lint CLEAN (152 entries) + memory 갱신 (SE #122/cycles 489-490 log) + CHANGELOG 0.5.80 + TODOS BRANCHED 47→49/16 갱신 (N=380 batch 90/380)

### Metrics
- zero-touch 자동화: cycle 49~490 = **442 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 90/380)
- wiki entries: **152** (lint CLEAN 유지)
- skill-evolution 누적: **122회** (SE #122, cycle 490) — 명단 동일 7개 / 마커 skip 자기조정 성공
- BRANCHED: **재발** (local 49 / origin 16 ahead — R6 사용자 carry-over)
- open hub-dispatch issues: **0건**

## [0.5.79] — 2026-05-13

### Changed
- curate cycle 488 — wiki lint CLEAN (152 entries) + TODOS BRANCHED 42/15→44/16 갱신 + CHANGELOG 0.5.79 (N=380 batch 89/380)

### Metrics
- zero-touch 자동화: cycle 49~488 = **440 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 89/380)
- wiki entries: **152** (lint CLEAN 유지)
- skill-evolution 누적: **120회** (SE #120, cycle 484) — 명단 동일 7개 / 마커 skip 자기조정 성공
- BRANCHED: **재발** (local 44 / origin 16 ahead — R6 사용자 carry-over)
- open hub-dispatch issues: **0건**

## [0.5.78] — 2026-05-13

### Changed
- review-code cycle 486 — `scan-promotions.mjs` disk 캐시 추가 (Gemini 임베딩 중복 호출 제거) + `dashboard-update.mjs` SE Trigger-5 마커 설정 버그 수정 + SE 마커 skip 자기조정 성공 (명단 동일 7개 SE #120 대비 / SE 40% ≥ 40%) (N=380 batch 87/380)
- curate cycle 487 — wiki lint CLEAN (152 entries) + memory 갱신 (cycles 486-487 log) + CHANGELOG 0.5.78 + TODOS BRANCHED 42/15 갱신 (N=380 batch 88/380)

### Metrics
- zero-touch 자동화: cycle 49~486 = **438 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 87/380)
- wiki entries: **152** (lint CLEAN 유지)
- skill-evolution 누적: **120회** (SE #120, cycle 484) — 명단 동일 7개 / 마커 skip 자기조정 성공 유지
- BRANCHED: **재발** (local 42 / origin 15 ahead — R6 사용자 carry-over)
- open hub-dispatch issues: **0건**

## [0.5.77] — 2026-05-13

### Changed
- skill-evolution SE #119 cycle 482 — stage 3 evidence 갱신 (명단 동일 7개 SE #118 대비 / SE 35% 자기조정 불가 → 마커 skip 자기조정 성공 window 463-482) + TODOS BRANCHED 31/15→33/15 갱신 (N=380 batch 83/380)
- review-code cycle 483 — 3개 버그 수정: lastActiveDate 실시간 갱신 / CATEGORIES 정의 불일치 / roadmapCount 산식 오류 + working Map O(1) (N=380 batch 84/380)
- skill-evolution SE #120 cycle 484 — stage 3 evidence 갱신 (명단 동일 7개 SE #119 대비 / SE 35% 자기조정 불가 → 마커 skip 자기조정 성공 window 465-484) + TODOS BRANCHED 33/15→36/15 갱신 (N=380 batch 85/380)
- curate cycle 485 — wiki lint CLEAN (152 entries) + memory review (SE #118→120/cycles 482-484 log) + CHANGELOG 0.5.77 + TODOS BRANCHED 38/15 갱신 (N=380 batch 86/380)

### Metrics
- zero-touch 자동화: cycle 49~484 = **436 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 85/380)
- wiki entries: **152** (lint CLEAN 유지)
- skill-evolution 누적: **120회** (SE #120, cycle 484) — 명단 동일 7개 SE #119 대비 / 마커 skip 자기조정 성공 window 465-484
- BRANCHED: **재발** (local 38 / origin 15 ahead — R6 사용자 carry-over)
- open hub-dispatch issues: **0건**

## [0.5.76] — 2026-05-13

### Changed
- review-code cycle 478 — `stringifyPreservingOrder` 공유 lib 추출 (bidirectional-sync.mjs) + `slug.slice(0,40)` 제거 (152 슬러그 전체 노출) (N=380 batch 79/380)
- skill-evolution SE #118 cycle 479 — stage 3 evidence 갱신 (명단 동일 7개 SE #117 대비 / SE 35% 자기조정 불가 → 마커 skip 자기조정 성공 window 460-479) (N=380 batch 80/380)
- worker-incident-triage cycle 480 — moneyball inbound 10건 CLOSED (CI 실패 8 + Vercel 실패 2) + [P1] pnpm-lock RESOLVED + lesson: confidence cap boundary pitfall 박제 (N=380 batch 81/380)
- curate cycle 481 — wiki lint CLEAN (152 entries) + memory review + CHANGELOG 0.5.76 + TODOS BRANCHED 28→31/15 갱신 (N=380 batch 82/380)

### Metrics
- zero-touch 자동화: cycle 49~480 = **432 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 81/380)
- wiki entries: **152** (lint CLEAN 유지)
- skill-evolution 누적: **118회** (SE #118, cycle 479) — 명단 동일 7개 SE #117 대비 / 마커 skip 자기조정 성공 window 460-479
- BRANCHED: **재발** (local 31 / origin 15 ahead — R6 사용자 carry-over)
- open hub-dispatch issues: **0건**

## [0.5.75] — 2026-05-13

### Changed
- skill-evolution SE #116 cycle 475 — stage 3 evidence 갱신 (명단 동일 7개 SE #115 대비 / SE 35% 자기조정 불가 → 마커 유지 cycle 476) (N=380 batch 76/380)
- skill-evolution SE #117 cycle 476 — stage 3 evidence 갱신 (명단 동일 7개 SE #116 대비 / SE 35% 자기조정 불가 → 마커 skip 자기조정 성공 window 457-476) + SE Trigger-5 마커 삭제 (N=380 batch 77/380)
- curate cycle 477 — wiki lint CLEAN (152 entries) + memory 갱신 (SE #115→117/cycles 475-477 log) + CHANGELOG 0.5.75 + TODOS BRANCHED 21/15→23/15 갱신 (N=380 batch 78/380)

### Metrics
- zero-touch 자동화: cycle 49~477 = **429 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 77/380)
- wiki entries: **152** (lint CLEAN 유지)
- skill-evolution 누적: **117회** (SE #117, cycle 476) — 명단 동일 7개 SE #116 대비 / SE 35% 자기조정 불가 → 마커 skip 자기조정 성공
- BRANCHED: **재발** (local 23 / origin 15 ahead — R6 사용자 carry-over)
- open hub-dispatch issues: **0건**

## [0.5.74] — 2026-05-13

### Changed
- skill-evolution SE #114 cycle 469 — stage 3 evidence 갱신 (명단 변화 6→2개 대규모 활성화 / SE 40% 마커 skip 자기조정) (N=380 batch 70/380)
- worker-incident-triage cycle 470 — moneyball CI/Vercel 5건 close (#557/#558/#559/#560/#562) + pnpm-lock.yaml root cause 박제 + SE Trigger-5 마커 설정 (N=380 batch 71/380)
- skill-evolution SE #115 cycle 471 — stage 3 evidence 갱신 (명단 변화 2→7개 SE #114 window shift-out 재비활성 / SE 45% 마커 skip 자기조정) (N=380 batch 72/380)
- worker-incident-triage cycle 472 — moneyball CI 3건 close (#564/#565/#567) (N=380 batch 73/380)
- worker-incident-triage cycle 473 — moneyball CI/Vercel 2건 close (#568/#569) + TODOS [P1] 13건 갱신 (N=380 batch 74/380)
- curate cycle 474 — wiki lint CLEAN (152 entries) + memory 갱신 + CHANGELOG 0.5.74 (N=380 batch 75/380)

### Metrics
- zero-touch 자동화: cycle 49~473 = **425 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 74/380)
- wiki entries: **152** (lint CLEAN 유지)
- skill-evolution 누적: **115회** (SE #115, cycle 471) — 명단 변화 2→7개 (SE #114 window shift-out 재비활성 → 마커 skip 자기조정)
- BRANCHED: **재발** (local 17 / origin 14 ahead — R6 사용자 carry-over)
- open hub-dispatch issues: **0건**

## [0.5.73] — 2026-05-13

### Changed
- review-code cycle 466 — health 10/10 CLEAN + SE trigger-5 마커 설정 (review-code 탈퇴 7→6 / SE 35% 자기조정 불가) + INDEX.md journal-033~036 연결 박제 (N=380 batch 67/380)
- skill-evolution SE #113 cycle 467 — stage 3 evidence 갱신 (zero-touch 64+→466+ / 명단 변화 7→6개 review-code 탈퇴 → 마커 skip 자기조정) (N=380 batch 68/380)
- curate cycle 468 — wiki lint CLEAN (152 entries) + memory 갱신 + CHANGELOG 0.5.73 (N=380 batch 69/380)

### Metrics
- zero-touch 자동화: cycle 49~467 = **419 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 69/380)
- wiki entries: **152** (lint CLEAN 유지)
- skill-evolution 누적: **113회** (SE #113, cycle 467) — 명단 변화 7→6개 (review-code 탈퇴 → 마커 skip 자기조정)
- BRANCHED: **해소** (23f76f3 merge 완료, local 6 ahead / origin 0 ahead)
- open hub-dispatch issues: **0건**

## [0.5.72] — 2026-05-13

### Changed
- curate cycle 465 — wiki lint CLEAN (152 entries, isolated 4→0) + journal-033~036 connections 추가 + memory 갱신 (cycle 462→464 / BRANCHED 해소 / wiki 144→152 / batch 66/380) + retro 박제 + CHANGELOG 0.5.72 (N=380 batch 66/380)

### Metrics
- zero-touch 자동화: cycle 49~464 = **416 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 66/380)
- wiki entries: **152** (lint CLEAN, isolated 4→0 해소)
- skill-evolution 누적: **112회** (SE #112, cycle 463) — 명단 동일 7개 (window 444-463 SE 40% 자기조정 성공 → 마커 skip)
- BRANCHED: **해소** (23f76f3 merge 완료)
- open hub-dispatch issues: **0건**

## [0.5.71] — 2026-05-13

### Changed
- curate cycle 462 — wiki lint CLEAN (144 entries, 0 orphan/isolated/stale) + memory 갱신 (project_develop_cycle_skill_family cycle 461→462, batch 63→64/380) + retro 460-461 박제 + CHANGELOG 0.5.71 + TODOS BRANCHED 164→165 갱신 + SE Trigger-5 마커 설정 (N=380 batch 64/380)

### Metrics
- zero-touch 자동화: cycle 49~462 = **414 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 64/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **111회** (SE #111, cycle 460) — 다음 SE #112 = cycle 463 강제 발화 예정 (window 442-461 SE 35% 마커 설정)
- BRANCHED 재발: local **165** ahead / origin **22** ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.70] — 2026-05-13

### Changed
- curate cycle 461 — wiki lint CLEAN (144 entries, 0 orphan/isolated/stale) + memory 갱신 (project_develop_cycle_skill_family cycle 460 수치 반영) + retro 459-460 박제 + CHANGELOG 0.5.70 + TODOS BRANCHED 162→164 갱신 (N=380 batch 63/380)
- skill-evolution SE #111 cycle 460 — stage 3 evidence 갱신 (zero-touch 64+→459+ / 명단 동일 7개 SE 40% 자기조정 성공 → 마커 skip) + TODOS BRANCHED 159→162 갱신 (N=380 batch 63/380)

### Metrics
- zero-touch 자동화: cycle 49~460 = **412 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 63/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **111회** (SE #111, cycle 460) — 명단 동일 7개 (window 441-460 SE 40% 자기조정 성공 → 마커 skip)
- BRANCHED 재발: local **164** ahead / origin **22** ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.69] — 2026-05-13

### Changed
- curate cycle 459 — wiki lint CLEAN (144 entries, 0 orphan/isolated/stale) + memory 갱신 (project_bidirectional_compound_growth_goal / project_develop_cycle_skill_family cycle 458→459 수치 반영) + retro 457-458 박제 + CHANGELOG 0.5.69 + TODOS BRANCHED 157→159 갱신 (N=380 batch 62/380)

### Metrics
- zero-touch 자동화: cycle 49~458 = **410 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 62/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **110회** (SE #110, cycle 458) — 명단 동일 7개 (window 439-458 SE 40% 자기조정 성공 → 마커 skip)
- BRANCHED 재발: local **159** ahead / origin **22** ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.68] — 2026-05-13

### Changed
- curate cycle 457 — wiki lint CLEAN (144 entries, 0 orphan/isolated/stale) + memory 갱신 (project_bidirectional_compound_growth_goal / project_develop_cycle_skill_family cycle 456→457 수치 반영) + retro 456 박제 + CHANGELOG 0.5.68 (N=380 batch 60/380)

### Metrics
- zero-touch 자동화: cycle 49~456 = **408 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 60/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **109회** (SE #109, cycle 455) — 명단 동일 7개 (window 436-455 SE 45% 자기조정 성공)
- BRANCHED 재발: local **155** ahead / origin **22** ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.67] — 2026-05-13

### Changed
- worker-incident-triage cycle 452 — moneyball CI batch 22건 CLOSE (protobufjs CVE 해소) + solution pr-branch-old-base-audit-failure recurrence 2→3 + SE Trigger-5 마커 설정 (N=380 batch 55/380)
- skill-evolution SE #107 cycle 453 — stage 3 evidence 갱신 (zero-touch 64+→452+, window 433-452 SE 30% 자기조정 불가, 명단 동일 6개 → 마커 유지) + TODOS BRANCHED 146→148 갱신 (N=380 batch 56/380)
- skill-evolution SE #108 cycle 454 — stage 3 evidence 갱신 (zero-touch 64+→453+, 명단 변화 6→7개 review-code 신규 진입 → 마커 유지 cycle 455 연속) + TODOS BRANCHED 148→149 갱신 (N=380 batch 57/380)
- skill-evolution SE #109 cycle 455 — stage 3 evidence 갱신 (zero-touch 64+→454+, 명단 동일 7개, SE 45% ≥ 40% → 자기조정 성공 → 마커 skip) + TODOS BRANCHED 149→153 갱신 (N=380 batch 58/380)
- curate cycle 456 — retro 452-455 박제 + CHANGELOG 0.5.67 + memory 갱신 (N=380 batch 59/380)

### Metrics
- zero-touch 자동화: cycle 49~455 = **407 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 59/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **109회** (SE #109, cycle 455) — 명단 동일 7개 (window 436-455 SE 45% 자기조정 성공)
- BRANCHED 재발: local **153** ahead / origin **22** ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.66] — 2026-05-13

### Changed
- fix-incident cycle 450 — ci.yml pnpm audit step에 `auto-ingest/*` 브랜치 skip 조건 추가 (BRANCHED false positive 차단) + TODOS BRANCHED 139→142 갱신 (N=380 batch 53/380)
- worker-incident-triage cycle 13 (batch session) — moneyball CI 실패 (91f828d) 분류 완료 + _compiled-truth.md solution 6→7건 갱신 + TODOS BRANCHED 140→143 갱신
- curate cycle 451 — retro 450 + cycle 13 박제 + CHANGELOG 0.5.66 + memory 갱신 (N=380 batch 54/380)

### Metrics
- zero-touch 자동화: cycle 49~450 = **402 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 54/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **106회** (SE #106, cycle 448)
- BRANCHED 재발: local **143** ahead / origin **22** ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.65] — 2026-05-13

### Changed
- fix-incident cycle 444 — protobufjs CVE PR #546 origin auto-merge 해소 + TODOS BRANCHED 130→132 갱신 (N=380 batch 48/380)
- fix-incident cycle 445 — auto-ingest CI audit 인시던트 조사 완료, retro-only + TODOS BRANCHED 132→133 갱신 (N=380 batch 49/380)
- skill-evolution SE #105 cycle 446 — stage 3 evidence 갱신 (zero-touch 64+→445+, window 425-444 SE 35%→40% 자기조정 성공, 명단 동일 7개 → 마커 skip, TODOS BRANCHED 133→134 갱신) (N=380 batch 50/380)
- worker-incident-triage cycle 447 — compareModels-shadow 테스트 미동기 해소 + solution 박제 (hub issue #548 close) (N=380 batch 51/380)
- skill-evolution SE #106 cycle 448 — stage 3 evidence 갱신 (zero-touch 64+→447+, 명단 변화 7→6개 worker-incident-triage 탈퇴 = activation signal → 마커 발화, window 429-448 SE 40% → 자기조정 성공 → 마커 skip, TODOS BRANCHED 134→137 갱신) (N=380 batch 51/380)
- curate cycle 449 — retro 444-448 박제 + CHANGELOG 0.5.65 + memory 갱신 (BRANCHED / project 수치 갱신) + feedback_mid_review_protocol MEMORY.md 인덱싱 (N=380 batch 52/380)

### Metrics
- zero-touch 자동화: cycle 49~448 = **400 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 52/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **106회** (SE #106, cycle 448) — 명단 변화 7→6개 (worker-incident-triage 탈퇴, window 429-448 SE 40% 자기조정 성공)
- BRANCHED 재발: local 139 ahead / origin 22 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.64] — 2026-05-13

### Changed
- skill-evolution SE #104 cycle 441 — stage 3 evidence 갱신 (zero-touch 64+→440+, window 422-441 SE 40% ≥ 40% + 명단 동일 7개 → 자기조정 성공 → 마커 skip, TODOS BRANCHED 124→126 갱신) (N=380 batch 45/380)
- fix-incident cycle 442 — auto-merge test gate pnpm audit 추가 (ai-review.yml 🔒 Test Gate 보강) + TODOS BRANCHED 126→128 갱신 (N=380 batch 46/380)
- curate cycle 443 — retro 441-442 박제 + CHANGELOG 0.5.64 + TODOS BRANCHED 128→130 갱신 (N=380 batch 47/380)

### Metrics
- zero-touch 자동화: cycle 49~442 = **394 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 46/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **104회** (SE #104, cycle 441) — 명단 동일 7개 (window 422-441 SE 40% 자기조정 성공)
- BRANCHED 재발: local 130 ahead / origin 15 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.63] — 2026-05-13

### Changed
- skill-evolution SE #101 cycle 436 — stage 3 evidence 갱신 (zero-touch 64+→435+, window 416-435 SE 35%, 명단 동일 8개, 자기조정 불가 → 마커 유지, TODOS BRANCHED 115→117 갱신) (N=380 batch 41/380)
- skill-evolution SE #102 cycle 437 — stage 3 evidence 갱신 (zero-touch 64+→436+, window 417-436 SE 35%, 명단 동일 8개, retro 재평가 window 418-437 SE 40% → 마커 skip 자기조정 성공, TODOS BRANCHED 117→119 갱신) (N=380 batch 42/380)
- fix-incident cycle 438 — protobufjs ^7.5.5→^7.5.6 pnpm audit high 4 CVE 해소 (N=380 batch 42/380)
- skill-evolution SE #103 cycle 439 — stage 3 evidence 갱신 (zero-touch 64+→438+, window 419-438 SE 40%, 명단 변화 8→7개 fix-incident 탈퇴 → 마커 발화, retro window 420-439 SE 40% → 자기조정 성공, TODOS BRANCHED 119→122 갱신) (N=380 batch 43/380)
- curate cycle 440 — retro 436-439 박제 + CHANGELOG 0.5.63 + TODOS BRANCHED 122→124 갱신 + memory 갱신 (N=380 batch 44/380)

### Metrics
- zero-touch 자동화: cycle 49~439 = **391 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 44/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **103회** (SE #103, cycle 439) — 명단 변화 8→7개 (fix-incident 탈퇴)
- BRANCHED 재발: local 124 ahead / origin 15 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.62] — 2026-05-13

### Changed
- review-code cycle 434 — knowledge-graph.tsx isActive=isHovered||isHighlighted 추출 (6회 반복→1회 선언) + WHAT 코멘트 4개 제거 (WHY 코멘트 유지) (N=380 batch 39/380)
- curate cycle 435 — retro 433-434 박제 + CHANGELOG 0.5.62 + TODOS BRANCHED 113→115 갱신 + memory 갱신 (N=380 batch 40/380)

### Metrics
- zero-touch 자동화: cycle 49~434 = **386 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 39/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **100회** (SE #100, cycle 432) — 백 번째 발화 마일스톤
- BRANCHED 재발: local 115 ahead / origin 5 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

### Note
- cycle 433: watch.sh hang safety auto-kill (idle 304s past soft, elapsed 3006s) — curate 커밋 이전 SIGKILL, next_n=0 signal → 수동 재개 필요 상태였음

## [0.5.61] — 2026-05-13

### Changed
- skill-evolution SE #99 cycle 431 — stage 3 evidence 갱신 (zero-touch 64+→430+, window 412-431 SE 35%, 자기조정 불가 → 마커 유지, 명단 동일 8개) (N=380 batch 37/380)
- skill-evolution SE #100 cycle 432 — stage 3 evidence 갱신 (zero-touch 64+→432+, window 413-432 SE 40%, 마커 skip 자기조정 성공) — **백 번째 발화 마일스톤** (N=380 batch 37/380)
- curate cycle 433 — retro 431-432 박제 + CHANGELOG 0.5.61 + TODOS BRANCHED 111→113 갱신 + memory 갱신 (N=380 batch 38/380)

### Metrics
- zero-touch 자동화: cycle 49~433 = **385 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 38/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **100회** (SE #100, cycle 432) — 백 번째 발화 마일스톤
- BRANCHED 재발: local 113 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.60] — 2026-05-13

### Changed
- review-code cycle 429 — dashboard/page.tsx STATUS_MAP/SOURCE_MAP lookup 통합(3→1, 2→1) + DOT_STYLE 호이스팅 + today Date 단일 생성 props 공유(cross-midnight 수정) + 노이즈 주석 제거 413→384줄 (N=380 batch 35/380)
- curate cycle 430 — retro 429 박제 + CHANGELOG 0.5.60 + TODOS BRANCHED 102→106 갱신 + memory 갱신 (N=380 batch 36/380)

### Metrics
- zero-touch 자동화: cycle 49~430 = **382 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 36/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **98회** (SE #98, cycle 427)
- BRANCHED 재발: local 106 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.59] — 2026-05-13

### Changed
- review-code cycle 426 — entry-editor.tsx DEFAULT_FRONTMATTER date lazy init + filteredSlugs useMemo (N=380 batch 32/380)
- skill-evolution SE #98 cycle 427 — stage 3 evidence 갱신 · window 407-426 SE 35% < 40% · 명단 동일 8개 · 자기조정 성공 (retro 재평가 window 408-427 SE 40% → 마커 skip) (N=380 batch 33/380)
- curate cycle 428 — retro 426-427 박제 + CHANGELOG 0.5.59 + TODOS BRANCHED 100→102 갱신 + memory 갱신 (N=380 batch 34/380)

### Metrics
- zero-touch 자동화: cycle 49~428 = **380 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 34/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **98회** (SE #98, cycle 427)
- BRANCHED 재발: local 102 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.58] — 2026-05-13

### Changed
- skill-evolution SE #97 cycle 424 — stage 3 evidence 갱신 · window 404-423 SE 35% < 40% · 명단 동일 8개 · 자기조정 성공 (retro 재평가 window 405-424 SE 40% → 마커 skip) (N=380 batch 30/380)
- curate cycle 425 — retro 424 박제 + CHANGELOG 0.5.58 + TODOS BRANCHED 94→96 갱신 + memory 갱신 (N=380 batch 31/380)

### Metrics
- zero-touch 자동화: cycle 49~425 = **377 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 31/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **97회** (SE #97, cycle 424)
- BRANCHED 재발: local 96 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.57] — 2026-05-13

### Changed
- review-code cycle 422 — auth.ts 3개 DRY (encoder 함수 추출 + safeCompare 단순화 + importHMACKey 캐싱) + content.ts manifest lazy cache (중복 build() 호출 방지) + gemini-client.mjs 주석 정정 + health 10/10 (N=380 batch 28/380)
- curate cycle 423 — retro 421-422 박제 + CHANGELOG 0.5.57 + TODOS BRANCHED 89→92 갱신 + memory 갱신 (N=380 batch 29/380)

### Metrics
- zero-touch 자동화: cycle 49~423 = **375 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 29/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **96회** (SE #96, cycle 420)
- BRANCHED 재발: local 92 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.56] — 2026-05-13

### Changed
- review-code cycle 418 — auth.ts importHMACKey() DRY 헬퍼 추출 (importKey 중복 7줄 제거) + knowledge-graph nodePointerAreaPaint 타입 cast 개선 + health 10/10×11 연속 (N=380 batch 24/380)
- skill-evolution SE #95 cycle 419 — stage 3 evidence 갱신 · window 399-418 SE 35% < 40% · 명단 동일 7개 · 자기조정 불가 → 마커 유지 (cycle 420 연속 발화) (N=380 batch 25/380)
- skill-evolution SE #96 cycle 420 — stage 3 evidence 갱신 · 명단 변화 7→8개 (fix-incident 재진입) · 마커 발화 + retro window 401-420 SE 45% ≥ 40% → 마커 skip (자기조정 성공) (N=380 batch 26/380)
- curate cycle 421 — retro 412-420 박제 + CHANGELOG 0.5.56 + TODOS BRANCHED 88→89 갱신 + memory 갱신 (N=380 batch 27/380)

### Metrics
- zero-touch 자동화: cycle 49~421 = **373 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 27/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **96회** (SE #96, cycle 420)
- SE #96 0회 chain 8개: fix-incident/explore-idea/polish-ui/worker-incident-triage/closed-loop-design/dimension-cycle/expand-scope/design-system
- BRANCHED 재발: local 89 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.55] — 2026-05-13

### Changed
- skill-evolution SE #93 cycle 415 — stage 3 evidence 갱신 · window 394-413 SE 35% < 40% · 명단 동일 7개 · 자기조정 불가 → 마커 유지 (N=380 batch 21/380)
- skill-evolution SE #94 cycle 416 — stage 3 evidence 갱신 · window 396-415 SE 40% ≥ 40% · 명단 동일 7개 · 자기조정 성공 → 마커 skip (N=380 batch 22/380)
- curate cycle 417 — retro 415-416 박제 + CHANGELOG 0.5.55 + TODOS BRANCHED 78→80 갱신 (N=380 batch 23/380)

### Metrics
- zero-touch 자동화: cycle 49~416 = **368 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 23/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **94회** (SE #94, cycle 416)
- SE #94 0회 chain 7개: explore-idea/polish-ui/worker-incident-triage/closed-loop-design/dimension-cycle/expand-scope/design-system
- BRANCHED 재발: local 80 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.54] — 2026-05-13

### Changed
- review-code cycle 413 — health 10/10 (10회 연속) · simplify 3개 app code: knowledge-graph handleNodeHover dead code 제거, auth bufToHex DRY 헬퍼 추출, content getEntry TOCTOU → try/catch (N=380 batch 19/380)
- curate cycle 414 — retro 411-413 박제 + CHANGELOG 0.5.54 + TODOS BRANCHED 74 갱신 (N=380 batch 20/380)

### Metrics
- zero-touch 자동화: cycle 49~413 = **365 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 20/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **92회** (SE #92, cycle 409)
- SE #92 0회 chain 7개: explore-idea/polish-ui/worker-incident-triage/closed-loop-design/dimension-cycle/expand-scope/design-system
- BRANCHED 재발: local 74 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.53] — 2026-05-13

### Changed
- review-code cycle 411 — health 10/10 (9회 연속) · simplify 5개 scripts: embed-content regex 버그 수정 + vectors[] 제거, generate-lesson validate lambda + fullSlug 제거, gemini-client buildClients memoize, lint-content existsSync 중복 제거 (N=380 batch 17/380)
- curate cycle 412 — retro 410-411 박제 + CHANGELOG 0.5.53 + TODOS BRANCHED 70 갱신 (N=380 batch 18/380)

### Metrics
- zero-touch 자동화: cycle 49~411 = **363 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 18/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **92회** (SE #92, cycle 409)
- SE #92 0회 chain 7개: explore-idea/polish-ui/worker-incident-triage/closed-loop-design/dimension-cycle/expand-scope/design-system
- BRANCHED 재발: local 70 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.52] — 2026-05-13

### Changed
- skill-evolution SE #91 cycle 408 — stage 3 evidence 갱신 (window 388-407 SE 35%) · 명단 동일 7개 · 자기조정 불가 → 마커 유지 (cycle 409 연속 발화) · TODOS BRANCHED 62→65 갱신
- skill-evolution SE #92 cycle 409 — stage 3 evidence 갱신 (window 389-408 SE 35%) · 명단 동일 7개 · 자기조정 성공 (window 390-409 SE 40% → 마커 skip) · TODOS BRANCHED 65 갱신
- curate cycle 410 — retro 408-409 박제 + CHANGELOG 0.5.52 + TODOS BRANCHED 66 갱신 + memory 갱신 (N=380 batch 16/380)

### Metrics
- zero-touch 자동화: cycle 49~409 = **361 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 16/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **92회** (SE #92, cycle 409)
- SE #92 0회 chain 7개: explore-idea/polish-ui/worker-incident-triage/closed-loop-design/dimension-cycle/expand-scope/design-system
- BRANCHED 재발: local 66 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.51] — 2026-05-13

### Changed
- skill-evolution SE #90 cycle 406 — stage 3 evidence 갱신 (window 386-405 SE 40%) · worker-incident-triage 신규 진입 (명단 6→7개) · 자기조정 성공 (window 387-406 SE 40% → 마커 skip) · TODOS BRANCHED 57→61 갱신
- curate cycle 407 — retro 405-406 박제 + CHANGELOG 0.5.51 + TODOS 갱신 + memory 갱신 (N=380 batch 13/380)

### Metrics
- zero-touch 자동화: cycle 49~406 = **358 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 13/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **90회** (SE #90, cycle 406)
- SE #90 0회 chain 7개: explore-idea/polish-ui/worker-incident-triage/closed-loop-design/dimension-cycle/expand-scope/design-system
- BRANCHED 재발: local 62 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**

## [0.5.50] — 2026-05-13

### Changed
- review-code cycle 404 — simplify 3개 fix (existsSync hoist / inline walk DRY x2 / SOURCE_CSS_VAR lookup map) + health 10.0×15 + SE #28 skip (명단 동일 + SE 40%)
- curate cycle 405 — retro 403-404 박제 + CHANGELOG 0.5.50 + TODOS BRANCHED 54→57 갱신 + memory 갱신 (N=380 batch 12/380)

### Metrics
- zero-touch 자동화: cycle 49~405 = **357 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 12/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **89회** (SE #89, cycle 402)
- health 연속: **15회 10/10** (cycle 404 review-code 기준)
- SE #28 skip: cycle 404 window 385-404 SE 40% + 명단 동일 6개 → 마커 skip 성공
- BRANCHED 재발: local 57 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**
- TODOS P0: BRANCHED [P0] 재발 (R6 대기) + Journal 033 connections 위반 carry-over

## [0.5.49] — 2026-05-13

### Changed
- curate cycle 401 — retro 398-400 박제 + CHANGELOG 0.5.48 + TODOS BRANCHED 51 갱신 + memory 갱신 (N=380 batch 8/380)
- skill-evolution SE #89 cycle 402 — stage 3 evidence 갱신 (zero-touch 64+→401+ / 명단 동일 6개 SE 35% 자기조정 성공 → 마커 skip)
- curate cycle 403 — retro 401-402 박제 + CHANGELOG 0.5.49 + TODOS BRANCHED 52→54 갱신 + memory 갱신 (N=380 batch 10/380)

### Metrics
- zero-touch 자동화: cycle 49~402 = **354 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 10/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **89회** (SE #89, cycle 402)
- health 연속: **15회 10/10** (cycle 396 review-code 기준)
- SE 자기조정: cycle 402 window 383-402 SE 40% → 마커 skip 성공
- BRANCHED 재발: local 54 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**
- TODOS P0: BRANCHED [P0] 재발 (R6 대기) + Journal 033 connections 위반 carry-over

## [0.5.48] — 2026-05-13

### Changed
- fix-incident cycle 399 — actions/cache@v4 Node.js 20 deprecation 3 workflows 패치 (embed-on-push/category-rebalance/auto-ingest) + journal connections fallback 추가 (connections: [] → playbook-journal-000-bootstrap)
- skill-evolution SE #88 cycle 400 — stage 3 evidence 갱신 (zero-touch 64+→399+ / fix-incident 탈퇴 7→6 SE 40% 자기조정 성공 → 마커 skip)
- curate cycle 401 — retro 398-400 박제 + CHANGELOG 0.5.48 + TODOS BRANCHED 51 갱신 + memory 갱신 (N=380 batch 8/380)

### Metrics
- zero-touch 자동화: cycle 49~400 = **352 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 8/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **88회** (SE #88, cycle 400)
- health 연속: **15회 10/10** (cycle 396 review-code 기준)
- SE 자기조정: cycle 400 window 381-400 SE 40% → 마커 skip 성공
- BRANCHED 재발: local 51 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**
- TODOS P0: BRANCHED [P0] 재발 (R6 대기) + Journal 033 connections 위반 carry-over

## [0.5.47] — 2026-05-13

### Changed
- curate cycle 395 — retro 392-394 박제 + CHANGELOG 0.5.46 + TODOS BRANCHED 42 갱신 + memory 갱신 (N=380 batch 시작)
- review-code cycle 396 — 7개 품질 개선 (42+/67-): findFilesByExt 헬퍼 추출, O(N*M)→O(M+K) 최적화, daysSince 중복 제거, dashboard prop/legend 중복 제거
- skill-evolution SE #87 cycle 397 — stage 3 evidence 갱신 (zero-touch 64+→396+ / 명단 동일 7개 SE 35% 자기조정 성공 → 마커 skip)
- curate cycle 398 — retro 395-397 박제 + CHANGELOG 0.5.47 + TODOS BRANCHED 46 갱신 + memory 갱신 (N=380 batch 5/380)

### Metrics
- zero-touch 자동화: cycle 49~397 = **349 사이클** 검증 완료 (N=380 batch 진행 중 (394-773) — 5/380)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **87회** (SE #87, cycle 397)
- health 연속: **15회 10/10** (cycle 396 review-code 기준)
- SE 자기조정: cycle 397 window 378-397 SE 40% → 마커 skip 성공
- BRANCHED 재발: local 46 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**
- TODOS P0: BRANCHED [P0] 재발 (R6 대기) + Journal 033 connections 위반 carry-over

## [0.5.46] — 2026-05-13

### Changed
- review-code cycle 392 — retro-only (health 10/10 14회 연속) + gstack 1.33.0.0→1.33.2.0 자동 업그레이드 + SE Trigger-5 window 373-392 SE 35% → 마커 설정
- skill-evolution SE #85 cycle 393 — stage 3 evidence 갱신 (zero-touch 64+→392+ / 명단 동일 7개 SE 35% 자기조정 불가 → 마커 유지)
- skill-evolution SE #86 cycle 394 — stage 3 evidence 갱신 (zero-touch 64+→393+ / 명단 동일 7개 SE 40% 자기조정 성공 → 마커 skip)
- curate cycle 395 — retro 392-394 박제 + CHANGELOG 0.5.46 + TODOS BRANCHED 42 갱신 + memory 갱신 (N=30 batch 완료 + N=380 batch 시작)

### Metrics
- zero-touch 자동화: cycle 49~394 = **346 사이클** 검증 완료 (**N=30 batch 완료** (364-393) + **N=380 batch 시작** (394-773))
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **86회** (SE #86, cycle 394)
- health 연속: **14회 10/10** (cycle 392 기준)
- SE 자기조정: cycle 394 window 375-394 SE 40% → 마커 skip 성공
- BRANCHED 재발: local 42 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**
- TODOS P0: BRANCHED [P0] 재발 (R6 대기) + Journal 033 connections 위반 carry-over

## [0.5.45] — 2026-05-13

### Changed
- review-code cycle 390 — retro-only (health 10/10 13회 연속) + TODOS BRANCHED 34→36 갱신
- curate cycle 391 — retro 389-390 박제 + CHANGELOG 0.5.45 + TODOS BRANCHED 36→37 갱신 + memory 갱신 (N=30 batch 27/30)

### Metrics
- zero-touch 자동화: cycle 49~390 = **342 사이클** 검증 완료 (N=30 batch **27/30** 진행 중)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **84회** (SE #84, cycle 388)
- health 연속: **13회 10/10** (cycle 390 기준)
- SE 자기조정: cycle 388 window 369-388 SE 40% → 마커 skip 성공 (cycle 389-390 SE 미발화)
- BRANCHED 재발: local 37 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**
- TODOS P0: BRANCHED [P0] 재발 (R6 대기) + Journal 033 connections 위반 carry-over

## [0.5.44] — 2026-05-13

### Changed
- worker-incident-triage cycle 385 — raw-sources 36개 archive (cycles 298-310 retro + CI 결과 + 분석 파일) + TODOS BRANCHED 27→30 갱신 + SE Trigger 5 마커 설정 (window 366-385 SE 35% → cycle 386 skill-evolution 강제 발화)
- skill-evolution SE #82 cycle 386 — stage 3 evidence 갱신 (zero-touch 64+→385+ / 명단 동일 7개 SE 35% 자기조정 불가 → 마커 유지)
- skill-evolution SE #83 cycle 387 — stage 3 evidence 갱신 (zero-touch 64+→386+ / 명단 동일 7개 SE 35% 자기조정 불가 → 마커 유지)
- skill-evolution SE #84 cycle 388 — stage 3 evidence 갱신 (zero-touch 64+→387+ / 명단 동일 7개 SE 35%→window 369-388 SE 40% 자기조정 성공 → 마커 skip)
- curate cycle 389 — retro 385-388 박제 + CHANGELOG 0.5.44 + TODOS BRANCHED 33→34 갱신 + memory 갱신 (N=30 batch 26/30)

### Metrics
- zero-touch 자동화: cycle 49~388 = **340 사이클** 검증 완료 (N=30 batch **26/30** 진행 중)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **84회** (SE #84, cycle 388)
- health 연속: 12회 10/10 (cycle 383 기준, review-code 미발화)
- SE 자기조정: cycle 388 window 369-388 SE 40% → 마커 skip 성공
- BRANCHED 재발: local 34 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**
- TODOS P0: BRANCHED [P0] 재발 (R6 대기) + Journal 033 connections 위반 carry-over

## [0.5.43] — 2026-05-12

### Changed
- review-code cycle 383 — retro-only (health 10/10 12회 연속) + TODOS BRANCHED 24→26 갱신 + SE Trigger-5 자기조정 (window 364-383 SE 40% → 마커 skip)
- curate cycle 384 — retro 382-383 박제 + CHANGELOG 0.5.43 + TODOS BRANCHED 26→27 갱신 + memory 갱신 (N=30 batch 20/30)

### Metrics
- zero-touch 자동화: cycle 49~383 = **335 사이클** 검증 완료 (N=30 batch **20/30** 진행 중)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **81회** (SE #81, cycle 381)
- health 연속: **12회 10/10** (cycle 383 기준)
- SE 자기조정: cycle 381 window 362-381 SE 40% + cycle 383 window 364-383 SE 40% → 마커 skip 성공
- BRANCHED 재발: local 27 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**
- TODOS P0: BRANCHED [P0] 재발 (R6 대기) + Journal 033 connections 위반 carry-over

## [0.5.42] — 2026-05-12

### Changed
- skill-evolution SE #80 cycle 380 — stage 3 evidence 갱신 (window 360-379 SE 7/20=35%, 0회 chain 7개 명단 SE#79 동일, 자기조정 불가 → 마커 유지)
- skill-evolution SE #81 cycle 381 — stage 3 evidence 갱신 (window 362-381 SE 8/20=40%, 명단 동일, 자기조정 성공 → 마커 skip)
- curate cycle 382 — retro 380-381 박제 + CHANGELOG 0.5.42 + TODOS BRANCHED 23→24 갱신 + memory 갱신 (N=30 batch 18/30)

### Metrics
- zero-touch 자동화: cycle 49~381 = **333 사이클** 검증 완료 (N=30 batch **18/30** 진행 중)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **81회** (SE #81, cycle 381)
- SE 자기조정: cycle 381 window 362-381 SE 40% → 마커 skip 성공
- BRANCHED 재발: local 24 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**
- TODOS P0: BRANCHED [P0] 재발 (R6 대기) + Journal 033 connections 위반 carry-over

## [0.5.41] — 2026-05-12

### Changed
- review-code cycle 378 — health 10/10 (11회 연속) + origin inbound 4커밋 진단 (raw-sources 3건 archive + Journal 033 connections 위반 확인)
- curate cycle 379 — retro 377-378 박제 + CHANGELOG 0.5.41 박제 + TODOS BRANCHED 19→20 갱신 + memory 갱신 (N=30 batch 15/30)

### Metrics
- zero-touch 자동화: cycle 49~378 = **330 사이클** 검증 완료 (N=30 batch **15/30** 진행 중)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **79회** (SE #79, cycle 376)
- health 연속: **11회 10/10** (cycles 368-378 기준)
- BRANCHED 재발: local 20 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- SE Trigger-5 평가: window 359-378 SE 7/20=35% < 40% → 마커 설정 (cycle 380 SE #80 강제 발화)

## [0.5.40] — 2026-05-12

### Changed
- worker-incident-triage cycle 375 partial — origin 4 inbound 검토 (Journal 033 connections:[] 위반 carry-over + moneyball retro 332/334/335 정보성) + TODOS 14→16 갱신
- skill-evolution SE #79 cycle 376 — stage 3 evidence 갱신 (window 356-375, SE 35%, 0회 chain 7개 명단 동일, retro 재평가 SE 40% → 자기조정 성공)
- curate cycle 377 — retro 374-376 박제 + CHANGELOG 0.5.40 박제 + memory 갱신 (N=30 batch 13/30)

### Metrics
- zero-touch 자동화: cycle 49~376 = **328 사이클** 검증 완료 (N=30 batch **13/30** 진행 중)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **79회** (SE #79, cycle 376)
- SE 자기조정: cycle 376 retro 재평가 window 357-376 SE 40% → 마커 skip 성공
- BRANCHED 재발: local 18 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**
- TODOS P0: BRANCHED [P0] 재발 (R6 대기) + Journal 033 connections 위반 carry-over

## [0.5.39] — 2026-05-12

### Changed
- skill-evolution SE #77 cycle 372 — stage 3 evidence 갱신 (window 352-371, SE 35%, 0회 chain 7개 명단 동일, 자기조정 불가 → 마커 유지)
- skill-evolution SE #78 cycle 373 — stage 3 evidence 갱신 (window 353-372, SE 35%, 명단 동일, retro 재평가 SE 40% → 자기조정 성공)
- curate cycle 374 — retro 371-373 박제 + TODOS BRANCHED 갱신 (local 14 / origin 4) + memory 갱신 (N=30 batch 10/30)

### Metrics
- zero-touch 자동화: cycle 49~373 = **325 사이클** 검증 완료 (N=30 batch **10/30** 진행 중)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **78회** (SE #78, cycle 373)
- SE 자기조정: cycle 373 retro 재평가 window 354-373 SE 40% → 마커 skip 성공
- BRANCHED 재발: local 14 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**
- TODOS P0: BRANCHED [P0] 재발 (R6 대기)

## [0.5.38] — 2026-05-12

### Changed
- curate cycle 371 — retro 370 박제 + TODOS BRANCHED [P0] 추가 (local 10 / origin 4) + memory 갱신 (N=30 batch 8/30)

### Metrics
- zero-touch 자동화: cycle 49~371 = **323 사이클** 검증 완료 (N=30 batch **8/30** 진행 중)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **76회** (SE #76, cycle 367)
- BRANCHED 재발: local 10 ahead / origin 4 ahead (R6 사용자 영역, [P0] TODOS 박제)
- open hub-dispatch issues: **0건**
- TODOS P0: BRANCHED [P0] 재발 (R6 대기)

## [0.5.37] — 2026-05-12

### Changed
- review-code cycle 369 — health 10/10 (5회 연속) + stale worktree 제거 (claude/serene-easley-b24ce9, cycle 85 이후 미사용)
- curate cycle 370 — retro 368-369 박제 + memory 갱신 (N=30 batch 7/30)

### Metrics
- zero-touch 자동화: cycle 49~370 = **322 사이클** 검증 완료 (N=30 batch **7/30** 진행 중)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **76회** (SE #76, cycle 367)
- BRANCHED 재발: local 8 ahead / origin 3 ahead (R6 사용자 영역)
- open hub-dispatch issues: **0건**
- TODOS P0: 전항목 DONE

## [0.5.36] — 2026-05-12

### Changed
- skill-evolution SE #74/75/76 연속 3회 (cycles 365/366/367) — SKILL.md stage 3 evidence 갱신, zero-touch 64+→366+ 검증
- curate cycle 368 — retro 364-367 박제 + memory 갱신 (N=30 batch 4/30)

### Metrics
- zero-touch 자동화: cycle 49~367 = **319 사이클** 검증 완료 (N=30 batch **4/30** 진행 중)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **76회** (SE #76, cycle 367 — 마커 skip 자기조정 성공)
- BRANCHED 재발: local 5 ahead / origin 2 ahead (R6 사용자 영역)
- open hub-dispatch issues: **0건**
- TODOS P0: 전항목 DONE

## [0.5.35] — 2026-05-12

### Changed
- curate cycle 364 — TODOS [P0] git BRANCHED → DONE 갱신 (merge `2808ce6` 2026-05-12 21:31 KST, 0	0 완전 동기)
- memory 갱신 — N=30 batch (364-393) 시작 + BRANCHED 해소 반영

### Metrics
- zero-touch 자동화: cycle 49~364 = **316 사이클** 검증 완료 / N=30 batch (364-393) 시작
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **73회** (SE #73, cycle 360)
- **BRANCHED ✅ 해소** (0	0 완전 동기, merge `2808ce6`)
- open hub-dispatch issues: **0건**

## [0.5.34] — 2026-05-12

### Changed
- worker-incident-triage cycle 362 — react `setState in useEffect` 9차 evidence (use-user-picks.ts, moneyball cycle 325 PR #316) → `docs/solutions/react/` 갱신
- curate cycle 361 — retro 356-360 박제 + CHANGELOG 0.5.33 박제 + memory 갱신
- **N=28 batch 336-363 완료** (총 28 사이클)

### Metrics
- zero-touch 자동화: cycle 49~362 = **314 사이클** 검증 완료 (N=28 batch **28/28 완료**)
- wiki entries: **144** (lint CLEAN 유지)
- skill-evolution 누적: **73회** (SE #73, cycle 360)
- BRANCHED 지속: local 41 / origin 33 (R6 사용자 결정 영역)
- open hub-dispatch issues: **0건**
- react setState pattern: 9차 재발 추적 중 (use-user-picks lazy init 확산)

## [0.5.33] — 2026-05-12

### Fixed
- auto-ingest `push_main_with_retry` 3개 버그 수정 — push race 후 caller 종료 (`set -e` 영향), issue close 단계 분리, rebase 중 origin 파일 safe skip (cycle 357, commit `a3057da`)

### Changed
- skill-evolution SE #72/#73 연속 2회 (cycles 358/360) — stage 3 evidence 갱신, zero-touch 64+→357+→359+ 검증
- worker-incident-triage cycle 359 — push race BRANCHED block solution 박제 (`docs/solutions/ci-github-actions/2026-05-12-push-race-branched-fix-blocked.md`, #6) + meta-pattern #4 (BRANCHED 차단 재발 루프)
- retro 356-360 박제 (`docs/retros/2026-05-12-cycles-356-360.md`)
- TODOS.md 갱신 — BRANCHED P0 (local 39 / origin 32, cycle 361 기준)
- memory 2건 갱신: `project_develop_cycle_skill_family` + `project_bidirectional_compound_growth_goal` — cycle 361 기준

### Metrics
- zero-touch 자동화: cycle 49~360 = **312 사이클** 검증 완료 (N=28 batch 336~363 진행 중, 25/28 완료)
- wiki entries: **144** (lint CLEAN 유지, 전항목 0건)
- skill-evolution 누적: **73회** (SE #73, cycle 360)
- BRANCHED 지속: local 39 / origin 32 (R6 사용자 결정 영역 — 충돌 없음 확인)
- open hub-dispatch issues: **0건**
- P0 use-leaderboard: ✅ DONE — lazy init 근본 수정 (moneyball `44947fd`) + CI 지속 PASS (cycles 323-326+)

## [0.5.32] — 2026-05-12

### Fixed
- auto-ingest concurrent dispatch add/add 충돌 버그 수정 — `push_main_with_retry` rebase 충돌 시 origin 파일 존재 체크 + safe skip (cycle 354, commit `708be8f`, issue #519 close)
- use-leaderboard.ts `setState in useEffect` 8차 재발 close + **lazy init 근본 패치** — moneyball main `44947fd` push (cycle 353 worker-incident-triage, 처음으로 close+fix 동시)
- moneyball CI 3건 batch triage close — #518/#516/#515 (cycle 354)

### Changed
- skill-evolution SE #69/#70/#71 연속 3회 (cycles 351/352/355) — stage 3 evidence 갱신, zero-touch 64+→354+ 검증
- retro 350-355 박제 (`docs/retros/2026-05-12-cycles-350-355.md`)
- TODOS.md 갱신 — BRANCHED P0 (local 31 / origin 29), use-leaderboard P0 → monitoring (근본 수정 완료)
- memory 2건 갱신: `project_develop_cycle_skill_family` + `project_bidirectional_compound_growth_goal` — cycle 356 기준

### Metrics
- zero-touch 자동화: cycle 49~355 = **307 사이클** 검증 완료 (N=28 batch 336~363 진행 중, 20/28 완료)
- wiki entries: **144** (lint CLEAN 유지, 전항목 0건)
- skill-evolution 누적: **71회** (SE #71, cycle 355)
- BRANCHED 지속: local 31 / origin 29 (R6 사용자 결정 영역 — 충돌 없음 확인)
- open hub-dispatch issues: **0건**
- P0 use-leaderboard: 모니터링 중 (8차 재발 후 근본 수정, 신규 CI 실패 없음)

## [0.5.31] — 2026-05-12

### Fixed
- use-leaderboard.ts `setState in useEffect` 6차 재발 triage close — #503/#504/#505 (cycle 348 worker-incident-triage)

### Changed
- memory 2건 갱신: `project_bidirectional_compound_growth_goal` + `project_develop_cycle_skill_family` — cycle 349 기준 최신화 (zero-touch 348+, batch 13/28, BRANCHED 20/16)
- TODOS.md BRANCHED P0 상태 갱신 — local 17→20 ahead / origin 12→16 ahead

### Metrics
- zero-touch 자동화: cycle 49~348 = **300 사이클** 검증 완료 (N=28 batch 336~363 진행 중, 13/28 완료)
- wiki entries: **144** (lint CLEAN 유지, 전항목 0건)
- skill-evolution 누적: **68회** (SE #68, cycle 346)
- BRANCHED 지속: local 20 / origin 16 (R6 사용자 결정 영역)
- open hub-dispatch issues: **0건**
- P0 carry-over: use-leaderboard.ts 미수정 6차 (moneyball 세션 1줄 수정 대기)

## [0.5.30] — 2026-05-12

### Changed
- wiki lint Isolated 3→0 해소 — journal 030/031/032 connections 추가 + status complete (cycle 343 curate)
- skill-evolution SE #66/#67/#68 연속 3회 (cycles 344/345/346) — stage 3 evidence 갱신, zero-touch 64+→345+ 검증
- retro 342-346 박제 (`docs/retros/2026-05-12-cycles-342-346.md`)
- memory 갱신: `project_develop_cycle_skill_family` + `project_bidirectional_compound_growth_goal` — cycle 347 기준

### Metrics
- zero-touch 자동화: cycle 49~346 = **298 사이클** 검증 완료 (N=28 batch 336~363 진행 중, 12/28 완료)
- wiki entries: **144** (lint CLEAN 유지, 전항목 0건)
- skill-evolution 누적: **68회** (SE #68, cycle 346)
- BRANCHED 지속: local 17 / origin 12 (R6 사용자 결정 영역)
- open hub-dispatch issues: **0건**
- P0 carry-over: use-leaderboard.ts 미수정 (moneyball 세션 1줄 수정 대기)

## [0.5.29] — 2026-05-12

### Fixed
- Mermaid CI 차단 수정 — subgraph 레이블 형식 + 노드 괄호 오류 2건 (cycle 334 fix-incident, commit `4f05e1d`)
- moneyball CI stubs 9건 batch close (cycle 335 worker-incident-triage)
- use-leaderboard.ts `setState in useEffect` 3/4/5차 재발 triage close — #490~#501 (cycles 338/340/341)

### Changed
- skill-evolution SE #63/#64/#65 연속 3회 (cycles 336/337/339) — stage 3 evidence 갱신, zero-touch 64+→338+ 검증
- auto-ingest 3건 개선: connections 자동생성 + raw-sources 아카이브 + weekly-triage CI 스텁 필터 (commit `b373471`)
- memory 2건 갱신: `project_bidirectional_compound_growth_goal` + `project_develop_cycle_skill_family` — cycle 341 기준 최신화
- N=28 batch 시작 (336–363)

### Metrics
- zero-touch 자동화: cycle 49~341 = **293 사이클** 검증 완료 (N=28 batch 336~363 진행 중)
- wiki entries: **141** (lint CLEAN 유지, 전항목 0건)
- skill-evolution 누적: **65회** (SE #65, cycle 339)
- BRANCHED 지속: local 11 / origin 12 (R6 사용자 결정 영역)
- open hub-dispatch issues: **0건**
- P0 carry-over: use-leaderboard.ts 미수정 (moneyball 세션 1줄 수정 대기)

## [0.5.28] — 2026-05-12

### Changed
- retro 331-332 박제 (`docs/retros/2026-05-12-cycles-331-332.md`) — curate 2회 연속, N=40 batch 막바지 정리
- TODOS.md `[P0] R6 대기` BRANCHED 갱신 — local **171개** ahead, origin **44개** ahead _(cycle 333 갱신)_
- N=40 batch 완료 (294–333) — 40 사이클 자율 회전 검증

### Metrics
- zero-touch 자동화: cycle 49~333 = **285 사이클** 검증 완료 (N=40 batch 294~333 **완료**)
- wiki entries: **141** (lint CLEAN 유지, 전항목 0건)
- skill-evolution 누적: **62회** (SE #62, cycle 330)
- BRANCHED 지속: local 171 / origin 44 (R6 사용자 결정 영역)
- open hub-dispatch issues: 0건

## [0.5.27] — 2026-05-12

### Changed
- SKILL.md stage 3 evidence SE #61/62 (2회 연속 갱신 — cycles 329/330) — window 309-328/310-329, 0회 chain 8개 (SE #61/62 모두 명단 동일 유지). SE #61: 자기조정 불가 (35% 연속). SE #62: window 311-330 재평가 SE 40% 자기조정 마커 skip 성공
- TODOS.md `[P0] R6 대기` BRANCHED 갱신 — local **167개** ahead, origin **44개** ahead _(cycle 330 갱신)_
- retro 327-330 박제 (`docs/retros/2026-05-12-cycles-327-330.md`)

### Metrics
- zero-touch 자동화: cycle 49~330 = **282 사이클** 검증 완료 (N=40 batch 294~333 진행 중, cycle 331/333)
- wiki entries: **141** (lint CLEAN 유지, 전항목 0건)
- BRANCHED 지속: local 167 / origin 44 (R6 사용자 결정 영역)
- open hub-dispatch issues: 0건

## [0.5.26] — 2026-05-12

### Changed
- SKILL.md stage 3 evidence SE #59/60 (2회 연속 갱신 — cycles 324/325) — window 303-322/306-325, 0회 chain 8개 (SE #59: 명단 변화 7→8개, review-code 신규 진입 / SE #60: 명단 동일 8개 유지). SE #60: 마커 skip 자기조정 성공 (window 306-325 SE 9/20=45% ≥ 40% + 명단 동일)
- TODOS.md `[P0] R6 대기` BRANCHED 갱신 — local **159개** ahead, origin **41개** ahead _(cycle 325→326 갱신 — origin 41 = daily-ingest/worker-lesson/auto-ingest 연속 유입)_
- gstack upgrade 1.27.1.0 → **1.33.0.0** (cycle 327 curate — auto-upgrade)

### Fixed
- moneyball CI inbound 3건 트리아지 close (cycle 326) — issues #466/#467/#468 batch close. picks-polish-ui feature branch transient CI failures (retry 성공). hub read-only → TODOS P0 갱신

### Metrics
- zero-touch 자동화: cycle 49~326 = **278 사이클** 검증 완료 (N=40 batch 294~333 진행 중, cycle 327/333)
- wiki entries: **141** (lint CLEAN 유지, 전항목 0건)
- BRANCHED 지속: local 159 / origin 41 (R6 사용자 결정 영역)
- open hub-dispatch issues: 0건 (CI 3건 cycle 326 close 완료)

## [0.5.25] — 2026-05-12

### Changed
- SKILL.md stage 3 evidence SE #58 (cycle 321) — window 301-320, 0회 chain 6개 명단 SE #57 대비 동일 (explore-idea/polish-ui/closed-loop-design/dimension-cycle/expand-scope/design-system), SE 35% → cycle 321 retro 재평가 window 302-321 SE 8/20=40% 자기조정 마커 skip 성공
- TODOS.md P0 R6 대기 갱신 (cycle 322) — local **153개** ahead, origin **37개** ahead _(origin 누적 = daily-ingest/worker-lesson/auto-ingest 연속 유입)_

### Fixed
- moneyball CI inbound 13건 트리아지 close (cycle 322) — issues #448-#464 batch close. Pattern A (5건 stale develop-cycle/* 브랜치 #449/#453/#456/#457/#463) + Pattern B (8건 main accuracy/page.tsx 동일 root cause #448/#451/#452/#455/#458/#460/#462/#464). hub read-only → carry-over TODOS P0

### Metrics
- zero-touch 자동화: cycle 49~322 = **274 사이클** 검증 완료 (N=40 batch 294~333 진행 중, cycle 322/333)
- wiki entries: **141** (lint CLEAN 유지, 전항목 0건)
- BRANCHED 지속: local 153 / origin 37 (R6 사용자 결정 영역)
- open hub-dispatch issues: 0건 (moneyball CI 13건 cycle 322 close 완료)
- open PRs: 2건 (#418/#421 daily ingest — push 후 자동 해결 예정)

## [0.5.24] — 2026-05-12

### Changed
- SKILL.md stage 3 evidence SE #55/56/57 (3회 연속 갱신 — cycles 315/316/317) — window 295-317, 0회 chain 6개 명단 안정 (SE #54 동일), SE 점유율 35%→40% 자기조정 마커 skip 성공 (cycle 317 최종)
- TODOS.md P0 moneyball CI lint 추가 — `apps/moneyball/src/app/accuracy/page.tsx` 미사용 imports 3줄 삭제 (XS 5분, cycle 296 리팩터 잔존, 다음 moneyball 세션 처리)
- TODOS.md `[P0] R6 대기` BRANCHED 갱신 — local **148개** ahead, origin **20개** ahead _(cycle 319 갱신 — origin 20 = worker-lesson/journal/daily-ingest auto-ingest 누적)_

### Fixed
- journal-029 보강 (cycle 314) — `in-progress` → `complete` 완료 처리 + raw-sources 35건 아카이브 (CI stubs 28건 + cycle retros 6건 + lesson 1건)
- moneyball CI inbound 6건 트리아지 close (cycles 318/319) — issues #441/#442/#443/#445/#446/#447. root cause 공통: accuracy/page.tsx 미사용 imports (cycle 296 PR#285 리팩터 잔존). hub read-only → carry-over TODOS P0 박제

### Metrics
- zero-touch 자동화: cycle 49~319 = **271 사이클** 검증 완료 (N=40 batch 294~333 진행 중, cycle 320/333)
- wiki entries: **141** (lint CLEAN 전항목 0건, orphan/isolated/stale/JIT-unused 5항목 모두 0건)
- BRANCHED 지속: local 148 / origin 20 (R6 사용자 결정 영역)
- open hub-dispatch issues: 0건 (moneyball CI 6건 cycle 318/319 close 완료)

## [0.5.23] — 2026-05-12

### Added
- 8 new wiki entries via auto-ingest (PR #418 + #421) — wiki 133 → **141**
  - PR #418 (20260510): `ai-agent-remote-management-ux`, `collaboration-conflict-resolution-multi-agent`, `claude-code-harness-component-visibility-ccinv`, `high-availability-llm-disaster-recovery`
  - PR #421 (20260512): `kuku-concepts-playbook-local-markdown`, `generative-ai-hallucination-detection`, `llm-scalable-service-architecture`, `bifrost-ai-gateway-integration`
  - domains: agents×3, harness-engineering×3, context-engineering×1, infrastructure×1

### Metrics
- zero-touch 자동화: cycle 49~312 = **264 사이클** 검증 완료 (N=40 batch 294~333 진행 중, cycle 313/333)
- wiki entries: **141** (lint CLEAN, 전항목 0건)
- embeddings: 994 chunks (cycle 312 갱신)
- BRANCHED 지속: local 137 / origin 12 (R6 사용자 결정 영역)

## [0.5.22] — 2026-05-12

### Changed
- SKILL.md stage 3 evidence SE #54 (cycle 309) — window 289-308, 0회 chain 6개 명단 SE #53 대비 동일, SE 점유율 35%→40% 자기조정 마커 skip 성공
- TODOS.md `[P0] R6 대기` BRANCHED 갱신 — local **132개** ahead, origin **8개** ahead _(cycle 310 갱신 — origin 8 = worker-lesson/journal auto-ingest)_
- Node.js 20 Actions deprecation P2 추가 (cycle 310) — `.github/workflows/` 전체 Node.js 20→24 마이그레이션 deadline 2026-06-02 (3주)

### Metrics
- zero-touch 자동화: cycle 49~311 = **263 사이클** 검증 완료 (N=40 batch 294~333 진행 중, 현재 cycle 311/333)
- wiki entries: **133** (lint CLEAN 유지, orphan/isolated/stale/JIT-unused 전항목 0건)
- BRANCHED 지속: local 132 / origin 8 (R6 사용자 결정 영역)

## [0.5.21] — 2026-05-12

### Changed
- SKILL.md stage 3 evidence SE #51→#53 (3회 연속 갱신 — cycles 305/306/307) — SE 점유율 30%→35%→40% 회복, cycle 307 마커 자기조정 skip 성공
- TODOS.md `[P0] R6 대기` BRANCHED 갱신 — local **129개** ahead, origin **6개** ahead _(cycle 307 갱신 — origin 6 = worker-lesson/journal auto-ingest)_

### Metrics
- zero-touch 자동화: cycle 49~307 = **259 사이클** 검증 완료 (N=40 batch 294~333 진행 중, 현재 cycle 307/333)
- wiki entries: **133** (lint CLEAN 유지)
- BRANCHED 지속: local 129 / origin 6 (R6 사용자 결정 영역)

## [0.5.20] — 2026-05-12

### Added
- Journal 029 auto-ingest (PR #425 머지) — `lesson-pending false-positive batch close` 패턴 wiki 박제. `docs/solutions/ci-github-actions/` 새 solution 추가 (PR branch old-base audit failure 패턴)

### Changed
- SKILL.md stage 3 evidence SE #50 박제 (cycle 300) — Trigger-3 N=300 milestone + Trigger-5 동시 발화. zero-touch 63+→299+ 갱신
- wiki lint CLEAN (cycle 301 curate) — **133 entries**, isolated 2→0, orphan/stale/JIT-unused 0건. 10개 신규 entries (agents/context-engineering/data-engineering/evaluation 도메인)
- code quality baseline 박제 (cycle 302 review-code) — health 10/10 STABLE, 4회 연속 CLEAN 확정
- TODOS.md `[P0] R6 대기` BRANCHED 갱신 — local **124개** ahead, origin **2개** ahead _(cycle 303 갱신 — origin 2 = worker-lesson auto-ingest)_

### Fixed
- BRANCHED 로컬 머지 (cycle 299) — `git merge origin/main` 69 commits 통합. INDEX.md 충돌 → manifest 재생성으로 해결. push 대기 (R6 사용자 영역)
- PR #418/#421 CI root cause 확인 (cycle 303) — PR branches 가 old origin/main 기반 (Next.js 16.2.3). push 후 CI 자동 재실행 통과 예정

### Metrics
- zero-touch 자동화: cycle 49~303 = **255 사이클** 검증 완료 (N=40 batch 294~333 진행 중)
- wiki entries: **133** (cycle 298 기준 123 → +10: agents 4, context-engineering 4, data-engineering 5, evaluation 3 등)
- BRANCHED 지속: local 124 / origin 2 (R6 사용자 결정 영역)
- open PRs: 2건 (#418, #421 daily ingest — push 후 자동 해결 예정)

## [0.5.19] — 2026-05-12

### Fixed
- Next.js 16.2.4 → 16.2.6 (cycle 295 fix-incident) — 4건 high CVE 패치 (GHSA-8h8q, mg66, c4j6, middleware-bypass). daily ingest PR CI gate `pnpm audit --audit-level high` 차단 해소

### Changed
- SKILL.md stage 3 evidence SE #47→#49 (3회 연속 발화 — cycles 293/294/296): trigger-5 window 274~296, 0회 chain 6개 명단 fix-incident 탈퇴 신호 포함
- Issue #419 batch close — weekly-triage 33 raw CI stubs 전량 reject (payload_type: incident, wiki entry 가치 없음). weekly-triage.yml CI 스텁 필터 개선 [P2] carry-over
- wiki lint CLEAN (cycle 298 curate) — 123 entries, orphan/stale/isolated/JIT-unused 0건, scan-promotions 'drift' 이미 승격
- TODOS.md `[P0] R6 대기` BRANCHED 갱신 — local **111개** ahead, origin **68개** ahead _(cycle 297 갱신)_

### Metrics
- zero-touch 자동화: cycle 49~297 = **249 사이클** 검증 완료 (N=40 batch 294~333 진행 중)
- BRANCHED 지속: local 111 / origin 68 (R6 사용자 결정 영역)

## [0.5.18] — 2026-05-08

### Changed
- wiki lint CLEAN (cycle 292 curate) — 123 entries, orphan/stale/isolated/JIT-unused 0건, scan-promotions 승격 대상 없음
- TODOS.md `[P0] R6 대기` BRANCHED 갱신 — local **103개** ahead, origin **58개** ahead _(cycle 292 갱신)_
- memory rot 수정 — project_develop_cycle_skill_family (cycle 290→292, N=30 batch ✅ 완료, BRANCHED 98/54→103/58), MEMORY.md index 2줄 갱신

### Fixed
- `scripts/cross-update-shadow.mjs`: unused `join` import 제거 (ESLint warning → CLEAN)

### Metrics
- zero-touch 자동화: cycle 49~292 = **244 사이클** 검증 완료
- N=30 batch (263-292) ✅ 완료 — 다음 batch TBD

## [0.5.17] — 2026-05-08

### Changed
- dashboard `closed-loop-health` cycle 285 → 289 갱신 — window 270-289 chain 분포: skill-evolution=9 / worker-incident-triage=8 / curate=2 / review-code=1. retro-only 0/20. 0회 chain 7개 (review-code 탈퇴 — cycle 287 발화로 명단 축소). SE trigger-5: 명단 SE #46 동일 + SE 점유율 45% ≥ 40% → SKIP (자기조정)
- wiki lint CLEAN (cycle 290 curate) — 123 entries, orphan/stale/isolated/JIT-unused 0건, pattern 'drift' 이미 승격됨
- TODOS.md `[P0] R6 대기` BRANCHED 갱신 — local **98개** ahead, origin **54개** ahead _(cycle 290 갱신)_

### Metrics
- zero-touch 자동화: cycle 49~289 = **241 사이클** 검증 완료
- N=30 batch (263-292) 진행 중 — 현재 cycle 290

## [0.5.16] — 2026-05-08

### Changed
- dashboard `closed-loop-health` cycle 280 → 285 갱신 — window 266-285 chain 분포: worker-incident-triage=10 / skill-evolution=9 / curate=1. retro-only 0/20. 0회 chain 8개 (review-code 재진입 — SE #45 window 265-284 명단 변화). SE trigger-5: 점유율 45% ≥ 40% + 명단 동일 → SKIP (자기조정)
- wiki lint CLEAN (cycle 286 curate) — 123 entries, orphan/stale/isolated/JIT-unused 0건, scan-promotions 승격 대상 없음
- memory rot 수정 — project_develop_cycle_skill_family (cycle 264→285, SE #36→#45, BRANCHED 65/6→91/54), project_bidirectional_compound_growth_goal (cycles 263-285 progress entry 추가), MEMORY.md index 2줄 갱신

### Fixed
- moneyball CI raw-sources 32건 archive (cycle 282 worker-incident-triage — cycles 225-253 retro + CI incident logs)

### Metrics
- zero-touch 자동화: cycle 49~285 = **237 사이클** 검증 완료
- N=30 batch (263-292) 진행 중 — 현재 cycle 286

## [0.5.15] — 2026-05-08

### Changed
- dashboard `closed-loop-health` cycle 264 → 280 갱신 — window 261-280 chain 분포: skill-evolution=8 / worker-incident-triage=9 / curate=2 / review-code=1. retro-only 0/20. 0회 chain 7개 (명단 SE #42 동일). SE trigger-5: 점유율 40% ≥ 40% + 명단 동일 → SKIP (자기조정)
- wiki lint CLEAN (cycle 281 curate) — 123 entries, orphan/stale/isolated/JIT-unused 0건, scan-promotions 승격 대상 없음
- TODOS.md `[P0] R6 대기` BRANCHED 갱신 — local 84개 ahead, origin 50개 ahead (zero-touch push 정책 + 워커 auto-ingest 병행으로 재발산 중)

### Fixed
- moneyball CI MockResult<T> inbound 닫힘: 허브 hub-dispatch issues 26건 close (cycles 266-280) — MockResult<T> discriminated union TypeCheck fail 연속 발생, 워커 측 해결 의존
- moneyball PitcherFipTrend color '700' TypeCheck inbound (#397, cycle 276) close

### Metrics
- zero-touch 자동화: cycle 49~280 = **232 사이클** 검증 완료
- N=30 batch (263-292) 진행 중 — 현재 cycle 281

## [0.5.14] — 2026-05-08

### Changed
- wiki lint CLEAN (cycle 265 curate) — 123 entries, orphan/stale/isolated/JIT-unused 0건, pattern 'drift' 이미 승격됨
- dashboard `closed-loop-health` cycle 258 → 264 갱신 — window 245-264 chain 분포: skill-evolution=8 / curate=7 / review-code=4 / unknown=1. dispatch 누적: lesson=6 / meta-pattern=18 / chain-evolution=0. 0회 chain 8개 (fix-incident/explore-idea/polish-ui/worker-incident-triage/closed-loop-design/dimension-cycle/expand-scope/design-system). SE trigger-5 평가: 명단 SE#36 동일 + SE 점유율 40% ≥ 40% → 마커 SKIP (자기조정)
- TODOS.md `[P0] R6 대기` BRANCHED 갱신 — local 64→65개 ahead, origin 6개 ahead (cycle 259-265 감지, origin 누락 1건 추가: moneyball cycle 258 retro auto-ingest)

### Added
- Daily Ingest 20260508-0606 (#357) — 4 신규 entry: user-behavior-prediction-ai-model-integration / claude-code-harness-skillset-reinforcement-agent-playbook / on-device-llm-inference-efficiency-patterns / llm-call-orchestration-reliability-enhancement

## [0.5.13] — 2026-05-08

### Changed
- wiki lint CLEAN (cycle 263 curate) — 123 entries, orphan/stale/isolated/JIT-unused 0건, pattern 'drift' 이미 승격됨
- TODOS.md `[P0] R6 대기` BRANCHED 갱신 — local 58→61개 ahead, origin 3→5개 ahead (cycle 259-263 감지, origin 2개 신규: moneyball cycle 256-257 retro auto-ingest)
- N=50 batch (213-262) 완료 / N=30 batch (263-292) 시작 — zero-touch 262+ cycle 검증
- memory rot 수정 — project_develop_cycle_skill_family (cycle 258→262, SE #34→SE #36), MEMORY.md index 2줄 갱신

## [0.5.12] — 2026-05-08

### Changed
- dashboard `closed-loop-health` cycle 250 → 258 갱신 — window 239-258 chain 분포: skill-evolution=8 / curate=7 / review-code=4 / unknown=1. dispatch 누적: lesson=6 / meta-pattern=18 / chain-evolution=0. 0회 chain 8개 (fix-incident/explore-idea/polish-ui/worker-incident-triage/closed-loop-design/dimension-cycle/expand-scope/design-system). SE trigger-5 평가: 명단 SE#34 동일 + SE 점유율 40% ≥ 40% → 마커 SKIP (자기조정)
- wiki lint CLEAN (cycle 259 curate) — 123 entries, orphan/stale/isolated/JIT-unused 0건, scan-promotions 승격 대상 없음
- TODOS.md `[P0] R6 대기` BRANCHED 재발 (cycle 259 감지, local 56개 ahead, origin 3개 ahead — cycle 257 해소 이후 재발산)

## [0.5.11] — 2026-05-08

### Fixed
- BRANCHED N=22 해소 — cycle 257 세션 시작 시 origin/main diverged 감지 → `git merge origin/main` 수행 (INDEX.md 충돌 1건 수동 해소, commit `65fbd78`+`e49237d`). local 53개 ahead, origin 0개 ahead 정렬 완료

### Changed
- embeddings.json 갱신 — origin/main 머지로 유입된 46개 신규 content 파일 인덱싱. 825 chunks (123 entries + 13 solutions + 1 retro, 384d vector, 7835 KB)
- INDEX.md 엔트리 수 123개 (origin 122개 + local 1개 신규 merge 결과)
- TODOS.md `[P0] R6 대기 BRANCHED N=22` → DONE 처리

## [0.5.10] — 2026-05-08

### Fixed
- cycle 253 review-code — dead code 정리: scripts/lib/graph-signals.mjs / src/components/learning-heatmap.tsx / mermaid-diagram.tsx / projects-page-client.tsx / projects-tabs.tsx 삭제 (5파일, 모두 0 import 고아). flexsearch / shiki 미사용 deps 제거 (2종). health TC/LINT/TEST CLEAN (commit `1eeb2c9`)

### Changed
- knip.json 신규 추가 — 125개 false positive 제거, 정확한 dead code 감지 활성화. dead code issues 34 → 22 (health 8.4/10)
- `develop-cycle-hub` SKILL.md SE #31 박제 (cycle 251, window 231-250) + SE #32 박제 (cycle 252, window 232-251) — 명단 7개 동일 (fix-incident/polish-ui/worker-incident-triage/closed-loop-design/dimension-cycle/expand-scope/design-system), SE 점유율 35% < 40% → 마커 설정 후 retro 재평가 skip (자기조정). N=12 batch (251-262) 진행 중
- wiki lint CLEAN (cycle 254 curate) — 119 entries, orphan/stale/isolated/JIT-unused 0건, pattern candidate 'drift' 이미 승격
- dashboard `closed-loop-health` cycle 250 → 254 갱신
- TODOS.md `[P0] R6 대기` BRANCHED N=21 (local 46개 ahead, origin 4개 ahead — cycles 222-253)

## [0.5.9] — 2026-05-08

### Changed
- dashboard `closed-loop-health` cycle 246 → 250 갱신 — skill-evolution=8/curate=6/review-code=4/explore-idea=1/unknown=1 (window 230-249). SE #29 마커 설정 (35% < 40%) → SE #30 skip (window 재평가 40% ≥ 40% 자기조정). wiki 119 entries CLEAN
- wiki lint CLEAN 확인 (cycle 250 curate) — 119 entries, orphan/stale/isolated 0건, scan-promotions 승격 대상 없음
- memory 업데이트 — project_develop_cycle_skill_family (N=50 batch 후반, zero-touch 249+ 검증, SE #30 박제)
- TODOS.md `[P0] R6 대기` BRANCHED N=17 → N=18 (local 40개 ahead cycles 222-249)

### Fixed
- cycle 247 review-code — og/route category reports 누락 + font 404 guard + catGrid 5×2 레이아웃 + 주석 10 카테고리 정렬 fix (PR `aa639f9`)

## [0.5.8] — 2026-05-08

### Fixed
- dashboard `closed-loop-health` `reports` 카테고리 부제목 누락 (`CATEGORY_SUBS` 미등록 → 빈 칸) — `reports: "회고 / 리포트"` 추가 (cycle 245 fix)

### Changed
- dashboard `closed-loop-health` cycle 244 → 246 갱신 — skill-evolution=8/curate=7/review-code=4/explore-idea=1 (window 227-246). Trigger-5 SE #28 skip 지속 (명단 동일 4회 연속 + SE 점유율 40% ≥ 40%). wiki 119 entries CLEAN
- wiki lint CLEAN 확인 (cycle 246 curate) — 119 entries, 중복 의심 2쌍 의미 분리 확인 (llm-fine-tuning × 2, frontend-ai personalized/powered × 2)
- memory 업데이트 — project_bidirectional_compound_growth_goal (zero-touch 245+ 검증) + project_develop_cycle_skill_family (cycle 246 진행 중, SE #28 박제)

## [0.5.7] — 2026-05-08

### Changed
- dashboard `closed-loop-health` cycle 241 → 244 갱신 — skill-evolution=9/curate=7/review-code=3/explore-idea=1 (window 225-244). Trigger-5 SE #28 skip 룰 지속 적용 (명단 동일 3회 연속 + SE 점유율 45%). wiki 119 entries CLEAN (orphan/stale/isolated 0건)
- wiki lint CLEAN 확인 (cycle 244 curate) — 119 entries, pattern candidate 0건 신규, scan-promotions 승격 대상 없음

## [0.5.6] — 2026-05-08

### Changed
- `develop-cycle-hub` SKILL.md 스물여덟 번째 발화 (N=28) 박제 — cycle 241 Trigger-5 (직전 20 cycle 221-240, 0회 chain 7개: fix-incident/polish-ui/worker-incident-triage/closed-loop-design/dimension-cycle/expand-scope/design-system). **신규 룰 첫 적용**: 명단 SE #27 동일 (2회 연속) + SE 점유율 55% ≥ 40% → 마커 skip (무한 SE 루프 자가 차단 메커니즘 추가). 다음 마커 재개 = 명단 변화 감지 시. zero-touch 63+→241+ cycle 검증
- `develop-cycle-hub` SKILL.md 스물일곱 번째 발화 (N=27) 박제 — cycle 240 Trigger-5 (직전 20 cycle 220-239, 0회 chain 7개 → worker-incident-triage 재진입). 명단 변화 6→7개 (cycle 219 window 대비). zero-touch 63+→240+ cycle 검증
- dashboard `closed-loop-health` cycle 238 → 241 갱신 — skill-evolution=12/curate=5/review-code=2/explore-idea=1 (window 222-241), trigger-5 SE #28 skip 룰 반영

## [0.5.5] — 2026-05-08

### Added
- `content/harness-engineering/zero-touch-develop-cycle-session-management.mdx` 신규 entry (cycle 237 explore-idea) — zero-touch 자동 fire 세션 관리 패턴: watch.sh + launchd + tmux claude-hub 구조, FIRE_PENDING 해소 프로토콜, session 수명 관리

### Changed
- `develop-cycle-hub` SKILL.md 스물여섯 번째 발화 (N=26) 박제 — cycle 238 Trigger-5 (직전 20 cycle 217-236, 0회 chain 6개: fix-incident/polish-ui/closed-loop-design/dimension-cycle/expand-scope/design-system). explore-idea 명단 탈퇴 (cycle 237 activation, 28 사이클 만의 발화). zero-touch 63+→238+ cycle 검증
- `review-code` cycle 236 — health 10.0/10 CLEAN 4회 연속 (cycles 233~236)
- dashboard `closed-loop-health` cycle 234 → 238 갱신 — retro-only 0%, skill-evolution=11/curate=5/explore-idea=1/review-code=1 분포, 0회 chain 6개

## [0.5.4] — 2026-05-08

### Changed
- `develop-cycle-hub` SKILL.md 스물다섯 번째 발화 (N=25) 박제 — cycle 234 Trigger-5 (직전 20 cycle 214-233, 0회 chain 7개 명단 3회 연속 동일: fix-incident/explore-idea/polish-ui/closed-loop-design/dimension-cycle/expand-scope/design-system). 항구화 완전 확정. zero-touch 63+→234+ cycle 검증
- `review-code` cycle 233 — `isRoadmapLink()` 헬퍼 추출 (knowledge-graph.tsx 7줄 중복 제거) + STATUS/BADGE/FILL/SOURCE_CLASS 모듈 레벨 호이스트 (dashboard/page.tsx per-render 생성 제거)
- dashboard `closed-loop-health` cycle 231 → 234 갱신 — retro-only 0%, skill-evolution=11/curate=5/review-code=2 분포, 0회 chain 7개, meta-pattern 18건

## [0.5.3] — 2026-05-07

### Changed
- `develop-cycle-hub` SKILL.md 스물세·스물네 번째 발화 (N=23/24) 박제 — cycles 230/231 연속 Trigger-5 (직전 20 cycle 210-229/211-230, 0회 chain 7개 명단 — explore-idea 신규 진입 (N=23) 후 2회 연속 동일 안정 확인). zero-touch 63+→231+ cycle 검증
- dashboard `closed-loop-health` cycle 228 → 231 갱신 — retro-only 0%, skill-evolution=11/curate=6 분포, 0회 chain 7개

## [0.5.2] — 2026-05-07

### Changed
- `develop-cycle-hub` SKILL.md 스물 번째·스물한·스물두 번째 발화 (N=20/21/22) 박제 — cycles 226/227/228 연속 Trigger-5 (직전 20 cycle 206-225/207-226/208-227, 0회 chain 6개 명단 7회 연속 동일: fix-incident/polish-ui/closed-loop-design/dimension-cycle/expand-scope/design-system). zero-touch 63+→228+ cycle 검증
- dashboard `closed-loop-health` cycle 224 → 228 갱신 — retro-only 0%, curate=7/skill-evolution=9 분포 (cycle 229)

## [0.5.1] — 2026-05-07

### Added
- `silver-autopilot` 워커 신규 등록 + Cloudflare cron 연동 (UTC 16:00 = KST 01:00)

### Changed
- `develop-cycle-hub` SKILL.md 열일곱·열여덟·열아홉 번째 발화 (N=17/18/19) 박제 — cycles 222/223/224 연속 Trigger-5 (직전 20 cycle 202-221/203-222/204-223, 0회 chain 6개 명단 4회 연속 동일: fix-incident/polish-ui/closed-loop-design/dimension-cycle/expand-scope/design-system). dormancy 완전 안정. zero-touch 63+→224+ cycle 검증
- `generate-lesson.mjs` 641→619줄 스테일 주석 정리 (cycle 221 review-code)
- dashboard `closed-loop-health` cycle 219 → 224 갱신 — retro-only 0%, curate=7/skill-evolution=6 분포 (cycle 225)

## [0.5.0] — 2026-05-07

### Changed
- `develop-cycle-hub` SKILL.md 열여섯 번째 발화 (N=16) 박제 — Trigger-5 (직전 20 cycle 199-218, 0회 chain 6개: fix-incident/polish-ui/closed-loop-design/dimension-cycle/expand-scope/design-system). dimension-cycle 명단 재진입 관측 (cycle 196-198 window 탈퇴 해소). zero-touch 63+→218+ cycle 검증 (cycle 219)
- TODOS BRANCHED N≥6 정책 박제 — origin/local 재발산 N≥6 연속 감지, [P0] 항목 업데이트 자동화 정착 (cycle 219)
- dashboard `closed-loop-health` cycle 217 → 219 갱신 — retro-only 5%, 0회 chain 6개 유지 (cycle 220)

## [0.4.9] — 2026-05-07

### Added
- `docs/solutions/react/` 카테고리 신규 — NavLinks useEffect 내 setState 직접 호출 ESLint 재발 패턴 (cycle 217, moneyball cycle 227-229 2회 연발)

### Changed
- dashboard `closed-loop-health` cycle 213 → 217 갱신 — worker-incident-triage 2회 발화로 0회 chain 명단 탈퇴, retro-only 10%→5%

## [0.4.8] — 2026-05-07

### Changed
- `develop-cycle-hub` SKILL.md 열다섯 번째 발화 (N=15) 박제 — Trigger-5 (명단 4회 연속 동일 201→212→213→215), cycle 216 retro 재평가: 명단 6→5 축소 (worker-incident-triage cycle 215 자연 발화 탈퇴). zero-touch 63+→215+ cycle 검증.

## [0.4.7] — 2026-05-07

### Changed
- dashboard `closed-loop-health` cycle 211 → 213 갱신 (N=50 batch 213-262 진입 반영)
- lint clean 118 entries

## [0.4.6] — 2026-05-07

### Changed
- `develop-cycle-hub` SKILL.md 열네 번째 발화 (N=14) 박제 — Trigger-5 (0회 chain 6개 명단 3회 연속 동일, dormancy 항구화), N=50 batch (213-262) 개시. zero-touch 63+→212+ cycle 검증.

## [0.4.5] — 2026-05-07

### Added
- **Wiki entries 3건 신규** (116~118번째):
  - `recurring-file-bug-accumulator-pattern` — 같은 파일 같은 버그 3회+ = 구조 부채 신호 (daily.ts)
  - `fail-loud-partial-adoption-escape-hatch-trap` — assertSelectOk 도입 후 try/catch 미제거 함정
  - `stale-temporal-comment-cleanup-policy` — cycle/phase 참조 주석 제거 vs WHY 주석 보존 정책

### Changed
- `robots.ts` BASE_URL 불일치 수정 (5파일 일관성)
- scripts stale 주석 제거 (raw-archive.mjs, dashboard-update.mjs) — 0.4.4 entry dogfood
- dashboard cycle 211 갱신 / N=12 batch (201→212) 완주

## [0.4.4] — 2026-05-07

### Added
- **Wiki entries 2건 신규** (118·119번째 예정):
  - `stale-temporal-comment-cleanup-policy` — LLM 코드의 cycle/phase/spec 참조 주석 제거 vs WHY 주석 보존 정책 (moneyball cycles 220/224)

### Changed
- `robots.ts` BASE_URL fallback 불일치 수정 (playbook-hub → playbook-virid-xi, 5파일 통일)
- raw-sources cycles 222-224 archive 정리
- dashboard cycle 209 갱신

## [0.4.3] — 2026-05-07

### Added
- **Wiki entries 2건 신규** (116·117번째):
  - `recurring-file-bug-accumulator-pattern` — 같은 파일에 같은 버그 유형이 3회+ 반복 = 구조 부채 신호. wrapper/guard 부재가 root cause (moneyball daily.ts .error 3rd instance)
  - `fail-loud-partial-adoption-escape-hatch-trap` — fail-loud 패턴(assertSelectOk) 도입 후 기존 try/catch 미제거 → 보호막 부분 적용 함정 (moneyball cycle 211 4 사이클 방치)

### Changed
- raw-sources 43건 → `_archive/` 이동 (cycles 152-221 처리 완료분)

## [0.4.2] — 2026-05-07

### Changed
- **Cycle 201 skill-evolution** — Trigger-3 N=13 dogfood (cycle 200 milestone). SKILL.md stage 3 evidence 13회 박제, zero-touch 63+→200+ 갱신. 마커 삭제.
- **Memory rot 2건 수정**: `project_develop_cycle_skill_family` cycle 191→201 갱신 / `project_bidirectional_compound_growth_goal` zero-touch 200+ 로그 추가
- **Cycle 202 curate** — lint clean (0 issues), memory rot 수정 완료

## [0.4.1] — 2026-05-07

### Changed
- **Cycle 200 milestone** (200 % 50 == 0) — Trigger-3 skill-evolution-pending 마커 박제. 다음 사이클 skill-evolution 강제 발화.
- `closed-loop-health` 대시보드 cycle 199→200 갱신

## [0.4.0] — 2026-05-07

### Added
- **Wiki entries 2건 신규** (114·115번째):
  - `debug-page-silent-drift-trap` — 인시던트 조사 시 debug 페이지 자체 silent query 실패로 오진 발생 패턴 (moneyball cycle 212 기반, 진단 도구 신뢰성 메타 원칙)
  - `ml-pipeline-normalization-range-assumption` — 피처 확장 시 정규화 함수 입력 범위 가정 위반 (moneyball SFR cycle 208 normalize 음수 버그 일반화)

### Changed
- `silent-drift-family-pattern` connections 8 fork 진화 (debug-page backlink)
- `prediction-model-calibration-inversion-detection` connections 갱신 (normalization backlink)
- cycle_state JSON 버그 2건 수정 (186/187 literal newline), dashboard cycle 192 갱신
- memory rot 2건 갱신 (skill-family cycle 174→191 / bidirectional-growth 로그 갱신)
- SKILL.md Trigger-5 N=12 dogfood (cycle 191, zero-touch 63+→190+ 갱신)

## [0.3.9] — 2026-05-07

### Added
- **Wiki entry 1건 신규** (114번째): `debug-page-silent-drift-trap` — 인시던트 조사 시 debug 페이지 자체 silent query 실패로 오진 발생 패턴 (moneyball cycle 212 기반, 진단 도구 신뢰성 메타 원칙)

### Changed
- `silent-drift-family-pattern` connections 갱신 (debug-page-silent-drift-trap backlink — 8 fork 진화)
- `llm-agent-artifact-first-diagnosis` connections 갱신 (debug-page-silent-drift-trap backlink)
- `closed-loop-health` 대시보드 cycle 185→192 갱신 (curate=9/explore=4/dim=3/review=2)
- memory rot 2건 갱신 (develop-cycle-skill-family cycle 174→191 / bidirectional-growth 진행 로그 cycle 191)

### Fixed
- cycle_state JSON 2건 (186, 187): `chain_selected` literal newline → JSON.parse 실패 수정

## [0.3.8] — 2026-05-07

### Changed
- `closed-loop-health` 대시보드 cycle 185→192 갱신 (curate=9/explore=4/dim=3/review=2 chain 분포, retro-only 10%)
- memory rot 2건 갱신 (develop-cycle-skill-family cycle 174→191 / bidirectional-growth 진행 로그 cycle 191 추가)
- SKILL.md Trigger-5 N=12 dogfood 박제 (cycle 191: 직전 20 cycle 171-190, 0회 chain 7개, zero-touch 63+→190+ 갱신)

### Fixed
- cycle_state JSON 2건 (186, 187): `chain_selected` 필드에 literal newline 삽입 → JSON.parse 오류. heredoc 이스케이프 실패 원인. 유효한 JSON 으로 수정 (curate 대체)

## [0.3.7] — 2026-05-07

### Added
- **Wiki entry 1건 신규** (113번째): `llm-prompt-validator-symmetry-drift` — LLM 구조화 출력 prompt/validator 대칭성 드리프트 (false positive/negative 갭, moneyball cycle 179 validator.ts/team-agent.ts 3건)

### Changed
- `db-query-type-safety-assert-select-ok-pattern` 보강: `.error` 미체크 섹션 추가 (moneyball cycle 216 daily.ts 사례)
- `silent-drift-family-pattern` connections 갱신 (llm-prompt-validator backlink)
- `closed-loop-health` 대시보드 cycle 174→185 갱신 (curate=10/explore=4/review=3/dim=3, retro-only 5%)

### Fixed
- search index (embed-content): 746 chunks — 113 entries 포함 (cycle 185)

## [0.3.6] — 2026-05-07

### Added
- **Wiki entries 2건 신규** (111·112번째):
  - `agentic-chain-saturation-detection` — chain pool 포화 감지: consecutive streak vs distributed dominance 구분 (moneyball cycle 210 skill-evolution 패턴 추출)
  - `agentic-loop-analytical-chain-lite-mode` — 코드 변경 없는 측정 전용 chain: execution chain / analytical chain 구분 (moneyball operational-analysis 패턴 일반화)

### Changed
- `develop-cycle-positive-streak-recognition` connections 갱신 (saturation-detection backlink)
- `agentic-chain-saturation-detection` connections 갱신 (analytical-chain backlink)
- `closed-loop-health` 대시보드 cycle 161→174 갱신 (curate=11/dim=4/review=3/explore=2 chain 분포)
- memory rot 2건 갱신 (project_develop_cycle_skill_family cycle 151→174 / bidirectional_growth 150+→174+)

### Fixed
- search index (embed-content): 740 chunks — 112 entries 포함 (cycle 178)

## [0.3.5] — 2026-05-07

### Added
- **Wiki entry 1건 신규** (110번째): `feature-flag-dead-code-cleanup-timing` — Feature flag 수명 주기: 비활성 플래그 dead code 111 cycle 지연 사례 + 확증 체크리스트 (moneyball cycle 206 기반)
- SKILL.md Trigger-3 milestone 갱신 (cycle 150): N=11, zero-touch 150+

### Changed
- `silent-drift-family-pattern` connections 갱신 (feature-flag-dead-code-cleanup-timing backlink)
- `question-own-defaults` connections 갱신 (feature-flag-dead-code-cleanup-timing backlink)
- `assertSelectOk` entry 보강: try/catch bypass 패턴 + daily.ts cycle 211 사례 추가
- `agentic-cycle-state-json-carry-over-design` evidence 63+→150+ 갱신
- `closed-loop-health` 대시보드 cycle 133→161 gap 해소 (N=28)
- memory rot 2건 갱신 (project_develop_cycle_skill_family cycle 138→151 / bidirectional_growth 112+→151+)

### Fixed
- search index (embed-content): 728 chunks — 110 entries 포함 (cycle 172, feature-flag-dead-code-cleanup-timing 반영)

## [0.3.4] — 2026-05-07

### Added
- **Wiki entries 2건 신규** (108·109번째):
  - `prediction-model-calibration-inversion-detection` — confidence bucket vs 실제 적중률 역전 감지 패턴 (moneyball cycle 207 기반)
  - `db-query-type-safety-assert-select-ok-pattern` — Server Component DB select silent drift 방지 (moneyball cycle 155 기반)
- **`/ci-github-actions-guard` slash command 승격** (cycle 141): ci-github-actions 3건 임계 충족, 3대 패턴 가드 (heredoc/guard-cascade/billing-block)
- **`_compiled-truth.md` 코드 게이트 승격 완료** (ci-github-actions 카테고리)

### Changed
- `silent-drift-family-pattern` connections 갱신 (calibration-inversion + assertSelectOk backlink)
- `nextjs-instrumentation-location` connections 갱신 (assertSelectOk backlink)
- `llm-response-quality-automated-evaluation-metrics-design-str` connections 갱신
- SKILL.md Trigger-5 N=10 dogfood (cycles 122-141, 0회 chain 4개 = 명단 축소) + zero-touch 141+ 갱신

### Fixed
- search index (embed-content): 720 chunks — 109 entries 포함 (cycle 150, assertSelectOk 반영)

## [0.3.3] — 2026-05-07

### Added
- **Wiki entry 1건 신규** (107→108 예정): `github-actions-billing-block-diagnosis-recovery` — GH Actions billing block 진단·복구·재발 방지 패턴 (2026-05-07 실 사례: 3 레포 41분 복구)
- **ci-github-actions `_compiled-truth.md` 신규** (cycle 138): solution 3건 임계 충족 → 메타 패턴 3개 압축 (yaml+bash 이중환경 / guard cascade / LLM 자동화 인프라 한도). 승격 후보 탐지

### Changed
- `drift-detection-methodology` + `vercel-ignore-command-preview-skip` connections 갱신 (billing-block backlink — cycle 137)
- MEMORY.md rot 2건 갱신: develop-cycle-family cycle 112→138 / bidirectional-growth zero-touch 63+→133+ (cycle 139)
- `project_develop_cycle_skill_family.md` 운영 상태 갱신: cycle 112→138, skill-evolution 9회 박제

### Fixed
- ci-github-actions solution #3 추가 → scan-promotions 임계 충족 자동 탐지 (billing-block → yaml+bash+guard cascade 메타 패턴 완성)

## [0.3.2] — 2026-05-07

### Added
- **Wiki entries 4건 신규** (104→106→108 예정):
  - `develop-cycle-positive-streak-recognition` — 성공 streak vs stuck streak 구분 패턴
  - `agentic-cycle-state-json-carry-over-design` — 멀티세션 연속성 cycle_state JSON 설계
  - CHANGELOG 0.3.1 (cycle 122), 0.3.2 (cycle 135)
- **develop-cycle-hub SKILL.md Trigger-5 N=7 dogfood** (cycle 133): 0회 chain 7→5 축소 (explore-idea/fix-incident batch session 발화). zero-touch 63+→133+ 갱신
- **Closed-Loop Health Dashboard 갱신** (cycle 134): cycle 42→133 (91 cycle gap 해소)

### Changed
- `hub-worker-compounding-pattern` connections 갱신 (positive-streak + agentic-cycle-state backlink)
- `question-own-defaults` connections 갱신 (positive-streak backlink)
- `ambient-knowledge-injection` connections 갱신 (agentic-cycle-state backlink)
- MEMORY.md: cycle 128→133, pivot T8 billing 해소 상태 갱신

### Fixed
- search index (embed-content): 690 chunks — 신규 2 entries 포함 (cycle 131)
- INDEX.md + data/search-hits.json 2회 갱신 (cycles 123, 131)

## [0.3.1] — 2026-05-07

### Added
- **Wiki entries 2건 신규**: `llm-agent-artifact-first-diagnosis` (표면 로그 vs artifact 실파일 진단 패턴) + `vercel-ignore-command-preview-skip` (100회/일 배포 한도 보호)
- **Wiki entries 총 104건** (102→104)
- **GH Actions billing 완전 해소** (2026-05-07): playbook/moneyball/blog-autopilot 퍼블릭 전환 + 초과분 결제. run #25471190398 success 확인

### Changed
- `hub-worker-compounding-pattern` confidence 3→4: zero-touch 63+ cycle 자율 회전 + 3 fork 운영 + worker-lesson 자동 ingest 운영 증거 추가
- develop-cycle-hub SKILL.md: Trigger-5 N=6 dogfood 박제 (동일 0회 chain 명단 4회 연속 = dormancy 완전 항구화). zero-touch 59+→63+ 갱신
- TODOS.md: `[P0] GitHub Actions billing 차단` → `[DONE]` 해소 처리

### Fixed
- SKILL.md 0-byte 복원: 직전 세션 sed 오동작으로 비워진 파일을 JSONL 트랜스크립트에서 복원

## [0.3.0] — 2026-05-06

### Added
- **Phase 4+5 closed-loop (양방향 복리성장 비전 완전 검증)**: D4 dual SessionStart hook (워커 auto-sync) + D5 incident-followup pressure + Phase 5 워커 self-develop (Cloudflare + claude-code-action OAuth). 비전 1+2+3 모두 smoke 검증 완료 (2026-04-29/30)
- **Cloudflare Workers scheduler** (T9): GH Actions cron 8개 → Cloudflare `playbook-cron` worker 이관. silent drop 근본 원인 해소. 분 정밀도 손실만 (무관)
- **develop-cycle-hub zero-touch infrastructure** (cycle 48): `watch.sh` + `launchd com.kkyu.dch-watch` + `plist` + `install.sh` ship. 1 세션 = 1 사이클 자동 회전 활성
- **blog-autopilot 3rd fork** (develop-cycle-blog skill, PR #66 머지 5-4): develop-cycle 3 fork 운영 체제 확립 (머니볼 + 허브 + blog-autopilot)
- `curate-routine.yml` + Cloudflare UTC 00:00 매핑: daily raw-sources auto-archive (KST 09:00). 자가 organism 휴면 → 활성
- `notify-workers.yml` (PR #88): 허브 content 머지 → 영향 워커 레포 hub-update Issue 자동 생성 (push channel GA)
- `incident-followup.yml` (Phase 4 D5): Vercel/CI incident 3+ 일 미해결 자동 follow-up pressure
- `silent-skip-tracker.yml`: CI cron silent skip 자동 감지 + visibility
- Fine-grained PAT (T5, PR #44~48): Classic → Fine-grained PAT 전환. 만료 2027-04-27. `pat-expiry-check.yml` 신규
- `docs/solutions/` 7건 축적: llm-generation 4건 (`_compiled-truth.md` 코드 게이트 승격), ci-github-actions 2건, mdx 1건
- Wiki entries: `silent-drift-family-pattern` 9→13 fork 진화 (review-code chain dominance dogfood). Journal 026편까지 append
- `category-rebalance.yml` + `scripts/category-rebalance.mjs`: monthly self-gating 클러스터링 (N_total < 30 시 silent-skip)
- `src/config/projects.ts` PROJECTS: 워커 UI 대시보드 표시 (PR #43 gap 보강)

### Changed
- GH Actions cron `on.schedule` 8개 제거, `workflow_dispatch:` 만 유지 (T9)
- develop-cycle-hub SKILL.md: zero-touch 룰 강화 (1 세션 1 사이클), chain pool 고도화
- `auto-ingest.yml` push fail hardening: self-policy/incident/lesson 3분기 explicit exit + lesson branch retry
- `embed-on-push.yml`: 워커 inbound content 포함 임베딩 자동 갱신

### Fixed
- Mermaid AUTO-FIX #2b: subgraph invalid-id + bracket-label normalize (PR #39, 6회 재발 패치)
- `notify-workers.yml` HEREDOC EOF gap (ci-github-actions solution #1)
- `notify-workers.yml` guard-skip cascade gap (ci-github-actions solution #2)
- blog-autopilot Pull 축 e2e 검증: lesson commit → 허브 auto-ingest PR 자동 생성 완전 동작
- PLAYBOOK_PAT `GH_PAT || GITHUB_TOKEN` fallback: cross-repo dispatch silent fail 방어

## [0.2.0] — 2026-04-19

### Added
- Wiki entries 9개 (drift-detection-methodology, hub-worker-compounding-pattern, ambient-knowledge-injection, harness 시리즈 등)
- 허브-워커 복리 엔진 Phase 1: auto-ingest 하이브리드 + repository_dispatch + cross-update
- Reviews 게이트 5종 (codex / cso / health / design / devex) 운영 모드
- DX Quick Wins: `.env.example`, README Quickstart 95줄, `ARCHITECTURE.md` (mermaid 6종)
- `workers.config.json` — 레포 진실 소스, 머신 무관
- GitHub Actions cron 3종: auto-ingest, weekly-triage, daily-lesson
- Self-check 퀴즈 + Knowledge graph 시각화 + Cmd+K 검색
- `/ingest`, `/lint`, `/handoff` 슬래시 커맨드
- 드리프트 감지 프로토콜 박제 (CLAUDE.md Level 0~3)

### Changed
- `rate-limit`: in-memory → Upstash Redis (Vercel Marketplace) + fallback
- `lint-content.mjs`: 결정론 검사 ↔ 의미 판단 분리, workers.config 기반 noise 제외
- 워커 태그 `[moneyballscore]` → `[moneyball]` 정규화

### Fixed
- `js-yaml` 누락 직접 의존성 — daily-lesson cron 작동 드리프트
- `.gitignore` `.env` 가족 누락 (cso HIGH)
- `pnpm/action-setup` SHA 미고정 (cso HIGH supply-chain)
- `weekly-triage` raw_id false-negative
- `magnetic-mode.tsx` dead code + TDZ bug 동시 제거
- React 19 `set-state-in-effect` 6건 — case-by-case justify

## [0.1.0] — 2026-04-15

### Added
- Initial bootstrap
- Core infrastructure: Next.js 16, MDX, Tailwind CSS 4
- HMAC cookie authentication
- Content pipeline scripts
- GitHub Actions workflows (Gemini pipelines)
- Hub-worker slash commands (`.claude/commands/`)
- Sample journal entry (playbook-journal-000-bootstrap)
