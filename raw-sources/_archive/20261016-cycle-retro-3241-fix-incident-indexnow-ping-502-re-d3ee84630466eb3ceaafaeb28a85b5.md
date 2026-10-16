---
date: "2026-10-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d3ee84630466eb3ceaafaeb28a85b5f711e3dd22"
---


subtype: cycle-retro
cycle_n: 3241
chain_selected: fix-incident
outcome: success

진단: open issue 0건, approved plan 0건. 직전8(3234-3241) distinct=4(review-code(heavy)/polish-ui/expand-scope/info-architecture-review) — 2-chain lock 미충족. fix-incident 20-cycle gap trigger(7) 도달(마지막 발화 cycle 3217, gap=24). gh run list --status failure 실측: health-alert/heartbeat-stale/deploy-drift-alert 반복 실패는 기존 Supabase DNS 단절 인시던트(2026-10-11, Tier4 블락) 재확인일 뿐 신규 아님. indexnow-ping 은 2026-10-14부터 연속 HTTP 502 — 신규 regression으로 분리 확인.

발견+수정: 라이브 curl 진단에서 `/[indexnowKey].txt` 라우트가 정답 key 로도 404 (x-matched-path: /_not-found) — Vercel 이 이 dynamic 라우트를 edge routing manifest 에 아예 등록 안 함. Bing IndexNow ownership 검증이 cycle 772 최초 구현 이후 계속 실패해왔으나, 과거 ping route 의 silent-200-swallow 버그(a5e61e7f)에 가려 cron 실패로 드러나지 않다가 그 fix 이후 502 로 노출된 것. generateStaticParams() + dynamicParams=false 로 static(●) 빌드 전환 — robots.txt/sitemap.xml 과 동일 서빙 경로로 수정. 빌드 중 fallback-404 prerender 패스의 params undefined 크래시는 (await params) ?? {} 방어로 해결.

regression: pnpm build 라우트 심볼 ƒ→● 확인, vitest 6+6 tests PASS, tsc --noEmit clean. PR #3153 생성 + R7 --squash --auto --delete-branch → state=MERGED 실측 확인(293f3fe1).

carry-over: 다음 indexnow-ping cron 실행(내일 05-07시 KST) 결과 확인 필요 — ok:true 전환 여부. 여전히 403 SiteVerificationNotCompleted 면 Bing 쪽 재검증 대기시간 또는 추가 원인 조사.

다음 사이클 추천 = review-code(heavy) app/ 잔여 스코프(accuracy+analysis+matchup+methodology+predictions 클러스터) 또는 info-arch(1/30)/lotto(27/30) gap 자연 대기. op-analysis는 Supabase 복구 전까지 계속 블락.
