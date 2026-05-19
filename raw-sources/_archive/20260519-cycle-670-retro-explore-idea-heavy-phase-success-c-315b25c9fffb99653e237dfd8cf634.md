---
date: "2026-05-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "315b25c9fffb99653e237dfd8cf6340667572f4b"
---


subtype: cycle-retro
cycle_n: 670
chain_selected: explore-idea (heavy 구현 phase — spec 이미 cycle 649 박제)
outcome: success
pr: 959
commit: 734a379
summary: |
  explore-idea saturation trigger 12/15 (≥12) 충족 + cycle 669 next_rec 1순위 (H 잔존) → fire.
  cycle 649 spec § ROI 4순위 후보 H (검색박스 heavy) = 마지막 잔존 후보 (4/5 ship 완료 상태).
  spec 명시 (팀 코드/단축명/정식명 + 날짜 prefix YYYY/YYYY-MM/YYYY-MM-DD + supabase select 확장).
  추정 heavy ~150 line 였으나 sibling filter pattern 정합으로 실측 ~135 line — 1 cycle 안 ship 가능.

implementation:
  - PredictionsSearchBox.tsx 신규 (121 line)
    - 'use client' + useSyncExternalStore + localStorage `mb_predictions_search_v1`
    - normalize: DATE_RE (YYYY / YYYY-MM / YYYY-MM-DD prefix) 또는 resolveTeamCode (코드/단축명/정식명)
    - 인라인 <style> CSS injection: data-prediction-date^= / data-prediction-teams~=
    - 매칭 hint 노출 ("날짜 YYYY-MM" / "두산 (OB)" / "매칭 없음")
  - predictions/page.tsx +10 line
    - supabase select 에 home_team_code/away_team_code 추가
    - DateStat.teamCodes: Set<string> 박제 + Array.from join → data-prediction-teams attr
    - data-prediction-date={d.date} attr 추가 (이전 data-prediction-month 만으로 부족)
    - SearchBox 통합 위치 (AccuracyHeaderCard 다음 / status filter 앞)

verification:
  - 전체 test 1124 pass (shared 80 + kbo-data 623 + moneyball 421)
  - turbo type-check 3/3 success
  - PR #959 자동 머지 (R7 squash + branch delete)

next_recommended_chain: review-code (lite, heavy 모드) or info-architecture-review (gap=14, trigger 9 ≥30 시 cycle 686) or operational-analysis (gap=13, trigger ≥25 시 cycle 682)
next_recommended_reason: 검색박스 ship 후 자연 후속 = spec stale claim 정정 (cycle 649 spec § ROI ranking H 컬럼 갱신) + CLAUDE.md PredictionsSearchBox.tsx 박제. silent drift family streak 자연 누적. saturation trigger 직후 explore-idea 재발 자제

silent_drift_family_streak: 143
cycle_649_spec_status: 5/5 후보 모두 fire 완료 (F cycle 658 / I cycle 660 / G cycle 661 / J 사전 ship / H cycle 670)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
