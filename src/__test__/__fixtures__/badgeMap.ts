import { defaultBadgeMap } from '@/config';

import { basicBadgeConfig, secondaryBadgeConfig } from './badge';

import type { BadgeMap } from '@/types';

/** Example basic badge map for use in tests. */
const basicBadgeMap: BadgeMap = {
  default: basicBadgeConfig,
  example: secondaryBadgeConfig,
};

/** Extended badge map for use in tests. */
const testingBadgeMap: BadgeMap = {
  ...defaultBadgeMap,
  'no-title': {
    style: ({ content }) =>
      content === 'no-title' ? { backgroundColor: 'red' } : { backgroundColor: 'purple' },
  },
};

export { basicBadgeMap, testingBadgeMap };
