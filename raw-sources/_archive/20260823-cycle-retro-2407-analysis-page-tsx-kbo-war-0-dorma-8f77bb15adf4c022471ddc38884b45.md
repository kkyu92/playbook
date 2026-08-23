---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8f77bb15adf4c022471ddc38884b4503b7272834"
---


subtype: cycle-retro
cycle_n: 2407
chain_selected: review-code (heavy)
outcome: success

analysis/page.tsx (2803줄, 첫 전체 심층 read) subagent 위임 감사 → wave-345 팀 WAR 배지 (1696-1711) 만 WAR=0 data-gap sentinel guard 누락 발견. 같은 파일 내 다른 3곳(1111/1713/2298)은 이미 > 0 가드 존재, game/[id] 페이지는 "WAR 미집계" 문구까지 있는데 이 배지만 빠짐 — 0.0 을 실제 약체 스탯으로 렌더링 + 주황색 컬러링하는 silent drift. H2H div-by-zero / composite-duel factor list / simplifiedMode 평균 / isTopPick 네이밍 등 6개 후보는 검증 후 정상으로 확인, 리포트 안 함 (false positive 차단).

fix 직접 main commit (R4, 단일 블록 3줄 기계적 수정) + push, pre-push lint/type-check green.

다음 사이클: gap trigger 임박 (fix-incident 15/20, op-analysis 16/25, lotto 17/30, info-arch 14/30) 우선 확인 권장. review-code 재발화 시 같은 파일 재감사보다 game/[id]/page.tsx(860줄) 등 신규 target.
