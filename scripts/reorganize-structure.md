# Project Reorganization Plan

## Files to Move/Reorganize

### 1. Create src/ directory structure
```bash
mkdir -p src/{components/{ui,features,shared},lib/{api,config,features,hooks,types,utils},styles,data}
```

### 2. Move existing files

#### Components
```bash
# Move UI components
mv components/ui src/components/ui
mv components/product-card.tsx src/components/features/

# Create feature-based components
mkdir -p src/components/features/{cart,checkout,products}
```

#### Library Files
```bash
# Move lib files to organized structure
mv lib/utils.ts src/lib/utils/
mv lib/types.ts src/lib/types/
mv lib/data.ts src/data/
mv lib/flags.ts src/lib/features/
mv lib/statsig-client.tsx src/lib/features/
mv lib/flags.md docs/guides/feature-flags.md
```

#### Hooks
```bash
mv hooks/use-toast.ts src/lib/hooks/
```

#### Styles
```bash
mv app/globals.css src/styles/
```

### 3. Update imports in all files
- Update all import paths to reflect new structure
- Use path aliases (@/src/...) for cleaner imports

### 4. Clean up root directory
- Move documentation files to docs/
- Consolidate config files
- Remove duplicate files

### 5. Update configuration files
- tsconfig.json - Update paths
- next.config.js - Update aliases
- package.json - Update scripts

## Benefits

1. **Better Organization** - Clear separation of concerns
2. **Easier Navigation** - Logical file grouping
3. **Scalability** - Easy to add new features
4. **Maintainability** - Reduced cognitive load
5. **Team Collaboration** - Clear ownership boundaries

## Migration Steps

1. Create new directory structure
2. Copy files to new locations (don't delete originals yet)
3. Update all imports
4. Test application
5. Remove old files
6. Update documentation
7. Commit changes

## Notes

- Keep backward compatibility during migration
- Update CI/CD pipelines if needed
- Notify team members of changes
- Update onboarding documentation
