import type { BadgeMap, FullConfig } from '@/types';
import { fullStyle } from './style';
import { fullLocationMap } from './location';
import { basicBadgeConfig, secondaryBadgeConfig } from './badge';

/** The badge delimiter for use in tests. */
const DELIMITER = ':';

/** Example basic badge map for use in tests. */
const badgeMap: BadgeMap = {
  default: basicBadgeConfig,
  example: secondaryBadgeConfig,
};

/** Example full addon config for use in tests. */
const fullConfig: FullConfig = {
  autobadges: ['new'], // TODO: Another with the function
  badgeMap,
  baseStyle: fullStyle,
  delimiter: DELIMITER,
  displayContentOnly: false,
  excludeTags: [],
  locations: fullLocationMap,
  matchers: [], // TODO:
  replaceDefaultBadgeMap: false,
  // TODO: Allow array (to allow for after/before and between combo?)
  separators: {
    'sidebar': 'none',
    'toolbar': 'wrap',
    'toolbar-end': 'before',
  },
  showClearButton: false,
  sidebarDisplayBadges: 1,
  useBadgeFallback: true,
  useTags: true,
  warnOnLegacy: false,
};

export { DELIMITER, badgeMap, fullConfig };
