/**
 * Lightweight logger. In development we forward to the browser console so
 * developers see issues live. In production we stay silent — these call
 * sites already surface user-facing toasts, and a real error tracker
 * (Sentry / Datadog) can be wired in here later without touching call sites.
 */
const isDev = import.meta.env.DEV;

export const logger = {
  error: (...args: unknown[]) => {
    if (isDev) console.error(...args);
    // TODO: forward to error monitoring service in production.
  },
  warn: (...args: unknown[]) => {
    if (isDev) console.warn(...args);
  },
  info: (...args: unknown[]) => {
    if (isDev) console.info(...args);
  },
};