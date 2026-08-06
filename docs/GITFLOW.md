# GitFlow Workflow Guide

This document describes the GitFlow branching strategy used in the Clothing Shop project for managing features, releases, and hotfixes.

## Overview

GitFlow is a branching model that provides a robust framework for managing releases and features. It uses specific branch types for different purposes:

- **main**: Production-ready code (stable releases)
- **develop**: Integration branch for features (next release)
- **feature/**: Feature development branches
- **release/**: Release preparation branches
- **hotfix/**: Emergency fixes for production issues

## Branch Structure

```
main (production)
  ↑
  └─ hotfix/issue-name (emergency fixes)
  
develop (integration)
  ↑
  ├─ feature/feature-name (feature development)
  ├─ feature/another-feature
  └─ release/version (release preparation)
```

## Branch Naming Conventions

### Feature Branches
```
feature/user-authentication
feature/shopping-cart
feature/product-filtering
```

### Release Branches
```
release/1.0.0
release/2.1.0
release/2.5.0
```

### Hotfix Branches
```
hotfix/critical-bug-fix
hotfix/payment-issue
hotfix/security-vulnerability
```

### Bugfix Branches
```
bugfix/navbar-styling
bugfix/checkout-error
```

## Workflow Steps

### 1. Starting a New Feature

Create a feature branch from `develop`:

```bash
# Update develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name

# Push to remote
git push -u origin feature/your-feature-name
```

### 2. Developing a Feature

Work on your feature locally:

```bash
# Make changes
git add .
git commit -m "feat: implement user authentication"

# Push changes regularly
git push origin feature/your-feature-name
```

### 3. Creating a Pull Request

When feature is ready:

1. Push all changes to remote
2. Go to GitHub repository
3. Create Pull Request from `feature/your-feature-name` → `develop`
4. Fill in PR description with:
   - What changes were made
   - Why the changes were made
   - Testing performed
   - Related issues (if any)
5. Request code review
6. Address review comments
7. Get approval

### 4. Merging into Develop

After PR approval:

```bash
# Merge will be done via GitHub UI
# Option 1: GitHub UI merge with "Create a merge commit"
# Option 2: Command line merge

git checkout develop
git pull origin develop
git merge feature/your-feature-name
git push origin develop
```

### 5. Starting a Release

When you're ready to release a new version:

```bash
# Update develop
git checkout develop
git pull origin develop

# Create release branch
git checkout -b release/1.0.0

# Update version numbers in:
# - package.json
# - frontend/package.json
# - Any other version references

git add .
git commit -m "chore(release): bump version to 1.0.0"
git push -u origin release/1.0.0
```

### 6. Release Testing and Fixes

On the release branch, only fix bugs and update documentation:

```bash
# Make bug fixes (NOT new features)
git add .
git commit -m "fix: resolve checkout issue for release"
git push origin release/1.0.0
```

### 7. Finishing a Release

When release is ready:

```bash
# 1. Merge release branch into main
git checkout main
git pull origin main
git merge release/1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main
git push origin v1.0.0

# 2. Merge release branch back into develop
git checkout develop
git pull origin develop
git merge release/1.0.0
git push origin develop

# 3. Delete release branch
git branch -d release/1.0.0
git push origin --delete release/1.0.0
```

### 8. Hotfixes for Production

When a critical bug is found in production:

```bash
# Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue

# Fix the bug
git add .
git commit -m "fix(critical): resolve payment processing issue"
git push -u origin hotfix/critical-issue
```

### 9. Finishing a Hotfix

```bash
# 1. Merge hotfix into main
git checkout main
git pull origin main
git merge hotfix/critical-issue
git tag -a v1.0.1 -m "Hotfix version 1.0.1"
git push origin main
git push origin v1.0.1

# 2. Merge hotfix into develop
git checkout develop
git pull origin develop
git merge hotfix/critical-issue
git push origin develop

# 3. Delete hotfix branch
git branch -d hotfix/critical-issue
git push origin --delete hotfix/critical-issue
```

## Commit Message Format

Follow this format for clear commit history:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (no logic)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions/changes
- `chore`: Build/config/dependencies
- `ci`: CI/CD changes

### Examples

```bash
git commit -m "feat(auth): implement JWT authentication"
git commit -m "fix(cart): resolve quantity update issue"
git commit -m "docs(setup): update installation instructions"
git commit -m "refactor(components): extract button logic"
git commit -m "chore(deps): upgrade react to 19.1.0"
```

## Useful Git Commands

### Check current branch
```bash
git branch
git branch -a  # Show all branches including remote
```

### Switch branches
```bash
git checkout develop
git switch main  # Alternative syntax
```

### Create and switch in one command
```bash
git checkout -b feature/new-feature
git switch -c feature/new-feature  # Alternative syntax
```

### Update branch from remote
```bash
git fetch origin
git pull origin develop
```

### View commit history
```bash
git log --oneline
git log --graph --oneline --all  # Visual tree
```

### Undo last commit (not pushed)
```bash
git reset --soft HEAD~1  # Keep changes
git reset --hard HEAD~1  # Discard changes
```

### Stash changes temporarily
```bash
git stash              # Save changes
git stash pop          # Restore changes
git stash list         # View stashes
```

### Force push (be careful!)
```bash
git push -f origin feature/branch-name
```

## Branching Rules

### For `develop` branch
- ✓ Only merge feature branches via PR
- ✓ Require code review before merge
- ✓ All CI/CD checks must pass
- ✓ Always up-to-date with main
- ✗ No direct commits

### For `main` branch
- ✓ Only merge release and hotfix branches
- ✓ Tag all releases with semantic versioning
- ✓ All CI/CD checks must pass
- ✗ No feature development
- ✗ No direct commits except in emergencies

### For feature branches
- ✓ Branch from: `develop`
- ✓ Merge back to: `develop` (via PR)
- ✓ Naming: `feature/description`
- ✓ Delete after merge

## Code Review Checklist

Before approving a PR:

- [ ] Code follows style guidelines
- [ ] All types are properly defined (TypeScript)
- [ ] No console.log statements left
- [ ] Changes are tested
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No unnecessary dependencies added
- [ ] Performance impact considered

## Merge Strategies

### Standard Merge (Preserve history)
```bash
git merge --no-ff feature/branch
```
Creates merge commit, preserves branch history

### Squash Merge (Clean history)
```bash
git merge --squash feature/branch
```
Combines all commits into one

### Rebase and Merge (Linear history)
```bash
git rebase main
git push -f
```
Rewrites history for linear timeline

## Conflict Resolution

### When conflicts occur during merge:

```bash
# 1. Check conflicted files
git status

# 2. Edit files to resolve conflicts
# Look for: <<<<<<, ======, >>>>>>

# 3. Stage resolved files
git add .

# 4. Complete merge
git commit -m "Merge: resolve conflicts from feature/branch"
git push origin

# Or abort merge if needed
git merge --abort
```

## CI/CD Integration

All branches trigger GitHub Actions workflows:

```yaml
On: [push, pull_request]

Jobs:
  1. Type checking (TypeScript)
  2. Linting
  3. Build verification
  4. Tests (if applicable)
```

Failed checks prevent merging to `develop` or `main`.

## Release Versioning

Follow Semantic Versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Incompatible API changes (1.0.0 → 2.0.0)
- **MINOR**: New backwards-compatible features (1.0.0 → 1.1.0)
- **PATCH**: Backwards-compatible bug fixes (1.0.0 → 1.0.1)

### Version Tagging

```bash
# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags to remote
git push origin v1.0.0
git push origin --tags  # Push all tags
```

## Branch Protection Rules

Recommended settings for `main` and `develop`:

1. Require pull request reviews before merging
2. Require status checks to pass before merging
3. Require branches to be up to date before merging
4. Include administrators in restrictions
5. Dismiss stale PR approvals
6. Require code review from CODEOWNERS

## Common Workflows

### Quick Feature Development

```bash
# 1. Start feature
git checkout -b feature/user-profile

# 2. Develop
# ... make changes ...
git add .
git commit -m "feat(profile): add user profile page"
git push -u origin feature/user-profile

# 3. Create PR on GitHub and get approved

# 4. Merge to develop
git checkout develop
git pull origin develop
git merge feature/user-profile
git push origin develop

# 5. Clean up
git branch -d feature/user-profile
git push origin --delete feature/user-profile
```

### Release Process

```bash
# 1. Prepare release
git checkout -b release/1.2.0
# Update version numbers
git commit -m "chore(release): bump to 1.2.0"

# 2. Final testing and bug fixes
# ... make fixes ...
git commit -m "fix: resolve e2e test failure"

# 3. Merge to main
git checkout main
git merge release/1.2.0
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin main v1.2.0

# 4. Merge back to develop
git checkout develop
git merge release/1.2.0
git push origin develop

# 5. Cleanup
git branch -d release/1.2.0
git push origin --delete release/1.2.0
```

### Hotfix Process

```bash
# 1. Emergency fix
git checkout -b hotfix/payment-crash
# Fix the issue
git commit -m "fix(critical): resolve payment crash on checkout"

# 2. Merge to main
git checkout main
git merge hotfix/payment-crash
git tag -a v1.2.1 -m "Hotfix v1.2.1"
git push origin main v1.2.1

# 3. Merge to develop
git checkout develop
git merge hotfix/payment-crash
git push origin develop

# 4. Cleanup
git branch -d hotfix/payment-crash
git push origin --delete hotfix/payment-crash
```

## Troubleshooting

### Accidentally committed to main?

```bash
# Create a new branch from current commit
git branch feature/accidental-feature

# Reset main to previous state
git reset --hard origin/main

# Switch to your feature branch
git checkout feature/accidental-feature
```

### Need to revert a commit?

```bash
# Create new commit that undoes changes
git revert <commit-hash>

# Or reset to previous state (caution!)
git reset --hard <commit-hash>
```

### Lost commits after reset?

```bash
git reflog  # Find your commit hash
git reset --hard <commit-hash>  # Restore
```

### Sync fork with upstream?

```bash
git remote add upstream https://github.com/Mostafa-SAID7/clothing-shop
git fetch upstream
git checkout develop
git merge upstream/develop
git push origin develop
```

## Best Practices

1. **Keep branches focused**: One feature per branch
2. **Push regularly**: Don't work in isolation
3. **Review before merge**: Always get code review
4. **Update frequently**: Pull latest changes regularly
5. **Write clear commits**: Good commit messages help
6. **Delete old branches**: Clean up after merging
7. **Never force push to main**: Preserve history
8. **Use pull requests**: Not direct commits
9. **Test before merge**: Run all checks
10. **Document decisions**: Update docs with changes

## Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitFlow Original Article](https://nvie.com/posts/a-successful-git-branching-model/)
