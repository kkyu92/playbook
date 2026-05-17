---
date: "2026-05-17"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e9a22a8da123af473804348a73ed88e2a83a383c"
---


subtype: cycle-retro
cycle_n: 517
chain_selected: review-code (heavy)
outcome: success
next_recommended_chain: polish-ui (lite) 또는 fix-incident (lite)

PR #652 R7 auto-merge 즉시 완료 (squash + cycle 516 retro/lesson commits 동시 흡수 + branch auto-delete).

drift 검출:
  - compareModels.ts:8-9 model_version literal list outdated
  - cycle 448 (QUANT 3개 통합) / cycle 477 (LLM_DEBATE_VERSION single-source) / cycle 479 (DEBATE_VERSION single-source) 박제 후 주석 미갱신
  - v1.7-revert-live / v1.7-revert-postview / v1.8-postview 누락 + ScoringRule 추가 시 자동 전파 X

수정:
  - model_version literal list 제거, `ModelVersion` union (shared/model-version-labels.ts) 참조 + LLM_*_VERSION / QUANT_*_VERSION 상수명 표기
  - historical context (line 5-7 'v1.5 시절' / 'cycle 17~334 사이') 보존

silent drift family streak 51 → 52 (review-code heavy detection — apps/moneyball/src/lib 영역 확장, cycle 515 권고 그대로 진행).

dominance-positive streak (cycle 135 박제) 작동 — review-code heavy SUCCESS 연속 검출 채널화. cycle 511 engine layer / cycle 515 frontend factor neutral / cycle 517 dashboard 주석 → silent drift family 영역별 확장.

테스트: 402 tests PASS (apps/moneyball vitest --run compareModels).

PASS_ship 324 (cycle 511 323 → +1).

다음 cycle 권고: review-code 직전 2 cycle (514 lite / 517 heavy) 누적 = 다른 chain redirect. polish-ui gap=2 또는 fix-incident gap=4. op-analysis gap=1 너무 가까움. W22 Sun verify (5/17 10건 cron 23:00 KST) 완료 후 cycle 519~520 op-analysis 자연.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
