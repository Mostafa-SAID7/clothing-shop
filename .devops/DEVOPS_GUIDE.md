# 🚀 Complete DevOps Guide

## 📁 Organized Structure

```
.devops/
├── docker/                      # Docker configurations
│   ├── Dockerfile              # Multi-stage production build
│   ├── docker-compose.yml      # Local development orchestration
│   ├── .dockerignore           # Build optimization
│   ├── nginx.conf              # Reverse proxy configuration
│   └── README.md               # Docker documentation
│
├── kubernetes/                  # Kubernetes manifests
│   ├── base/                   # Base configurations
│   │   ├── deployment.yaml     # Main deployment
│   │   ├── secrets.example.yaml
│   │   └── kustomization.yaml
│   ├── overlays/               # Environment-specific configs
│   │   ├── staging/
│   │   │   └── kustomization.yaml
│   │   └── production/
│   │       └── kustomization.yaml
│   └── helm/                   # Helm charts (future)
│
├── terraform/                   # Infrastructure as Code
│   ├── main.tf                 # Main Terraform config
│   ├── variables.tf            # Variable definitions
│   ├── modules/                # Reusable modules
│   └── environments/           # Environment configs
│
├── scripts/                     # Automation scripts
│   ├── setup/
│   │   └── dev-setup.sh       # Complete dev environment setup
│   ├── docker/
│   │   ├── build.sh           # Build Docker images
│   │   └── push.sh            # Push to registry
│   ├── deploy/
│   │   └── deploy.sh          # Automated deployment
│   ├── monitoring/
│   │   └── health-check.sh    # Health monitoring
│   └── backup/
│       └── backup-db.sh       # Database backups
│
└── monitoring/                  # Monitoring configurations
    ├── prometheus/
    │   └── prometheus.yml      # Metrics collection
    └── grafana/
        └── dashboards/         # Pre-built dashboards
            └── app-dashboard.json
```

## 🔄 Automated CI/CD Workflows

### 1. **auto-deploy.yml** - Complete Deployment Pipeline
- Triggers on push to main/develop or manual dispatch
- Builds, tests, and deploys automatically
- Environment-aware (staging/production)
- Docker image building and pushing
- Kubernetes deployment with health checks

### 2. **docker.yml** - Container Build & Security
- Multi-platform builds (amd64, arm64)
- Pushes to GitHub Container Registry
- Trivy security scanning
- Automated vulnerability reporting

### 3. **code-review.yml** - Quality Assurance
- ESLint and TypeScript checks
- Security scanning
- Build verification
- Automated PR comments

### 4. **security.yml** - Security Monitoring
- Dependency audits
- Secret detection with TruffleHog
- CodeQL analysis
- Weekly scheduled scans

### 5. **lighthouse.yml** - Performance Monitoring
- Automated performance audits
- Weekly performance reports
- PR performance comparisons

### 6. **release.yml** - Release Management
- Automated changelog generation
- GitHub releases on version tags
- Docker image tagging

### 7. **stale.yml** - Issue Management
- Auto-marks stale issues/PRs
- Configurable timeouts
- Exempt labels support

### 8. **pr-size-labeler.yml** - PR Organization
- Auto-labels PRs by size
- Warns on large PRs

## 🛠️ Quick Start Commands

### Development Setup
```bash
# Complete environment setup
./.devops/scripts/setup/dev-setup.sh

# Start development server
npm run dev
```

### Docker Operations
```bash
# Build Docker image
./.devops/scripts/docker/build.sh latest

# Run with docker-compose
docker-compose -f .devops/docker/docker-compose.yml up -d

# Push to registry
./.devops/scripts/docker/push.sh ghcr.io/mostafa-said7 latest
```

### Kubernetes Deployment
```bash
# Deploy to staging
kubectl apply -k .devops/kubernetes/overlays/staging

# Deploy to production
kubectl apply -k .devops/kubernetes/overlays/production

# Check deployment status
kubectl rollout status deployment/clothing-shop -n production
```

### Automated Deployment
```bash
# Deploy to staging
./.devops/scripts/deploy/deploy.sh staging

# Deploy to production
./.devops/scripts/deploy/deploy.sh production
```

### Monitoring & Health Checks
```bash
# Run health check
./.devops/scripts/monitoring/health-check.sh https://your-app.com

# Backup database
./.devops/scripts/backup/backup-db.sh production
```

## 🔐 Required Secrets

Configure these in GitHub Settings → Secrets:

### Application Secrets
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key

### Deployment Secrets (Optional)
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

### Infrastructure Secrets (Optional)
- `KUBE_CONFIG` - Kubernetes configuration
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key

## 📊 Monitoring Stack

### Prometheus
- Metrics collection from application
- Custom metrics support
- Alert rules configuration

### Grafana
- Pre-built dashboards
- Real-time monitoring
- Custom visualizations

## 🔄 Deployment Flow

### Staging Deployment (develop branch)
1. Push to `develop` branch
2. Auto-deploy workflow triggers
3. Runs tests and linting
4. Builds Docker image
5. Deploys to staging namespace
6. Runs health checks

### Production Deployment (main branch)
1. Merge to `main` branch
2. Auto-deploy workflow triggers
3. Runs comprehensive tests
4. Builds production Docker image
5. Deploys to production namespace
6. Runs health checks
7. Monitors rollout

### Manual Deployment
```bash
# Trigger via GitHub Actions UI
# Or use deployment script
./.devops/scripts/deploy/deploy.sh production
```

## 🏗️ Infrastructure as Code

### Terraform
```bash
# Initialize Terraform
cd .devops/terraform
terraform init

# Plan changes
terraform plan

# Apply changes
terraform apply
```

## 📈 Scaling

### Horizontal Pod Autoscaler
- Configured in `deployment.yaml`
- Scales based on CPU/Memory
- Min: 2 replicas, Max: 10 replicas

### Manual Scaling
```bash
# Scale deployment
kubectl scale deployment/clothing-shop --replicas=5 -n production
```

## 🔍 Troubleshooting

### Check Logs
```bash
# Application logs
kubectl logs -f deployment/clothing-shop -n production

# Previous container logs
kubectl logs deployment/clothing-shop -n production --previous
```

### Debug Pod
```bash
# Get pod status
kubectl get pods -n production

# Describe pod
kubectl describe pod <pod-name> -n production

# Execute into pod
kubectl exec -it <pod-name> -n production -- /bin/sh
```

### Rollback Deployment
```bash
# Rollback to previous version
kubectl rollout undo deployment/clothing-shop -n production

# Rollback to specific revision
kubectl rollout undo deployment/clothing-shop -n production --to-revision=2
```

## 🎯 Best Practices

1. **Always test in staging first**
2. **Use feature branches for development**
3. **Keep secrets in environment variables**
4. **Monitor application metrics**
5. **Regular backups**
6. **Security scans before deployment**
7. **Use semantic versioning for releases**
8. **Document infrastructure changes**

## 📚 Additional Resources

- [Docker Documentation](./docker/README.md)
- [Kubernetes Best Practices](https://kubernetes.io/docs/concepts/configuration/overview/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Actions](https://docs.github.com/en/actions)

## 🆘 Support

For issues or questions:
1. Check existing documentation
2. Review GitHub Issues
3. Contact DevOps team
4. Create new issue with detailed information
