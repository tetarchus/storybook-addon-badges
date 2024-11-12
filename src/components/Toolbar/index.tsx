import { memo, useEffect } from 'react';
import { useStorybookApi, useStorybookState } from 'storybook/internal/manager-api';

import { BADGE_LOCATION, EXTERNAL } from '@/constants';
import { useAddon } from '@/hooks';

import { Badges } from '../Badges';

import type { ToolbarProps } from './prop.types';
import type { FC } from 'react';

const AddonToolbar: FC<ToolbarProps> = ({ end = false }: ToolbarProps) => {
  const location = end ? BADGE_LOCATION.TOOLBAR_END : BADGE_LOCATION.TOOLBAR;

  const api = useStorybookApi();
  const addonState = useAddon();
  const sbState = useStorybookState();

  const entry = api.getCurrentStoryData();

  useEffect(() => {
    if (addonState && !end && !addonState.a11yActive) {
      const hasA11yAddon = sbState.addons?.[EXTERNAL.A11Y.ADDON_ID] != null;
      if (hasA11yAddon) addonState.a11yActive = true;
    }
  }, [addonState, end, sbState.addons]);

  return <Badges entry={entry} location={location} />;
};

const Toolbar = memo(AddonToolbar);

export { Toolbar };
export type { ToolbarProps } from './prop.types';
