import type { API_HashEntry } from '@storybook/types';
import type { API } from 'storybook/internal/manager-api';

/** Props for the Sidebar component. */
type SidebarProps = {
  api: API | null;
  /** The story item being rendered in the sidebar. */
  item: API_HashEntry;
};

export type { SidebarProps };
