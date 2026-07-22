---
date: "2026-07-22"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9eb6620a056bf1cac105d1e65184869eb0f5ae0b"
---


subtype: cycle-retro
cycle_n: 1991
chain_selected: info-architecture-review
outcome: success
pr: #2853

2-chain alternation lock (직전 8 cycle explore-idea/review-code 만 distinct=2)
발동으로 두 chain 제외 후 info-architecture-review 30-cycle gap trigger
(마지막 발화 cycle 1959) 채택. breadcrumb/sitemap 후보 신호 대부분 검증 후
false positive로 판명 (redirect stub, 내부 debug 페이지, 기추적 placeholder).
실제 발견 = Header MegaMenu "예측·기록" 그룹에 /calendar 누락 (Footer/sitemap
엔 priority 0.8 daily로 존재) — fix + calendar NavIcon 추가. PR #2853 squash 머지.

next_recommended_chain: review-code 또는 explore-idea (lock 1-cycle cooldown 해제 예상)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
