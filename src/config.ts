import { BADGE, BADGE_LOCATION } from '@/constants';

import type { BadgeConfig, BadgeStyle, NewBadgesConfig } from '@/types';

/** The default base style for badges. */
const defaultBadgeStyle: Required<BadgeStyle> = {
  backgroundColor: '#EDEFF5',
  borderColor: '#474D66',
  borderRadius: '3px',
  borderStyle: 'solid',
  borderWidth: '1px',
  color: '#474D66',
  fontFamily: 'inherit',
  fontSize: '0.625rem',
  fontWeight: 'bold',
  lineHeight: '1',
  paddingBlock: '2px',
  paddingInline: '5px',
  textTransform: 'uppercase',
};

/** Base style for badges similar to github labels. */
const githubBadgeStyle: Required<BadgeStyle> = {
  ...defaultBadgeStyle,
  borderRadius: '10px',
  fontSize: '0.75rem',
  paddingInline: '8px',
  textTransform: 'lowercase',
};

/**
 * The default addon configuration containing fallback values for missing keys
 * in a user-defined config.
 */
const defaultBadgesConfig = {
  badgeMap: {
    [BADGE.DEFAULT]: {
      title: 'Badge',
    },
    [BADGE.BETA]: {
      title: 'Beta',
      styles: {
        backgroundColor: '#D6E0FF',
        borderColor: '#2952CC',
        color: '#2952CC',
      },
    },
    [BADGE.STABLE]: {
      title: 'Stable',
      styles: {
        backgroundColor: '#DCF2EA',
        borderColor: '#317159',
        color: '#317159',
      },
    },
    [BADGE.NEEDS_REVISION]: {
      title: 'Needs Revision',
      styles: {
        backgroundColor: '#FFEFD2',
        borderColor: '#66460D',
        color: '#66460D',
      },
    },
    [BADGE.OBSOLETE]: {
      title: 'Obsolete',
      styles: {
        backgroundColor: '#F9DADA',
        borderColor: '#7D2828',
        color: '#7D2828',
      },
    },
    [BADGE.EXPERIMENTAL]: {
      title: 'Experimental',
      styles: {
        backgroundColor: '#E7E4F9',
        borderColor: '#6E62B6',
        color: '#6E62B6',
      },
    },
    [BADGE.DEPRECATED]: {
      title: 'Deprecated',
      styles: {
        backgroundColor: '#F8E3DA',
        borderColor: '#85462B',
        color: '#85462B',
      },
    },
  },
  baseStyle: 'default',
  excludeTags: ['autodocs', 'dev', 'test', 'unattached-mdx'],
  locations: [BADGE_LOCATION.TOOLBAR],
  useTags: false,
} satisfies Required<NewBadgesConfig>;

/** The default config to use for badges without a config. */
const defaultBadgeConfig = defaultBadgesConfig.badgeMap[BADGE.DEFAULT] satisfies BadgeConfig;

export { defaultBadgeConfig, defaultBadgesConfig, defaultBadgeStyle, githubBadgeStyle };
