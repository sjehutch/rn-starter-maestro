# Development

## Dev server
- Start: `npx expo start`
- Clear cache: `npx expo start -c`

## Running on iOS Simulator / Android Emulator
- From the Expo CLI: press `i` (iOS) or `a` (Android).
- If you prefer npm scripts and they are configured:
  - iOS: `npm run ios`
  - Android: `npm run android`

## Running on a physical device
- Expo Go: scan the QR from the Expo CLI.
- Dev client: see “Dev Client vs Expo Go” below.

## Dev Client vs Expo Go
Expo Go runs your JavaScript in a shared app. A dev client is your own build with native code.
Use a dev client when you need native debugging or custom native modules.

Commands:
- `npx expo run:ios`
- `npx expo run:android`

Native builds require compatible Xcode/Android tooling and may fail if versions mismatch.

## Debugging with breakpoints (VS Code or your IDE)
- Use a dev client and the React Native debugger / Expo DevTools.
- Start Metro with `npx expo start` and attach your debugger from the app menu.

## Troubleshooting
- EMFILE / too many open files:
  - Raise your `ulimit` and use Watchman to manage file watching.
- Expo dependency mismatch warnings:
  - Run `npx expo install --check` or `npx expo install <pkg>` to align versions.
