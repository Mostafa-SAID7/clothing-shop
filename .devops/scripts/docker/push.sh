#!/bin/bash

# Docker push script
# Usage: ./.devops/scripts/docker/push.sh [registry] [tag]

set -e

REGISTRY="${1:-ghcr.io/mostafa-said7}"
TAG="${2:-latest}"
IMAGE_NAME="clothing-shop"

echo "📤 Pushing Docker image to registry..."

# Tag image
docker tag "$IMAGE_NAME:$TAG" "$REGISTRY/$IMAGE_NAME:$TAG"

# Push image
docker push "$REGISTRY/$IMAGE_NAME:$TAG"

echo "✅ Image pushed successfully: $REGISTRY/$IMAGE_NAME:$TAG"
