---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "2b968f8746f66b0613aa82804a11b98ab4b5dd88"
---


subtype: cycle-retro
cycle_n: 385
chain_selected: review-code heavy
outcome: success
pr_number: 414
commit_hash: 854e58c

retro.summary: cycle 384 ship 의 postview fallback 분류 (v1.8-postview)
가 buildFallbackStats 단위 테스트엔 있는데 /accuracy 페이지 쿼리는
prediction_type='pre_game' 단독 필터 → production UI 에 postview fallback
미노출. cycle 124 silent drift family 패턴 — 함수 capability 완비 /
consumer 미연결. 1 file 3 hunks 8 insertions / 5 deletions 미니멀 fix.

retro.next_recommended_chain: operational-analysis lite
retro.next_recommended_reason: cycle 384 + 385 양쪽 가시화 fix 완료 →
실측 데이터 (W22 추세 + fallback 비율 + n=99 임계) 측정 가능.

meta: review-code heavy dominance-positive streak 6 연속 success
(cycle 368/371/374/375/379/385). silent drift family detection
channel 작동 검증. cycle 135 박제 룰 evidence 추가.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-authored-by: Claude Opus 4.7 <noreply@anthropic.com>
