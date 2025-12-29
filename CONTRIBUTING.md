# Contributing

## Team rules (short version)

- TypeScript only, with strict settings on.
- No `any` types.
- Named exports only, **except** Expo Router route files in `src/app/**`.
  - Expo Router requires a default export for each route component.
  - ESLint allows default exports only in `src/app/**`.
- Use alias imports (e.g. `@shared/...`, `@components/...`).
- Do not use deep relative imports like `../../..`.
- No `console.log` in app code. Use the logger instead.
- Routing is file-based with Expo Router (no manual React Navigation setup).
- Standard stack: TanStack Query, Zustand, Zod, react-hook-form.

## Helpful commands

- `npm run lint`
- `npm run lint:fix`
- `npm run typecheck`
