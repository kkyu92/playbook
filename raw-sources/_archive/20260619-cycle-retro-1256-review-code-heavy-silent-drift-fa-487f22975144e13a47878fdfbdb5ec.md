---
date: "2026-06-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "487f22975144e13a47878fdfbdb5ec297f270bcb"
---


subtype: cycle-retro
cycle: 1256
chain_selected: review-code (heavy)
outcome: success
pr: #2041 ff77337

silent drift family wave 60 SUCCESS — `apps/moneyball/src/app/mlb/factors/page.tsx` KBO_10_FACTORS 10 entry 의 label + shortLabel 을 MetricRegistry.ko_name 동적 lookup 으로 전환. 4 silent drift 직접 fix (recent_form "최근폼"→"최근 폼" / war "WAR"→"팀 WAR" / head_to_head "상대전적"→"상대 전적" / park_factor "구장보정"→"구장 보정") + 6 future-drift guard.

wave 52~60 streak 9 wave 누적 (cycle 1244 wave 52 / 1249 wave 55 / 1250 wave 56 / 1253 wave 57 / 1254 wave 58 / 1255 wave 59 / 1256 wave 60). dominance-positive streak (cycle 135 룰) 자연 진행 — review-code (heavy) silent drift family detection channel.

본 wave 특이점:
- MLB MLB_BASE_WEIGHTS.defense_sfr key ↔ MetricRegistry sfr slug 매핑 = cross-domain key 매핑 first 사례 (KBO 와 MLB 가 다른 key 사용)
- 4 silent drift typo 가 MetricRegistry "상대 전적" / "최근 폼" / "구장 보정" / "팀 WAR" 와 mismatch — 사용자 cross-page (factor display vs reference doc) 일관성 균열 박제

진단/실행/회고 단계 13분 안 완료 (08:20-08:33 KST). watch.sh hang kill 0건. PR #2041 R7 자동 머지 정상.

next_n=1 (사용자 N=2 잔여 1).

Co-authored-by: Claude Opus 4.7 <noreply@anthropic.com>
