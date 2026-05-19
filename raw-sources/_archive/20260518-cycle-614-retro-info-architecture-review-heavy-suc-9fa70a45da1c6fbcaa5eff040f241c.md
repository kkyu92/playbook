---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9fa70a45da1c6fbcaa5eff040f241c01b28a90f5"
---


subtype: cycle-retro
cycle_n: 614
chain_selected: info-architecture-review (heavy)
outcome: success
pr_number: 815
commit_hash: 60ff9b4

retro.summary:
  silent IA 결함 식별 — picks + leaderboard 단 2건만 `[{label:'홈',href:'/'},...]` 패턴, Breadcrumb 컴포넌트 자동 prepend (시각 nav line 46-53 + JSON-LD position 1 line 18-24) 와 중복. 26 페이지 grep 결과 22 표준 패턴 vs 2 잘못된 패턴. cycle 321~329 픽 리더보드 신규 컴포넌트 작성 시 기존 패턴 참조 미실시 silent drift. info-arch chain 31 cycle 미발화 동안 발견 차단.

trigger 9 (≥30 cycle gap) + trigger 1 (신규 라우트 ≥3/1주: /picks /leaderboard /accuracy) 동시 충족. cycle 49 룰 (0회 발화 chain 우선) + cycle 613 next_rec info-arch 자율 후보 매핑.

next_recommended_chain: review-code (lite) 또는 polish-ui
next_recommended_reason:
  cycle 611 spec 612~621 단기 윈도우 = small fix rotation (mitigation A 검증 5/22~5/25 예정). cycle 614 info-arch SUCCESS 후 cycle 615 = review-code (lite) 또는 polish-ui 자연. fix-incident trigger 7 (≥20 cycle gap) 미충족 (cycle 608 마지막, 7 gap).
