# MAUI to React Native (Expo) mental map

## Navigation
- MAUI: Shell routes and NavigationPage.
- RN (Expo Router): Files and folders under `src/app`.
- Example: `src/app/index.tsx` is the Home screen, `src/app/(auth)/login.tsx` is Login.

## MVVM vs Hooks
- MAUI: View + ViewModel with commands and bindings.
- RN: Function components + hooks (`useState`, `useEffect`).
- Think of a hook as a tiny ViewModel for one screen.

## Dependency Injection
- MAUI: Services registered in `MauiProgram`.
- RN: Plain modules and hooks with direct imports.
- If a service needs config, expose a `configureX()` function.

## State
- MAUI: Observable properties, binding context.
- RN: Zustand store is a simple shared state container.
- Example: `useAuthStore()` holds user and token.

## Validation
- MAUI: Data annotations or custom validation in ViewModel.
- RN: Zod schema + react-hook-form for field errors.

## Back button
- MAUI: Shell back stack or platform handling.
- RN: Expo Router manages back stack automatically.
- You can use `useRouter()` to navigate programmatically.
