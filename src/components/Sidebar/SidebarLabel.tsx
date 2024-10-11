import { useStorybookApi } from '@storybook/manager-api';
import { memo } from 'react';

import { BADGE_LOCATION, PARAM_BADGES_KEY, PARAM_CONFIG_KEY } from '@/constants';
import { getBadgesConfig } from '@/utils';

import { Badges } from '../Badges';

import { LabelWrapper } from './styled';

import type { SidebarProps } from './prop.types';
import type { FC } from 'react';

const LOCATION = BADGE_LOCATION.SIDEBAR;

/**
 * Custom sidebar label renderer that injects badges.
 */
const AddonSidebarLabel: FC<SidebarProps> = ({ item }) => {
  const api = useStorybookApi();
  const params = api?.getParameters(item.id);
  const data = api?.getData(item.id);

  const badgesConfig = getBadgesConfig(params?.[PARAM_CONFIG_KEY]);
  const storyBadges = [...(params?.[PARAM_BADGES_KEY] ?? []), ...(data?.tags ?? [])];

  if (!params || !params[PARAM_BADGES_KEY] || !params[PARAM_CONFIG_KEY]) {
    return item.name;
  }

  const badges = storyBadges
    .map(badge => badgesConfig.getBadgeConfig(badge))
    .filter(badge => badge.location?.includes(LOCATION));

  return badges.length ? (
    <LabelWrapper>
      {item.name}
      <Badges badges={badges} location={LOCATION} />
    </LabelWrapper>
  ) : (
    item.name
  );
};

/**
 * Custom sidebar label renderer that injects badges.
 */
const SidebarLabel = memo(AddonSidebarLabel);

export { SidebarLabel };
