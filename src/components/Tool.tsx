import { memo } from 'react';
import { useStorybookApi } from 'storybook/internal/manager-api';

import { BADGES_KEY } from '@/constants';

import { BadgesToolbar } from './BadgesToolbar';

import type { API } from 'storybook/internal/manager-api';

const AddonBadges = () => {
  const api = useStorybookApi();
  const badges = api.getCurrentParameter<string[]>(BADGES_KEY) ?? [];

  return <BadgesToolbar badges={badges} />;
};

const Tool = memo(AddonBadges);

export { Tool };
