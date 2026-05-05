---
date: "2026-05-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "c0d44d3d4e5759a22665f797e9a7d108fcdbb040"
---


본 fire 결과 (한 세션 N=3, 첫 Tier 2 도전):

## Cycle 결과
- Cycle 1 acquisition: PR #36 (sitemap /players/[id] 추가, +20-2, 1fea1ce)
- Cycle 2 model: PR #37 (calibration sparse-history regression, +52, 0ebc215)
- Cycle 3 site: PR #38 (PlaceholderCard 메시지+a11y, +76-7, 97688b4)

## 차원 분배 (5/1 + 본 fire 누적)
site 1 / model 2 / acquisition 1 — round-robin 균형.

## 박제 신규 2건 (Tier 2 통과 기준 0~2건 충족)

1. **메인 task 명세 라우팅 갭** (Cycle 1)
   - dispatch 시 `/players/[name]` (실제 `[id]`), `/reviews/[date]` (존재 X, weekly/monthly 만) 부정확
   - 워커 자율 정정 통과. SKILL.md Step 4-2 dispatch payload 작성 시 "라우팅 구조 사전 확인" 권장

2. **워커 자율 머지 dispatch payload consistency 갭** (Cycle 2)
   - Cycle 1 spawn prompt "워커는 PR 생성까지만" 명시 / Cycle 2 누락 → 워커가 R7 정신 따라 자체 머지
   - 사고 X. SKILL.md Step 4-2 표준 template 통일 후보. Cycle 3 명시화로 해결

## design Candidate 5 (review trigger 박제) 1차 검증

3/3 워커 모두 자율 판단 정확:
- acquisition: sitemap 메타만 → 모든 review skip 정상
- model: test 추가만 → eng-review skip 정상
- site: 단일 컴포넌트 a11y → design-review skip 판단 정상

## 5/1 박제 5건 차단 검증

- iTerm2 시각화 X: 변동 없음 (tmux 백엔드만)
- label 부착: 3/3 ✓
- shutdown race: acquisition 1건 재발 (18초 차 idle_notification) — 메커니즘 한계, graceful 영향 X
- main checkout: 3/3 ✓
- scope-prefix matcher: 3건 모두 head_commit 4 prefix 외 → 정상 skip
- 영역 분리 위반: 0/3 ✓

## Tier 2 통과 — 다음 단계 후보

- Tier 3 (N=5): carry-over 1회 매끄러움 검증 트리거. 한 세션 부담 ↑
- 자연 트리거: model N=50 표본 도달 (5/3~5/5 예상)

## design Candidate 1~5 미적용 상태에서 N=3 통과

허브측 SKILL.md 갱신 시 Candidate 1~4 (진단 슬림화/Tier/dispatch payload/회고 dump) + Candidate 5 (review trigger) 본 fire 결과 자연 자료.
