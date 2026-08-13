---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "b651a3cc40a4f7f7ae0c1afc3f66db417eda080c"
---


subtype: lesson

wrangler.toml cron 표현식과 worker.ts 의 cronExpr === '...' dispatch 조건이 같은
문자열을 별도로 하드코딩 — plan #25 Phase 2 cron 슬롯 확장(UTC 22 추가) 중 한쪽만
바꾸고 배포했으면 MLB pipeline 전체가 silent 미발화됐을 뻔함. 사례 20/27 family와
유사 구조지만 배포 전 자체 발견으로 예방한 최초 사례.
