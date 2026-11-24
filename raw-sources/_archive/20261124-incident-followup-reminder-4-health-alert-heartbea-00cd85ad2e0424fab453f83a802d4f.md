---
date: "2026-11-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "00cd85ad2e0424fab453f83a802d4f424071b265"
---


subtype: lesson
cycle: 4230

허브 D5 reminder #3242~#3245 (hub incident playbook #5874 외, fingerprint: health-alert-failure / heartbeat-stale-failure / runtime-error-alert-failure / deploy-drift-alert-failure, 2026-11-19 생성, 3+일 체류) 조사.

- 실측: prod https://moneyballscore.vercel.app HTTP 402 (2026-11-24 curl 확인). 2026-10-26 ~13:00Z 부터 Vercel DEPLOYMENT_DISABLED 지속 (29일+).
- 4개 alert workflow 는 prod 헬스 프로브 실패의 증상. 코드 결함 아님.
- 자율 결제 금지(비용 가드) — 사용자 Vercel 결제/한도 조치 대기.
- 선례 636f1ac2 (cycle 3906, 동일 4 fingerprint) 와 동일 결론. reminder 는 cross-reference 후 close (reminder 본문 옵션 2).

교훈: 외부 장애가 길어지면 허브 D5 reminder 가 같은 fingerprint 로 반복 생성된다. 근본원인 lesson 이 이미 있어도 재발 시 신규 lesson 으로 fingerprint 매칭을 갱신해야 reminder 루프가 멈춘다.

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
