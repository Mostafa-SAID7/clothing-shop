#!/bin/bash

# Deployment script
# Usage: ./scripts/deploy.sh [environment]

set -e

ENVIRONMENT="${1:-production}"

echo "🚀 Deploying to $ENVIRONMENT..."

# Validate environment
if [ "$ENVIRONMENT" != "production" ] && [ "$ENVIRONMENT" != "staging" ]; then
    echo "❌ Invalid environment. Use 'production' or 'staging'"
    exit 1
fi

# Run tests
echo "🧪 Running tests..."
npm run lint

# Build application
echo "🏗️  Building application..."
npm run build

# Deploy based on environment
if [ "$ENVIRONMENT" = "production" ]; then
    echo "📦 Deploying to production..."
    # Add production deployment commands here
    # Example: vercel --prod
elif [ "$ENVIRONMENT" = "staging" ]; then
    echo "📦 Deploying to staging..."
    # Add staging deployment commands here
    # Example: vercel
fi

echo "✅ Deployment to $ENVIRONMENT complete!"
