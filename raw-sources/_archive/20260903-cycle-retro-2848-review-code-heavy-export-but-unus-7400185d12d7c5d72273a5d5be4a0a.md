---
date: "2026-09-03"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7400185d12d7c5d72273a5d5be4a0ae3945c5cdb"
---


subtype: cycle-retro
cycle_n: 2848
chain_selected: review-code(heavy)
outcome: success
pr: 3076
merge_commit: ebcd7354

review-code(heavy) export-but-unused heuristic 을 function/const(cycle 2847) 에서 type/interface 로 확장, packages/kbo-data/src/agents/ 스코프(validator.ts 등 CLAUDE.md 드리프트 사례 이력 파일 포함) 19개 후보 전수 감사. general-purpose subagent 가 정의파일 내부 사용 + 연관 함수 실제 wiring(postview/judge-agent/calibration-agent/debate/team-agent/mlb-retro) 추적까지 완료해 SUSPICIOUS_GAP/TRULY_DEAD/FALSE_POSITIVE 0건 확인 후 export 키워드만 제거. 전체 monorepo type-check+test green (kbo-data 1220/1220, moneyball 4528/4528). PR #3076 R7 머지 실측 확인(state=MERGED, ebcd7354).

skill-evolution trigger1 재검증: naive body-grep "subtype: chain-evolution" 9건은 squash 병합 부수 텍스트 오검출 — 실제 subject-line "^memory: chain-evolution" 커밋 2건뿐. 향후 trigger1 평가 시 subject-line 기준 사용 권장.

next_recommended_chain: review-code(heavy) (동일 heuristic scrapers/ 또는 backtest/ 디렉토리로 계속 축소 적용)
