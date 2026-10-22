---
date: "2026-10-22"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "1a72d44ff885754f74a15574c895badedb4c117d"
---


subtype: lesson
cycle_n: 3541

사례: cycle 3533-3540(직전8) distinct=2(review-code+polish-ui) → 2-chain lock 발동. SKILL.md 룰(단계 2) 은 "잠긴 chain 2개 제외 → 남은 pool trigger 평가 → 어떤 chain 도 trigger 없으면 polish-ui 강제 발화" 라 명시. 그러나 이번 케이스는 잠긴 2개 chain 중 하나가 이미 polish-ui — literal 하게 따르면 방금 제외한 chain 을 즉시 재발화시켜 lock 의도(다양성 확보)와 정면 모순.

원인: step3 fallback 작성 당시(cycle 225) 가정한 시나리오는 "review-code+explore-idea" 류 locked pair — polish-ui 가 locked pair 에 포함되는 조합은 미고려.

대응(본 cycle): literal fallback 무시, 남은 pool 중 feasible+실제 due 한 chain(operational-analysis, gap9/25) 을 판단으로 선택. 코드/SKILL.md 즉시 수정은 보류(단발성 조합, 재발 빈도 불명) — 재발 시 skill-evolution 룰 보강(예: "fallback chain 이 잠긴 chain 과 겹치면 dimension-cycle 또는 gap-ratio 최상위 chain 으로 대체") 후보로 기록.

다음 재발 시 누적 evidence → chain-evolution 또는 skill-evolution trigger4(meta-pattern "SKILL 갱신 필요") 검토.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
