import { defaultConfig } from '@/config';
import { testingBadgeMap } from './badgeMap';
import { fullLocationMap } from './location';
import { fullStyle } from './style';

import type { FullConfig } from '@/types';

/** The badge delimiter for use in tests. */
const DELIMITER = ':';

/** Example full addon config for use in tests. */
const fullConfig: FullConfig = {
  autobadges: ['new'], // TODO: Another with the function
  badgeMap: testingBadgeMap,
  baseStyle: fullStyle,
  delimiter: DELIMITER,
  displayContentOnly: false,
  excludeTags: [],
  locations: fullLocationMap,
  matchers: [], // TODO:
  replaceDefaultBadgeMap: false,
  // TODO: Allow array (to allow for after/before and between combo?)
  separators: {
    sidebar: 'none',
    toolbar: 'wrap',
    'toolbar-end': 'before',
  },
  showClearButton: false,
  sidebarDisplayBadges: 1,
  useBadgeFallback: true,
  useTags: true,
  warnOnLegacy: false,
};

/** Expected resolved value for the defaultConfig. */
const resolvedDefaultConfig: FullConfig = {
  ...fullConfig,
  ...defaultConfig,
  baseStyle: fullStyle,
  locations: {
    sidebar: [],
    toolbar: ['docs', 'story'],
    'toolbar-end': [],
  },
};

/** Full config with a style function. */
const fullConfigStyleFn: FullConfig = {
  ...fullConfig,
  baseStyle: () => fullStyle,
};

export { DELIMITER, fullConfig, fullConfigStyleFn, resolvedDefaultConfig };
