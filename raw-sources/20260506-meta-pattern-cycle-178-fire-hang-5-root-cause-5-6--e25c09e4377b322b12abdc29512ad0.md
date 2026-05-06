---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e25c09e4377b322b12abdc29512ad01c0b07f855"
---


subtype: meta-pattern
cycle_n: 178

pattern: 운영 incident 의 root cause 식별이 capture file read 부재 시 표면 신호 (watch.log entry)
  만으로 잘못된 진단 도출. 본 cycle = 6번째 시도서 fire-hang capture 5건 read 후 진짜 root cause
  식별 — 5번 시도에서 모두 다른 가설 (warm-up race / claude TUI init 지연 / SessionStart hook
  다수 / etc.) 만 박제, capture file 안 본 채.

evidence (cycle list):
  - cycle 90 (10:43): fire-hang capture 생성, root cause 미식별
  - cycle 83 (12:11): 두 번째 fire-hang capture, 미식별
  - cycle 64 (15:45): 세 번째, 미식별
  - cycle 63 (15:59): 네 번째, 미식별
  - cycle 45 (19:07): 다섯 번째 + token rate limit 추가, 미식별
  - cycle 178 (20:30): 본 cycle 사용자 manual 개입 후 6번째 시도 = capture file 5건 read
    → root cause 식별 (handoff load AskUserQuestion in auto-fire env)

5번째 미식별 → 6번째 PASS 의 차이:
  - 1~5번째: watch.log 의 'FIRE_HANG cycle=N elapsed=305s — 새 claude 진단 단계 진입
    못함 (warm-up race?)' 표면 메시지만 보고 진단. capture 파일 file size 8KB, 매 발생
    시 자동 생성됐으나 read X
  - 6번째: 사용자 manual fire 후 '사용량 때문' 추측 → 메인이 모든 capture 5건 tail 80
    line read → 4건 모두 AskUserQuestion 옵션 1~5 띄운 채 멈춤 + 1건만 rate limit
    → 진짜 root cause 식별

recommendation:
  fire-hang capture 자동 생성된 후 다음 fire 시 watch.sh 가 capture 마지막 30 line grep
  → 'AskUserQuestion' 또는 'hit your limit' 패턴 detect → notify_fail 메시지 분리
  ('handoff hang' / 'rate limit') 출력. 또는 develop-cycle 진단 단계 첫 step 에서
  ~/.develop-cycle/fire-hang-*.log 직전 5건 자동 read.

  본 fix 는 cycle 179+ carry-over.

R5 정정 evidence 7건째 (체크포인트 주장 검증 부족):
  본 메인이 watch.log 만 보고 사용자 첫 질문 ('사용량 때문에 멈춘거야?') 에
  'warm-up race' 라고 즉답. capture file read 안 한 채. 사용자가 capture 5건 명시적
  요청 후 read → 4건 다른 원인 / 1건만 사용자 추측 정확. R5 정정 누적 1~6건 모두
  'capture/log/migration/code 실제 read 안 한 채 즉답' 패턴 — 본 cycle 도 동일.
  evidence 7건째.

prev R5 정정 cycle: 47 (cycle 49 표 기준), 81 (shared @types/node), 83 (postview LLM
  모킹), 126 (3 stale carry-over), 131/132 (silent drift family R5), 178 (본 cycle).
