import { addons, types } from 'storybook/internal/manager-api';

import { Toolbar, ToolbarExtra, sidebar } from '@/components';
import { ADDON_ID, ADDON_TITLE, PARAM_BADGES_KEY, TOOL_EXTRA_ID, TOOL_ID } from '@/constants';

// Register the addon
addons.register(ADDON_ID, () => {
  // Register a toolbar item
  addons.add(TOOL_ID, {
    match: () => true,
    paramKey: PARAM_BADGES_KEY,
    render: Toolbar,
    title: ADDON_TITLE,
    type: types.TOOL,
  });

  // Register a toolbar-extra item
  addons.add(TOOL_EXTRA_ID, {
    match: () => true,
    paramKey: PARAM_BADGES_KEY,
    render: ToolbarExtra,
    type: types.TOOLEXTRA,
    title: ADDON_TITLE,
  });
});

// Register a sidebar modification
addons.setConfig({ sidebar });
