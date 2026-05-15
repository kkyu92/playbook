---
date: "2026-05-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "09f20b9ab80d84df24c9d6e08aa0ae86509b8d57"
---


subtype: cycle-retro
cycle_n: 469
chain_selected: review-code (heavy)
outcome: success
pr: #498 (d2869dd, squash merged)

summary:
홈 page.tsx 분석 방법론 카드 6개 중 2개 라벨 silent drift 2건 fix.
- "최근 폼 + 상대전적" "15%" → 실제 13% (recent_form 10% + head_to_head 3%)
- "Elo + WAR" "16%" → 실제 18% (elo 10% + war 8%)

cycle 335 v1.8 변경 (h2h 5→3%, elo 8→10%) 적용 시 page.tsx 라벨 미갱신.
나머지 4 카드 (20/15/15/5.5%) 우연 일치로 검출 누락.

fix: METHODOLOGY_GROUPS + formatMethodologyWeight() 로 DEFAULT_WEIGHTS
+ HOME_ADVANTAGE 동적 compute (cycle 467 HOME_ADVANTAGE 단일 source 동일 패턴).
가중치 변경 시 라벨 자동 동기 → silent drift 재발 차단.

evidence: cycle 467 next 박제 후보 "page.tsx:835 5.5% 라벨" 정확 지목
→ carry-over evidence chain 자연 작동 (cycle 466-468 streak 연장).

next_recommended_chain: review-code (heavy)
next_recommended_reason: debug/factor-correlation/page.tsx 에 "+1.5%p" /
"51.5%" / "0.515" / "0.015" 매직 넘버 6+ 곳 잔존 — 다음 단일 source 후보
명확. op-analysis cycle 470 에서 gap=21, 25-cycle 임박이나 미달.

silent drift family streak 16 cycle 째.
