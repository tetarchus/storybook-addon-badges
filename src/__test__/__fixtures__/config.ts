import { defaultConfig } from '@/config';

import { testingBadgeMap } from './badgeMap';
import { fullLocationMap } from './location';
import { DELIMITER } from './shared';
import { fullStyle } from './style';

import type { FullConfig } from '@/types';

/** Example full addon config for use in tests. */
const fullConfig: FullConfig = {
  autobadges: ['new'], // TODO: Another with the function
  badgeMap: testingBadgeMap,
  baseStyle: fullStyle,
  delimiter: DELIMITER,
  displayContentOnly: true,
  excludeTags: [],
  locations: fullLocationMap,
  matchers: [], // TODO:
  markAllAsReadOnDocsView: true,
  replaceDefaultBadgeMap: false,
  // TODO: Allow array (to allow for after/before and between combo?)
  separators: {
    sidebar: 'none',
    toolbar: 'wrap',
    'toolbar-end': 'before',
  },
  sidebarDisplayBadges: 1,
  useMatcherBadgeFallback: true,
  useTags: true,
  warnOnLegacyConfig: false,
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

export { fullConfig, fullConfigStyleFn, resolvedDefaultConfig };
