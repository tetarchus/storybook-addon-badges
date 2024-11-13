import { describe, expect, it } from 'vitest';

import { basicBadgeMap, resolvedDefaultConfig } from '@/__test__/__fixtures__';
import { getFullConfig } from '@/utils/config';

describe('Config Utils', () => {
  describe('getFullConfig', () => {
    it('returns the base config when no overrides', () => {
      expect.assertions(1);
      const resolvedConfig = getFullConfig();
      expect(resolvedConfig).toStrictEqual(resolvedDefaultConfig);
    });

    it('replaces the default badge map if set', () => {
      expect.assertions(1);
      const resolvedConfig = getFullConfig({
        badgeMap: basicBadgeMap,
        replaceDefaultBadgeMap: true,
      });
      expect(resolvedConfig).toStrictEqual({
        ...resolvedDefaultConfig,
        badgeMap: basicBadgeMap,
        replaceDefaultBadgeMap: true,
      });
    });

    it("keeps the default badge map if an override isn't passed, even if `replaceDefaultBadgeMap` is `true`", () => {
      expect.assertions(1);
      const resolvedConfig = getFullConfig({
        replaceDefaultBadgeMap: true,
      });
      expect(resolvedConfig).toStrictEqual({
        ...resolvedDefaultConfig,
        replaceDefaultBadgeMap: true,
      });
    });

    it('deals with multiple overrides', () => {
      expect.assertions(1);
      const resolvedConfig = getFullConfig(
        {
          badgeMap: basicBadgeMap,
        },
        {
          replaceDefaultBadgeMap: true,
        },
      );
      expect(resolvedConfig).toStrictEqual({
        ...resolvedDefaultConfig,
        badgeMap: basicBadgeMap,
        replaceDefaultBadgeMap: true,
      });
    });
  });
});
