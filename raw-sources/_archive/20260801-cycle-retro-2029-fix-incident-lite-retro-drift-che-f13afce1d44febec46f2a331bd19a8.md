---
date: "2026-08-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f13afce1d44febec46f2a331bd19a8adce7e5fb0"
---


subtype: cycle-retro
cycle_n: 2029
chain_selected: fix-incident (lite)
outcome: success

20-cycle 주기 보정 trigger(fix-incident 마지막 발화 2009→2029) 진단 중 gh actions
스케줄 워크플로는 전부 정상(daily-pipeline 4/28 마지막 run은 2026-04-29 Cloudflare
Workers Cron 이관에 따른 의도적 비활성화, false alarm 아님). 지시대로 안전장치
스크립트(scripts/retro-drift-check.sh, 사례 15 대응용)까지 실측 실행 → 최근 50
cycle 전부 false positive 검출. 원인 = commit 컨벤션이 "policy: cycle N retro"에서
"policy: cycle-retro N"으로 바뀐 뒤 grep 패턴 미갱신 + JSON_ONLY/COMMIT_ONLY 배열
할당 로직 뒤바뀜. commit 7c363fe2 로 수정, 신/구 컨벤션 구간 양쪽 재검증(50/50,
11/11 OK).

메타: 안전장치 스스로가 감시 대상인 컨벤션 변경에 취약했던 사례 — 향후 커밋
컨벤션 변경 시 grep/문자열 매칭 기반 스크립트 전수 점검 필요성 시사.
