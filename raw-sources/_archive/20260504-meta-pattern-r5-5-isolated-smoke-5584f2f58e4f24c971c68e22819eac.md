---
date: "2026-05-04"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5584f2f58e4f24c971c68e22819eac582b4636e1"
---


subtype: meta-pattern
pattern: 본 메인이 isolated smoke 통과 = fix 충분 가정 → 실측 fire 단계에서 fail 발견 → R5 정정 박제
누적: 5건 (임계 충족)

evidence:
  - cycle 25/26: "watch.sh fire 검증됐다" → cycle 33 진단 시 거짓 발각 (PPID chain fix)
  - cycle 39+40: "base PR 자동 fire 작동" → cycle 41: 거짓 발각 (fire 시퀀스 fix)
  - cycle 41: "fire 시퀀스 검증됐다" → cycle 42 first fire 21:42: 거짓 발각 (hotfix 진행)
  - cycle 42.5 hotfix: "smoke + SIGINT survival 통과 = fix 충분" → cycle 42.5 22:06 second fire: 거짓 발각 (cycle 43 본 fix)
  - cycle 42.5 ensure_session: "session 검증 충분" → cycle 43 본 진단: 거짓 발각 (pane wrapper 검증 추가)

공통 메커니즘:
  - isolated smoke = 환경 격리 + 단일 명령 측정 = 실제 사용자 환경 (mcc wrapper / 기존 tmux pane / 누적 state) 미반영
  - 본 메인이 "smoke PASS = fix 충분" 자가 신뢰 → 실측 fire 환경에서 fail 발견
  - 사용자 자연 발화 ("또 종료됐어 / 1+2+3 자동? / 한거야?") 만 가짜 신뢰 차단 가능

recommendation:
  - fix-incident chain stop 조건 강화: isolated smoke PASS + 실제 fire 1회 PASS 후 success 박제
  - 단순 isolated smoke PASS = success 박제 절대 X (가짜 신뢰 차단)
  - cycle 45 = 본 패턴의 진짜 검증 시점 (cycle 43 fix 실측 fire PASS 박제)
  - 본 패턴은 chain-evolution X (기존 fix-incident chain의 stop 조건 강화)

cycle 45 박제: cycle 43 fix 실측 PASS 진짜 검증 — 본 메인이 cycle 42.5 hotfix에서
"smoke 통과 = 충분" 자가 신뢰 벗어남. cycle 43 본 fix는 실제 사용자 raw pane에서
ABORT 검증 + 22:42:33 자동 fire send-keys fail 0건 = 진짜 PASS.

다음 사이클 (cycle 46+) carry-over: 본 패턴 인지 → fix-incident chain success 박제
시 실제 fire 1회 PASS 증거 함께 박제 룰 적용.
