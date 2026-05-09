---
date: "2026-05-08"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "09f63092f8026737ac4bedea60513c6565ad5a2c"
---


subtype: cycle-retro
cycle_n: 265
chain_selected: explore-idea heavy
outcome: success
pr_number: 241
commit_hash: b745494

retro.summary:
explore-idea heavy SUCCESS — 매치업 페이지에 두 팀 시즌 평균 팩터 비교
섹션 (선발 FIP / 타선 wOBA / 불펜 FIP / 최근 폼 / Elo) 추가.
buildTeamFactorAverages helper 추출 + assertSelectOk silent drift 가드 +
MatchupFactorCompare 컴포넌트 (좌우 grid + 우세 brand 색상).

테스트 226 → 231 (+5: error throw 2 + 빈 row + 정상 평균 + null skip).
build pass + matchup 라우트 정상. 신규 type 에러 0건.

next_recommended_chain: review-code or polish-ui
next_recommended_reason:
explore-idea heavy success 직후 다양성 redirect. matchup 페이지 정합성
또는 새 컴포넌트 polish 차원. fix-incident gap 8 + op-analysis gap 10
(각각 trigger 미충족 유지).

진단 source 기록:
- 직전 8 사이클 distinct=6 (lock 무)
- 0회 발화 chain (직전 20): dimension-cycle / expand-scope / design-system (영구 opt-out)
- saturation 7/15 (<12) trigger 8 미충족
- fix-incident gap=7 (<20) / op-analysis gap=9 (<25)
- ship-0 stop 0/10 + lite cap 0건

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
