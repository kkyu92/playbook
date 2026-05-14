---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "f867732e39606a6b31dab2baf7c902351056e0d0"
---


subtype: lesson
cycle_n: 383
chain_selected: operational-analysis lite
outcome: partial (박제 only — fix-incident heavy 후속 redirect)

발견:
- 2026-05-13 v1.8 첫 fire (5 pre_game + 5 postview) 전부 quant-only fallback
- totalTokens=0 + reasoning="에이전트 토론 불가. 정량 모델 v1.8 결과 사용."
- 2026-05-12 v1.7-revert 5건 중 4-5번째부터 fail 시작 (mid-batch credit exhaustion)
- ANTHROPIC_API_KEY credit 소진 의심 (PR #372 commit body 시나리오 그대로)

silent drift 잔존:
- PR #372 fix 5/13 17:24 KST merge → v1.8 pre_game 5/13 16:17 KST 시점 미적용
  → mv='v2.0-debate' 라벨 silent drift
- postview path 동일 패턴 미수정 → mv='v2.0-postview' 라벨도 silent

impact:
- v1.8 가중치 효과 (head_to_head 5→3% + elo 8→10%) 측정 불가
- n=99→150 진행 가속 가설 깨짐
- /accuracy model_version별 분석 왜곡
- AI reasoning UI 노출 검토 필요

박제 위치:
- docs/lessons/2026-05-14-anthropic-credit-silent-fallback-v18.md
- TODOS.md v1.8 데이터 신뢰성 경고
- CHANGELOG.md W22 운영 노트 섹션

후속 fix-incident heavy 권장 action:
1. ANTHROPIC API key 잔여 credit + HTTP 인증 직접 테스트
2. postview path agentsFailed 가시화 (PR #372 동일 패턴 확장)
3. Sentry captureException 직접 호출 (Cloudflare Workers console 흐름 확인)
4. /accuracy 페이지 fallback 비율 가시화

관련:
- PR #372 (cycle 362) — pre_game agentsFailed 부분 가시화
- CLAUDE.md 드리프트 사례 6 (관측 인프라 silent 실패) — 동일 family
- cycle 359 retro "v1.8 첫날 정상" 보고가 fire 이전 진단이라 fallback 은폐

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
