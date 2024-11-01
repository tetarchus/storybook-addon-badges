import { describe, expect, it } from 'vitest';

import { DELIMITER } from '@/__test__/__fixtures__';
import {
  getBadgeContent,
  getBadgeContentInternal,
  getBadgeId,
  getBadgeIdInternal,
  getBadgeParts,
  getBadgePartsInternal,
} from '@/utils/badge';

// Fixtures
const defaultName = 'version:1.0.0';
const expectedId = 'version';
const expectedContent = '1.0.0';
const empty = '';
const expectedFullId = 'version-1.0.0';

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
});