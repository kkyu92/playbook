---
date: "2026-07-28"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8e5c0ac9872bf2d2476b9eec20dce599232a481f"
---


subtype: cycle-retro
cycle_n: 2011
chain_selected: review-code (heavy)
outcome: success

cycle 2010 carry-over(matchup 홈/어웨이 split)를 explore-idea로 착수했으나 실측 쿼리
(LG-HT 8건/SS-OB 8건/NC-WO 10건, 강수렴 필터+양쪽 min-picks 5 임계)로 구조적 거의 항상
null임을 확인 후 review-code(heavy)로 전환. computeWinRatePct dedup family(cycle 2006/
2008) sibling인 computeWinProbPct 미마이그레이션 인스턴스(MatchupRecentForm.formatWinRate)
발견/수정. PR #2878 squash-merged (ef4489f7), state=MERGED 실측 확인.

next_recommended_chain: explore-idea
next_recommended_reason: review-code 균형 후 복귀. matchup 표본 문제 없는 다른 확장 각도 검토.

Co-authored-by: Claude Sonnet 5 <noreply@anthropic.com>
