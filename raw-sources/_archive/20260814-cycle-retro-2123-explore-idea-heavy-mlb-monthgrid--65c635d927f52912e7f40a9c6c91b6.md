---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "65c635d927f52912e7f40a9c6c91b64559c77789"
---


subtype: cycle-retro
cycle_n: 2123
chain_selected: explore-idea (heavy)
outcome: success
pr_number: 2953

retro.summary: KBO /calendar 를 MLB 로 병렬 복제(/mlb/calendar). 월 grid 골격 공용
추출 중 실제 프로덕션 버그(KST 타임존 파싱 → 요일 정렬 매달 1칸 밀림 + 다음달
패딩 6칸 말일 중복) 발견+수정, KBO 페이지도 동시 정정. 신규 테스트 4파일, 전체
3807/3807 pass. PR #2953 squash 머지 완료(state=MERGED 실측 확인).

next_recommended_chain: review-code
next_recommended_reason: 신규 코드(buildMlbCalendarHeatmap.ts, monthGrid.ts)
edge-case 재점검 또는 EN 미러(/en/mlb/calendar) 배선 검토 권장.
