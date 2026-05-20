---
date: "2026-05-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "297c1c805caf9f4f40e6fbff991401c724be0bbc"
---


subtype: lesson

cycle 669 fix-incident lite (gap=21 trigger 7 ≥20 충족).

## 관찰
lesson-pending label open issue 86건 누적 (#842~#927). spot check:
- ci-develop-cycle-skill-evoluti → PR #807/#933/#483 MERGED
- ci-develop-cycle-retro-301-c0a → PR #291 MERGED
- ci-develop-cycle-pick-vs-ai-29 → #740 CLOSED + #927 OPEN (재발 evidence)

86건 모두 워커 PR 머지 + CI green 자연 회복 완료 = stale.

## 원인
cycle 434 (2026-05-15) 동일 패턴 첫 박제 + 15건 batch close 후 4일 만 86건 누적.
hub incident-followup.yml D5 cron 이 동일 fingerprint 의 closed worker issue 재발 차단 X.
주간 단위 reminder 재생성 추정.

## 결론
batch close + hub workflow 개선 carry-over.

상세 lesson: docs/lessons/2026-05-19-lesson-pending-86-batch-recurring-hub-d5-limit.md

Co-authored-by: Claude Opus 4.7 <noreply@anthropic.com>
