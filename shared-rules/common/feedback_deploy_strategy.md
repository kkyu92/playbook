---
name: deploy-batching
description: Vercel 일 100회 배포 제한 — 커밋은 자유롭게, push/배포는 의미 있는 묶음으로 모아서
type: feedback
originSessionId: 1dece797-627e-46d6-8d78-3ea9d3c75294
---
커밋은 마음껏 해도 되지만 push + 배포는 묶어서 해야 한다.
**Why:** Vercel 일 100회 배포 제한. push마다 자동 배포 트리거되므로 낭비 방지.
**How to apply:** 기능 여러 개를 로컬 커밋으로 쌓고, 사용자가 "배포해" 또는 "푸시해"라고 할 때만 push. 배포 확인 요청 없이 git push 금지.
