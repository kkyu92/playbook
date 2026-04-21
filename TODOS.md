# TODOS

## [P3] embed-on-push incremental embedding

**What**: 변경된 entry 만 embed, 기존 embeddings.json 재사용
**Why**: 현재 매 push 마다 전체 재생성. 연 1440 entry 도달 시 ~15분 빌드 예상. GitHub Actions 타임아웃 리스크.
**Trigger**: 6개월 경과 또는 entry 500개 초과 시 전환
**Effort**: M (CC ~30분) — embed-content.mjs 를 sha hash 기반 cache 로 변경
**Depends on**: 본 pivot 1단계 배포 후 월간 entry 증가 관찰 (월 120 예상)
**Context**: 2026-04-21 eng review 에서 Section 4.2 에 flagged. 현재는 문제 없음 (연 9MB 증가율).

