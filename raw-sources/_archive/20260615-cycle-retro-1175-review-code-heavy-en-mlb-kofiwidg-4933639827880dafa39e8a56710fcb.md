---
date: "2026-06-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "4933639827880dafa39e8a56710fcb7d15a7d190"
---


subtype: cycle-retro
cycle: 1175
chain: review-code (heavy, /en/mlb shared widget i18n audit)
outcome: success
pr: 1966
commit: eb93f1c

cycle 1174 Breadcrumb 홈→Home fix 후속 audit. /en/mlb 11 pages
직접 import 한 shared 4 컴포넌트 클린 확인 후 broader pivot —
root layout 상속 path 통해 KofiWidget ('MoneyBall Score 후원하기')
+ PWAInstallButton (6 strings: 앱으로 설치/설치/나중에/홈 화면에 추가...
/aria 앱 설치 안내/aria 닫기) Korean silent leak 발견 + fix.

usePathname() client-side locale detect 패턴 박제 (cycle 1174
Breadcrumb locale prop 패턴 client 위젯 variant). 영문 사용자
/en/mlb 진입 후 PWA install prompt 발화 또는 Ko-fi notice 호버 시
한국어 노출 차단.

테스트: PWAInstallButton 영문 locale 렌더 검증 추가 (test #986,
total 985 → 986). type-check + R7 auto-merge active.

silent drift family streak: cycle 458 → 1175 = 717 cycle 누적.
next_rec: polish-ui (lite) — heavy=success 직후 → lite 권장
(chain table 룰).
