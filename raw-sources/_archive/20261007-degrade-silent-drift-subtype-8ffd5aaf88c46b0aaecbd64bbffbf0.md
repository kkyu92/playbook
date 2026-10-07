---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "8ffd5aaf88c46b0aaecbd64bbffbf0ca0fd3ba2a"
---


subtype: lesson
cycle: 2946

패턴: 한 파일 안에서 같은 성격의 DB 호출 여러 개 중 일부만
.catch(captureFallback(...)) degrade 적용돼 있고 나머지는 누락된 상태 —
grep 으로 "이 헬퍼가 쓰이는가" 만 확인하면 "이미 안전하다" 로 오판하기 쉬움.
반드시 "이 헬퍼를 써야 할 모든 호출 지점 수 vs 실제 적용된 수"를 세어야
발견 가능(cycle 2946: page.tsx 7곳 중 3곳만 적용, 나머지 4곳 uncaught throw
→ 홈페이지 전체 500).

대응: 외부 서비스 장애(Supabase egress quota 류) 로 인한 production 전면
장애 조사 시, 한 라우트 fix 로 끝내지 않고 동일 throw-가능 헬퍼
(assertSelectOk 등) 사용 파일 전수 grep + live curl 상태 직접 확인까지
1 cycle 안에서 이어가는 게 ROI 높음 — 이번 cycle 이 /(1곳) 발견 후 grep
21개 파일 전수 확인으로 2곳(/insights, /calendar) 추가 발견한 사례.

박제 위치: CLAUDE.md 드리프트 사례 / memory/drift-cases.md 참조 후보
(silent drift family 신규 subtype — "파일 내 부분 적용").
