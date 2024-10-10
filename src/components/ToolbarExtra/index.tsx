import { memo } from 'react';

import { useBadgesConfig, useStoryBadges } from '@/hooks';

import { Badges } from '../Badges';

import type { FC } from 'react';

/**
 * Renders badges at the end of the toolbar.
 */
const AddonToolbarExtra: FC = () => {
  const badgesConfig = useBadgesConfig();
  const storyBadges = useStoryBadges(badgesConfig);

  const badges = storyBadges
    .map(badge => badgesConfig.getBadgeConfig(badge))
    .filter(badge => badge.location.includes('toolbar-end'));

  return badges.length ? <Badges badges={badges} /> : null;
};

/**
 * Renders badges at the end of the toolbar.
 */
const ToolbarExtra = memo(AddonToolbarExtra);

export { ToolbarExtra };
