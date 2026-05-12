---
date: "2026-05-12"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "4bdb086a38452ccdf7b0cddd6437710f6c5066e1"
---


subtype: lesson
cycle_n: 333
chain: operational-analysis lite

W21 (5/4~5/10): 15/27 = 55.6% (W19 36% 저점 이후 회복)
누적 n=89: 49.4%, Brier 0.2501

주요 발견:
- head_to_head 홈 우세 신호 시 37.5% (n=16) = 랜덤 이하, 5%→3% 하향 n=150 도달 시 1순위
- 일요일 14.3% (2/14) — Sunday cap 0.55 배포 직전 데이터, 5/17 첫 실측 가능
- lineup_woba 58.1% (n=43) = 팩터 중 최고 신뢰도
- sfr 홈 우세 시 37.9% (n=29) — 극단값 편향 지속

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
