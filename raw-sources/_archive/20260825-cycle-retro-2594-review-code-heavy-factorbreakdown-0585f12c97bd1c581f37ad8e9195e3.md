---
date: "2026-08-25"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0585f12c97bd1c581f37ad8e9195e3fe5b897a71"
---


subtype: cycle-retro
cycle_n: 2594
chain_selected: review-code (heavy)
outcome: success
summary: DESIGN.md 카드 padding/배경 스펙 대비 "팩터별 분석" 카드 family(DetailedFactorAnalysis/MlbDetailedFactorAnalysis/FactorBreakdown) 중 FactorBreakdown.tsx 만 유일하게 bg-gray-50+p-4 로 이탈 발견 — sibling(bg-white+p-5) 과 정렬. gap-3/gap-4 raw count 혼재는 Explore 서브에이전트로 sibling-family 단위 재검증 후 negative(그리드 밀도별 의도 차이) 판단, single-file 단위 재검증에서 진짜 drift 확인.
next_recommended_chain: review-code(heavy) spacing axis 잔여 스윕 또는 operational-analysis(gap 9/25)/lotto(gap 27/30) 자연 발화 대기
meta: gap-3/gap-4 같은 raw class-count 축은 sibling family 단위 재검증 없인 false positive 위험 큼 — 이번 cycle 은 Explore 서브에이전트 파견으로 family 단위 재검증까지 마친 후 단일 파일 실제 drift(FactorBreakdown) 로 좁혀서 확정. 향후 spacing/색상 axis 스윕 시 raw count 만으로 판단 금지, family 비교 의무.
