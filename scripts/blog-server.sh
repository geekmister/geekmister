#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
PROJECT_ROOT="${REPO_ROOT}/blog"
PYTHON_BIN="${REPO_ROOT}/.venv/bin/python"
MANAGE_PY="${PROJECT_ROOT}/manage.py"
RUN_DIR="${REPO_ROOT}/.run"
PID_FILE="${RUN_DIR}/wagtail.pid"
LOG_FILE="${RUN_DIR}/wagtail.log"
HOST="0.0.0.0"
PORT="8000"

mkdir -p "${RUN_DIR}"

usage() {
  echo "Usage: $0 {start|stop|restart|status|logs}"
}

is_running() {
  if [[ -f "${PID_FILE}" ]]; then
    local pid
    pid="$(cat "${PID_FILE}")"
    if [[ -n "${pid}" ]] && kill -0 "${pid}" 2>/dev/null; then
      return 0
    fi
  fi
  return 1
}

port_pid() {
  lsof -t -iTCP:"${PORT}" -sTCP:LISTEN 2>/dev/null | head -n 1 || true
}

start_server() {
  if [[ ! -x "${PYTHON_BIN}" ]]; then
    echo "Python virtualenv not found: ${PYTHON_BIN}"
    echo "Please create .venv first: python -m venv .venv"
    exit 1
  fi

  if [[ ! -f "${MANAGE_PY}" ]]; then
    echo "manage.py not found: ${MANAGE_PY}"
    exit 1
  fi

  if is_running; then
    echo "Wagtail server is already running with PID $(cat "${PID_FILE}")"
    exit 0
  fi

  cd "${PROJECT_ROOT}"
  nohup "${PYTHON_BIN}" "${MANAGE_PY}" runserver "${HOST}:${PORT}" --noreload > "${LOG_FILE}" 2>&1 &
  local pid=$!
  echo "${pid}" > "${PID_FILE}"

  sleep 1
  if kill -0 "${pid}" 2>/dev/null; then
    echo "Wagtail server started (PID ${pid})"
    echo "URL: http://127.0.0.1:${PORT}"
    echo "Log: ${LOG_FILE}"
  else
    echo "Failed to start server. Check logs: ${LOG_FILE}"
    rm -f "${PID_FILE}"
    exit 1
  fi
}

stop_server() {
  local pid=""
  if is_running; then
    pid="$(cat "${PID_FILE}")"
  else
    pid="$(port_pid)"
  fi

  if [[ -z "${pid}" ]]; then
    echo "Wagtail server is not running"
    rm -f "${PID_FILE}"
    exit 0
  fi

  kill "${pid}" 2>/dev/null || true

  for _ in {1..10}; do
    if kill -0 "${pid}" 2>/dev/null; then
      sleep 1
    else
      rm -f "${PID_FILE}"
      echo "Wagtail server stopped"
      return
    fi
  done

  kill -9 "${pid}" 2>/dev/null || true
  rm -f "${PID_FILE}"
  echo "Wagtail server force stopped"
}

status_server() {
  if is_running; then
    echo "Wagtail server is running (PID $(cat "${PID_FILE}"))"
    echo "URL: http://127.0.0.1:${PORT}"
    return
  fi

  local pid
  pid="$(port_pid)"
  if [[ -n "${pid}" ]]; then
    echo "Wagtail server is running (PID ${pid})"
    echo "URL: http://127.0.0.1:${PORT}"
  else
    echo "Wagtail server is not running"
  fi
}

show_logs() {
  if [[ -f "${LOG_FILE}" ]]; then
    tail -n 100 "${LOG_FILE}"
  else
    echo "No logs found: ${LOG_FILE}"
  fi
}

cmd="${1:-}" 
case "${cmd}" in
  start)
    start_server
    ;;
  stop)
    stop_server
    ;;
  restart)
    stop_server
    start_server
    ;;
  status)
    status_server
    ;;
  logs)
    show_logs
    ;;
  *)
    usage
    exit 1
    ;;
esac
