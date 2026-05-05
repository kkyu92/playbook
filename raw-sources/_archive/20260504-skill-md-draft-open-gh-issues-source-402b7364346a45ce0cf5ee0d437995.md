---
date: "2026-05-04"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "402b7364346a45ce0cf5ee0d4379957eea11a6bf"
---


사용자 발화 = "N 파라미터 = 사이클 수, 이슈 갯수와 충돌. 횟수 무관 develop-cycle 호출 시 이슈 자동 처리". 진단 단계 첫 step 에 open issue 인지 + 자율 chain 매핑 명문화:

1. 매 사이클 첫 진단 = `gh issue list --state open --label hub-dispatch`
2. issue 있으면 → 1건 자율 선택 (body + label 보고 chain 매핑) → PR commit `Fixes #N` 박제 → R7 머지 시 자동 close
3. issue 0 = 기존 source (lint / Sentry / TODOS / metric)
4. N (사이클 수) vs issue 수 무관 — N=8 + issue 5 = 5 issue 처리 + 3 기존 source

5 chain 의 source row 모두 "open GH issues label hub-dispatch" 추가. 매핑 예 4건 박제 (PII / 레이스 컨디션 / kbo-cli / DO_NOT_TRACK). 본 fire 끝 후 사용자 cp 시 적용.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
