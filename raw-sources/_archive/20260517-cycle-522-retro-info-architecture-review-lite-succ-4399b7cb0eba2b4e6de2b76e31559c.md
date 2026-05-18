---
date: "2026-05-17"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "4399b7cb0eba2b4e6de2b76e31559c554f29e058"
---


subtype: cycle-retro
cycle_n: 522
chain_selected: info-architecture-review (lite)
outcome: success (retro-only)
trigger: gap=30 (last 492 → 522) = 30-cycle trigger 9 자연 fire 2회째 (lite 자동 권장 cycle 300 박제)

진단 결과:
- 전체 page.tsx 34 / breadcrumb 누락 8건 = 모두 의도 (home 1 + debug BASIC auth 5 + reviews/{weekly,monthly} redirect-only 2)
- 신선 IA 결함 actionable = 0
- ia-*.md spec 6건 (2026-05-07/08/12/13/14/30) 모두 처리 완료 또는 메가메뉴 큰 scope 이전 결정
- sitemap.ts 정합성 유지 (static 18 + 시즌 4 + 매치업 45 + 팀 10 + 주간 12 + 월간 6 + dynamic games/predictions/players)
- robots.txt 정돈 (/debug /api /search disallow)
- Header NAV_ITEMS 안정 (오늘 / AI / 커뮤니티 / 순위 / 예측기록 / 팀·선수 / 리뷰·시즌)

retro-only 결정 근거:
- breadcrumb 신선 누락 0 (모두 의도)
- 메가메뉴 후속 = 5 spec 누적 design-system/explore-idea heavy chain transfer 후보 (lite scope X)
- spec write 가치 limited (이미 5 spec 안 명시된 후속)

R5 evidence:
- 30-cycle trigger 9 2회째 자연 fire (cycle 462→492→522) = info-arch chain 자연 주기 보정 trigger 정상 작동 (cycle 300 박제 룰 PASS_eval 2회 streak)
- IA 안정 baseline maintained (cycle 492 → 522, 30 cycle 동안 actionable 0건 유지) = 사이트 구조 성숙
- lite retro-only outcome = "신선 결함 0건 시 spec write 강요 X" 정책 streak (481/488/491/492/522 패턴)

trigger 5 평가 (retro 단계 inclusive N-19..N = 503-522):
- 표본 = 16 (chain pool 등록 chain 사이클) ≥ 10 → 평가 OK
- 평가 대상 3: review-code 7 / explore-idea 0 / polish-ui 5
- explore-idea 0회 = cooldown 활성 (cycle 512 박제, marker 박제 X)
- 0회 chain 모두 cooldown / 영구 opt-out 처리 → trigger 5 미충족 → marker 박제 X

next_recommended_chain:
- review-code (heavy) — silent drift family streak 5축 maturity baseline 잔여 검토
- 또는 polish-ui (lite) — accuracy/page.tsx amber 21건 carry-over 처리
- 또는 fix-incident (gap=10, 미충족이나 운영 baseline 점검 후보)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
