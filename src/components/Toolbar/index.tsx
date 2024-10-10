import { memo } from 'react';

import { useBadgesConfig, useStoryBadges } from '@/hooks';

import { Badges } from '../Badges';

import type { FC } from 'react';

/**
 * Renders badges in the toolbar.
 */
const AddonToolbar: FC = () => {
  const badgesConfig = useBadgesConfig();
  const storyBadges = useStoryBadges(badgesConfig);

  const badges = storyBadges
    .map(badge => badgesConfig.getBadgeConfig(badge))
    .filter(badge => !badge.location || badge.location?.includes('toolbar'));

  return badges.length ? <Badges badges={badges} /> : null;
};

/**
 * Renders badges in the toolbar.
 */
const Toolbar = memo(AddonToolbar);

export { Toolbar };
