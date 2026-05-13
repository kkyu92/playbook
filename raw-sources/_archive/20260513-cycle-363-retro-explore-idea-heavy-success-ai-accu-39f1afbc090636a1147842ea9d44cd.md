---
date: "2026-05-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "39f1afbc090636a1147842ea9d44cd9cfb44c6af"
---


subtype: cycle-retro
cycle_n: 363
chain_selected: explore-idea heavy
outcome: success
commit: cad1929
tests: 357/357

retro.summary: buildVersionHistory() 순수 함수 + ModelVersionHistory 컴포넌트 신규 구현. /accuracy 페이지에 'AI 모델 버전별 성과' 섹션 추가. v1.5~v1.8 4개 버전 정확도/Brier/CI/기간/변경내용 가시화.

key_findings:
- scoring_rule 필드가 predictions 테이블에 존재하나 UI 미활용 상태였음
- v1.6(46건,37%) vs v1.5(16건,75%) 성능 하락 사용자 직접 확인 가능
- PredRow 인터페이스 확장(optional scoring_rule) — 기존 함수 시그니처 변경 없음
- ModelVersionHistory hasData=false 시 null — 초기 데이터 없을 때 섹션 숨김

next_recommended_chain: review-code lite

lesson: TODOS 가시화 항목은 기존 DB 데이터 + 순수 함수 패턴으로 빠르게 구현 가능. scoring_rule 처럼 이미 있는 데이터를 UI에 연결하는 작업은 신규 인프라 없이도 가치 전달 가능.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
