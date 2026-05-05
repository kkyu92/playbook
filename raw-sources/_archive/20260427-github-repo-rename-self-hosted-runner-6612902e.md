---
date: "2026-04-27"
source: "kkyu92/blog-autopilot"
type: "worker-lesson"
payload_type: "lesson"
---


GitHub 레포 rename 후 self-hosted runner 가 옛 URL 로 계속 polling 하면 새 워크플로를 못 받음. 사후 재설정 필요.

## 증상
- gh repo rename 후 자연 cron 1회 miss 가능
- runner status 는 "online" 이지만 새 dispatch 가 큐에 쌓이기만 함

## 절차
1. gh repo rename (또는 web UI)
2. git remote set-url origin <새 URL>
3. ~/actions-runner/.runner 파일의 gitHubUrl 직접 갱신
   - **sed in-place 권장** (heredoc 재생성 시 첫 줄 BOM 손실 → runner crash)
4. launchctl unload + load (PID 갱신)
5. gh api repos/<owner>/<repo>/actions/runners 로 online 확인
6. workflow_dispatch healthcheck 1회 → 새 repo 인식 검증

## 발견 컨텍스트
blog-autopilot (구 content-autopilot) rename (2026-04-27).
cat > heredoc 패턴으로 .runner 재작성 시 UTF-8 BOM 손실 → runner 가 invalid config 로 인식해서 crash.
sed in-place 로 specific 문자열만 치환하는 게 안전.

## 적용 가치
- self-hosted runner 쓰는 모든 워커 (현재 blog-autopilot, 추후 silverstory)
- 별도 워커 구조에서 더 빈번
