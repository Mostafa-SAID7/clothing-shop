#!/bin/bash

# Docker build script
# Usage: ./.devops/scripts/docker/build.sh [tag]

set -e

TAG="${1:-latest}"
IMAGE_NAME="clothing-shop"
DOCKERFILE=".devops/docker/Dockerfile"

echo "🐳 Building Docker image: $IMAGE_NAME:$TAG"

# Build image
docker build \
  -f "$DOCKERFILE" \
  -t "$IMAGE_NAME:$TAG" \
  --build-arg NODE_ENV=production \
  .

echo "✅ Docker image built successfully: $IMAGE_NAME:$TAG"

# Show image size
docker images "$IMAGE_NAME:$TAG" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

echo ""
echo "📝 Next steps:"
echo "   docker run -p 3000:3000 $IMAGE_NAME:$TAG"
echo "   docker-compose -f .devops/docker/docker-compose.yml up"
