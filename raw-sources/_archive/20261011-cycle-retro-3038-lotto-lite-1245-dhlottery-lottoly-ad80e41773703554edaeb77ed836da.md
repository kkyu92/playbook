---
date: "2026-10-11"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "ad80e41773703554edaeb77ed836da9d3b5d5c1a"
---


subtype: cycle-retro
cycle_n: 3038
chain_selected: lotto (lite)
outcome: success

2-chain lock(review-code(heavy)+info-architecture-review, 직전8 distinct=2) 로 두 chain 제외 → explore-idea 4-source negative(반복 패턴) → lotto 결과파일 staleness(1245회 미반영, cycle 3028 recheck 권고 그대로) 선택. dhlottery+lottolyzer 양쪽 TCP ECONNREFUSED 3중 독립 검증(샌드박스/WebFetch/production cron log) 확정 — 기존 "dhlottery만 GH Actions IP 차단" 패턴보다 악화된 전면 불능. 6개 언론사 교차검증 후 lotto-data.json 수동 append(cycle 1414 선례) + result-md 생성 + count_smoke 재확인(valid_delta=0). 부가로 result-md manual-override 경로의 "자동 fetch" 거짓 라벨링 silent-drift 발견·수정(sourceLabel 분기). 테스트 587/4628 green, 2 commit push clean.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
