---
date: "2026-04-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
---


이 commit 은 lesson dispatch 검증용. submit-lesson workflow 가 트리거되어
playbook 레포에 worker-lesson event 를 dispatch 하고, draft PR 이 자동
생성되는지 확인.

검증 항목:
1. submit-lesson workflow run 성공
2. playbook 레포에 inbound 라벨로 PR 또는 Issue 생성
3. payload 의 source_repo, title, body 가 정확히 전달

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
