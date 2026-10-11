---
date: "2026-10-11"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "ca73eec78b45c3e2fcdedf20f957869ffaa92003"
---


subtype: cycle-retro
cycle_n: 3027
chain_selected: fix-incident
outcome: success
retro.summary: Supabase INACTIVE 장애(cycle 3019~) 독립 재확인(nslookup NXDOMAIN, supabase.com 자체 200 정상이라 실제 프로젝트 장애 확정) 후 blast-radius 조사 전환 — assertSelectOk+captureFallback 2-layer 방어가 전역 일관 적용돼 crash 위험 없음을 확인, 단 analysis/page.tsx의 fetchStandings()(KBO 스크랩, Supabase 무관)만 Promise.all 안 유일하게 가드 누락된 silent drift 발견+수정. 자매 함수 buildTeamAccuracy.ts와 동일 .catch(captureFallback) 패턴 적용. 신규 테스트 2건 + 전체 587파일/4623테스트 green.
next_recommended_chain: review-code(heavy) 또는 fix-incident(저빈도 재확인)
next_recommended_reason: review-code(heavy) 신규 축 탐색 필요(기존 영역 대부분 소진) — gap trigger 4종(fix-incident 1/20, op-analysis 6/25, info-arch 21/30, lotto 18/30) 전부 미도달, Supabase INACTIVE 재확인은 cycle 3021/3027 양쪽 이미 확인돼 매 cycle 반복은 노이즈
