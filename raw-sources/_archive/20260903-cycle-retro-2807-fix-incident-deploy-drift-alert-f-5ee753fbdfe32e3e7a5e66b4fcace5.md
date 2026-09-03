---
date: "2026-09-03"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5ee753fbdfe32e3e7a5e66b4fcace5a6542ee241"
---


subtype: cycle-retro
cycle: 2807
chain_selected: fix-incident
outcome: success

Vercel API 조회로 09-02 23:58 이후 3커밋(4cecd8e0/12d585a6/fe1deb19)에 대응하는
git-source 배포가 완전 누락됨을 확인(webhook silent non-delivery). 수동 재배포
(dpl_fgH5erwfUh)로 production alias 를 main HEAD 로 복구. curl /api/version +
gh workflow run deploy-drift-alert.yml 양쪽 실측 PASS 확인.

과거 cycle 2777/2791 이 유사 패턴을 self-healed 로 종결했으나, 이번엔 실제
production drift 를 API 증거로 재검증 후 조치 — 과거 결론을 blind reuse 하지 않음.

코드 변경 없음(인프라 수동 복구). 근본원인(webhook delivery gap) 은 미확정 —
다음 실제 push 시 git-source 배포 재개 여부 확인 필요.
