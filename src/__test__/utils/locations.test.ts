import { describe, expect, it } from 'vitest';

import { fullBadgeConfig, fullConfig, fullLocationMap } from '@/__test__/__fixtures__';
import { normalizeLocations, shouldDisplayBadge } from '@/utils/locations';

import type { ShouldDisplayBadgeParameters } from '@/types';

const shouldDisplayConfig: ShouldDisplayBadgeParameters = {
  badgeConfig: fullBadgeConfig,
  config: fullConfig,
  defaults: fullLocationMap,
  location: 'sidebar',
  type: 'story',
};

describe('Location Utils', () => {
  describe('normalizeLocations', () => {
    it('works with a location array - replacing defaults', () => {
      expect.assertions(3);
      const locations = normalizeLocations(['sidebar'], null, fullLocationMap);
      expect(Object.keys(locations)).toHaveLength(3);
      expect(Object.keys(locations)).toStrictEqual(['sidebar', 'toolbar', 'toolbar-end']);
      expect(locations).toStrictEqual({
        'sidebar': ['component', 'docs', 'group', 'story'],
        'toolbar': [],
        'toolbar-end': [],
      });
    });

    it('works with a location object - incorporating defaults', () => {
      expect.assertions(3);
      const locations = normalizeLocations({ toolbar: 'story' }, null, fullLocationMap);
      expect(Object.keys(locations)).toHaveLength(3);
      expect(Object.keys(locations)).toStrictEqual(['sidebar', 'toolbar', 'toolbar-end']);
      expect(locations).toStrictEqual({
        'sidebar': ['component', 'story'],
        'toolbar': ['story'],
        'toolbar-end': ['docs'],
      });
    });

    it('works with a location object - incorporating fallback', () => {
      expect.assertions(3);
      const locations = normalizeLocations(
        { toolbar: 'story' },
        { 'toolbar-end': 'docs' },
        fullLocationMap,
      );
      expect(Object.keys(locations)).toHaveLength(3);
      expect(Object.keys(locations)).toStrictEqual(['sidebar', 'toolbar', 'toolbar-end']);
      expect(locations).toStrictEqual({
        'sidebar': ['component', 'story'],
        'toolbar': ['story'],
        'toolbar-end': ['docs'],
      });
    });

    it('returns the default value if no overrides passed', () => {
      expect.assertions(3);
      const locations = normalizeLocations(null, null, fullLocationMap);
      expect(Object.keys(locations)).toHaveLength(3);
      expect(Object.keys(locations)).toStrictEqual(['sidebar', 'toolbar', 'toolbar-end']);
      expect(locations).toStrictEqual(fullLocationMap);
    });
  });
  describe('shouldDisplayBadge', () => {
    it('returns the correct value', () => {
      expect.assertions(2);
      const shouldDisplay = shouldDisplayBadge(shouldDisplayConfig);
      const shouldNotDisplay = shouldDisplayBadge({ ...shouldDisplayConfig, type: 'root' });
      expect(shouldDisplay).toBe(true);
      expect(shouldNotDisplay).toBe(false);
    });
  });
});
