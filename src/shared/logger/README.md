# Logger

We do not use `console.log` in app code. Use the logger instead.

## Quick use

```ts
import { logger } from "@shared/logger/logger";

logger.info("User signed in", { userName: "sam" });
logger.warn("Slow request", { ms: 1200 });
```

## Configure

```ts
import { configureLogger } from "@shared/logger/logger";

configureLogger({ enabled: true, minLevel: "debug" });
```

## Why

- This keeps logs consistent and easy to filter.
- We can turn logging on/off in one place.
- ESLint blocks `console.log`, so this is the approved path.
