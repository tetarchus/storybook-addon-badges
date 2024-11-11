import { BADGE } from '@/constants';

import type { Badge, BadgeMap } from '@/types';

/** The default badge configs that are used/extended. */
const defaultBadgeMap = {
  [BADGE.A11Y_CHECK]: {
    title: '⚠︎ A11y',
    style: {
      backgroundColor: '#FFEFD2',
      borderColor: '#66460D',
      color: '#66460D',
    },
  },
  [BADGE.A11Y_FAIL]: {
    title: '✖︎ A11y',
    style: {
      backgroundColor: '#F9DADA',
      borderColor: '#7D2828',
      color: '#7D2828',
    },
  },
  [BADGE.A11Y_PASS]: {
    title: '✔︎ A11y',
    style: {
      backgroundColor: '#DCF2EA',
      borderColor: '#317159',
      color: '#317159',
    },
  },
  [BADGE.BETA]: {
    title: 'Beta',
    style: {
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
    style: {
      backgroundColor: '#F8E3DA',
      borderColor: '#85462B',
      color: '#85462B',
    },
  },
  [BADGE.EXPERIMENTAL]: {
    title: 'Experimental',
    style: {
      backgroundColor: '#E7E4F9',
      borderColor: '#6E62B6',
      color: '#6E62B6',
    },
  },
  [BADGE.NEEDS_REVISION]: {
    title: 'Needs Revision',
    style: {
      backgroundColor: '#FFEFD2',
      borderColor: '#66460D',
      color: '#66460D',
    },
  },
  [BADGE.NEW]: {
    locations: ['sidebar', 'toolbar'],
    title: 'New',
    priority: 1,
    style: {
      backgroundColor: '#66BF3C', //'#00FF00',
      borderColor: '#66BF3C',
      color: '#000000',
    },
  },
  [BADGE.OBSOLETE]: {
    title: 'Obsolete',
    style: {
      backgroundColor: '#F9DADA',
      borderColor: '#7D2828',
      color: '#7D2828',
    },
  },
  [BADGE.STABLE]: {
    title: 'Stable',
    style: {
      backgroundColor: '#DCF2EA',
      borderColor: '#317159',
      color: '#317159',
    },
  },
  [BADGE.TEST_FAIL]: {
    title: '✖︎ Tests',
    style: {
      backgroundColor: '#F9DADA',
      borderColor: '#7D2828',
      color: '#7D2828',
    },
  },
  [BADGE.TEST_PASS]: {
    title: '✔︎ Tests',
    style: {
      backgroundColor: '#DCF2EA',
      borderColor: '#317159',
      color: '#317159',
    },
  },
  [BADGE.TEST_TODO]: {
    title: 'Skipped Tests',
    style: {
      backgroundColor: '#FFEFD2',
      borderColor: '#66460D',
      color: '#66460D',
    },
  },
  [BADGE.UPDATED]: {
    locations: ['sidebar', 'toolbar'],
    priority: 2,
    title: 'Updated',
    style: {
      backgroundColor: '#00C7AC',
      borderColor: '#00C7AC',
      color: '#2C2C2C',
    },
  },
} satisfies BadgeMap<(typeof BADGE)[keyof typeof BADGE]>;

/** The default config to use for badges without a config. */
const defaultBadgeConfig: Badge = defaultBadgeMap[BADGE.DEFAULT];

export { defaultBadgeConfig, defaultBadgeMap };
