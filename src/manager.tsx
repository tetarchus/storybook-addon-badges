import { addons, types } from 'storybook/internal/manager-api';

import { Tool } from '@/components';
import { ADDON_ID, ADDON_TITLE, PARAM_BADGES_KEY, TOOL_ID } from '@/constants';

// Register the addon
addons.register(ADDON_ID, _api => {
  // Register a tool
  addons.add(TOOL_ID, {
    title: ADDON_TITLE,
    type: types.TOOL,
    paramKey: PARAM_BADGES_KEY,
    match: () => true,
    render: () => <Tool />,
  });
});
