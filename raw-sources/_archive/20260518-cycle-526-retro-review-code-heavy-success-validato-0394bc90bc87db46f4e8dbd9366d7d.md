---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0394bc90bc87db46f4e8dbd9366d7de0316677c5"
---


subtype: cycle-retro
cycle_n: 526
chain_selected: review-code (heavy)
outcome: success
pr_number: 744
commit_hash: d792c0c

summary:
review-code (heavy) — validator.ts checkInventedPlayerNames 의 두 pattern 간 asymmetric filtering 박제. highConfidencePattern (line 311) 이 COMMON_KOREAN_NOUNS + isKoreanAdjectivalSuffix filter 누락. subjectMarkerPattern (line 320) 만 filter 적용. PLAYER_CONTEXT_VERBS (v4-4 hotfix b20f701, 2026-04-15) 부터 verb + noun (타격/삼진/홈런/피칭/세이브) 혼재로 "공격적 타격" / "결정적 홈런" 형 adj+noun 패턴 false positive. 두 pattern filter 대칭 정렬로 root cause 제거. agent layer 6축 silent drift family streak 2nd fix (cycle 524 postview prompt 1st fix 후속). 616 tests green / regression 0.

next_recommended_chain:
polish-ui (lite) 또는 review-code (heavy)
- polish-ui 자연: cycle 523 amber 8건 carry-over + review-code 2 cycle 연속 누적 → alternation
- review-code heavy: validator.ts 잔여 / judge-agent.ts / calibration-agent.ts 후속
- fix-incident: cycle 513 마지막 fire 13 cycles 전 (20-cycle 주기 7 cycle 남음)
