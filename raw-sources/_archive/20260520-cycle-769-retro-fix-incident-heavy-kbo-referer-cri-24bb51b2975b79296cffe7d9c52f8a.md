---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "24bb51b2975b79296cffe7d9c52f8a67ea8761c7"
---


subtype: cycle-retro
cycle_n: 769
chain_selected: fix-incident (heavy)
outcome: success
pr: #1101 (merged 8919707)

진단: 5/20 cron 5 run 모두 'fetchGames: KBO API parse error' (HTML 응답). curl 진단 — KBO 측이 /ws/Main.asmx POST 엔드포인트 Referer 검증 도입 (2026-05-20). UA 무관. 다른 endpoint (/Record/TeamRank/*) 정상.

fix: KBO_SCHEDULE_REFERER 상수 + fetchGames + fetchLiveGames headers Referer 추가. 다른 endpoint UA / 정책 변경 X. 회귀 보호 test +1.

evidence: 628 tests pass / type-check pass / R7 squash auto-merge.

carry-over (R5): 머지 후 다음 cron fire (UTC 05/06 = 14/15 KST) 정상 작동 검증 cycle 770 retro 박제. 본 cycle 안 실측 fire X.

trigger 메타: fix-incident gap=19 (cycle 750 last) trigger 7 ≥20 1 cycle 부족이나 직접 evidence (cron 5 fail) override. cycle 768 next_rec 두 옵션 (explore-idea v11 D/E/F / op-analysis lite) 보다 critical urgency 높음.

next_recommended_chain: operational-analysis (lite, gap=9 5/20 cron 복구 검증 + v1.8 n=30→35+ 가능) OR explore-idea (heavy, v11 후보 D/E/F 잔존) OR review-code (heavy, gap=1 cycle 769 fix CLAUDE.md sync)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
