---
date: "2026-05-23"
source: "kkyu92/blog-autopilot"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "e38d7e1702763dd011e2e3fc5d1b91c55ec14031"
---


사례:
  2026-05-22 issue #97, #98 issue-agent.yml 실행 시 연속 401 실패.
  log: ANTHROPIC_API_KEY: (빈값), CLAUDE_CODE_OAUTH_TOKEN: *** (설정은 있음).
  에러: "Failed to authenticate. API Error: 401 Invalid authentication credentials"

원인:
  CLAUDE_CODE_OAUTH_TOKEN 은 2026-05-02 등록. Claude Code OAuth token ~24h expire 특성.
  memory feedback_oauth_token_rotation_risk.md 정합 — accessToken ~24h expire.
  issue-agent.yml 은 ANTHROPIC_API_KEY 를 env 로 inject 하지 않고 oauth_token 만 사용.
  oauth token 만료 시 자동 갱신 없음 → 401 영구 fail.

대응:
  workflow yaml 수정 = 사용자 GO 영역.
  옵션 A: ANTHROPIC_API_KEY secret 추가 후 issue-agent.yml 에 api_key 사용 전환.
  옵션 B: CLAUDE_CODE_OAUTH_TOKEN 수동 갱신 (단기 — ~24h 후 재발).
  옵션 C: issue-agent.yml 을 ANTHROPIC_API_KEY 기반으로 전환 (장기 안정).

박제 위치:
  lesson (blog-autopilot domain) — 2회+ 재발 시 docs/solutions/ 승격 대상.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
