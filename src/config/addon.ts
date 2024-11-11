import { BADGE_LOCATION } from '@/constants';

import { defaultBadgeMap } from './badges';

import type { BadgesConfig } from '@/types';

const storybookTags = ['autodocs', 'dev', 'test', 'attached-mdx', 'unattached-mdx'] as const;

/** The default addon configuration. Values not overridden will fall back to this. */
const defaultConfig: BadgesConfig = {
  autobadges: ['new', 'updated'],
  badgeMap: defaultBadgeMap,
  baseStyle: 'default',
  delimiter: ':',
  displayContentOnly: true,
  excludeTags: [...storybookTags],
  locations: ['toolbar'],
  matchers: [],
  markAllAsReadOnDocsView: true,
  replaceDefaultBadgeMap: false,
  separators: {
    [BADGE_LOCATION.SIDEBAR]: 'none',
    [BADGE_LOCATION.TOOLBAR]: 'wrap',
    [BADGE_LOCATION.TOOLBAR_END]: 'before',
  },
  sidebarDisplayBadges: 'all',
  useMatcherBadgeFallback: false,
  useTags: false,
  warnOnLegacyConfig: true,
} satisfies Required<BadgesConfig>;

export { defaultConfig, storybookTags };
