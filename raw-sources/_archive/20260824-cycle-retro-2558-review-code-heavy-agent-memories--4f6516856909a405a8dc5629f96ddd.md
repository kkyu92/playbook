---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "4f6516856909a405a8dc5629f96dddaeb3c3aef4"
---


subtype: cycle-retro
cycle_n: 2558
chain_selected: review-code (heavy)
outcome: success

진단: explore-idea(5연속 소진)/info-arch/lotto/design-system/fix-incident(mandatory 20-cycle 점검, mlb_fancy_scrape fangraphs 403 3일 self-heal 재발無) 전부 negative 재확인 후 review-code(heavy) 신규 영역 탐색.

발견: postview.ts(isWeightedFactor)·mlb-retro.ts(MEMORY_CANDIDATE_KEYS)는 이미 shadow-only 0% factor 배제 가드를 갖고 있었으나, 둘이 공유하는 retro.ts 원본 buildMemoryForTeam 에는 그 가드가 없어 park_weather/umpire_sz 가 agent_memories maxBias 후보에 필터 없이 남아있던 gap. 현재 두 factor symmetric 구현이라 실질 노출은 없었음 — 비대칭 도입 대비 사전 차단.

메타: SMALL_SAMPLE_N family(11회)와는 다른 신규 silent-drift family(공유 함수 가드 불일치) — review-code(heavy) 반복이 "같은 하위 패턴 반복"이 아니라 "다른 파일의 다른 패턴"이면 dominance 우려와 별개로 유효. 다음 사이클 = explore-idea 또는 op-analysis 권장.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
