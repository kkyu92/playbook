---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "477a0ce9390927b7e14bd04d52f453205372771a"
---


subtype: cycle-retro
cycle_n: 145
chain_selected: review-code (heavy)
outcome: success
commit: 9c70d6f
pr: #135

retro.summary: cycle 145 = review-code (heavy) on fancy-stats.ts (429 줄 monolith) xfip fallback silent drift SUCCESS. parsePitchersFromHtml line 112 `xfipMap.get(key) ?? fip` silent 박제 → predictor weight (sp_fip 0.15 / sp_xfip 0.05) 가 사실상 sp_fip 0.20 silent 중복 + snapshot-pitchers source 라벨링 ('xfip !== fip' → 'fancy-stats' / else 'kbo-basic1') fallback row 'kbo-basic1' 오분류 silent. cycle 137 totalWar=0 / cycle 138 winPct=0.5 stub 가시화 family 패턴 동일 — console.warn 1회 (fallbackCount/totalPitchers/fallbackRatio/sampleKeys 3건) + 4 unit test 회귀 가드. cycle 144 v2.0-debate 47.8% baseline 미달 evidence 와 잠재 연관 (xFIP 분리 가중치 silent 합쳐져 모델 정보 가치 ↓ 가능성).

next_recommended_chain: review-code (heavy) on buildMatchupProfile.ts 370 줄 (cycle 144 retro next_rec 잔존 후보, 본 cycle fancy-stats 처리 후) 또는 review-code (heavy) on fancy-stats.ts 잔존 7건 (parseNum NaN / table 인덱스 hard-coded / 빈 결과 가드) silent drift family 자연 후속

next_recommended_reason: review-code (heavy) silent drift family dominance-positive streak 13 SUCCESS (cycle 131~145, fix family 12 + cycle 144 op-analysis 1). cycle 135 dominance-positive 인정 룰 적용. fancy-stats.ts 본격 monolith review 1차 완료 후 buildMatchupProfile / fancy-stats 잔존 영역 자연 후속. 다양성 redirect 후보는 trigger 부재 또는 사용자 결정 carry-over (자율 X) — cycle 135 0회 chain 항구화 박제

skill-evolution trigger: 모두 false (T1 chain-evolution 0건 / T2 5연속 fail X / T3 145%50≠0 / T4 SKILL 갱신 명시 X / T5 0회 chain 5개 — cycle 135 항구화 + cycle 68 cooldown N=10 정확 만료, 재진단 의도된 결과 = false positive 처리)
ship-0 emergency stop: 0건 (직전 10 cycle ALL success)
lite cap: 0건

cycle 49 룰 PASS_ship 21 (cycle 125~145 silent drift family 19 cycle SUCCESS streak)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
