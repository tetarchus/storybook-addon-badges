import { ADDON_ID } from '@/constants';

/**
 * Adds the addon name as a prefix to a message.
 * @param str The string to prefix.
 * @returns The prefixed string.
 */
const injectAddonPrefix = (str?: string): string => `[${ADDON_ID}]: ${str ?? ''}`.trim();

/**
 * Custom logger that adds the addon name to the logged messages.
 * @param method The console method to use.
 * @param messages The messages to pass to the console method.
 */
const log = (
  method: Extract<keyof Console, 'error' | 'info' | 'warn'>,
  ...messages: unknown[]
): void => {
  // eslint-disable-next-line no-console
  console[method](injectAddonPrefix(), ...messages);
};

/** Custom logger for adding addon name to output messages. */
const logger = {
  /** Log error messages to the console. */
  error: (...messages: unknown[]) => log('error', ...messages),
  /** Log info messages to the console. */
  info: (...messages: unknown[]) => log('info', ...messages),
  /** Log warning messages to the console. */
  warn: (...messages: unknown[]) => log('warn', ...messages),
};

export { injectAddonPrefix, logger };
