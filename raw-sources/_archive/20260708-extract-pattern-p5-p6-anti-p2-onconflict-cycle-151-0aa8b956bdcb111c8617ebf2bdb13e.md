---
date: "2026-07-08"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "0aa8b956bdcb111c8617ebf2bdb13e60f9932afb"
---


subtype: lesson

P5 (quality_guard): DB_CONSTRAINTS 단일 소스 + ESLint no-restricted-syntax
- onConflict raw string → CI error 차단 패턴
- wave 221-227 7 cycle 재발 0건 evidence

P6 (ai_agent): 모델 팩터 실측 적중률 집계
- factors JSONB + is_correct XOR home_win_prob >= 0.5
- sp_fip/xFIP 65.7% 최강, sfr 50.0% 노이즈 수준 확인

Anti-P2 (anti_pattern): 데이터 수집 결손 → normalize(0,0) = 0.5 → 가중치 사문화
- WAR 8% + park_factor 4% = 12% 무기여 확인 (cycle 1517)
- fix-incident carry-over

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
