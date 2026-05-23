#!/bin/bash

# Comprehensive health check script
# Usage: ./.devops/scripts/monitoring/health-check.sh [url] [timeout]

set -e

URL="${1:-http://localhost:3000}"
TIMEOUT="${2:-30}"
INTERVAL=2

echo "🔍 Starting health check for $URL"
echo "⏱️  Timeout: ${TIMEOUT}s, Check interval: ${INTERVAL}s"

START_TIME=$(date +%s)

while true; do
    CURRENT_TIME=$(date +%s)
    ELAPSED=$((CURRENT_TIME - START_TIME))
    
    if [ $ELAPSED -ge $TIMEOUT ]; then
        echo "❌ Health check failed: Timeout after ${TIMEOUT}s"
        exit 1
    fi
    
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL" 2>/dev/null || echo "000")
    RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" "$URL" 2>/dev/null || echo "0")
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ Health check passed!"
        echo "   HTTP Status: $HTTP_CODE"
        echo "   Response Time: ${RESPONSE_TIME}s"
        echo "   Total Time: ${ELAPSED}s"
        exit 0
    fi
    
    echo "⏳ Attempt $((ELAPSED / INTERVAL + 1)): HTTP $HTTP_CODE (${ELAPSED}s elapsed)"
    sleep $INTERVAL
done
