---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "892303b7bf956bc7da282c16d73269cfc230d77c"
---


subtype: lesson
cycle: 1550

**P4** `ce-detection-scoring-rule-debate-version-hybrid`

**패턴**: CREDIT_EXHAUSTED (CE) cohort 판별 시 scoring_rule='v1.8-credit-fail'
단독 조건 부족. cohort-cleanup.ts 는 dry-run default + user confirm 후 write
2단계 → prod row 다수 backfill 미완료 잔존.

**증거** (cycle 1550 op-analysis heavy 축 A):
- scoring_rule='v1.8-credit-fail' n=25 만 (retrospective backfill 완료 row)
- scoring_rule='v1.8' AND debate_version IS NULL n=140 (강등 라벨 잔존)
- 실제 CE cohort n=165 = 위 두 조건 UNION

**올바른 CE 판별 SQL**:
```sql
SELECT * FROM predictions
WHERE prediction_type='pre_game'
  AND is_correct IS NOT NULL
  AND (
    scoring_rule='v1.8-credit-fail'
    OR (scoring_rule='v1.8' AND debate_version IS NULL)
  );
```

**부작용**:
- cycle 1545 P1 lesson 의 "CE 56.3% (71/126) / 비CE 66.7% (26/39)" 표본
  cycle 1447 시점 partial cohort — 신규 표본 반영 시 5.0pp 격차 축소 확인
- cohort-cleanup.ts --write 후속 fire 시 v1.8-credit-fail n 확장 예상
  (25 → 165 근처)

**대응**:
- 향후 CE analysis 는 hybrid 조건 사용 (script `op-analysis-ce-cohort.ts` L47)
- CLAUDE.md 갱신: CE 58.8% / 비CE 63.8% (cycle 1550, n=212)
- cohort-cleanup.ts --write 실행 여부 = 사용자 결정 carry-over
  (기존 grep signal false positive risk 검토 필요)

**연관**:
- P1 lesson (cycle 1545) — CE dilutes accuracy (본 P4 는 판별 조건 정정)
- P3 lesson (cycle 1545) — DB 필터 scoring_rule vs model_version
