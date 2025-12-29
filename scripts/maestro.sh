#!/bin/sh
set -e

MAESTRO_FLOW=".maestro/index-alert.yaml"
EXPO_PORT="8081"

if [ ! -f "$MAESTRO_FLOW" ]; then
  echo "Missing Maestro flow: $MAESTRO_FLOW"
  exit 1
fi

if ! command -v adb >/dev/null 2>&1; then
  echo "adb not found. Install Android SDK tools and ensure adb is in PATH."
  exit 1
fi

deviceId="$(adb devices | awk 'NR>1 && $2=="device" {print $1}' | head -n 1)"
if [ -z "$deviceId" ]; then
  emulatorPath="$(command -v emulator || true)"
  if [ -z "$emulatorPath" ]; then
    if [ -n "$ANDROID_SDK_ROOT" ] && [ -x "$ANDROID_SDK_ROOT/emulator/emulator" ]; then
      emulatorPath="$ANDROID_SDK_ROOT/emulator/emulator"
    elif [ -n "$ANDROID_HOME" ] && [ -x "$ANDROID_HOME/emulator/emulator" ]; then
      emulatorPath="$ANDROID_HOME/emulator/emulator"
    fi
  fi

  if [ -z "$emulatorPath" ]; then
    echo "No Android devices found and emulator binary not available."
    exit 1
  fi

  avdName="$("$emulatorPath" -list-avds | head -n 1)"
  if [ -z "$avdName" ]; then
    echo "No Android AVDs available. Create one in Android Studio first."
    exit 1
  fi

  nohup "$emulatorPath" -avd "$avdName" >/tmp/android-emulator.log 2>&1 &
  adb wait-for-device
  bootComplete=""
  for _ in 1 2 3 4 5 6 7 8 9 10 11 12; do
    bootComplete="$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')"
    if [ "$bootComplete" = "1" ]; then
      break
    fi
    sleep 5
  done
fi

if ! lsof -iTCP:"$EXPO_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  npx expo start --dev-client --non-interactive --port "$EXPO_PORT" >/tmp/expo-start.log 2>&1 &
  EXPO_PID=$!
  trap 'kill "$EXPO_PID" >/dev/null 2>&1 || true' EXIT INT TERM
  sleep 8
fi

npx expo run:android --variant debug --no-bundler
MAESTRO_DRIVER_STARTUP_TIMEOUT="120000" maestro test "$MAESTRO_FLOW"
