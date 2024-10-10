import { SidebarLabel } from './SidebarLabel';

import type { API_HashEntry, API_SidebarOptions } from '@storybook/types';
import type { API } from 'storybook/internal/manager-api';

/**
 * Config object to pass to Storybook's sidebar configuration.
 */
const sidebar: API_SidebarOptions = {
  renderLabel: (item: API_HashEntry, api: API) => <SidebarLabel api={api} item={item} />,
};

export { sidebar };
