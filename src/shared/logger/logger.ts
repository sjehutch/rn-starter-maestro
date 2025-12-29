export type LogLevel = "debug" | "info" | "warn" | "error";

export type LoggerConfig = {
  enabled: boolean;
  minLevel: LogLevel;
};

const levelOrder: Record<LogLevel, number> = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4
};

let config: LoggerConfig = {
  enabled: true,
  minLevel: "info"
};

const shouldLog = (level: LogLevel) => {
  // If logging is off, we skip everything right away.
  if (!config.enabled) {
    return false;
  }
  // Only log messages that are important enough.
  return levelOrder[level] >= levelOrder[config.minLevel];
};

export const configureLogger = (overrides: Partial<LoggerConfig>) => {
  // This lets us turn logging on/off without changing code everywhere.
  config = { ...config, ...overrides };
};

const logWithLevel = (
  level: LogLevel,
  message: string,
  meta?: Record<string, unknown>
) => {
  // This is the one place that actually talks to the console.
  if (!shouldLog(level)) {
    return;
  }

  const logEntry = meta ? { message, meta } : { message };

  if (level === "warn") {
    console.warn(logEntry);
    return;
  }

  if (level === "error") {
    console.error(logEntry);
    return;
  }

  // We use console.info for info/debug so console.log stays banned.
  console.info(logEntry);
};

export const logger = {
  debug: (message: string, meta?: Record<string, unknown>) =>
    logWithLevel("debug", message, meta),
  info: (message: string, meta?: Record<string, unknown>) =>
    logWithLevel("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) =>
    logWithLevel("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) =>
    logWithLevel("error", message, meta)
};
