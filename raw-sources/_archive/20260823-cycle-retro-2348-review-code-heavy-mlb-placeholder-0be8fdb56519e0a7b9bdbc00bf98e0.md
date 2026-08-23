---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0be8fdb56519e0a7b9bdbc00bf98e07f81ecc7ac"
---


subtype: cycle-retro
cycle_n: 2348
chain_selected: review-code (heavy)
outcome: success
retro.summary: cycle 2347 explore-idea(heavy)가 배선한 온보딩 문구 audit — /glossary "Elo·최근폼·상대전적·수비SFR 4개는 MLB 쪽 데이터가 아직 없어" 서술이 부정확함을 발견. mlb_team_elo 테이블 + 팀/매치업 페이지에 실측 데이터가 이미 표시 중이나, mlb-pipeline.ts의 실제 승률 계산은 이 4개를 팀 구분 없는 중립값으로 고정 입력 — "데이터 없음"이 아니라 "데이터는 있으나 가중치 미반영"이 정확. /mlb/factors, /mlb/methodology 도 동일 gap disclose 부재 확인해 함께 정정(commit 4384b2ba).
next_recommended_chain: explore-idea 자연 발견 또는 op-analysis
next_recommended_reason: review-code(heavy)가 방금 신규 코드를 정확히 감사 완료. 4팩터를 실제 예측 가중치에 연결하는 모델 개선은 범위 밖(별도 plan 필요).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
