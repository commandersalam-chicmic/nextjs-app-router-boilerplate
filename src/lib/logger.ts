export const LOG_LEVEL = {
  None: "NONE",
  Error: "ERROR",
  Warn: "WARN",
  Debug: "DEBUG",
  All: "ALL",
} as const;

export type LogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];

const LOG_LEVEL_WEIGHT = {
  [LOG_LEVEL.None]: 0,
  [LOG_LEVEL.Error]: 1,
  [LOG_LEVEL.Warn]: 2,
  [LOG_LEVEL.Debug]: 3,
  [LOG_LEVEL.All]: 4,
} as const satisfies Record<LogLevel, number>;

const KNOWN_LOG_LEVELS = new Set<LogLevel>(Object.values(LOG_LEVEL));

export interface LoggerOptions {
  prefix?: string;
  level?: LogLevel;
  showLevel?: boolean;
}

export class Logger {
  protected prefix: string;
  protected level: LogLevel;
  protected showLevel: boolean;

  private readonly levelWeight: number;

  constructor({ prefix = "", level = LOG_LEVEL.All, showLevel = true }: LoggerOptions = {}) {
    this.prefix = prefix;
    this.level = level;
    this.levelWeight = LOG_LEVEL_WEIGHT[this.level];
    this.showLevel = showLevel;
  }

  debug = (...args: unknown[]): void => {
    if (this.canWrite(LOG_LEVEL.Debug)) {
      this.write(LOG_LEVEL.Debug, ...args);
    }
  };

  warn = (...args: unknown[]): void => {
    if (this.canWrite(LOG_LEVEL.Warn)) {
      this.write(LOG_LEVEL.Warn, ...args);
    }
  };

  error = (...args: unknown[]): void => {
    if (this.canWrite(LOG_LEVEL.Error)) {
      this.write(LOG_LEVEL.Error, ...args);
    }
  };

  private canWrite(level: LogLevel): boolean {
    return this.levelWeight >= LOG_LEVEL_WEIGHT[level];
  }

  private write(level: LogLevel, ...args: unknown[]): void {
    const prefix = this.formatPrefix(level);
    const output = prefix ? [prefix, ...args] : args;

    if (level === LOG_LEVEL.Error) {
      globalThis.console.error(...output);
      return;
    }

    if (level === LOG_LEVEL.Warn) {
      globalThis.console.warn(...output);
      return;
    }

    globalThis.console.debug(...output);
  }

  private formatPrefix(level: LogLevel): string {
    const segments: string[] = [];

    if (this.showLevel) {
      segments.push(`- ${level}`);
    }

    if (this.prefix) {
      segments.push(this.prefix);
    }

    return segments.join(" ");
  }
}

export function resolveLogLevel(value: string | undefined): LogLevel {
  if (!value) {
    return LOG_LEVEL.All;
  }

  const normalized = value.trim().toUpperCase();
  return isLogLevel(normalized) ? normalized : LOG_LEVEL.All;
}

export function createLogger(options: LoggerOptions = {}): Logger {
  return new Logger(options);
}

function isLogLevel(value: string): value is LogLevel {
  return KNOWN_LOG_LEVELS.has(value as LogLevel);
}
