# Purpose
- This file exists to enforce clarity, predictability, and maintainability.
- Vague or placeholder names are not allowed.

# Naming Rules (Non-Negotiable)
- These identifiers are banned: `next`, `value`, `data`, `payload`, `result`, `item`.
- Names must be intent-based and explain why the value exists.

# Function Parameters
- Parameters must describe their role, not sequence or timing.
- BAD:
```ts
configureLogger(next: LoggerConfig)
```
- GOOD:
```ts
configureLogger(overrides: LoggerConfig)
```

# State Updates / Setters
- Do not use generic names like `state`.
- Prefer domain-specific setters.
- BAD:
```ts
setState(state)
```
- GOOD:
```ts
setUserProfile(profile)
setOrderStatus(status)
```

# Async Handlers
- Names like `values` or `result` are banned.
- Use domain names like `credentials`, `request`, `input`.
- BAD:
```ts
async function handleLogin(values) {}
```
- GOOD:
```ts
async function handleLogin(credentials) {}
```

# Collections
- Use plural, domain-specific names like `users`, `orders`.
- Generic `item` or `items` is banned.
- BAD:
```ts
items.map((item) => item.id)
```
- GOOD:
```ts
orders.map((order) => order.id)
```

# Configuration Objects
- Naming conventions:
  - `overrides` = partial updates
  - `options` = one-time setup
  - `updates` = state mutation
- Example:
```ts
createClient(options)
updateSession(updates)
configureLogger(overrides)
```

# Hooks
- Hooks must read like sentences.
- Use `use<Feature>` naming.
- BAD:
```ts
useThing()
```
- GOOD:
```ts
useUserSession()
```

# Booleans
- Booleans must read as yes/no questions.
- Prefer `is*`, `has*`, `should*`.
- `enabled` is allowed only inside config objects.
- GOOD:
```ts
const isReady = true
const hasSession = false
const shouldRetry = true
```

# Files & Exports
- Named exports only.
- Default exports are banned.

# Enforcement
- ESLint and code review must enforce these rules.
- Codex must refactor existing code to comply when touched.
- `npm run typecheck` must pass before changes are accepted.
- ESLint must error on unused locals and parameters, and TypeScript must enforce `noImplicitOverride` with the `override` keyword.
- TypeScript config must keep `jsx: "react-jsx"` and the `@/*` path aliases.
- Core Expo dependencies must be installed with `npx expo install expo react react-native expo-router` before typechecking.

# Mental Model
- Names should tell a story.
- If you have to ask "next what?", the name is wrong.
