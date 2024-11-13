import { getBadgeParts } from '@/utils';

import { fullLocationMap } from './location';
import { DELIMITER } from './shared';
import { storyEntry } from './storybook';
import { fullStyle } from './style';

import type { Badge, BadgeFnParameters, FullBadgeConfig } from '@/types';

/** Example full badge config for use in tests. */
const fullBadgeConfig: FullBadgeConfig = {
  displayContentOnly: false,
  delimiter: DELIMITER,
  locations: fullLocationMap,
  priority: 1,
  style: () => fullStyle,
  title: ({ content }) => content,
  tooltip: 'Basic Tooltip',
};

/** Example badge config for displaying a version number. */
const versionBadge: FullBadgeConfig = {
  ...fullBadgeConfig,
  title: ({ content }) => `v${content}`,
};

/** Example simple badge config for use in tests. */
const basicBadgeConfig: Badge = {
  style: { backgroundColor: '#00C7AC' },
  title: ({ content }) => `custom${content}`,
};

/** Example secondary badge config for use in tests. */
const secondaryBadgeConfig: Badge = {
  style: { backgroundColor: '#C7AC00' },
  title: ({ content, getBadgeParts }) => `custom${getBadgeParts(content).content}`,
};

/** Example badge function parameters to pass into tested badge functions. */
const badgeFnParameters: BadgeFnParameters = {
  badgeId: 'example',
  content: 'example-badge',
  entry: storyEntry,
  getBadgeParts: getBadgeParts(DELIMITER),
  rawContent: 'example:example-badge',
};

export { badgeFnParameters, basicBadgeConfig, fullBadgeConfig, secondaryBadgeConfig, versionBadge };
