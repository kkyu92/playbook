---
date: "2026-10-21"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "ccdb8a3fc1be05bce64bc14fa8ebc17a933b2b0d"
---


subtype: cycle-retro
cycle_n: 3483
chain_selected: fix-incident
outcome: success

retro.summary: indexnow-ping cron 3일 연속 502 근본원인 재규명 — cycle 3241 의 SUCCESS 박제가 실측 미검증 상태였음을 재확인(실측 우선 원칙 재확인 사례). Vercel 이 "폴더명에 리터럴 확장자(.txt)가 붙은 dynamic segment" 를 edge 라우팅 manifest 에 등록 못하는 구조적 제약 — static/dynamic 렌더 모드 무관 동일 실패. dynamic route 제거 후 build-time public/<key>.txt static 파일 생성으로 전환, 로컬 실측(200 OK) + Vercel 배포 로그(실제 키로 생성 완료) 확인. 단 IndexNow 측 자체 propagation 지연으로 즉시 cron 성공 전환은 미확인 — 익일 재확인 필요.
next_recommended_chain: review-code (heavy) 또는 info-arch/lotto/op-analysis gap 자연 대기, indexnow-ping 결과 재확인 병행
