import { BADGE } from '@/constants';

import type { BadgeConfig, BadgesConfig, BadgeStyles } from '@/types';

const defaultBadgeStyle: Required<BadgeStyles> = {
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

const defaultBadgesConfig = {
  badges: {
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
} satisfies BadgesConfig;

const defaultBadgeConfig: BadgeConfig = defaultBadgesConfig.badges[BADGE.DEFAULT];

export { defaultBadgeConfig, defaultBadgesConfig, defaultBadgeStyle };
