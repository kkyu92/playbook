---
date: "2026-11-02"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "3eee2c052ba4337873d17ff81028b34a73389623"
---


subtype: lesson
cycle: 3910
fingerprint: ci-main-5b865b4ea63ce55bd2da41
fingerprint: ci-main-6c37991cdef87bfb156824
fingerprint: ci-main-3a0110cc324c7dbb70e3f1

사례: hub incident #5295/#5310/#5313 (2026-10-28 07:54~08:13Z) = main CI run 40653065043/40654979843/40655249536 실패.
원인: `combo-check-data.test.ts` loadAllPicks 가 CI 부하(suite 수분) 중 vitest 기본 5000ms timeout 초과. 로컬 1.4s.
대응: cycle 3907 에서 timeout 30s 완화(8906d3b3). 3 run 모두 동일 FAIL 라인 실측.
교훈: fingerprint 가 lesson 과 매칭되려면 lesson commit body 에 fingerprint 명시 필요. flake 는 fix 커밋만으론 reminder 안 닫힘.

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
