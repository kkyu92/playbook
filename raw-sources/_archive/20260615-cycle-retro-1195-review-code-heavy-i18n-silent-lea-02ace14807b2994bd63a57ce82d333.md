---
date: "2026-06-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "02ace14807b2994bd63a57ce82d3331bb6c2f97b"
---


subtype: cycle-retro
cycle: 1195
chain_selected: review-code (heavy)
outcome: success
pr: 1983
merge_commit: 4f33632

i18n silent leak family wave 29 박제 — KBO 5 routes (predictions / reviews /
reviews/misses / reviews/monthly/[month] / reviews/weekly/[week]) JSON-LD
object 안 inLanguage 필드 자체 부재 silent drift 발견 + fix. lib/seo/json-ld.ts
helper default 는 "ko-KR" 박제 중이지만 본 5 routes raw JSON-LD inline 박제 —
helper 미경유 silent drift root cause.

wave 25 (KBO default 5 routes openGraph) → wave 26 (KBO /mlb dynamic) →
wave 27 (predictions/[date] single) → wave 28 (/en/mlb 7 routes) → wave 29
(KBO reviews family + predictions 5 routes) 패턴 자연 진행. KBO 메인 hub
routes 잔여 15+ (mlb/postseason / mlb/players / mlb/standings / mlb/factors /
mlb/team / players / standings / leaderboard / about / teams / glossary /
analysis/game/[id]) 다음 wave 30 후속.

silent drift family detection channel streak ~672 cycle (cycle 458 → 1195)
유지. review-code (heavy) dominance-positive streak 인정 룰 적용 (cycle 135
박제) — 같은 chain N 연속 발화 OK, 단 trigger 명확 시.

next_recommended: review-code (heavy) wave 30 후속 batch ≤ 5 routes
또는 fix-incident trigger 자연 발생 시 redirect.

trigger_eval (skill-evolution):
- trigger 1 (chain-evolution ≥5): 8 historical (이미 박제 처리)
- trigger 2 (5 fail streak): 0 fails
- trigger 3 (cycle % 50): 45 not milestone
- trigger 4 (meta-pattern): 없음
- trigger 5 (0 fire chain): sample=20 review-code=11 fires → 미충족
- verdict: no fire, normal progression
- ship-0 stop: partial_streak=1/10, no stop
