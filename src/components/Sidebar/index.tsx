import { SidebarLabel } from './SidebarLabel';

import type { API_HashEntry, API_SidebarOptions } from '@storybook/types';

/**
 * Config object to pass to Storybook's sidebar configuration.
 */
const sidebar: API_SidebarOptions = {
  renderLabel: (item: API_HashEntry) => <SidebarLabel item={item} />,
};

export { sidebar };
