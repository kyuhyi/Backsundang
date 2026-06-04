#!/bin/bash
set -euo pipefail

# 백선당 홈페이지 — Claude Code on the web 세션 시작 훅
# 의존성을 설치해 build / lint 가 세션 시작 직후 동작하도록 보장한다.

# 원격(웹) 환경에서만 실행
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# 컨테이너 캐시를 활용하기 위해 ci 대신 install 사용 (멱등)
npm install --no-audit --no-fund
