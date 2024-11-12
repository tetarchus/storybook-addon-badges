import { describe, expect, it } from 'vitest';

import { isBadgeMap } from '@/utils/isBadgeMap';
import { defaultBadgeMap, defaultConfig } from '@/config';

describe('Typeguard Utils', () => {
  describe('isBadgeMap', () => {
    it('returns `true` when passed an object containing badge configs', () => {
      expect.assertions(1);
      expect(isBadgeMap(defaultBadgeMap)).toBe(true);
      expect(isBadgeMap({ test: defaultBadgeMap.updated })).toBe(true);
    });

    it('returns `true` when passed an object with some badge configs', () => {
      expect.assertions(1);
      const result = isBadgeMap({ ...defaultConfig, ...defaultBadgeMap });

      expect(result).toBe(true);
    });

    it('returns `false` when passed an object without direct badge configs', () => {
      expect.assertions(1);
      const result = isBadgeMap(defaultConfig);
      expect(result).toBe(false);
    });

    it('returns `true` when the object is likely a badge config', () => {
      expect.assertions(2);
      expect(isBadgeMap({ test: { displayContentOnly: true } })).toBe(true);
      expect(isBadgeMap({ test: { locations: ['sidebar'] } })).toBe(true);
    });

    it('recognises a tooltip', () => {
      expect.assertions(5);
      expect(isBadgeMap({ test: { tooltip: 'Tooltip!' } })).toBe(true);
      expect(isBadgeMap({ test: { tooltip: { desc: 'Tooltip!' } } })).toBe(true);
      expect(isBadgeMap({ test: { tooltip: { title: 'Tooltip!' } } })).toBe(true);
      expect(isBadgeMap({ test: { tooltip: { links: [] } } })).toBe(true);
      /** @ts-expect-error -- testing */
      expect(isBadgeMap({ test: { tooltip: [] } })).toBe(false);
    });
  });
});
