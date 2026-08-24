---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "73daf7271c746547e0a682a7ed7f9763055518a9"
---


subtype: meta-pattern
cycle_n: 2515
trigger: explore-idea heavy 라운드 4회 연속 "no autonomous candidate" 결론 누적

## 패턴 description

explore-idea saturation trigger(직전 15 cycle 중 review-code/fix-incident/
polish-ui/info-arch ≥12)가 review-code(heavy) dominance 국면마다 반복 fire
하지만, 매번 자율 가능한 신규 product 후보를 찾지 못하고 "기존 소스 소진
재확인"으로 귀결되는 패턴이 4회 누적됨.

## 증거 (cycle_n list)

- cycle 2417 — EN/KO parity, JSON-LD 구조화 데이터(56 라우트), TODOS Next-Up
  재확인 모두 소진. `/login`/`/community` placeholder 발견 → risk=3 자율
  불가로 plan #29(Tier 4, 사용자 영역) 작성 후 보류.
- cycle 2477 — 공유 버튼 Kakao(외부 SDK 키 필요, Tier4), 관심팀 필터·푸시
  알림·PWA manifest·RSS feed 모두 기 구현 확인. 신규 후보 0건.
- cycle 2486 — 위 2회 재확인 + 4th source(동일 목록) 재탐색, 신규 없음
  재확인 (review-code(heavy) 계속 채택).
- cycle 2515(본 cycle) — KBO/MLB game-detail 컴포넌트 parity 신규 소스로
  탐색했으나, MLB shadow quant 전용 아키텍처(LLM debate 미실행)가 의도된
  설계임을 확인 — gap 아님.

## 원인 추정

리포가 explore-idea 관점에서 "저risk 자율 가능 신규 feature" 카테고리가
상당 부분 소진된 성숙 단계에 진입. 남은 후보(auth/community)는 명시적으로
risk=3 + 자율 불가로 Tier 4 분류돼 있어 사용자 결정 없이는 착수 불가.

## 추천 행동

1. explore-idea saturation trigger를 review-code dominance 완화용 다양성
   기제로 유지하되, "새 feature 발견"이 아닌 "기존 커버리지 재확인 +
   Tier4 후보 재평가 시점 확인"이 정상적인 정상(steady-state) 결과임을
   인정 — retro-only를 실패로 취급하지 않음(lite chain retro-only cap
   룰의 cooldown 대상에서 explore-idea heavy의 이런 "확인형" 결과는
   review 필요, 단 이번 cycle은 강제 lock 해소 목적이었으므로 cooldown
   적용 보류 권장).
2. plan #29(auth/community) 재평가 트리거(KBO 포스트시즌 일정 확정,
   ~9월 말~10월 초) 도달 전까지는 explore-idea heavy가 신규 소스를
   찾기 어려울 가능성 높음 — 다음 explore-idea fire 시 이 사실을
   먼저 인지하고 시간 낭비 최소화.

recommendation: SKILL.md 룰 변경 불필요(자연 steady-state 인정), 단
다음 skill-evolution 자가 진화 시 review-code 1개 평가 대상 대비
explore-idea 반복 소진 패턴도 참고 자료로 남김.
