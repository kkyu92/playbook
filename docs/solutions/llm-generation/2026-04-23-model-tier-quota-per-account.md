---
title: 신규 Google 계정 — legacy 모델 free tier quota 0 할당
date: 2026-04-23
category: llm-generation
confidence: 3
tags: [gemini, rate-limit, account-tier, debugging-methodology]
connections:
  - content/harness-engineering/question-own-defaults.mdx
  - content/harness-engineering/drift-detection-methodology.mdx
  - docs/solutions/llm-generation/_compiled-truth.md
---

## 증상

- FALLBACK_2 키 (방금 만든 신규 Gmail 계정, AI Studio 활성화 완료) 로 `gemini-2.0-flash` 호출 시 첫 호출부터 HTTP 429
- 에러 body: `"Quota exceeded for metric: ...generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash"`
- 동일 계정의 `gemini-2.5-flash` 호출은 HTTP 200 정상
- listModels (read-only) 는 HTTP 200, 50개 모델 접근 가능

## 초기 오진단 (이전 세션)

"free tier 자격 자체 없음 (`limit: 0` = 자격 없음)" 으로 결론 → 해결 후보로 billing 등록 / region 문제 제시.

**오진단 원인**:
- `limit: 0` 의 의미를 **자격 없음** 으로 해석 (실제는 **해당 quotaId 한도가 0**)
- `Please retry in 41.999778801s` retry-after 를 간과 (영구 거부라면 retry-after 없음)
- 여러 모델로 cross-test 생략 (gemini-2.0-flash 만 테스트)

## 정확한 원인

Google 이 **신규 계정의 project 에 대해 legacy 모델 (gemini-2.0-flash) free tier quota 를 0 으로 할당**. Sunset 로드맵의 일환.

- 기존 계정 (PRIMARY/FALLBACK) 은 grandfather 로 2.0-flash quota 유지
- 신규 계정 (FALLBACK_2) 은 최신 2.5-flash 만 free tier quota 받음
- 같은 quotaId (`GenerateRequestsPerDayPerProjectPerModel-FreeTier`), 같은 `FreeTier` 정책 — 계정 자격 차이 아니라 **모델별 quota 할당량 차이**

확증 증거:
```
FALLBACK_2 결과:
- listModels: HTTP 200 (50 models accessible) ← auth OK
- gemini-2.5-flash: HTTP 200 ← free tier quota 있음
- gemini-2.0-flash: HTTP 429 limit:0 ← quota 0 할당
- gemini-1.5-flash: HTTP 404 NOT_FOUND ← 완전 deprecated
```

## 진단 체크리스트 (재발 방지)

신규 API key 가 429/limit:0 로 즉시 거부될 때:

1. **listModels 먼저** (GET /v1beta/models?key=$KEY)
   - 200 + 모델 목록 → auth/API enable 정상. quota 문제로 한정
   - 401/403 → 키 invalid 또는 API disabled (진짜 자격 문제)

2. **다른 최신 모델 cross-test** (gemini-2.5-flash, gemini-2.5-pro 등)
   - 최신 모델은 200, legacy 만 429 → **모델별 quota 할당 차이 (본 케이스)**
   - 모든 모델 429 → project-level free tier 문제 (billing, region 등)

3. **retry-after 해석**
   - RetryInfo.retryDelay 값 존재 → quota 구조 존재 (rate limit 의 일종)
   - 없음 → 진짜 거부 (PERMISSION_DENIED 등)

4. **quotaId 확인**
   - `*-FreeTier` suffix → free tier 내 quota 부족
   - `*-PaidTier` → 유료 전환 후 한도 초과
   - 없음 → 다른 종류 에러

## 조치

`scripts/lib/gemini-client.mjs`:
```js
// 변경 전
const MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"];

// 변경 후
const MODELS = ["gemini-2.5-flash"];
```

이유: 2.0-flash fallback 유지하면 FALLBACK_2 에서 항상 실패. 모든 키가 2.5-flash 로 작동하므로 통일이 미래지향적. 2.5-flash RPD 도 2.0-flash 과 유사 수준이라 기존 키 용량 손실 무시 가능.

## 일반화 교훈

- **외부 API quota 정책은 시간축 기반** — 같은 메시지 (`limit: 0`) 가 "자격 없음" vs "모델별 sunset" 등 다른 의미로 변할 수 있음
- **신규 vs 기존 계정 이중 정책** — 기존 키만 테스트하면 "작동"이 "신규 키도 작동함"을 보장 안 함
- **listModels 는 공짜 진단**: read-only, quota 무관. 새 키 검증 시 첫 단계로 호출
- **cross-model 테스트는 quota 0 의 의미 구분에 필수** — 최신 모델 1개라도 작동하면 "자격 없음" 배제

## 연결

- [question-own-defaults](../../content/harness-engineering/question-own-defaults.mdx) — "`limit: 0` = 자격 없음" 은 상속된 해석. 재검토 시 다른 의미 가능성 flag 필요.
- [drift-detection-methodology](../../content/harness-engineering/drift-detection-methodology.mdx) — Level 2 (머지 후) 검증 시 **외부 의존 정책 변경** 은 코드 drift 밖의 위험. 정기적 cross-test 필요.
