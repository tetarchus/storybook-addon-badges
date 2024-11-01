import { BADGE } from '@/constants';
import type { Badge, BadgeMap } from '@/types';

/** The default badge configs that are used/extended. */
const defaultBadgeMap = {
  [BADGE.BETA]: {
    title: 'Beta',
    styles: {
      backgroundColor: '#D6E0FF',
      borderColor: '#2952CC',
      color: '#2952CC',
    },
  },
  [BADGE.DEFAULT]: {
    title: 'Badge',
  },
  [BADGE.DEPRECATED]: {
    title: 'Deprecated',
    styles: {
      backgroundColor: '#F8E3DA',
      borderColor: '#85462B',
      color: '#85462B',
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
  [BADGE.NEEDS_REVISION]: {
    title: 'Needs Revision',
    styles: {
      backgroundColor: '#FFEFD2',
      borderColor: '#66460D',
      color: '#66460D',
    },
  },
  [BADGE.NEW]: {
    location: ['sidebar', 'toolbar'],
    title: 'New',
    priority: 1,
    styles: {
      backgroundColor: '#00FF00',
      color: '#000000',
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
  [BADGE.STABLE]: {
    title: 'Stable',
    styles: {
      backgroundColor: '#DCF2EA',
      borderColor: '#317159',
      color: '#317159',
    },
  },
  [BADGE.UPDATED]: {
    location: ['sidebar', 'toolbar'],
    priority: 2,
    title: 'Updated',
    styles: {
      backgroundColor: '#DCF2EA',
      borderColor: '#317159',
      color: '#317159',
    },
  },
} satisfies BadgeMap<(typeof BADGE)[keyof typeof BADGE]>;

/** The default config to use for badges without a config. */
const defaultBadgeConfig: Badge = defaultBadgeMap[BADGE.DEFAULT];

export { defaultBadgeConfig, defaultBadgeMap };