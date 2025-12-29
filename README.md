# RN Starter

A tiny, strict, and friendly Expo + TypeScript starter with file-based routing.

## What this gives you

- Expo Router routes in `src/app`
- Strict TypeScript and ESLint rules
- Standard stack: TanStack Query, Zustand, Zod, react-hook-form
- Shared logger and theme helpers
- Clean module layout for teams

## Quick start

```sh
npm install
npx expo start
```

## Team rules (short)

- Named exports only, except Expo Router route files
- No `any`, no deep relative imports
- No `console.log`, use the logger
- Use alias imports like `@shared/...`

Questions? See `CODING_STANDARDS.md` for a human-readable explanation. Example prompt: "Based on `CODING_STANDARDS.md`, should I name this parameter `overrides` or `options`?"

Next steps:
```sh
npm run lint
npm run typecheck
```

If typecheck fails after installs, run `npx expo install expo react react-native expo-router` and retry.

## Maestro UI tests

```sh
brew install mobile-dev-inc/tap/maestro
which maestro
maestro --version
npm run maestro:test
```

Android note: the script boots an Android emulator (if needed), starts the Expo dev server, installs a debug build, and runs Maestro against the app.

Example flow (`.maestro/index-alert.yaml`): launches the app, dismisses the dev menu overlay, taps the alert button, and verifies the alert.
