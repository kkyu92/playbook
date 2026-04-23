# /gemini-smoke-test — Gemini API 키 smoke test

신규 Gemini 키 추가 또는 quota 정책 변경 의심 시 실행. 각 키 × (gemini-2.5-flash 주모델 + gemini-2.0-flash legacy) 조합으로 모델별 quota 할당 차이 감지.

## 언제 쓰나

- 신규 키 등록 직후 (GEMINI_API_KEY_FALLBACK_N)
- daily-ingest 가 키 하나 완전 실패 의심 (health cron Issue 확인 후)
- Google 이 모델 sunset 공지 → 기존 키들도 legacy quota 박탈 의심

일상 모니터링은 `gemini-key-health.yml` daily cron 이 자동 수행. 이 커맨드는 **심층 진단**.

## 실행 순서

1. GitHub Actions 에서 `smoke-test-gemini-keys.yml` workflow_dispatch 실행:
   ```bash
   gh workflow run smoke-test-gemini-keys.yml
   ```

2. 완료 대기 + 로그 파싱:
   ```bash
   # 최근 run id 확보
   RUN_ID=$(gh run list --workflow smoke-test-gemini-keys.yml --limit 1 --json databaseId -q '.[0].databaseId')

   # 완료 대기
   until [ "$(gh run view "$RUN_ID" --json status -q .status)" = "completed" ]; do sleep 5; done

   # 요약 로그 출력 (✅ / ⚠️ / ❌ 만 필터)
   gh run view "$RUN_ID" --log 2>&1 | grep -E "(===|✅|⚠️|❌|::error|listModels)" | head -60
   ```

3. 결과 해석:
   - **주 모델 (gemini-2.5-flash) 200**: 키 정상. 이것만 있으면 실사용 OK
   - **주 모델 limit:0**: quota 0 할당. billing / region / tier 박탈 의심. 해당 키 복구 불가 시 secret 제거
   - **legacy (gemini-2.0-flash) limit:0**: 신규 계정 정상. `gemini-client.mjs` MODELS 에 2.0 없으면 무관
   - **listModels 401/403**: 키 invalid 또는 API disabled. 진짜 자격 문제

4. ❌ 감지 시 후속 조치:
   - `docs/solutions/llm-generation/2026-04-23-model-tier-quota-per-account.md` 체크리스트 참조
   - 해당 키 AI Studio 에서 재발급 또는 다른 계정 키로 교체
   - 교체 후 이 커맨드 재실행

## 관련 자산

- `.github/workflows/smoke-test-gemini-keys.yml` — 포괄 smoke (수동)
- `.github/workflows/gemini-key-health.yml` — 간단 health (daily cron, Issue 자동)
- `scripts/lib/gemini-client.mjs` — 현재 사용 모델 및 key rotation 로직
- `docs/solutions/llm-generation/2026-04-23-model-tier-quota-per-account.md` — 진단 체크리스트 원본
