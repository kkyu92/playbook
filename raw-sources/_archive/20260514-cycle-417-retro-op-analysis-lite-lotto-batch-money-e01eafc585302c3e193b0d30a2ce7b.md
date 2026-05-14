---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e01eafc585302c3e193b0d30a2ce7be19dcafa2d"
---


subtype: cycle-retro
cycle_n: 417
chain_selected: operational-analysis (lite)
outcome: success

진단:
- 2-chain lock distinct=1 (직전 8 cycle all lotto) → chain pool redirect
- fix-incident 20-cycle 미발화 + op-analysis 63-cycle 미발화 trigger 동시
- TODOS v1.8 silent fallback 박제 + 사용자 직접 질문 (API 한도) 본 운영 root same

핵심 발견:
- predictions total=307, 검증=99 (cycle 387 시점과 동일)
- 5/14 5경기 final, 검증 0건 추가 → verify stuck 의심
- pipeline_runs 5/14: announce 1 + predict 12 + predict_final 1 + verify 0
- cloudflare worker cron schedule '17 0-14 * * *' = UTC 14 (KST 23:17) verify 발화 대기 (현재 KST 22:36, 41분 뒤)
- ROOT: stuck 아님, 자연 발화 대기
- predict 07:18 UTC 1회만 preds=5, 5건 모두 Debate agents API 400 fallback (ANTHROPIC credit 외부 영역)

사용자 질문 (한도 남았는데 한도 없다 표시):
- 본 운영 ANTHROPIC silent fallback 과 same root
- 후보: 5h rolling window cap / 모델별 quota 분리 (Opus vs Sonnet) / 캐시 vs 실측 차이
- v1.8 가중치 효과 측정 = credit 복구 시점까지 영구 불가

procedure lesson:
- 검증 stuck 보일 때 cron schedule 시각 확인이 silent fail 결론보다 우선
- pipeline_runs verify mode 0회 = silent fail 결론 X, schedule 발화 시각 (UTC 14 / KST 23:17) 확인 후 결론
- 사례 5 (KBO API 필드 silent fail) vs 본 case (정시 발화 대기) = root 진단 절차 분리

next_recommended_chain: fix-incident (lite) 또는 review-code (heavy)
- verify 발화 후 n=104 재확인
- ANTHROPIC API 400 detection layer 강화 (alarm 강도)
- postview path silent drift 잔여 점검

dual-cycle batch progress: 1/14 (lotto 15→ moneyball 첫 cycle)
