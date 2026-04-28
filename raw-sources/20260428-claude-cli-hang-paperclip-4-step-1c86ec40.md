---
date: "2026-04-28"
source: "kkyu92/blog-autopilot"
type: "worker-lesson"
payload_type: "lesson"
---


4/28 새벽 cron run 25010381167이 fact-checker 단계에서 1h47m+ stuck → 진단부터
근본해결까지 단일 세션 회고. 4 commits + 15 issue close 통합.

## 증상
- auto-publish run 25010381167 schedule trigger (4/28 02:41 KST), job 22:20 UTC 시작 (4h39m 큐 대기)
- step 7 (auto-publish.ts) 1h47m in_progress, runner busy 다음 cron 차단
- 9 슬롯 중 5개 발행 후 6번째 (AS "여의도 재건축") fact-checker stuck
- jsonl mtime 정지 + process CPU 5% / TCP 0 connection — idle stuck

## 근본 원인
4-step root cause 발견:

1. **claude CLI spawn timeout 부재** — `src/lib/llm.ts:65 spawnClaudeOnce()` 가 `child.on('close')`만 대기. close 이벤트 안 오면 무한 hang. healthcheck.ts:101 pingClaudeCli만 timeout race 있고 hot-path는 빠짐. 비대칭.
2. **dedup prompt false negative** — semantic-dedup LLM이 sub-angle 변형 ("여의도 재건축 추진 현황" vs "여의도 재건축 맨해튼 벨트 전망")을 다른 토픽으로 판단. 28/29 cannibalization.
3. **WS trends 큐 풀 부족** — Google daily trends 단일 의존. 봄/계절 키워드만 한정 → semantic dedup 100% 차단 (run 25026708984 WS×1 fail).
4. **stateless LLM call 한계** — paperclip 시절 trend-hunter agent는 자체 메모리로 cannibalization 차단했지만 blog-autopilot은 매번 fresh call → agent가 이전 발행 모름. dedup layer 분리로 layer 사이 새는 케이스 발생.

## 근본해결 (4 commits)

- `9278f58` fix(llm): spawnClaudeOnce timeoutMs (default 600s) + SIGTERM, 5s 후 SIGKILL escalate. editor.ts factcheck try/catch (soft-degrade for slot isolation)
- `ca004b9` fix(semantic-dedup): 지명+토픽 sub-angle 변형 무관 차단 룰 추가, 4/28 사고 케이스 prompt에 few-shot 박제. "확신 없으면 중복 아님" 정책을 지명+토픽 케이스만 "확신 없어도 중복"으로 변경.
- `420b85d` feat(trends): paperclip 안정성 복원
  - A: pickQueue opts에 `recent_published_keywords` 추가 → auto-publish가 30일 발행 키워드 inject. agent 출력 단계 1차 차단.
  - B: wellness-news.ts (헬스조선/메디파나/정책브리핑/Google News 건강·의약) + travel-news.ts (여행신문/정책브리핑/Google News 여행·숙박항공·시즌) 5-source aggregators. AS realestate-news.ts 패턴 차용.

## 회수 흐름

1. Phase 1: 외부 삭제 (Blogger 29 + WordPress 31) + DB row cleanup → 8개 → 7개
2. Phase 2: dedup prompt 강화 + AS×1 재dispatch → post 32 ("공덕역 자이르네 청약") → AS 3/3
3. Phase 3: A+B 적용 + WS×1 재dispatch → post 33 ("식욕억제제 부작용") → WS 3/3 → 9개 (3-3-3 균형) 도달
4. Phase 4: 15 issue close (silent-fail 2 + queue-exhausted 3 + auto-discard 9 + JSON wrapper 1)

## 적용 가치

- **외부 CLI spawn은 timeout 필수** — child.on('close') 대기만으로는 hang 시 무한 대기. healthcheck/hot-path 비대칭 주의.
- **dedup prompt에 사고 케이스 few-shot 박제** — LLM 약점 보완. "false positive보다 false negative 안전" 정책은 지명+토픽 케이스에서 cannibalization 위험 더 큼.
- **stateless LLM call에 stateful agent 효과를 input으로 보완** — recent inject + 다양 source aggregator. paperclip의 heartbeat 인프라 없어도 동등 안정성 확보 가능.
- **niche 전용 source aggregator 패턴** — AS realestate 5-source가 검증된 모델. WS/TS도 동일 구조 (5 source, Promise.allSettled, 시간 윈도우 + dedup + sort)로 확장 자연스러움.

## 발견 컨텍스트

blog-autopilot Phase 1 MVP 100% + 1주 관찰 첫날 (2026-04-28). 자연 cron 첫 실 운영에서
4-step 약점 노출. paperclip → blog-autopilot 마이그레이션 시 stateful agent 인프라
미이전이 핵심 약점이었으며, stateless LLM call에 input 다양화 + recent inject로 동등
안정성 확보 가능함을 검증. 1주 관찰 (5/4 회고) 데이터 기반으로 추가 보강 (trends
post-extraction validation) 결정 예정.

## hub 통합

submit-lesson workflow가 main의 lesson: prefix commit을 감지 → kkyu92/playbook
으로 dispatch → playbook journal #009 자동 ingest 예상.
