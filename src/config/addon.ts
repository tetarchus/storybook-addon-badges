import { BADGE_LOCATION } from '@/constants';

import { defaultBadgeMap } from './badges';

import type { BadgesConfig } from '@/types';

/** The default addon configuration. Values not overridden will fall back to this. */
const defaultConfig: BadgesConfig = {
  autobadges: ['new', 'updated'],
  badgeMap: defaultBadgeMap,
  baseStyle: 'default',
  delimiter: ':',
  displayContentOnly: false,
  excludeTags: ['autodocs', 'dev', 'test', 'attached-mdx', 'unattached-mdx'],
  locations: ['toolbar'],
  matchers: [],
  replaceDefaultBadgeMap: false,
  separators: {
    [BADGE_LOCATION.SIDEBAR]: 'none',
    [BADGE_LOCATION.TOOLBAR]: 'wrap',
    [BADGE_LOCATION.TOOLBAR_END]: 'before',
  },
  showClearButton: false,
  sidebarDisplayBadges: 'all',
  useBadgeFallback: false,
  useTags: false,
  warnOnLegacy: true,
} satisfies Required<BadgesConfig>;

export { defaultConfig };
