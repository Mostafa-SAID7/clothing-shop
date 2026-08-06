# GitFlow Workflow Specification

This document details the branching model, commit conventions, and deployment lifecycle implemented for the **Clothing Shop** repository.

---

## 🔀 Branch Hierarchy & Lifecycle

```
    main (Production)  ───────────────────────────────●  [Auto-deploys to Vercel Prod]
                                                      ▲
                                                      │  (Pull Request / Merge)
    develop (Staging)  ──────────●────────────────────●  [Auto-deploys to Staging]
                                 │                    ▲
                                 │ (Branch Out)       │
    feature/*          ──────────┴───────●────────────┘  [Feature Delivery]
```

### 1. `main` Branch
- **Purpose**: Represents production-ready state.
- **Rule**: Direct commits to `main` are restricted. All code enters `main` via pull requests from `develop` or emergency `hotfix/*` branches.

### 2. `develop` Branch
- **Purpose**: Central integration branch for current sprint development.
- **Rule**: All `feature/*` branches are merged into `develop` after passing automated typecheck and unit testing.

### 3. `feature/*` Branches
- **Naming Pattern**: `feature/<feature-name>` (e.g. `feature/stripe-checkout`)
- **Lifecycle**: Branch off `develop`, implement changes, issue PR to `develop`.

### 4. `bugfix/*` Branches
- **Naming Pattern**: `bugfix/<bug-description>` (e.g. `bugfix/cart-item-count`)
- **Lifecycle**: For non-critical bug fixes identified in staging.

### 5. `hotfix/*` Branches
- **Naming Pattern**: `hotfix/<critical-issue>` (e.g. `hotfix/jwt-expiration-crash`)
- **Lifecycle**: Branch off `main` for critical production fixes, merged into both `main` and `develop`.

---

## 📝 Conventional Commit Messages

All commit messages strictly adhere to the [Conventional Commits](https://www.conventionalcommits.org/) standard:

```text
<type>(<scope>): <short description>
```

### Standard Types:
| Type | Description |
| :--- | :--- |
| `feat` | Adding a new feature to the product |
| `fix` | Bug fix in code or configuration |
| `docs` | Documentation updates (README, docs/*.md) |
| `style` | Code formatting, semicolon fixes (no logical change) |
| `refactor` | Code refactoring without changing behavior |
| `chore` | Workspace, lockfiles, build scripts updates |

---

## 💻 CLI Commands & Daily Workflow

### Creating a Feature:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/user-profile
```

### Committing Changes:
```bash
git add .
git commit -m "feat(user): add user profile endpoint and edit modal"
```

### Pushing & Merging:
```bash
git push origin feature/user-profile
# Create Pull Request on GitHub to merge into 'develop'
```
