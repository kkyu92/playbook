# [monitoring] Supabase/Cloudflare gateway 502/522 → Sentry "select failed" HTML noise

**날짜**: 2026-07-23
**발생 파일**: `kkyu92/moneyballscore` — `home.getWeekAheadSchedule` / `home.getSeasonAccuracy` / `home.getRecentWeeksAccuracy` (Supabase select 호출부)
**관련 PR/커밋**: hub issue #2913 (2026-07-21), #3055 (2026-07-23) — 원본 raw: `raw-sources/_archive/20260529-*`, `20260721-*`, `20260723-*`
**재발 여부**: 4건 재발 (2026-05-29 × 2건 동시, 2026-07-21, 2026-07-23)

## 문제

`SentryUptimeBot` 이 `GET /` 헬스체크 시 Supabase select 쿼리가 JSON 대신 Cloudflare/Supabase 게이트웨이 에러 페이지(HTML)를 반환. 에러 메시지가 `select failed: <!DOCTYPE html>...` 형태로 통째 HTML 을 담아 Sentry 로 전파 → 매번 새 fingerprint 로 hub inbound incident 생성 (raw 텍스트가 매번 달라 fingerprint 가 안정적으로 dedup 안 됨).

관측된 두 하위 유형:
- `502 Bad Gateway` (cloudflare) — 2026-05-29 (getWeekAheadSchedule, getSeasonAccuracy 동시 발생)
- `522 Connection timed out` (supabase.co ↔ cloudflare) — 2026-07-21 (getRecentWeeksAccuracy), 2026-07-23 (getWeekAheadSchedule)

## 원인

Supabase 프로젝트(`utmimgpccbrciwuuacyw.supabase.co`)와 Cloudflare 엣지 사이 연결이 간헐적으로 timeout/502 — Supabase 측 리소스 콜드스타트 또는 일시적 네트워크 혼잡으로 추정. 애플리케이션 코드 버그 아님 — 외부 인프라 blip. `SentryUptimeBot` 이 이 순간에 정확히 hit 하면 에러가 캡처됨 (실사용자 트래픽 영향은 미확인 — 4건 모두 `browser: SentryUptimeBot`).

## 해결

코드 수정 불요 (외부 인프라 일시 장애). 대응은 관측/노이즈 감소 레이어:

1. **hub 쪽 fast-triage**: 향후 `select failed: <!DOCTYPE html>` 또는 `<html>` 로 시작하는 본문 + `browser: SentryUptimeBot` 태그 조합이면 본 solution 참조 후 close (원인 조사 불필요, 재조사 비용 절감)
2. **moneyball 쪽 권장 (사용자 결정 영역)**: Sentry 쪽에서 이 fingerprint 패턴(HTML 응답 + SentryUptimeBot)에 대한 inbound alert 자체를 억제하거나, select 래퍼에 짧은 1회 retry 추가 검토 — 단, 4건/2개월 빈도로 긴급성 낮음

## 사전 탐지 방법

```bash
grep -l "select failed.*<!DOCTYPE html>\|select failed.*<html>" raw-sources/_archive/*.md
```
본 grep 이 걸리면 신규 조사 없이 본 문서 참조.

## 체크리스트

- [ ] raw 본문이 `select failed:` 다음 HTML 로 시작하는가?
- [ ] `browser` 태그가 `SentryUptimeBot` 인가?
- [ ] 둘 다 YES → 본 solution 참조 close. NO (실제 JSON/데이터 페이로드 등 다른 형태) → 별도 조사 (예: 2026-07-23 #3054 는 `getSeasonAccuracy` 가 정상 데이터 payload 를 에러 메시지로 감싸 로깅하는 별도 버그 — 본 패턴과 무관, moneyball 앱 코드 조사 필요)

## 관련

- Wiki entry 없음 (재발 빈도 낮아 wiki 승격 불필요 — solution 레벨로 충분)
- 다른 solution: `docs/solutions/ci-github-actions/2026-05-08-moneyball-silent-drift-mockresult-type.md` (같은 moneyball inbound 채널, 다른 근본 원인)
- 원본 이슈: playbook #2913, #3055 (close 시 본 문서 링크)
