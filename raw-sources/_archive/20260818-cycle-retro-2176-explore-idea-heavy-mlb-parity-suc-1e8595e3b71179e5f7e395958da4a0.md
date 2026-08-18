---
date: "2026-08-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1e8595e3b71179e5f7e395958da4a044cee6f60b"
---


subtype: cycle-retro
cycle_n: 2176
chain_selected: explore-idea (heavy)
outcome: success

no forced trigger (open issue 0건 / approved plan 0건 / gap-chain 전부 미충족 /
CI+scheduled workflow 전부 green) — 자유 판단. IA 감사(최근 7일 신규 MLB 라우트
4개 breadcrumb/megamenu/sitemap) 도 clean 확인 후, KBO/MLB parity 격차 중
정량적으로 well-scoped 한 항목(팩터별 적중률 테이블) 선택.

KBO buildFactorAccuracy 는 정규화 factors JSONB(0.45~0.55 중립대 skip)를 읽지만
MLB predictions 는 home/away 원본 스탯 플랫 컬럼만 저장 — 별도 adapter
(buildMlbFactorAccuracy, home/away 직접 비교 + FIP류 lower-is-better 부호
규칙)로 해소. elo/recent_form/head_to_head/defense_sfr 4팩터는 plan #24/#25
기존 결론(Brier CI overlap, 재검토 근거 없음)대로 계속 제외.

FactorAccuracyTable.tsx 에 sport/locale prop 추가(KBO 기존 호출부 동작
무변경, 회귀 리스크 없음). /mlb/accuracy + /en/mlb/accuracy 양쪽 배선.

테스트 8건 신규(lower/higher-is-better 분기, null/동일값 skip, final 스코어
없음 skip, locale 라벨, 정렬). 전체 type-check/lint/vitest(447 files/3887
tests) 통과. PR #2962 squash 머지 확인(gh pr view --json state=MERGED,
commit cd715282).

skill-evolution trigger 평가: trigger 3(cycle_n%50==0) 미충족(2176%50=26).
trigger 5 — window 2157-2176(inclusive) 표본 20 ≥10, review-code 7회 발화
(dominance 지속, 0회 아님) → 미충족. ship-0 emergency check: 직전 9 cycle
outcome 8 success/1 partial → 미충족. marker 박제 없음.

next_recommended_chain: free judgment — review-code dominance 지속되나
stale 아님, gap-chain 전부 미도달. KBO /accuracy 잔여 dashboard 컴포넌트
(BrierTrendChart 등)가 MLB parity backlog 로 남음(scope 과다확장 회피 위해
이번엔 1개만 처리).
