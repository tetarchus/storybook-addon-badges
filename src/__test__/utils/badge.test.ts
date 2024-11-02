import { describe, expect, it } from 'vitest';

import {
  DELIMITER,
  badgeFnParameters,
  fullConfig,
  fullConfigStyleFn,
  fullStyle,
} from '@/__test__/__fixtures__';
import { BADGE } from '@/constants';
import {
  getBadgeContent,
  getBadgeContentInternal,
  getBadgeId,
  getBadgeIdInternal,
  getBadgeParts,
  getBadgePartsInternal,
  getFullBadgeConfig,
} from '@/utils/badge';

import type { BadgeTitleFn } from '@/types';

// Fixtures
const defaultName = 'version:1.0.0';
const expectedId = 'version';
const expectedContent = '1.0.0';
const empty = '';
const expectedFullId = 'version-1.0.0';

const basicBadgeConfig = {
  displayContentOnly: false,
  locations: {
    sidebar: ['component', 'story'],
    toolbar: ['story'],
    'toolbar-end': ['docs'],
  },
  priority: 99,
  tooltip: undefined,
};

describe('Badge Utils', () => {
  describe('getBadgePartsInternal', () => {
    it('returns the correct parts of a badge with the standard delimiter', () => {
      expect.assertions(2);
      const { badgeId, content } = getBadgePartsInternal(defaultName, DELIMITER);
      expect(badgeId).toBe(expectedId);
      expect(content).toBe(expectedContent);
    });

    it('returns the correct parts of a badge with a custom delimiter', () => {
      expect.assertions(2);
      const { badgeId, content } = getBadgePartsInternal('version1231.0.0', '123');
      expect(badgeId).toBe(expectedId);
      expect(content).toBe(expectedContent);
    });

    it("returns empty content if there's no delimiter present", () => {
      expect.assertions(2);
      const { badgeId, content } = getBadgePartsInternal(expectedFullId, DELIMITER);
      expect(badgeId).toBe(expectedFullId);
      expect(content).toBe(empty);
    });
  });

  describe('getBadgeIdInternal', () => {
    it('returns the badge ID', () => {
      expect.assertions(1);
      const badgeId = getBadgeIdInternal(defaultName, DELIMITER);
      expect(badgeId).toBe(expectedId);
    });

    it('returns the full badge with no delimiter', () => {
      expect.assertions(1);
      const badgeId = getBadgeIdInternal(expectedFullId, DELIMITER);
      expect(badgeId).toBe(expectedFullId);
    });
  });

  describe('getBadgeContentInternal', () => {
    it('returns the badge ID', () => {
      expect.assertions(1);
      const content = getBadgeContentInternal(defaultName, DELIMITER);
      expect(content).toBe(expectedContent);
    });

    it('returns the full badge with no delimiter', () => {
      expect.assertions(1);
      const content = getBadgeContentInternal(expectedFullId, DELIMITER);
      expect(content).toBe(empty);
    });
  });

  describe('getBadgeParts', () => {
    it('returns a `getBadgePartsInternal` clone without the required delimiter', () => {
      expect.assertions(2);
      const fn = getBadgeParts(DELIMITER);
      const { badgeId, content } = fn(defaultName);
      expect(badgeId).toBe(expectedId);
      expect(content).toBe(expectedContent);
    });

    it('works with a custom delimiter', () => {
      expect.assertions(2);
      const fn = getBadgeParts('123');
      const { badgeId, content } = fn('version1231.0.0');
      expect(badgeId).toBe(expectedId);
      expect(content).toBe(expectedContent);
    });
  });

  describe('getBadgeId', () => {
    it('returns a `getBadgeIdInternal` clone without the required delimiter', () => {
      expect.assertions(1);
      const fn = getBadgeId(DELIMITER);
      const badgeId = fn(defaultName);
      expect(badgeId).toBe(expectedId);
    });

    it('works with a custom delimiter', () => {
      expect.assertions(1);
      const fn = getBadgeId('123');
      const badgeId = fn('version1231.0.0');
      expect(badgeId).toBe(expectedId);
    });
  });

  describe('getBadgeContent', () => {
    it('returns a `getBadgeContentInternal` clone without the required delimiter', () => {
      expect.assertions(1);
      const fn = getBadgeContent(DELIMITER);
      const content = fn(defaultName);
      expect(content).toBe(expectedContent);
    });

    it('works with a custom delimiter', () => {
      expect.assertions(1);
      const fn = getBadgeContent('123');
      const content = fn('version1231.0.0');
      expect(content).toBe(expectedContent);
    });
  });

  describe('getFullBadgeConfig', () => {
    it('returns the expected value - existing badge', () => {
      expect.assertions(1);
      const fullBadgeConfig = getFullBadgeConfig(BADGE.BETA, fullConfig);
      expect(fullBadgeConfig).toMatchObject({ ...basicBadgeConfig, title: 'Beta' });
    });

    it('returns the expected value - non-existant badge', () => {
      expect.assertions(1);
      const fullBadgeConfig = getFullBadgeConfig('testingBadge', fullConfig);
      expect(fullBadgeConfig).toMatchObject(basicBadgeConfig);
    });

    it('style function works as expected', () => {
      expect.assertions(1);
      const fullBadgeConfig = getFullBadgeConfig('testingBadge', fullConfig);
      expect(fullBadgeConfig.style(badgeFnParameters)).toStrictEqual(fullStyle);
    });

    it('handles missing title property', () => {
      expect.assertions(4);
      const fullBadgeConfig = getFullBadgeConfig('no-title', fullConfigStyleFn);
      expect(fullBadgeConfig).toMatchObject(basicBadgeConfig);
      expect(fullBadgeConfig.style(badgeFnParameters)).toStrictEqual({
        ...fullStyle,
        backgroundColor: 'purple',
      });
      expect(typeof fullBadgeConfig.title).toBe('function');
      expect((fullBadgeConfig.title as BadgeTitleFn)(badgeFnParameters)).toStrictEqual(
        'Example Badge',
      );
    });
  });
});
