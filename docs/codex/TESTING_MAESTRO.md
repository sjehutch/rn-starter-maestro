# Maestro Testing (Android-first)

Maestro is most reliable against a real app build (dev client / debug build), not Expo Go.
Use Expo Go only for quick checks and expect some flakiness.

## Install
```sh
brew install mobile-dev-inc/tap/maestro
which maestro
maestro --version
```

## Run flows
```sh
maestro test .maestro
```

Environment variable example:
```sh
EXPO_URL=exp://<your-local-url> maestro test .maestro
```

## iOS (best-effort)
iOS testing can be flaky. Prefer Android for stable automation.

## Selector strategy
- Prefer id selectors (`testID`) and accessibility labels.
- Avoid visible text when a stable id is available.
