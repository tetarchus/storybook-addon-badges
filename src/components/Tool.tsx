import { memo, useCallback, useEffect } from 'react';
import { LightningIcon } from '@storybook/icons';
import { IconButton } from 'storybook/internal/components';
import { useGlobals } from 'storybook/internal/manager-api';

import { ADDON_ID, KEY, TOOL_ID } from '../constants';

import type { API } from 'storybook/internal/manager-api';

const AddonBadges = ({ api }: { api: API }) => {
  const [globals, updateGlobals, storyGlobals] = useGlobals();

  const isLocked = KEY in storyGlobals;
  const isActive = !!globals[KEY];

  const toggle = useCallback(() => {
    updateGlobals({
      [KEY]: !isActive,
    });
  }, [isActive]);

  useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: 'Toggle Measure [O]',
      defaultShortcut: ['O'],
      actionName: 'outline',
      showInMenu: false,
      action: toggle,
    });
  }, [toggle, api]);

  return (
    <IconButton
      key={TOOL_ID}
      active={isActive}
      disabled={isLocked}
      title='Enable my addon'
      onClick={toggle}
    >
      <LightningIcon />
    </IconButton>
  );
};

const Tool = memo(AddonBadges);

export { Tool };
