---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "91db6564ecf7e1916b67245e4a2bbeb09f0f95f4"
---


subtype: cycle-retro
cycle_n: 419
chain_selected: fix-incident (heavy)
outcome: success

trigger:
  - 사용자 자연 발화 "다음 cycle 세션 sonnet 말고 opus 로"
  - 본 session header "Sonnet 4.6" = settings.json "model": "opus" 무시 evidence

fix (3 spawn path):
  1. ~/.develop-cycle/watch.sh ensure_session fallback (line 67): `command claude` → `command claude --model opus`
  2. ~/.develop-cycle/watch.sh fire 시퀀스: /develop-cycle send 전에 /model opus + sleep 2 (안전망)
  3. ~/.zshrc mcc alias bash while loop: `caffeinate -i command claude` → `--model opus`

verify:
  - bash -n watch.sh PASS
  - 실측 검증 = 다음 cycle 11 fire 시 새 claude header "Opus 4.7" 확인 (zero-touch chain 안 자연 검증)

next_recommended: review-code (heavy) 또는 explore-idea (lite) (cycle 418 next_rec 계승)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
