#!/bin/bash

# Automated deployment script
# Usage: ./.devops/scripts/deploy/deploy.sh [environment]

set -e

ENVIRONMENT="${1:-staging}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

echo "🚀 Deploying to $ENVIRONMENT..."

# Validate environment
case "$ENVIRONMENT" in
  staging|production)
    echo "✅ Valid environment: $ENVIRONMENT"
    ;;
  *)
    echo "❌ Invalid environment. Use 'staging' or 'production'"
    exit 1
    ;;
esac

# Pre-deployment checks
echo "🔍 Running pre-deployment checks..."

# Check if we're on the right branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$ENVIRONMENT" = "production" ] && [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Warning: Deploying to production from branch '$CURRENT_BRANCH'"
    read -p "Continue? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Run tests
echo "🧪 Running tests..."
cd "$PROJECT_ROOT"
npm run lint || { echo "❌ Linting failed"; exit 1; }

# Build application
echo "🏗️  Building application..."
npm run build || { echo "❌ Build failed"; exit 1; }

# Deploy based on environment
if [ "$ENVIRONMENT" = "production" ]; then
    echo "📦 Deploying to production..."
    
    # Build and push Docker image
    "$SCRIPT_DIR/../docker/build.sh" "v$(date +%Y%m%d-%H%M%S)"
    
    # Apply Kubernetes manifests
    kubectl apply -k "$PROJECT_ROOT/.devops/kubernetes/overlays/production"
    
    # Wait for rollout
    kubectl rollout status deployment/clothing-shop -n production
    
elif [ "$ENVIRONMENT" = "staging" ]; then
    echo "📦 Deploying to staging..."
    
    # Build and push Docker image
    "$SCRIPT_DIR/../docker/build.sh" "staging-$(date +%Y%m%d-%H%M%S)"
    
    # Apply Kubernetes manifests
    kubectl apply -k "$PROJECT_ROOT/.devops/kubernetes/overlays/staging"
    
    # Wait for rollout
    kubectl rollout status deployment/clothing-shop -n staging
fi

echo "✅ Deployment to $ENVIRONMENT complete!"
echo ""
echo "📝 Post-deployment:"
echo "   - Check application health"
echo "   - Monitor logs"
echo "   - Run smoke tests"
