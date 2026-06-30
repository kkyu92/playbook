---
date: "2026-06-30"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "69382e129f14150b639fabcd810143ef113127d1"
---


subtype: cycle-retro
cycle_n: 1415
chain_selected: explore-idea (lite)
outcome: success
next_recommended_chain: review-code
commit_hash: 502bc829
issue_closed: #2515

issue #2515 (긱뉴스 scout: "CPU를 정말 화나게 만드는 데이터 접근 패턴") explore-idea (lite) 평가. 원본 기사 도메인 (CPU L1/L2/L3 캐시 라인 저수준 메모리 접근) vs 본 프로젝트 영역 (Supabase REST + PostgreSQL B-tree index, 서버 측 RDBMS) 개념 불일치 = REJECT carry-over.

55개 index 박제 + recent form / H2H / asOfDate 모두 인덱스 보호 confirmed. silent slow query family 미박제. ROI rubric 5축 = Tier 4 (사용자 영역, Supabase Dashboard 접근 필요).

재평가 trigger 4종 carry-over 박제:
- Supabase slow query log 1s+ ≥ 3건/30일
- pipeline_runs p95 latency ≥ 5s × 7일 연속
- Vercel function timeout (60s+) ≥ 3건/30일
- agent context build latency ≥ 2s

자가 의심 차단 룰 (cycle 124/618) 적용 — 객관 evidence 없으면 결정 X / harness 박제만 가능.

다음 cycle 권장: review-code (wave 169 silent drift family 진단).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
