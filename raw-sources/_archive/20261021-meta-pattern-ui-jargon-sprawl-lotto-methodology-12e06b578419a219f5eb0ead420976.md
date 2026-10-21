---
date: "2026-10-21"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "12e06b578419a219f5eb0ead4209763d04452f3a"
---


subtype: meta-pattern
cycle: 3513

패턴: cycle 3513 review-code(heavy) 가 feedback_ui_copy_no_dev_jargon 메모리 룰의
공식 grep 감사 스크립트를 실행한 결과, 금지어 "실측" (룰 원문 치환 예시에 명시)이
사용자 가시 텍스트에 다음 파일들에 걸쳐 수십 건 잔존 확인:
- apps/moneyball/src/app/glossary/data.ts (range/source 필드, 3건+)
- apps/moneyball/src/app/glossary/page.tsx (2건)
- apps/moneyball/src/app/mlb/methodology/page.tsx (2건)
- apps/moneyball/src/app/mlb/factors/page.tsx (1건, rendered — 별도로 2건 comment 제외)
- apps/moneyball/src/app/mlb/players/page.tsx + [id]/page.tsx (3건)
- en/ 트윈 라우트에도 "Scraper:" 영문 노출 동형 패턴 존재 (en/mlb/players/page.tsx,
  en/mlb/players/[id]/page.tsx)

근본 원인: "실측"(실제 측정값) vs "모델 추정값" 대비가 glossary/methodology 컨텐츠의
핵심 개념 축이라 단순 치환("실제 수치") 시 의미/톤 일관성 깨질 위험 있어, cycle 3513
"박제" 치환(12파일, 기계적 1:1 교체로 완결)과 달리 신중한 문맥별 재작성이 필요함 —
단일 사이클 범위 밖으로 판단해 별도 dispatch.

추가 발견: apps/moneyball/src/app/lotto/methodology/page.tsx "사이클 진행 history"
섹션(라인 449-494)이 "develop-cycle skill", "chain fire", "chain trigger 조건
(chain pool table)" 등 raw 운영 엔지니어링 용어를 그대로 렌더링 — 의도된 "운영
투명성" 기능(lottoData.chain_fire_history 실데이터 노출)이나, 일반 사용자 기준
copy 품질 미달. 재작성 시 "자동화 시스템" / "실행 결과" / "다음 추천 작업" 같은
사용자 언어로 순화 필요, UI/UX 자체(테이블/details 구조)는 유지 가능.

추천 행동: 다음 review-code(heavy) 또는 polish-ui cycle 에서 전담 scope 로
(1) "실측" 계열 문맥별 재작성 (glossary/methodology/mlb, 의미 보존 우선)
(2) lotto/methodology 운영 jargon 섹션 재작성
두 항목을 별도 커밋으로 처리 권장 — 동시에 섞으면 리뷰 난이도 상승.
