import { createLogger, resolveLogLevel } from "@/lib/logger";

export const logger = createLogger({
  level: resolveLogLevel(process.env.NEXT_PUBLIC_LOG_LEVEL),
});
