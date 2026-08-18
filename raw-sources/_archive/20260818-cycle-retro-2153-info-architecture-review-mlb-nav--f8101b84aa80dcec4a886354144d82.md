---
date: "2026-08-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f8101b84aa80dcec4a886354144d82ba67b50ee4"
---


subtype: cycle-retro
cycle_n: 2153
chain_selected: info-architecture-review
outcome: success

info-architecture-review 진단(신규 라우트 확인 + breadcrumb grep + 헤더/푸터
sitemap 컬럼 대조)이 실제 gap 발견: /mlb/accuracy, /mlb/calendar 는 실존+hub
카드+sitemap.xml 등록까지 됐지만 헤더 MegaMenu(MLB_NAV)/Footer sitemap 컬럼
배선이 KBO /calendar 대비 비대칭 누락. Breadcrumb grep 14건은 전부 정상 예외
(debug/login/settings/stub 페이지) — false positive, 이 축은 클린. 헤더+Footer
양쪽 배선 추가, 3864 tests pass, PR #2958 R7 자동 머지 (mergedAt 실측 확인,
사례 18 mitigation 준수).

next_recommended_chain: explore-idea 또는 fix-incident (review-code dominance
완화, explore-idea 신규 후보는 여전히 stale — 자연 trigger 대기)
