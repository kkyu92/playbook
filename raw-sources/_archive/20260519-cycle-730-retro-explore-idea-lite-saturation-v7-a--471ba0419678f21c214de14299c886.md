---
date: "2026-05-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "471ba0419678f21c214de14299c886996ab01f9c"
---


subtype: cycle-retro
cycle_n: 730
chain_selected: explore-idea (lite, saturation v7 후보 A audit)
outcome: success retro-only
next_recommended_chain: explore-idea (lite, saturation v7 후보 A fire — /leaderboard 정렬 chip 3-mode 구현 + ship)

audit 결과:
- 후보 A: /leaderboard 정렬 chip 3-mode (적중률순 default / 연속순 / 픽 수순)
- pattern reuse: TeamAccuracySortControl 100% (sibling: PicksSortControl / MonthlyTeamStatsSortControl)
- 표본 가드: entries.length ≥ 5 (픽 5건 dup) + streak ≥ 2 cohort ≥ 2 시만 렌더
- 가치: streak 강자 가시화 + season tab cohort 차별 (적중률만 보던 leaderboard 차원 확장)
- 리스크: weekly tab streak entries 희소 (월요일 초기화 + 5건 + 2연속) 가능, 가드 미충족 시 chip 미렌더로 차단
- decision: PASS — cycle 731 fire 권장

진단 source:
- saturation v6 closure 4/4 완료 (cycle 720 A ship / cycle 721 B ship / cycle 722 C reject / cycle 725 D reject)
- improvement saturation 7 (< 12) → lite mode 자연
- 2-chain alternation lock 미발동 (distinct=6)
- lite cap 모두 < 5
- open issue / open PR 0건
- migration 027 current_streak 컬럼 UI carry-over (LeaderboardTable 에는 노출 됨, sort 부재)

다음 사이클 (731):
- chain: explore-idea (lite, saturation v7 후보 A fire)
- 변경: LeaderboardClient.tsx + 신규 LeaderboardSortControl.tsx + storage util
- storage: mb_leaderboard_sort_v1
- pattern: TeamAccuracySortControl 100% reuse (3-mode chip + flexbox order CSS)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
