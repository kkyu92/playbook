---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "70c26e186cd8f25c930d7c77c2ed24610bcce4b7"
---


subtype: cycle-retro
cycle_n: 765
chain_selected: explore-idea (heavy, v11 후보 C related links)
outcome: success
pr: 1097
commit: d671119

summary:
v11 후보 C — sibling/related navigation 패턴. shared RelatedLinks 컴포넌트 (45 line) + 4 라우트 wire (teams/[code] 9 다른 팀 / predictions/[date] 이전·다음 날짜 + hub + accuracy + reviews / players/[id] 팀 프로필 + 9 매치업 / analysis/game/[id] 양 팀 프로필 + matchup + 같은 날짜 predictions). matchup/[teamA]/[teamB] 는 이미 pairsForTeam wire 박제됨 중복 회피. cycle 762 v11 spec § ROI 2순위 carry-over closure. type-check + 426/426 test PASS. internal link graph 보강 — teams ↔ matchup ↔ players ↔ analysis/game ↔ predictions 자연 흐름.

next_recommended_chain: explore-idea (heavy, v11 후보 B TOC sidebar — shared 컴포넌트 + wire 5 장문 라우트) 또는 review-code (heavy, gap=3 silent drift family sweep 9번째)
next_recommended_reason: v11 6 후보 중 A/C closure → 남은 B (TOC sidebar) / F (IndexNow ping) / D (hover/focus polish-ui) / E (sticky CTA). B 가 가독성 + AdSense ROI 측정 가능. 또는 review-code 자연 주기 (~10 cycle) silent drift sync 9번째.
