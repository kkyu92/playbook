---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "cbf92726f89601b15fedd1c45f6f22420fed32b4"
---


subtype: cycle-retro
cycle_n: 2140
chain_selected: fix-incident (heavy)
outcome: success
retro.summary: cycle 2139 가 발견한 헤더 메가메뉴/모바일메뉴/리그셀렉터 MLB pill href KO 하드코딩 버그(EN 방문자 클릭 시 KO 페이지 이탈) 수정. localizeNavItems() 헬퍼로 pathname=/en/* 일 때 MLB nav href /en 접두 치환 (EN 라우트 8개 기존 존재, 순수 매핑 문제). commit 467b0179. lint/tsc/vitest(3843) green.
next_recommended_chain: explore-idea 또는 review-code
next_recommended_reason: Feature-Drift Cycle alternation 지속. 헤더 nav label 자체(KO 하드코딩) 국제화가 명확한 후속 스코프면 explore-idea 이어서 처리 가치 있음.
