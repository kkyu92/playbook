---
date: "2026-05-22"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "ca83c4ab2b49485542c057553552e697b6485bca"
---


subtype: cycle-retro
cycle_n: 866
chain_selected: fix-incident (heavy, review-code-discovered — lite /health mid-discovery redirect)
outcome: success
next_recommended_chain: review-code (heavy, sweep 44)

silent drift family 사례 13 (ESLint runtime silent) 신규 발견 + 본 cycle 안 fix.
review-code (lite) /health 자체 진단 baseline measurement 중 `pnpm lint` EXIT 2
`TypeError: expand is not a function` 발견. 16 consecutive CI failures cycle 859→866
green 복귀.

root cause: cycle 859 PR #1216 의 brace-expansion >=5.0.6 전역 pnpm.overrides 가
minimatch@3.1.5 (transitive eslint-config-next>...>typescript-estree) 의
brace-expansion ^1.1.7 resolution 도 5.0.6 으로 강제 swap. brace-expansion@5.x
ESM-only → minimatch CommonJS require expand=undefined → ESLint config-array
doMatch 호출 시 throw.

fix: pnpm.overrides path-based + version-pinned override 박제 —
minimatch@3>brace-expansion ^1.1.14 + brace-expansion@<1.1.12 >=1.1.14 +
@2|3|4|5 각 메이저 patched 강제. CVE-2026-45149 4 advisory 의도 유지 + lint
runtime 정정.

verification: pnpm lint 3/3 PASS / pnpm audit 0 advisory / pnpm test 537 passed
/ minimatch@3.1.5 symlink → brace-expansion@1.1.14 정정.

빌드 시스템 silent layer 3번째 evidence (사례 10 Turbopack + 사례 12 ORM column
+ 사례 13 ESLint runtime). cycle 864 op-analysis-discovered 패턴 정합 mid-cycle
chain redirect 2번째 evidence.

todos_added:
- carry-over: cycle 859 PR test plan pnpm lint 검증 step 누락 R5 메타 패턴 재발 — 세션 시작 시 필수 스캔에 직전 CI 결과 확인 step 추가 검토
- carry-over: 16 consecutive CI fail silent 머지 evidence — R7 auto-merge required check 미설정 가능성 진단 (사용자 영역 GitHub branch protection)
- carry-over: 사례 13 CLAUDE.md 본문 박제 = 다음 review-code heavy sweep 44 candidate
