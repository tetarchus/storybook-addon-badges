import { memo } from 'react';
import { useStorybookApi } from 'storybook/internal/manager-api';

import { PARAM_BADGES_KEY } from '@/constants';

import { BadgesToolbar } from './BadgesToolbar';

const AddonBadges = () => {
  const api = useStorybookApi();
  const badges = api.getCurrentParameter<string[]>(PARAM_BADGES_KEY) ?? [];

  return <BadgesToolbar badges={badges} />;
};

const Tool = memo(AddonBadges);

export { Tool };
