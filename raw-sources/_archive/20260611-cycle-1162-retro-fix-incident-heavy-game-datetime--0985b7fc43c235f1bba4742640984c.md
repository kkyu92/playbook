---
date: "2026-06-11"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0985b7fc43c235f1bba4742640984cb37270d07b"
---


## 사이클 요약

**chain**: fix-incident (heavy)
**결과**: SUCCESS

## 진단

- `migration 034` (games.game_datetime_utc TIMESTAMPTZ NOT NULL) 추가 후
  gamesPayload + prefetchSchedule payload 미포함
- KST 15-17시 이후 KBO API 가 새 external_game_id 반환 시 INSERT 경로 → constraint 위반
- games upsert 실패 → early return → 예측 0건 → 텔레그램 summary/results 미전송
- 2026-06-10, 06-11 pipeline_runs 에 동일 에러 박제 확인

## 수정

`packages/kbo-data/src/pipeline/daily.ts`:
- gamesPayload + prefetchSchedule payload 양쪽에 game_datetime_utc 추가
- `new Date(\`\${date}T\${gameTime}:00+09:00\`).toISOString()` — KST → UTC 변환

## 검증

- TypeScript noEmit PASS
- CI PASS
- Vercel 배포 → predict_final (KST 22:17) 실주행으로 최종 확인

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
