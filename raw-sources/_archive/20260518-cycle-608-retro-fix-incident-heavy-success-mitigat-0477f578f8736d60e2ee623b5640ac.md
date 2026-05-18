---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0477f578f8736d60e2ee623b5640ac82d53fbc4f"
---


subtype: cycle-retro
cycle_n: 608
chain_selected: fix-incident (heavy)
outcome: success
commit_hash: 41c766e
pr_number: 812

## 진단

- cycle 607 next_rec='fix-incident (heavy)' carry-over evidence 명확
- cycle 605 spec Step C Option A 미적용 — team-agent BASE_PROMPT 정성 표현 대안 부재
- cycle 607 lesson: validator hallucinated_number:hard 7건 family (5/16~5/17 v1.8 silent fallback path)
- 환각 수치 분포 = ERA/FIP/wRC+ 정형 범위 안 (Haiku 근거 2~3개 만족 위해 자연 생성)
- 기존 BASE_PROMPT '수치 발명 금지' 강조 있으나 대안 path (정성 표현) 명시 X

## chain 선택 reason

cycle 607 next_rec 직접 후속. low risk (단일 line 추가) + 검증 path 명확 (5/19+ validator hallucinated_number:hard 빈도 측정). 2-chain lock distinct=5 미발동. lite cap 미충족.

## 실행

- packages/kbo-data/src/agents/personas.ts BASE_PROMPT 끝 단일 line 추가 (정성 표현 대안 명시 + 정형 범위 안 자연 수치 발명도 환각 분류)
- type-check 무에러 / vitest 619 tests PASS (49 files)
- PR #812 squash --auto --delete-branch 머지 (41c766e)
- main rebase + push (cycle 607 retro 2 commits 정리)

## 검증 path

5/19+ predictions where `reasoning->>'debate'->>'agentError' LIKE '%hallucinated_number%'` 빈도 측정 — cycle 612+ operational-analysis 후속 후보. 성공 기준 = 7건/2일 → 0~2건/주 감소.

## carry-over

- cycle 612+ operational-analysis lite — mitigation A 검증 (5/19+ 일주일 데이터)
- cycle 605 spec Step C Option D (강등 라벨 sub-version 세분화) — v2.0 전진 prerequisite 후보 — n=150 임계 도달 시 진행
- next_recommended_chain = review-code (heavy) — silent drift family streak 121 cycle 도달 가능성, agents/ layer saturate 후 lib/ 또는 components/ layer 재진입 후보

## meta

- review-code dominance (직전 20: 12/20 = 60%) — cycle 600 milestone 후 자연 감소 추세
- chain 다양성 회복 (cycle 600-608: 5 distinct chain in 8 cycle — review-code/skill-evolution/fix-incident/explore-idea/operational-analysis)
- v2.0 전진 = n=119 → n=150 임계 31건 부족 (5/19+ predictions 자연 누적)

## 관련

- spec: docs/superpowers/specs/2026-05-18-cycle-605-v2-transition-roadmap.md (Step C Option A)
- lesson: docs/lessons/2026-05-18-cycle-607-h5-falsification-validator-hallucination-family.md
- cycle 502 lesson + cycle 458 PR #372 (별도 credit family)
