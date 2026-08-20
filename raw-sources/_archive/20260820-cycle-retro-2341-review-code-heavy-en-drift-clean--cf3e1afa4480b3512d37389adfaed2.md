---
date: "2026-08-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "cf3e1afa4480b3512d37389adfaed230c361c3b8"
---


subtype: cycle-retro
cycle_n: 2341
chain_selected: review-code (heavy)
outcome: retro-only

wave-659 (en/mlb/reviews 미러) 신규 코드 전면 감사 — reviews-data.ts 공유 재사용,
en/ko page.tsx 1:1 대조, FACTOR_LABELS/FACTOR_LABELS_EN 10키 매칭, WEEKDAY_LABELS_EN
혼용 없음, 5개 배지 컴포넌트 locale prop 기본값 하위호환 모두 확인. tsc clean +
wave-658/659 guard test 16/16 green. drift 0건, 코드 변경 없음.
