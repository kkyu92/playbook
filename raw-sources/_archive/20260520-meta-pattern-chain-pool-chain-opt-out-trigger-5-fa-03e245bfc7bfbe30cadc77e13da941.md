---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "03e245bfc7bfbe30cadc77e13da9419f5ac11aa7"
---


subtype: meta-pattern
pattern_name: chain-pool-new-chain-immediate-permanent-optout
evidence_cycles:
  - cycle 422: 표본 임계 (≥10) 박제 — chain pool 외 차원 batch 분모 왜곡 차단
  - cycle 436: inclusive 윈도우 N-19..N 박제 — 진단 단계 자연 fire 후 retro 단계 1-cycle 중복 차단
  - cycle 484: polish-ui cooldown N=10 박제 — cycle 68 룰 작동
  - cycle 512: explore-idea cooldown 단독 박제 — 만료 후 0회 재발 = 불충분 evidence
  - cycle 525: explore-idea 영구 opt-out 박제 — 외부 source 의존 chain 본질
  - cycle 774: lotto 영구 opt-out 박제 — chain pool 갓 추가 시점 구조적 false positive 차단

pattern description:
chain pool 에 새 chain 정식 박제 시점 (cycle 772 lotto chain-evolution) 직후 trigger 5 평가 도달 (cycle 773 retro) 시 새 chain 0회 발화는 구조적으로 강제됨. 2 cycle 만에 20-cycle 윈도우 채울 수 없기 때문. cooldown 만료 대기 (cycle 68 룰) 적용 시 10 사이클 모두 trigger 5 fire → marker → forced skill-evolution → marker 제거 후 자연 발화 0회 재발 → cycle 525 패턴 (외부 source 의존) 동일. cycle 525 evidence 가 cooldown→재발 패턴이라면, cycle 774 evidence 는 직접 즉시 opt-out 인정 패턴.

조건 (즉시 영구 opt-out 박제):
1. chain 자체 주기 보정 trigger 보유 (예: lotto 30-cycle gap, explore-idea improvement saturation 직전 15 사이클 ≥ 12회, op-analysis 25-cycle, fix-incident 20-cycle, info-arch 30-cycle)
2. 외부 source 의존 (사용자 발화 / 외부 주기 / GH issue) — 진단 단계 자체 source 측정 약함
3. chain pool 신규 추가 시점부터 자체 trigger 가 fire 보장 → trigger 5 중복 검사 noise

위 3 조건 동시 충족 시 cooldown 만료 대기 X — 즉시 영구 opt-out 박제.

추가 evidence X — 명시적 source 보유 chain (polish-ui = DESIGN.md token grep / review-code = 큰 파일 monolith / 주석 mismatch grep) 는 cooldown 만료 후 자연 회복 가능 (cycle 484 → 495+ 6회 자연 fire). 명시적 source 보유 chain 은 영구 opt-out X.

영향:
- trigger 5 평가 시 opt-out 8개 (dimension-cycle / expand-scope / design-system / operational-analysis / fix-incident / info-architecture-review / explore-idea / lotto) — 다음 chain pool 신규 추가 시 본 패턴 적용 검토
- 평가 대상 review-code / polish-ui 2개 — 명시적 source 보유 chain 한정 평가
- 표본 임계 regex 갱신 (chain pool slug 갱신 시 함께 갱신)
- chain pool 신규 chain 추가 시 즉시 opt-out 판단 기준 명확화 (3 조건)

recommendation:
- 향후 chain pool 신규 추가 시 위 3 조건 평가 의무화
- 3 조건 동시 충족 시 chain-evolution dispatch 시점에 trigger 5 opt-out 함께 박제 (cooldown 우회)
- SKILL.md line 70/424 갱신 패턴 정형화

다음 milestone = cycle 800 (26 cycle 거리, trigger 3). 본 패턴 후속 fire (lotto 31-cycle gap = cycle 803 자체 trigger 6 자연 fire 예정) 시 즉시 opt-out 적정성 재검증 가능.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
