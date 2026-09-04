---
date: "2026-09-04"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "fcc7b6a98d1e4c401e70d510ba0780539d6c989b"
---


subtype: cycle-retro
cycle_n: 2887
chain_selected: review-code(heavy)
outcome: success
retro:
  summary: >
    2차 방어선(cycle 2886 retro commit c4401d7d) OK. 직전8(2879-2886) distinct=3
    (review-code(heavy)6+polish-ui1+fix-incident1) — 2-chain lock 미발동.
    fix-incident gap 6/20, op-analysis gap 18/25, info-arch gap 27/30, lotto
    gap 15/30 — 전부 미근접. agents/ 핵심 파일 소진 확정 후 cycle 2886 추천대로
    apps/moneyball/src/app/ methodology 페이지(사용자 가시)로 스코프 확장,
    code-reviewer subagent 위임 재감사. methodology/page.tsx(KBO) 3건 발견:
    정규화 범위 서술 오류(-1~+1 → 실제 0~1), 에이전트 구성 서술 오류(Haiku×2+Sonnet×1
    → 실제 debate.ts 4-agent Haiku×3+Sonnet×1, 보정 에이전트 미언급), ±5% 보정
    귀속 오류(심판 아닌 calibration-agent 소유, judge 는 제안만 수신) + WINNER_PROB_CLAMP
    퍼센트 표시 누락 버그. en/mlb/methodology/page.tsx 는 KO 버전에 있는 placeholder
    팩터 공시 문단이 import 자체 없이 구조적으로 누락된 번역 불일치 발견 — 신규 추가.
    type-check/lint clean(kbo-data 코드 변경 없어 test 영향 없음). R4 직push
    (commit a8855ef8, docs commit d2769c5e).
  next_recommended_chain: review-code(heavy) 계속 또는 fix-incident/op-analysis/info-arch/lotto gap 대기
  next_recommended_reason: >
    accuracy/page.tsx(1236줄) + lotto/methodology/page.tsx(533줄) +
    accuracy/shadow/page.tsx(313줄) 등 대형 사용자 가시 페이지 미감사 잔존 —
    동일 silent-drift-family 방법론 계속 유효.
