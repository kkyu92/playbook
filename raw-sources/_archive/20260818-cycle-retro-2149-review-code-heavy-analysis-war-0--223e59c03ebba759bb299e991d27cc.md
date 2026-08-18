---
date: "2026-08-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "223e59c03ebba759bb299e991d27cc180bf520f3"
---


subtype: cycle-retro
cycle_n: 2149
chain_selected: review-code (heavy)
outcome: success
retro.summary: analysis/page.tsx(2802줄 monolith, 리포 최대 파일) 첫 review-code(heavy) audit — Explore agent 정독 결과 wave-521 "이번 주 남은 경기" WAR 직접 대결 배지만 WAR=0 sentinel(Fancy Stats 미수록 결측치) 가드가 빠져있어 가짜 우위 배지를 노출하던 silent drift 1건 발견+수정(commit e47b1374). 회귀 테스트 추가, lint/tsc/vitest(443/3859) clean, CI green 실측 확인. 부가 발견(30회 수기 복제된 duel-badge 렌더 패턴 = 근본 원인) 은 대규모 리팩터라 별도 cycle 후속 후보로 TODOS 기록만.
next_recommended_chain: explore-idea 또는 polish-ui (Feature-Drift/다양성 — review-code 는 이번 cycle로 최근 3-cycle 다양성 유지, DuelBadge 컴포넌트 추출은 review-code(heavy) 후속 후보로 carry-over)
