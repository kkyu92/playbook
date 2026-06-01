---
date: "2026-06-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8d7116d4493bbac4657d4ed17c4816194114f4d7"
---


subtype: cycle-retro
cycle_n: 1114
chain_selected: expand-scope (lite, spec only)
outcome: success
pr: 1512
issue_fixes: 1370
spec_path: docs/superpowers/specs/2026-06-01-feature-flag-system-spec.md

## 진단
- 2-CHAIN LOCK 탐지: 직전 8 사이클 review-code×7 + explore-idea×1 distinct=2
- 잠긴 chain (review-code + explore-idea) 제외 후 trigger 평가
- expand-scope 가 가장 강한 trigger 2개 충족:
  (1) 직전 4 small fix only (1110~1113 review-code lite)
  (2) hub-dispatch issue #1370 architecture/scope 키워드

## 실행
- spec write 직접 (auto-fire env /office-hours + /plan-ceo-review skip)
- 기존 인프라 갭 분석: CURRENT_SCORING_RULE cohort split (코드 변경 + 재배포) +
  isBigMatchEnabled (단일 boolean)
- Tier 1 (본 spec scope, ≤200 LOC): FLAG_REGISTRY + evalFlag + sha1 sticky bucket +
  killSwitchKey 패턴 + 신규 flag 3종 (V2_PREVIEW_COHORT rollout / V2_KILL_SWITCH
  boolean / METHODOLOGY_V2 boolean)
- Tier 2 (별도 cycle): flag_evaluations 텔레메트리 + /debug/feature-flags dashboard
- Tier 3 (사용자 영역): 외부 SaaS — 자체 구현 충분 시 회피
- self_verification 5축 rubric 적용 (가치/시간/risk/자율/의존성)

## ship
- branch: develop-cycle/expand-scope-feature-flag-system-1114
- PR #1512 + R7 자동 머지 활성 (--squash --auto --delete-branch)
- Fixes #1370

## 다음 cycle 권장
- review-code (lite) family 18 wave 9 또는 신규 silent drift family scan
- review-code lock 1 cycle redirect 후 자연 해제
- Tier 1 ship 은 별도 cycle (explore-idea heavy, lock 완전 해제 후)

## meta
- 2-chain lock 탐지 룰 (cycle 225 박제) 작동 evidence — review-code 7연속 dominance
  차단 후 expand-scope 자연 redirect
- expand-scope 자연 fire = 2-chain lock 룰의 명시적 redirect path (polish-ui
  fallback 회피)
- silent drift family 18 sweep 8 wave 후 wave 9 carry-over 또는 신규 family
  진단 source 남아있을 가능성

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
