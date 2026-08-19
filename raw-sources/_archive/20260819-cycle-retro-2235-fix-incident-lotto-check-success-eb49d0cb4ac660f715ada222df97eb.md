---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "eb49d0cb4ac660f715ada222df97eb95c080a6fc"
---


subtype: cycle-retro
cycle_n: 2235
chain_selected: fix-incident
outcome: success
next_recommended_chain: review-code (heavy) or explore-idea (heavy)

deploy-drift-alert 스케줄 workflow 실패를 gap-timer trigger 없이 직접 확인(gh run
list) → production 10-commit stale + /lotto/check prerender crash 발견 → 근본원인
(loadAllWinners 잘못된 파일 참조, apps/moneyball/data/lotto-data.json 메타데이터
dict 를 winners 배열로 오인) 특정 → scripts/lotto-data.json 정정 → 로컬 재현/수정
확인 + 463 tests + type-check 통과 → 실 프로덕션 fire 검증(commit_sha 확인 +
/lotto/check 200) 까지 완주.

R5(체크포인트 실측 검증) + 사례 17(scheduled workflow 직접 확인 의무) 두 룰이
자연스럽게 함께 작동한 사이클.
