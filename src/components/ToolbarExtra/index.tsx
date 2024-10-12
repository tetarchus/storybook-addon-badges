import { memo } from 'react';

import { BADGE_LOCATION } from '@/constants';
import { useBadgesConfig, useStoryBadges } from '@/hooks';

import { Badges } from '../Badges';

import type { FC } from 'react';

const LOCATION = BADGE_LOCATION.TOOLBAR_END;

/**
 * Renders badges at the end of the toolbar.
 */
const AddonToolbarExtra: FC = () => {
  const badgesConfig = useBadgesConfig();
  const storyBadges = useStoryBadges(badgesConfig);

  const badges = storyBadges
    .map(badge => badgesConfig.getBadgeConfig(badge))
    .filter(badge => badge.location.includes(LOCATION));

  return badges.length ? <Badges badges={badges} location={LOCATION} /> : null;
};

/**
 * Renders badges at the end of the toolbar.
 */
const ToolbarExtra = memo(AddonToolbarExtra);

export { ToolbarExtra };
