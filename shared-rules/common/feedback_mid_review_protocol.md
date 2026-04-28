---
name: mid-review-protocol
description: 허브-워커 mid-review 사이클의 측정 산식 + self-report 차원 + 동기화 프로토콜. 단순 정적 baseline 이 아닌 정적+velocity+acceleration 시간축 vector. 8+7 차원 분리 (infra/learning).
type: feedback
---
허브 (Playbook) 가 양방향 무한성장 자동화 진척을 측정하는 산식. Karpathy 닫힌 루프 4단계 × Push/Pull = 8 차원 (infra) + codex 추가 7 차원 (learning) = 15 차원 vector.

**Why:** 첫 mid-review (2026-04-28) 에서 발견 — 허브 단독 측정은 self-deception (blog-autopilot 빈 dir 같은 환상). 워커 self-report 통합이 정직한 baseline. 또 정적 % 평균은 fake metric 위험 (channel 작동 ≠ 학습). velocity + acceleration 시간축 vector 가 무한성장의 자연 측정.

**How to apply:**

## 측정 산식 D'

**8 차원 (infrastructure lens)** — Karpathy 닫힌 루프 4단계 × Push/Pull:
1. Push 입력 (허브가 워커에게 보낼 무언가의 발생 감지)
2. Push 처리 (감지된 변경의 가공/정리)
3. Push 출력 (워커 메모리에 도달/적용)
4. Push 피드백 (적용된 rule 의 효과 측정)
5. Pull 입력 (워커 사고/lesson/CI 실패 발생 감지)
6. Pull 처리 (감지된 input 의 가공/ingest)
7. Pull 출력 (가공된 entry 의 위키 박제)
8. Pull 피드백 (박힌 entry 의 효과 측정)

**7 차원 (learning lens — codex 추가)**:
9. 루프 폐쇄 시간 (incident → lesson → policy → 재배포)
10. 교훈 전환율 (incident 중 lesson 변환 %)
11. 교훈 재사용률 (워커 lesson → 허브/타워커 역수입 %)
12. 측정 가능성 KPI (측정 가능 차원 / 전체)
13. 즉시성 채널 (Push instant trigger)
14. 도메인 성능 보존율 (자동화가 본업 성능 망치는지)
15. 침묵 탐지율 ("아무 일도 없음" 자체 실패 감지)

**시간축 차원**:
- 정적 (현재 시점 baseline)
- velocity (단위 시간당 진척)
- acceleration (velocity 변화율)

→ **무한성장 = velocity > 0 + acceleration ≥ 0 지속**. 평균 % 폐기.

## 워커 self-report 4 차원

mid-review 트리거 시 워커는 hub-dispatch Issue 로 4 차원 self-report:

1. **Push 받기 효과** — 동기화 latency, sync 실패 수, rule 실 적용 횟수
2. **Push 피드백** — 회귀 신호 (rule 이 prevent 했어야 할 사고), 개선 신호 (rule 적용으로 회피한 사고)
3. **Pull 보내기** — Sentry/CI/Cron/Lesson 채널별 자동 발화 빈도
4. **Pull 자기 개선** — 자율 PR 수, 자기 코드 리팩토링, memory feedback 자가 갱신

## 채널

- label: `mid-review` (재사용 — 다음 사이클 동일 label)
- ~~`hub-dispatch`~~ — 의미 중복으로 제거 (mid-review 자체가 specific)
- 발행 명령:
```bash
gh issue create -R kkyu92/playbook \
  --title "[mid-review] $(basename $(pwd)) self-report 4 차원" \
  --label "mid-review" \
  --body "..."
```

## 트리거

mid-review trigger 시:
- 허브: 8+7 차원 baseline 측정 (자동 가능 차원 + manual 측정 차원)
- 워커: 4 차원 self-report 발행
- 통합: 허브가 워커 Issue 자동 fetch → vector 통합

다음 mid-review 시점:
- E2 (closed loop 자동 회전) ✅ 후: 매주 자동
- 그 전: 1-2주 manual + deferred 항목 정합 시점

## 측정 불가 차원 정직 명시

정량화 불가 차원은 *"측정 불가"* 명시. 거짓 데이터 X.
- Sentry MCP 인증 안 된 워커 = 측정 불가
- 도메인 성능 측정 도구 없는 워커 = 측정 불가
→ "측정 가능성 KPI" 차원 자체가 별도 측정값.

## 자기 위안 방지

평균 % 한 숫자 (예: "37.25%") 는 fake metric. 진짜 신호:
- velocity 음수 차원 (감속)
- acceleration 음수 차원 (점점 더 감속)
- 측정 불가 차원 (blind)
- 도메인 성능 회귀 (자동화가 본업 망침)

이 4개가 평균보다 중요.

## 출처

- 첫 적용: `content/reports/mid-review-2026-04-28.mdx`
- CEO plan: `~/.gstack/projects/kkyu92-playbook/ceo-plans/2026-04-28-mid-review-phase4-closed-loop.md`
- codex framing: 4-28 mid-review Phase 2a consult
