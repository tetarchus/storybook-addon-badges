import { fullLocationMap } from './location';
import { fullStyle } from './style';

import type { Badge, FullBadgeConfig } from '@/types';

/** Example full badge config for use in tests. */
const fullBadgeConfig: FullBadgeConfig = {
  displayContentOnly: false,
  locations: fullLocationMap,
  priority: 1,
  style: () => fullStyle,
  title: 'ExampleBadge',
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

export { basicBadgeConfig, secondaryBadgeConfig, fullBadgeConfig };
