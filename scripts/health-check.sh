#!/bin/bash

# Health check script for the application
# Usage: ./scripts/health-check.sh [URL]

URL="${1:-http://localhost:3000}"
MAX_RETRIES=30
RETRY_INTERVAL=2

echo "🔍 Starting health check for $URL"

for i in $(seq 1 $MAX_RETRIES); do
  echo "Attempt $i/$MAX_RETRIES..."
  
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL" || echo "000")
  
  if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Health check passed! Application is running."
    exit 0
  fi
  
  if [ $i -lt $MAX_RETRIES ]; then
    echo "⏳ Waiting ${RETRY_INTERVAL}s before retry..."
    sleep $RETRY_INTERVAL
  fi
done

echo "❌ Health check failed after $MAX_RETRIES attempts."
exit 1
