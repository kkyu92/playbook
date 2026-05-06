---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1a99aa0881f1fc8c57ecf257712f76e4368c5bd8"
---


subtype: cycle-retro
cycle_n: 142
chain_selected: review-code (heavy)
outcome: success
commit_hash: ff2697b
pr_number: 133

retro_summary:
cycle 142 = review-code (heavy) on buildDailySummary SUCCESS — supabase `.error`
미체크 silent drift 차단. 기존 `const { data } = await db.from(...)` 가 DB 오류
시 빈 배열 silent fallback → notifyPredictions ghost 박제 + summary_sent 플래그
박제 → 다음 fire `already sent` silent skip = 사용자 무감지 ghost notification.

cycle 136 (#127) read 측 N+1 batch + cycle 141 (#132) write 측 `.error` 가드의
read 측 짝 cleanup. CLAUDE.md 사례 3 (predictions VARCHAR overflow silent fail)
패턴 동일 영역 (daily.ts) 3번째 재현.

fix:
- buildSummaryPredictions pure helper 추출 (daily-summary.ts) — row →
  SummaryPrediction 변환만 담당
- buildDailySummary 의 `{ data, error }` destructure + `.error` 시 명시적
  throw → handleDailySummaryNotification catch 가 errors[] push
- 호출 site `summary.length === 0` 가드 추가 → race / row 매핑 silent drop 시
  Telegram ghost notification + summary_sent 박제 회피
- 6 unit tests 회귀 가드 (정상 매핑 / reasoning.homeWinProb 누락 0.5 / reasoning
  null / confidence null 0 (NaN 차단) / 빈 배열 input / 5경기 일관)

next_recommended_chain: review-code (heavy) on daily.ts 잔존 `.error` 미체크
영역 (line 335 / 670 / 768 todayTotal-count / 1022) 또는 다양성 redirect
(op-analysis lite 57 cycle stale / fix-incident Sentry 직접 측정 / explore-idea
TODOS Next-Up). 0회 chain 5개 trigger 매핑 자연 X 인정 (cycle 135 항구화).

cycle 49 룰 누적: PASS_eval 80 / PASS_ship 19 (cycle 125~142 silent drift
family 15 cycle SUCCESS streak 자연 연장).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
