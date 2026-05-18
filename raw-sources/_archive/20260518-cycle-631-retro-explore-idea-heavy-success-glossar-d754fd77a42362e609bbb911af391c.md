---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d754fd77a42362e609bbb911af391ce4bd50d3a1"
---


subtype: cycle-retro
cycle_n: 631
chain_selected: explore-idea (heavy)
outcome: success
pr: 828
merge_hash: 87db361

trigger evidence:
- saturation trigger 8 (cycle 210 박제): 직전 15 cycle (616-630) review-code+fix-incident+polish-ui+info-arch = 12/15 ≥ 12 충족
- polish-ui 8/20 dominance — cycle 630 retro 직접 박제 "다양성 redirect 권장"
- carry-over evidence: cycle 629 retro "glossary/popover = B heavy 후속" 명시 (mobile touch 미노출 한계)
- cycle 623 spec candidate B = 글로서리 페이지 1개 신규 1 cycle closure 명시
- explore-idea 3/20 → 4/20 rotation

변경 (PR #828):
- /glossary 페이지 신규 — 4 카테고리 × 15 stat entry (투수 FIP/xFIP/불펜FIP / 타격 wOBA/wRC+/ISO/BB%/K% / 종합 WAR/SFR / 팀맥락 Elo/최근폼/상대전적/구장보정/홈어드밴티지). Breadcrumb + DefinedTermSet JSON-LD. 빠른 이동 pill 네비. DEFAULT_WEIGHTS source of truth.
- /about FACTORS 섹션 "용어 자세히 →" link 추가
- sitemap.ts /glossary 등록
- PredictionCard FIP / wOBA span → anchor link (mobile touch 가능, title attribute 유지, dotted underline visual hint)
- MatchupFactorCompare FactorRow.glossarySlug 추가 + label → anchor link 5개

가치:
- mobile touch 진입 가능 (cycle 629 retro carry-over 직접 해결)
- SEO long-tail "FIP 란 / wOBA 뜻 / Elo 레이팅" 검색 후보. DefinedTermSet schema 권위
- 비전문가 retention 진입 장벽 ↓
- 모델 가중치 source of truth = DEFAULT_WEIGHTS silent drift 가드 (가중치 변경 시 자동 갱신)

silent drift family streak 120 cycle 자연 연장 (cycle 625 SFR / 626 KBO 공식 API / 629 약어 tooltip / 630 라벨 시기 / 631 약어 entry path 박제 — factor 약어 비전문가 인지 gap closure 의 surface 5th 진화).

saturation break — 사용자 가치 surface 2번째 진입 (cycle 627 candidate A /accuracy sub-cohort 후 candidate B). cycle 623 박제 5 candidate (A 처리 / B 처리 / C 모바일 350px 잔존 / D Telegram 잔존 / E /predictions 필터 잔존) — 2/5 closure.

quality gate:
- type-check 3 tasks all pass
- lint 0 errors
- test 421 unit pass (43 files)

chain pool 분포 (612-631 = 20 cycle inclusive):
- polish-ui 8 / review-code 5 / explore-idea 4 / op-analysis 2 / info-arch 1 / fix-incident 1
- 2-chain alternation lock 미발동 (직전 8 distinct = 4)
- lite cap 모두 0 (정상 streak)

skill-evolution trigger 평가:
- trigger 1: chain-evolution commit 0/5 X
- trigger 2: 5회 연속 fail X (직전 5 cycle 모두 success)
- trigger 3: 631 % 50 = 31 X
- trigger 4: meta-pattern body N/A
- trigger 5: review-code 5 / explore-idea 4 / polish-ui 8 모두 ≥1 (표본=20) X
→ 정상 진행, 마커 박제 X

emergency stop: 9 success / 1 partial — 발동 X

next_recommended_chain: polish-ui (lite, C 모바일 350px design-review) 또는 review-code (heavy, silent drift family 추가 후보) 또는 operational-analysis (lite, n 신선도 12 cycle gap = 619 이후 측정 후보)

carry-over 갱신:
- 처리: candidate B 글로서리 heavy ✓
- 잔존: C (모바일 350px design-review) / D (Telegram 가독성) / E (/predictions 필터)

PASS_ship +1 (cycle 631).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
