import { describe, expect, it, vi } from 'vitest';

import { PREFIX } from '@/__test__/__fixtures__';
import { injectAddonPrefix, logger } from '@/utils/logger';

describe('Logger Utils', () => {
  describe('injectAddonPrefix', () => {
    it('returns the string with prefix', () => {
      expect.assertions(1);
      const prefixed = injectAddonPrefix('Test Message');
      expect(prefixed).toBe(`${PREFIX} Test Message`);
    });

    it('returns just the prefix when no string passed', () => {
      expect.assertions(1);
      const prefixed = injectAddonPrefix();
      expect(prefixed).toBe(PREFIX);
    });
  });

  describe('logger', () => {
    it('logs an error with prefix', () => {
      expect.assertions(2);
      const message = 'Error Message';
      const spy = vi.spyOn(console, 'error');
      logger.error(message);
      expect(spy).toHaveBeenCalledOnce();
      expect(spy).toHaveBeenCalledWith(PREFIX, message);
    });

    it('logs an info message with prefix', () => {
      expect.assertions(2);
      const message = 'Info Message';
      const spy = vi.spyOn(console, 'info');
      logger.info(message);
      expect(spy).toHaveBeenCalledOnce();
      expect(spy).toHaveBeenCalledWith(PREFIX, message);
    });

    it('logs a warning with prefix', () => {
      expect.assertions(2);
      const message = 'Warning Message';
      const spy = vi.spyOn(console, 'warn');
      logger.warn(message);
      expect(spy).toHaveBeenCalledOnce();
      expect(spy).toHaveBeenCalledWith(PREFIX, message);
    });
  });
});
