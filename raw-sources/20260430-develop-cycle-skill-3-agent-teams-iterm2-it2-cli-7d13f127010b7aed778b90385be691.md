---
date: "2026-04-30"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7d13f127010b7aed778b90385be6919b91c681e6"
---


사용자 결정 (2026-04-30):
- 3 차원: site (사이트개선) / acquisition (사용자유입) / model (분석모듈·적중률)
- 1 cycle 1 차원 (Claude 자율 분배 — round-robin 또는 ROI)
- N = 사이클 수 (예: /develop-cycle 10 → 10 사이클, 차원 자율 분배)
- 풀 스캔 진단 / Claude 자율 분류 (auto/issue/skip)
- branch + PR 패턴 (develop-cycle/<slug>)
- 권한 전부 허용 (secrets / 100+ 파일만 예외)
- Agent Teams 실험 기능 활용 — 메인 리더 + 3 차원 팀원
- iTerm2 native 패널 분할 (it2 CLI 통한 tmux 호환 모드)
- 컨텍스트 60% 도달 시 handoff save 자동 제안

활성화 (~/.claude 글로벌, git 외):
- ~/.claude/settings.json: env CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 + teammateMode tmux
- ~/.claude/skills/develop-cycle/SKILL.md: 6 단계 사이클 명세 + 차원별 영역 분리 + skill 시퀀스
- it2 0.2.0 설치 (~/Library/Python/3.9/bin) + zshrc PATH 추가

사용자 수동 단계 (한 번만, 다음 세션 전):
1. iTerm2 → Settings → General → Magic → Enable Python API 활성화
2. 새 터미널 세션 (zshrc PATH 발효)
3. 새 Claude Code 세션 (settings.json 안전 적용)

시범 운행: 다음 세션에서 /develop-cycle 1 부터.

CLAUDE.md R6 섹션을 신 명세로 갱신. 자율 작업 정책 (이전 ⚠️ 사용자 확인) 은 사용자 권한 전부 허용 결정으로 단순화.
