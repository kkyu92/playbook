---
date: "2026-05-08"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "94c21bb6501ece6cb0035affb71ce6e47c57b3d2"
---


subtype: cycle-retro
cycle_n: 281
chain_selected: operational-analysis (lite)
outcome: success

retro.summary:
  cycle 256 측정 후 4건 추가 (n=72→76, 정체 페이스). 일요일 1/9 = 11.1% 약점 지속. SFR
  극단값 18건 누적 (|sfr|>0.7) → 정답 1건 (5.5%) — 일요일 약점과 동일 수준. confidence
  bucket 단조 증가 회복 (0.5→47.7% < 0.6→51.6%, cycle 207 역전 해소). v2.0 확정 임계 150까지
  74건 남음 (~cycle 295 도달 예상). lite 진단 baseline 박제, 신규 코드 변경 0.

next_recommended_chain: review-code(heavy) 또는 explore-idea
next_recommended_reason: op-analysis lite SUCCESS 직후. 다음 cycle = lite rotation 회피
  (review-code dominance / op-analysis 25 cycle 임계까지 6 cycle 남음). carry-over 4 cycle
  연속 op-analysis 회피 (n=150 임계 도달 후 heavy 발화 권장).

evidence:
  - n_verified=76 / n_recent_14d=52 / overall=37/76=48.7% / brier=0.2503
  - dow.sun=1/9=11.1% (cycle 256 1/8=12.5%와 거의 일치 — 약점 지속)
  - sfr_extreme=18건 / 정답 1건 (5.5%) — cycle 256 W19 SSG/NC 후속 강한 evidence
  - conf_bucket 0.4=0/1 / 0.5=47.7%(n=44) / 0.6=51.6%(n=31) — 단조 증가 회복

PASS_ship: 147 (review-code/info-arch heavy SUCCESS 전 cycle 280 까지 누적, 본 cycle = lite 신규 코드 X)
