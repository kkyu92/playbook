---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "37d07eeea06c7ab5f8a8a6e0bf4988dd22ec0b49"
---


subtype: cycle-retro
cycle_n: 2129
chain_selected: fix-incident (heavy)
outcome: success

deploy-cloudflare-worker.yml 이 CLOUDFLARE_API_TOKEN secret 미설정 시 job 자체를
success 로 끝내던 구조 버그 발견+수정 (exit 1 추가). 부수로 죽어있던
notify-on-failure 알림 경로도 함께 복구. 사례 25 (2개월 미배포) 가 알림 없이
조용했던 root cause 규명. 사용자 secret 등록은 여전히 대기 — 이제 미등록 상태면
CI 가 정확히 빨간불로 알릴 것. next_recommended: explore-idea 또는 review-code.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
