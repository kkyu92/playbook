---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f903925e85e3aac37aebe84cfc444563b6c9f278"
---


subtype: cycle-retro
cycle_n: 143
chain_selected: review-code (heavy)
outcome: success
commit_hash: ab89e22
pr_number: 134

retro_summary:
cycle 143 = review-code (heavy) on daily.ts 잔존 .error 미체크 3개 영역 SUCCESS
— assertSelectOk helper 추출 + 4개 호출 site 통일 (line 335 existingSet /
670 totalToday gap / 768 todayTotal summary + cycle 142 buildDailySummary
inline) silent drift family detection 단일 채널화.

cycle 142 next_recommended (line 335 / 670 / 768 / 1022) 잔존 3개 영역
sweep. 1022 cycle 140 처리 → 잔존 = 335 / 670 / 768 모두 같은 패밀리
(.error 미체크) + 같은 영역 (daily.ts predictions.select) → 단일 helper
추출 자연. cycle 142 inline `.error` destructure 도 helper 로 통일 →
silent drift family detection 단일 채널.

silent drift 영역별:
- line 335: DB 오류 시 existingSet 빈 → 모든 경기 '예측 없음' 판정 → 중복
  insert 큐 진입 (UNIQUE 23505 catch 잡지만 root cause SELECT 실패 무가시)
- line 670: DB 오류 시 count=null → gap=expected → false positive GAP 알림
- line 768: DB 오류 시 count=null → 'summary skip' 위장 → root cause 무가시

fix:
- packages/kbo-data/src/pipeline/db-error.ts 신규 — assertSelectOk helper
  (error 시 명시적 throw + context 박제 + data/count nullable 정상화)
- daily.ts 3개 영역 + cycle 142 buildDailySummary helper 통일
- line 335 / 768 throw → outer catch errors[] push 자동
- line 670 try/catch 인라인 + errors[] push (predict_final finish() 보장)
- 8 unit tests 회귀 가드

next_recommended_chain: 다양성 redirect 후보 1개 (op-analysis lite — `/weekly-review`
skill 발화 + 적중률 metric/Brier/pattern 박제. cycle 86 발화 후 57 cycle
stale). 또는 review-code (heavy) 잔존 daily.ts .error 영역 (LOW 우선순위
— line 67/75/85/89/222/224/469/645 catch 측 fail-loud OK 영역) 또는
다른 monolith (fancy-stats.ts 406 / buildMatchupProfile 370). 0회 chain
5개 (polish-ui / op-analysis / dim-cycle / expand-scope / design-system)
의도된 결과 인정 항구화 박제 (cycle 135 skill-evolution 9).

cycle 49 룰 누적: PASS_eval 81 / PASS_ship 20 (cycle 125~143 silent drift
family 17 cycle SUCCESS streak 자연 연장 — review-code (heavy) dominance-positive
12 SUCCESS streak 안정).

skill-evolution trigger 평가: trigger 1 (chain-evolution 누적 0) / 2 (5회
연속 fail X) / 3 (143%50=43) / 5 (0회 chain 5개 충족 BUT cycle 135 박제
8 cycle 전 cooldown N=10 미만 → 의도된 결과 재확인) → 마커 박제 X 정상
진행.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
