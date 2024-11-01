import { describe, expect, it } from 'vitest';

import { DELIMITER, fullStyle, storyEntry, styleProp } from '@/__test__/__fixtures__';
import { defaultBadgeStyle, githubBadgeStyle } from '@/config';
import { getBadgeContent, getBadgeId, getBadgeParts } from '@/utils';
import { getBaseStyle, getThemeValue } from '@/utils/style';

import type { BadgeFnParameters, BadgeStyleFn } from '@/types';

const badgeStyleFnArgs: BadgeFnParameters = {
  badgeId: 'Example',
  content: 'Example Badge',
  entry: storyEntry,
  getBadgeContent: getBadgeContent(DELIMITER),
  getBadgeId: getBadgeId(DELIMITER),
  getBadgeParts: getBadgeParts(DELIMITER),
};

describe('Style Utils', () => {
  describe('getBaseStyle', () => {
    it('returns the expected style - string base', () => {
      expect.assertions(2);
      const defaultStyle = getBaseStyle('default');
      const githubStyle = getBaseStyle('github');
      expect(defaultStyle).toStrictEqual(defaultBadgeStyle);
      expect(githubStyle).toStrictEqual(githubBadgeStyle);
    });

    it('returns the expected style - object base', () => {
      expect.assertions(2);
      const defaultStyle = getBaseStyle({ base: 'default', backgroundColor: 'red' });
      const githubStyle = getBaseStyle({ base: 'github', backgroundColor: 'purple' });
      expect(defaultStyle).toStrictEqual({ ...defaultBadgeStyle, backgroundColor: 'red' });
      expect(githubStyle).toStrictEqual({ ...githubBadgeStyle, backgroundColor: 'purple' });
    });

    it('returns the expected style - with full base', () => {
      expect.assertions(1);
      const customFullStyle = getBaseStyle(fullStyle);
      expect(customFullStyle).toStrictEqual(fullStyle);
    });

    it('returns the expected style function - string base function', () => {
      expect.assertions(4);
      const defaultStyle = getBaseStyle(() => 'default');
      const githubStyle = getBaseStyle(() => 'github');

      expect(typeof defaultStyle).toBe('function');
      expect(typeof githubStyle).toBe('function');
      expect((defaultStyle as BadgeStyleFn)(badgeStyleFnArgs)).toStrictEqual(defaultBadgeStyle);
      expect((githubStyle as BadgeStyleFn)(badgeStyleFnArgs)).toStrictEqual(githubBadgeStyle);
    });

    it('returns the expected style function - with object base function', () => {
      expect.assertions(4);
      const defaultStyle = getBaseStyle(() => ({ base: 'default', backgroundColor: 'red' }));
      const githubStyle = getBaseStyle(() => ({ base: 'github', backgroundColor: 'purple' }));

      expect(typeof defaultStyle).toBe('function');
      expect(typeof githubStyle).toBe('function');
      expect((defaultStyle as BadgeStyleFn)(badgeStyleFnArgs)).toStrictEqual({
        ...defaultBadgeStyle,
        backgroundColor: 'red',
      });
      expect((githubStyle as BadgeStyleFn)(badgeStyleFnArgs)).toStrictEqual({
        ...githubBadgeStyle,
        backgroundColor: 'purple',
      });
    });

    it('returns the expected style function - with full base function', () => {
      expect.assertions(2);
      const customFullStyle = getBaseStyle(() => fullStyle);

      expect(typeof customFullStyle).toBe('function');
      expect((customFullStyle as BadgeStyleFn)(badgeStyleFnArgs)).toStrictEqual(fullStyle);
    });

    it('returns the expected style function - with computed properties', () => {
      expect.assertions(2);
      const customFullStyle = getBaseStyle(parameters => ({
        ...fullStyle,
        backgroundColor: parameters.entry.type === 'docs' ? 'orange' : 'teal',
      }));

      expect(typeof customFullStyle).toBe('function');
      expect((customFullStyle as BadgeStyleFn)(badgeStyleFnArgs)).toStrictEqual({
        ...fullStyle,
        backgroundColor: 'teal',
      });
    });
  });

  describe('getThemeValue', () => {
    it('returns the expected style for a defined theme value', () => {
      expect.assertions(1);
      const value = getThemeValue(styleProp, 'dark');
      expect(value).toBe('#C7AC00');
    });

    it('returns the expected style for a non-defined theme value', () => {
      expect.assertions(1);
      const value = getThemeValue(styleProp, 'light');
      expect(value).toBe('#00C7AC');
    });

    it('returns the expected style for an undefined theme', () => {
      expect.assertions(1);
      const value = getThemeValue(styleProp, undefined);
      expect(value).toBe('#00C7AC');
    });

    it('returns the expected static value', () => {
      expect.assertions(1);
      const value = getThemeValue('red', 'dark');
      expect(value).toBe('red');
    });
  });
});
