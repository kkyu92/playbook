---
date: "2026-07-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b4278a9a8fc99646e89564f067ec3029c187ee81"
---


subtype: cycle-retro
cycle: 1648
chain_selected: explore-idea (heavy)
trigger: improvement_saturation (9/15 review-code+fix-incident+polish-ui+info-arch), KBO 시즌 재개 D-2 (7/16), CREDIT_EXHAUSTED LLM의존X 최적
outcome: success
pr: 2671
merge_commit: 2736118a

Feature: wave-317 팀 전력 현황 그리드
- /analysis 페이지에 TeamStrengthGrid 섹션 신규 추가
- Elo 레이팅 + 최근 10경기 승률 기준 10팀 격자 (2col mobile / 5col desktop)
- buildTeamStrengthSnapshot(): predictions 테이블 최신 200건 → 팀별 최신 Elo/recentForm 추출
- EloTag: Elo vs ELO_NEUTRAL(1500) delta 컬러 / FormBar: 승률 진행바
- TEAM_STRENGTH_FORM_STRONG(0.6) / TEAM_STRENGTH_FORM_WEAK(0.4) 상수화 → silent drift family wave-317

next_recommended_chain: review-code (heavy)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
