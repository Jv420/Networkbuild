#!/usr/bin/env bash

# Dynathi Resource Manager Example
# Public-safe example script.
# Goal: stop low-priority compute containers when CPU/RAM gets high.

set -euo pipefail

CPU_LIMIT_PERCENT="80"
RAM_LIMIT_PERCENT="80"
CHECK_INTERVAL_SECONDS="30"
LOW_PRIORITY_CONTAINERS=("example-compute-node" "example-batch-worker")

get_cpu_usage() {
  top -bn1 | awk '/Cpu/ {print 100 - $8}' | cut -d'.' -f1
}

get_ram_usage() {
  free | awk '/Mem:/ {printf("%.0f", $3/$2 * 100)}'
}

stop_low_priority() {
  for container in "${LOW_PRIORITY_CONTAINERS[@]}"; do
    if docker ps --format '{{.Names}}' | grep -q "^${container}$"; then
      echo "Stopping low-priority container: ${container}"
      docker stop "${container}" || true
    fi
  done
}

start_low_priority() {
  for container in "${LOW_PRIORITY_CONTAINERS[@]}"; do
    if docker ps -a --format '{{.Names}}' | grep -q "^${container}$"; then
      if ! docker ps --format '{{.Names}}' | grep -q "^${container}$"; then
        echo "Starting low-priority container: ${container}"
        docker start "${container}" || true
      fi
    fi
  done
}

while true; do
  CPU_USAGE=$(get_cpu_usage)
  RAM_USAGE=$(get_ram_usage)

  echo "CPU: ${CPU_USAGE}% | RAM: ${RAM_USAGE}%"

  if [ "${CPU_USAGE}" -ge "${CPU_LIMIT_PERCENT}" ] || [ "${RAM_USAGE}" -ge "${RAM_LIMIT_PERCENT}" ]; then
    echo "High load detected. Pausing low-priority compute."
    stop_low_priority
  else
    echo "Load is OK. Low-priority compute may run."
    start_low_priority
  fi

  sleep "${CHECK_INTERVAL_SECONDS}"
done
