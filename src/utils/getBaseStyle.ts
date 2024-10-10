import { defaultBadgeStyle, githubBadgeStyle } from '@/config';

import type { BadgeStyle, NewBadgesConfig } from '@/types';

/**
 * Converts a `baseStyle` value into a full style object.
 * @param base The value of the `baseStyle` parameter from the addon config.
 * @returns The full style object based on the `baseStyle`.
 */
const getBaseStyle = (base: NewBadgesConfig['baseStyle']): Required<BadgeStyle> => {
  if (typeof base === 'string') {
    if (base === 'default') {
      return defaultBadgeStyle;
    } else if (base === 'github') {
      return githubBadgeStyle;
    }
  }

  if (typeof base === 'object') {
    if ('base' in base) {
      const { base: baseName, ...customStyle } = base;
      const baseStyle = baseName === 'default' ? defaultBadgeStyle : githubBadgeStyle;
      return {
        ...baseStyle,
        ...customStyle,
      };
    }
    return base;
  }

  return defaultBadgeStyle;
};

export { getBaseStyle };
