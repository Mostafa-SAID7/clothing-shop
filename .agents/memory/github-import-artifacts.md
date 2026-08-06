---
name: GitHub import artifacts not registered
description: When a project is imported from GitHub, artifact.toml files exist on disk but artifacts are not registered in Replit's system — listArtifacts() returns empty.
---

# GitHub Import: Artifacts Not Registered

## The Rule
When a project is imported from GitHub, any existing `artifacts/<slug>/.replit-artifact/artifact.toml` files are present on disk but the artifacts are NOT registered in Replit's internal system. `listArtifacts()` returns `[]` and managed workflows do not exist.

**Why:** The artifact registration state lives in Replit's metadata store, not in the repo files. Cloning/importing brings the files but not the registrations.

**How to apply:** If `listArtifacts()` returns empty but `artifacts/*/` directories exist:
1. Back up the source files: `cp -r artifacts/<slug> /tmp/<slug>-backup`
2. Delete the directory: `rm -rf artifacts/<slug>`
3. Call `createArtifact({ slug, ... })` to re-register and get a managed workflow
4. Restore the source files from backup (keep scaffold's `vite.config.ts`, `package.json`, `tsconfig.json` — they have Replit-specific PORT/BASE_PATH setup)
5. Restart the managed workflow with its exact name from `result.workflows.<service>`

## Tailwind v3 → v4 mismatch
Imported projects built with Tailwind v3 (shadcn/ui style: `@tailwind base/components/utilities` + `tailwind.config.ts`) will break in a Replit scaffold that uses Tailwind v4 (`@tailwindcss/vite` plugin).

**Fix:** Update `src/index.css`:
- Replace `@tailwind base; @tailwind components; @tailwind utilities;` with `@import "tailwindcss";`
- Add `@theme inline { --color-background: hsl(var(--background)); ... }` to map CSS variables to v4 tokens
- Add `@custom-variant dark (&:is(.dark *));` for class-based dark mode
- Add `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground` to `:root` if missing (shadcn/ui v3 sometimes omits them)
