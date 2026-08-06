## 📌 Summary

<!-- A clear, concise description of what this PR does and why. -->

Closes # <!-- Link the issue this PR resolves, e.g.: Closes #42 -->

---

## 🔀 GitFlow Compliance

- [ ] **Source branch** follows naming convention:
  - `feature/<name>` → targets `develop`
  - `bugfix/<name>` → targets `develop`
  - `hotfix/<name>` → targets `main` (then cherry-picked to `develop`)
  - `release/<version>` → targets `main`
- [ ] **All commit messages** follow [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat(scope): description`
  - `fix(scope): description`
  - `chore(scope): description`
  - `docs(scope): description`

---

## 🔬 Type of Change

- [ ] 🚀 **New Feature** — non-breaking change adding functionality
- [ ] 🐛 **Bug Fix** — non-breaking fix for incorrect behavior
- [ ] 💥 **Breaking Change** — fix or feature that changes existing behavior
- [ ] ⚡ **Performance** — code change that improves performance
- [ ] ♻️ **Refactor** — code change that neither fixes a bug nor adds a feature
- [ ] 📝 **Documentation** — docs-only changes
- [ ] ⚙️ **CI/CD / Infrastructure** — changes to workflows, build scripts, or deployment config
- [ ] 📦 **Dependencies** — updating or adding dependencies

---

## 🧪 Testing Done

Describe what was tested and how:

- [ ] `pnpm --filter clothing-shop-backend typecheck` passes locally
- [ ] `pnpm --filter clothing-shop-backend build` passes locally
- [ ] `pnpm --filter clothing-shop-frontend typecheck` passes locally
- [ ] `pnpm --filter clothing-shop-frontend build` passes locally
- [ ] Manually tested in browser at `http://localhost:5173`
- [ ] API endpoints tested via curl / Postman / Thunder Client

---

## 📸 Screenshots / Demo (if UI changes)

<!-- Drag & drop screenshots or a screen recording here -->

---

## ⚠️ Breaking Changes / Migration Notes

<!-- If this introduces a breaking change or requires a DB migration, describe it here.
     Include: what breaks, how to migrate, any SQL to run, any env vars added. -->
None

---

## 🔗 Related Issues / PRs

<!-- Link related issues or PRs -->
