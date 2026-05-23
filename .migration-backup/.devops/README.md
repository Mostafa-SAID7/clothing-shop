# DevOps Infrastructure

This directory contains all DevOps-related configurations and automation scripts.

## 📁 Directory Structure

```
.devops/
├── docker/              # Docker configurations
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── .dockerignore
│   └── nginx.conf
├── kubernetes/          # Kubernetes manifests
│   ├── base/           # Base configurations
│   ├── overlays/       # Environment-specific overlays
│   └── helm/           # Helm charts
├── terraform/          # Infrastructure as Code
│   ├── modules/
│   └── environments/
├── scripts/            # Automation scripts
│   ├── setup/
│   ├── deploy/
│   ├── monitoring/
│   └── backup/
└── monitoring/         # Monitoring configurations
    ├── prometheus/
    └── grafana/
```

## 🚀 Quick Start

```bash
# Setup development environment
./scripts/setup/dev-setup.sh

# Build Docker image
./scripts/docker/build.sh

# Deploy to staging
./scripts/deploy/deploy.sh staging

# Deploy to production
./scripts/deploy/deploy.sh production
```

## 📚 Documentation

- [Docker Setup](./docker/README.md)
- [Kubernetes Deployment](./kubernetes/README.md)
- [CI/CD Pipeline](../.github/workflows/README.md)
- [Monitoring](./monitoring/README.md)
