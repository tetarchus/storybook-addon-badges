import { defaultBadgeStyle, githubBadgeStyle } from '@/config';

import type { BadgeStyle, BadgesConfig, StyleProp } from '@/types';
import type { CSSProperties } from 'react';

/**
 * Converts a `baseStyle` value into a full style object.
 * @param base The value of the `baseStyle` parameter from the addon config.
 * @returns The full style object based on the `baseStyle`.
 */
const getBaseStyle = (base: BadgesConfig['baseStyle']): Required<BadgeStyle> => {
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

/**
 * Extracts a CSS property value from a {@link StyleProp} which may contain a
 * simple value (in which case it is returned), or a map of theme names to the
 * value to use for that theme.
 * @param value The value to extract from.
 * @param theme The theme name to find.
 * @returns The property value to assign.
 */
const getThemeValue = <Prop extends keyof CSSProperties>(
  value: StyleProp<Prop>,
  theme: string | undefined,
): CSSProperties[Prop] => {
  if (typeof value === 'object') {
    return value[theme ?? 'default'] ?? value.default;
  }
  return value;
};

export { getBaseStyle, getThemeValue };
