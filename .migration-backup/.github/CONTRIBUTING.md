# Contributing to Clothing Shop

Thank you for your interest in contributing! 🎉

## 🌊 GitFlow Workflow

We use **GitFlow**. Please read [docs/GITFLOW.md](../docs/GITFLOW.md) before contributing.

### Branch Naming

| Type | Pattern | Targets |
|------|---------|---------|
| New feature | `feature/<name>` | `develop` |
| Bug fix (non-critical) | `bugfix/<name>` | `develop` |
| Critical production fix | `hotfix/<name>` | `main` |
| Planned release | `release/<version>` | `main` |

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

# Examples:
feat(cart): add quantity selector to cart item
fix(auth): prevent refresh token reuse after logout
chore(deps): update drizzle-orm to 0.37.0
docs(readme): add local development steps
```

**Valid types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`

## 🛠️ Local Development

```bash
# 1. Clone & install
git clone https://github.com/Mostafa-SAID7/clothing-shop.git
cd clothing-shop
pnpm install

# 2. Create a feature branch off develop
git checkout develop && git pull origin develop
git checkout -b feature/your-feature-name

# 3. Start dev servers
cd backend && pnpm dev    # http://localhost:3001
cd frontend && pnpm dev   # http://localhost:5173

# 4. Before pushing — verify builds pass
pnpm --filter clothing-shop-backend typecheck
pnpm --filter clothing-shop-frontend typecheck

# 5. Push & open PR targeting develop
git push origin feature/your-feature-name
```

## ✅ PR Checklist

Before opening a pull request, confirm:

- [ ] Branch targets `develop` (not `main`)
- [ ] Commit messages follow Conventional Commits
- [ ] `typecheck` passes on both backend & frontend
- [ ] `build` passes on both backend & frontend
- [ ] No new `console.log` statements left in production code
- [ ] No secrets or `.env` values committed

## 🤝 Code of Conduct

Be respectful and constructive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/).
