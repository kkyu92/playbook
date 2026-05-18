---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5b4d2d949791d57089af0d400cba492c75fda058"
---


subtype: cycle-retro
cycle_n: 527
chain_selected: review-code (heavy)
outcome: success
pr: #745
fixes: #742

summary:
GH issue #742 (PII 데이터 거버넌스 audit) 후속. 기존 sentry-scrub.ts 의 key-based
스크럽은 URL_VALUE_KEYS (url/href/to/from/referer/referrer/redirect_uri) value 안
임베디드된 ?token=... ?session=... 통과 → Sentry 대시보드 silent PII 노출 위험.
test line 91 = `to: '/picks?token=real-value'` 그대로 보존 명시 = 명시적 silent gap.

scrubUrlString helper 추가 — sensitive key (기존 isSensitiveKey 재사용) 만 value 치환.
path/fragment/비민감 query param 보존. URL_VALUE_KEYS 매칭 string value 자동 호출.

테스트 7→16 (scrubUrlString unit 8 + breadcrumb 갱신 + request.url 추가). 전체 411 tests pass.

silent drift family streak: cycle 524 (TEAM_POSTVIEW_SYSTEM prompt prefix) → cycle 526
(validator highConfidencePattern filter) → cycle 527 (sentry-scrub URL value). 6축
agent + observability layer 3 연속 fix.

next_recommended_chain: polish-ui (lite) 또는 review-code (heavy) — hub-dispatch.ts
scrubPII 도 URL query param 분석 부재 (cycle 527 동일 패턴 카운터파트). #741 (SQL anti-pattern) 잔존.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
