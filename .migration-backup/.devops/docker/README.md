# Docker Configuration

## Build and Run

```bash
# Build image
docker build -f .devops/docker/Dockerfile -t clothing-shop:latest .

# Run with docker-compose
docker-compose -f .devops/docker/docker-compose.yml up -d

# Stop containers
docker-compose -f .devops/docker/docker-compose.yml down
```

## Multi-stage Build

The Dockerfile uses multi-stage builds for optimization:

1. **deps** - Install dependencies
2. **builder** - Build the application
3. **runner** - Production runtime

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
