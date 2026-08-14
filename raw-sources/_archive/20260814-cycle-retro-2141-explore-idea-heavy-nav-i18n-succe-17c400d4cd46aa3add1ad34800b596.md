---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "17c400d4cd46aa3add1ad34800b596b550e89fae"
---


subtype: cycle-retro
cycle_n: 2141
chain_selected: explore-idea (heavy)
outcome: success

cycle 2140 retro carry-over(헤더/모바일메뉴/리그셀렉터 nav label·description·aria-label
KO 하드코딩, href 이탈 버그와 별개 issue)를 그대로 처리. NavLink/NavGroup 에
enLabel/enDescription 필드 추가 + 기존 localizeNavItems() 확장으로 MLB_NAV EN 치환,
공용 UI aria-label/pill/badge 도 각 컴포넌트 기존 isEn 판별 재사용. 테스트 4건 추가,
lint/tsc/vitest(439/3847) green, direct commit+push(4ff198e7, R4).

next_recommended_chain: review-code (heavy) 또는 자유 판단 (Feature-Drift Cycle 자연 교대)
