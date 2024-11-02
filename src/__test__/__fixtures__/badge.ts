import { getBadgeContent, getBadgeId, getBadgeParts } from '@/utils';

import { fullLocationMap } from './location';
import { DELIMITER } from './shared';
import { storyEntry } from './storybook';
import { fullStyle } from './style';

import type { Badge, BadgeFnParameters, FullBadgeConfig } from '@/types';

/** Example full badge config for use in tests. */
const fullBadgeConfig: FullBadgeConfig = {
  displayContentOnly: false,
  locations: fullLocationMap,
  priority: 1,
  style: () => fullStyle,
  title: ({ content }) => content,
  tooltip: 'Basic Tooltip',
};

/** Example simple badge config for use in tests. */
const basicBadgeConfig: Badge = {
  style: { backgroundColor: '#00C7AC' },
  title: ({ content }) => `custom${content}`,
};

/** Example secondary badge config for use in tests. */
const secondaryBadgeConfig: Badge = {
  style: { backgroundColor: '#C7AC00' },
  title: ({ content, getBadgeContent }) => `custom${getBadgeContent(content)}`,
};

/** Example badge function parameters to pass into tested badge functions. */
const badgeFnParameters: BadgeFnParameters = {
  badgeId: 'Example',
  content: 'Example Badge',
  entry: storyEntry,
  getBadgeContent: getBadgeContent(DELIMITER),
  getBadgeId: getBadgeId(DELIMITER),
  getBadgeParts: getBadgeParts(DELIMITER),
};

export { badgeFnParameters, basicBadgeConfig, fullBadgeConfig, secondaryBadgeConfig };
