---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "81cf445b7e5335ad0537eb1c2d9d2a129a12d6e7"
---


subtype: cycle-retro
cycle_n: 2513
chain_selected: review-code (heavy)
outcome: success

진단: open issue 0, approved plan 0/23, gap trigger 4종 미도달(fix-incident 9/20, op-analysis 8/25, info-arch 27/30, lotto 5/30). 직전 4 cycle(2509-2512) review-code(heavy) SUCCESS streak 지속, cycle 2512 추천대로 미감사 대형 페이지 탐색.

확정 이슈: predictions/[date]/page.tsx(619줄, KBO 최고 트래픽 일별 예측 페이지, 감사 이력 0건) 하단 "이전 날짜/다음 날짜" RelatedLinks nav가 `new Date(\`${date}T00:00:00+09:00\`)` KST 리터럴 파싱 → setUTCDate 산술 → toISOString().slice(0,10) 되읽기 패턴을 사용. 캘린더 날짜 문자열은 moment-in-time이 아닌데 +09:00 리터럴 파싱으로 UTC 필드가 하루 당겨져(예: 2026-08-24 → UTC 2026-08-23T15:00Z), 그 결과 "이전 날짜" 링크는 실제로 date-2를, "다음 날짜" 링크는 date+0(원래 날짜와 동일)을 가리키는 매일 재발 오프바이원 버그 — KST_OFFSET_MS silent drift family 신규 케이스(computeWeekRange.ts toMondayUTC와 동일 원칙 위반).

fix: computeAdjacentDates 순수 함수 추출(lib/predictions/adjacentDates.ts, Date.UTC 기반 타임존 무관 캘린더 산술) + 회귀 테스트 5건(일반/월경계 양방향/연경계/버그 재현 증명).

검증: tsc --noEmit clean, eslint clean, vitest 전체 511 files/4267 tests pass, pre-push lint+type-check+version-sync-guard pass. Direct main push (commit 7d896075).

다음 사이클 추천 = review-code(heavy) 계속(잔존 미감사 후보: debug/pipeline 481줄, debug/factor-correlation 547줄, teams/[code] 622줄, search/page 450줄, seasons/[year] 433줄, about 427줄) 또는 lotto(gap 8/30)/op-analysis(gap 8/25)/info-arch(gap 27/30) 자연 도달 시 다양성 전환.
