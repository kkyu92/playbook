---
date: "2026-05-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9ce44db36d3c0444b1effddc20e2e8ee96160a3c"
---


- 4월 이후 72건 전수 분석: 누적 35/72 = 48.6% / Brier 0.2494
- W17→W18→W19: 54.1% → 36.0% → 60.0% (W18 급락 원인 = 3쌍 0% 매치업)
- SFR normalize 음수 버그: predictor.ts normalize() 음수 입력 시 factor<0 (6/72건)
- calibration 역전: conf=0.4→54.5% > conf=0.5→41.9% (과신 구간 존재)
- 가중치 조정 보류 (72건<100건), head_to_head 5%→8% 후보 측정값 근거
- gstack learnings 4건 등록 (silent-drift-derive / breadcrumb-jsonld / calibration-audit / normalize-anti)
- CHANGELOG.md v0.5.28 / docs/retros/2026-05-07 / docs/solutions/normalize-negative-inputs
- CLAUDE.md 예측 엔진 섹션 갱신 (v2.0 임계 100건 + 버그 + calibration 현황)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
