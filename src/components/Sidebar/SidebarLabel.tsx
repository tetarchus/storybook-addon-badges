import { useStorybookApi } from '@storybook/manager-api';
import { memo } from 'react';

import { PARAM_BADGES_KEY } from '@/constants';
import { useBadgesConfig } from '@/hooks';

import { Badges } from '../Badges';

import { LabelWrapper } from './styled';

import type { SidebarProps } from './prop.types';
import type { FC } from 'react';

/**
 * Custom sidebar label renderer that injects badges.
 */
const AddonSidebarLabel: FC<SidebarProps> = ({ item }) => {
  const api = useStorybookApi();
  // TODO: This doesn't get the parameters for the story if it's not active...
  // Look into a better method
  const params = api.getParameters(item.id);
  const badgesConfig = useBadgesConfig();

  if (!params || !params[PARAM_BADGES_KEY]) {
    return item.name;
  }

  const storyBadges: Array<string> = params[PARAM_BADGES_KEY];

  const badges = storyBadges
    .map(badge => badgesConfig.getBadgeConfig(badge))
    .filter(badge => badge.location?.includes('sidebar'));

  return (
    <LabelWrapper>
      {item.name}
      <Badges badges={badges} placement='sidebar' />
    </LabelWrapper>
  );
};

/**
 * Custom sidebar label renderer that injects badges.
 */
const SidebarLabel = memo(AddonSidebarLabel);

export { SidebarLabel };
