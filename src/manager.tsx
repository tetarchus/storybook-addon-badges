import { addons, types } from 'storybook/internal/manager-api';

import { BadgesAddon } from '@/classes';
import { Sidebar, Toolbar } from '@/components';
import {
  ADDON_ID,
  ADDON_TITLE,
  DEFAULT_STORYBOOK_ID,
  PARAM_BADGES_KEY,
  PARAM_CONFIG_KEY,
  PARAM_STORYBOOK_ID,
  TOOL_EXTRA_ID,
  TOOL_ID,
} from '@/constants';
import { BadgesAddonProvider } from '@/contexts';
import { defaultConfig } from './config';

// Register default config values.
addons.setConfig({
  [PARAM_STORYBOOK_ID]: DEFAULT_STORYBOOK_ID,
  [PARAM_CONFIG_KEY]: defaultConfig,
  [PARAM_BADGES_KEY]: [],
});

addons.register(ADDON_ID, api => {
  // Create an addon instance to use in components.
  const state = new BadgesAddon(api);

  // Register the sidebar render function.
  addons.setConfig({
    sidebar: {
      renderLabel: (item, api) => (
        <BadgesAddonProvider state={state}>
          <Sidebar api={api} item={item} />
        </BadgesAddonProvider>
      ),
    },
  });

  // Register the toolbar addons.
  addons.add(ADDON_ID, {
    id: TOOL_ID,
    render: () => (
      <BadgesAddonProvider state={state}>
        <Toolbar />
      </BadgesAddonProvider>
    ),
    type: types.TOOL,
    title: ADDON_TITLE,
    // match: matchOptions => {
    //   console.log('Match tabID', matchOptions);
    //   return true;
    // },
    // route: options => '',
  });
  addons.add(ADDON_ID, {
    id: TOOL_EXTRA_ID,
    render: () => (
      <BadgesAddonProvider state={state}>
        <Toolbar end />
      </BadgesAddonProvider>
    ),
    type: types.TOOLEXTRA,
    title: ADDON_TITLE,
  });
});
