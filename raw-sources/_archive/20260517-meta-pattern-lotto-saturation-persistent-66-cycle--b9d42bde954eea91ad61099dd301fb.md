---
date: "2026-05-17"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b9d42bde954eea91ad61099dd301fbd1c86982db"
---


subtype: meta-pattern
cycle_n: 510
pattern: lotto rule saturation persistent (cycle 444 이후 66 cycle 신규 rule 0건)
evidence:
  - cycle 444: 256 rules 도달 (saturation 첫 박제)
  - cycle 445~509: 65 cycle 동안 lotto-dimension chain 신규 rule 추가 0건 (cycle 509 = update + picks 만)
  - cycle 510: countValid 7,700,649 / 5.46% removed (cycle 444 시점과 동일 — drift X)
  - cycle 509 count_smoke 측정 부재 + cycle 510 valid_delta=0 → cooldown trigger 충족 (직전 2 lotto cycle 모두 무효 조건)

cooldown_action:
  - cycle 511~515 (N=5) lotto chain 회피
  - lotto batch slot → moneyball redirect
  - cooldown 만료 후 (cycle 516+) 자동 재진단

사용자 결정 요청 (carry-over 채널):
  1. rule pool 확장 — 후보: frequency 분포 룰 (bottom-10 max / top-10 min) / OOS 누적 매칭 패턴 / 회차 간격 룰 (지난 N회 미등장 번호 수). 신규 카테고리 추가 시 256 → 260+ 가능성. 코드 추가 작업 필요
  2. OOS validation 누적 N≥10회 후 룰셋 일반화 재평가 — 현재 N=1 (1224회 평균 0.84 vs 베이스라인 0.8 noise 안). N=10 도달 시점 = 2026-07 말 (주 1회 추첨)
  3. lotto-dimension archive — dual-cycle policy 폐기, moneyball single-cycle 전환. lotto picks 는 매주 자동 generate 만 (rule freeze 256개)

recommendation: 옵션 2 (OOS 누적) — 현재 룰셋 일반화 진단 evidence 누적 우선. 코드 작업 (옵션 1) 은 N≥10 OOS 결과 보고 결정. lotto-dimension archive (옵션 3) 은 rule 추가 시도 + OOS 정직한 결과 모두 본 후

stop_condition: 사용자 결정 명시 (옵션 1/2/3 택) 또는 cycle 516+ 자연 재진단 시 본 pattern body carry-over
