import { describe, expect, it } from 'vitest';

import { basicBadgeConfig, DELIMITER, fullConfig, fullLocationMap } from '@/__test__/__fixtures__';
import { getMatcherBadge, matchBadge } from '@/utils/matcher';

import type { Matcher } from '@/types';

const matcher: Matcher = {
  badge: 'new',
  match: [
    /^version/iu,
    'test:pass',
    { badgeId: 'a11y', content: 'fail' },
    { badgeId: /^brand/iu },
    { badgeId: 'deprecated' },
  ],
};

describe('Matcher Utils', () => {
  describe('matchBadge', () => {
    it('returns `false` if no patterns match', () => {
      expect.assertions(2);
      const versionMatch = matchBadge('ver:1.0.0', matcher, DELIMITER);
      const testMatch = matchBadge('a11y:pass', matcher, DELIMITER);
      expect(versionMatch).toBe(false);
      expect(testMatch).toBe(false);
    });

    it('returns `true` if a pattern matches', () => {
      expect.assertions(5);
      const versionMatch = matchBadge('version:1.0.0', matcher, DELIMITER);
      const testMatch = matchBadge('test:pass', matcher, DELIMITER);
      const partsMatch = matchBadge('a11y:fail', matcher, DELIMITER);
      const idOnlyMatch = matchBadge('brand:storybook', matcher, DELIMITER);
      const noContentMatch = matchBadge('deprecated', matcher, DELIMITER);
      expect(versionMatch).toBe(true);
      expect(testMatch).toBe(true);
      expect(partsMatch).toBe(true);
      expect(idOnlyMatch).toBe(true);
      expect(noContentMatch).toBe(true);
    });

    it('matches anything on empty object', () => {
      expect.assertions(1);
      const any = matchBadge('AnythingYouWantReally', { badge: 'new', match: {} }, DELIMITER);
      expect(any).toBe(true);
    });
  });

  describe('getMatcherBadge', () => {
    it('gets the config for a badge ID', () => {
      expect.assertions(3);
      const config = getMatcherBadge(matcher, fullConfig);
      expect(config.badgeId).toBe('new');
      expect(config.config.title).toBe('New');
      expect(config.config.locations).toMatchObject(fullLocationMap);
    });

    it('gets the config for a ID with custom title', () => {
      expect.assertions(3);
      const titleFn = () => 'title';
      const config = getMatcherBadge(
        { ...matcher, badge: { id: 'new', title: titleFn } },
        fullConfig,
      );
      expect(config.badgeId).toBe('new');
      expect(config.config.title).toBe(titleFn);
      expect(config.config.locations).toMatchObject(fullLocationMap);
    });

    it('gets the config for a custom config', () => {
      expect.assertions(3);
      const config = getMatcherBadge({ ...matcher, badge: basicBadgeConfig }, fullConfig);
      expect(config.badgeId).toBe('custom');
      expect(config.config.title).toBe(basicBadgeConfig.title);
      expect(config.config.locations).toMatchObject(fullLocationMap);
    });

    it('gets the config for a custom config - with parsed ID', () => {
      expect.assertions(3);
      const customId = 'myCustomBadge';
      const config = getMatcherBadge({ ...matcher, badge: basicBadgeConfig }, fullConfig, customId);
      expect(config.badgeId).toBe(customId);
      expect(config.config.title).toBe(basicBadgeConfig.title);
      expect(config.config.locations).toMatchObject(fullLocationMap);
    });
  });
});
