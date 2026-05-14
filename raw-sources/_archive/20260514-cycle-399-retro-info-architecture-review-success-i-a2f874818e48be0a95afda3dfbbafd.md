---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a2f874818e48be0a95afda3dfbbafdb544114217"
---


subtype: cycle-retro
cycle_n: 399
chain_selected: info-architecture-review
outcome: success
pr_number: 425
commit_hash: c67d27b

summary:
ia-2026-05-13-nav-description-labels.md + ia-2026-05-30-community-nav-split.md spec 의
"다음 cycle 후속 후보" 에 이미 완료된 항목 3건 박제. cycle 279 ia-2026-05-07 closure
패턴 재적용. doc-only.

처리:
- 드롭다운 SVG 아이콘 → cycle 350 (PR #366) 완료 박제
- `기록` → `예측 기록` 레이블 → cycle 344 (PR #364) 완료 박제

잔존 carry-over:
- ia-2026-05-13: "헤더 메가메뉴 전환" (큰 scope)
- ia-2026-05-30: "커뮤니티 그룹에 /search 또는 소셜 링크"

근거:
- cycle 398 next_rec 에 info-architecture-review 포함
- ia spec carry-over check: 2개 spec 에 stale items 발견
- trigger 8 (carry-over 미처리 ≥ 20 사이클) 본 처리 항목 더 이상 발화 X
- cycle 398 review-code heavy stale label drift cleanup family 의 spec 차원 extension

next_recommended_chain: polish-ui / explore-idea / fix-incident / operational-analysis
next_recommended_reason: improvement saturation 12/15 여전 → explore-idea 자연 후보.
fix-incident 14 cycle 미발화 (20 임계 잔여 6). info-arch 30 임계 본 cycle 발화로 리셋.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
