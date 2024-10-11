import { memo } from 'react';

import { BADGE_LOCATION } from '@/constants';
import { useBadgesConfig, useStoryBadges } from '@/hooks';

import { Badges } from '../Badges';

import type { FC } from 'react';

const LOCATION = BADGE_LOCATION.TOOLBAR;

/**
 * Renders badges in the toolbar.
 */
const AddonToolbar: FC = () => {
  const badgesConfig = useBadgesConfig();
  const storyBadges = useStoryBadges(badgesConfig);

  const badges = storyBadges
    .map(badge => badgesConfig.getBadgeConfig(badge))
    .filter(badge => !badge.location || badge.location?.includes(LOCATION));

  return badges.length ? <Badges badges={badges} location={LOCATION} /> : null;
};

/**
 * Renders badges in the toolbar.
 */
const Toolbar = memo(AddonToolbar);

export { Toolbar };
