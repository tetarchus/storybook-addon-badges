import { addons, types } from 'storybook/internal/manager-api';

import { Tool } from '@/components';
import { ADDON_ID, ADDON_TITLE, BADGES_KEY, TOOL_ID } from '@/constants';

// Register the addon
addons.register(ADDON_ID, api => {
  // Register a tool
  addons.add(TOOL_ID, {
    title: ADDON_TITLE,
    type: types.TOOL,
    paramKey: BADGES_KEY,
    match: () => true,
    render: () => <Tool api={api} />,
  });
});
