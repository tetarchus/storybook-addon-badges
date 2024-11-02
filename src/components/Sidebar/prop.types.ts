import type { RenderLabelFn } from '@/types';
import type { API, HashEntry } from 'storybook/internal/manager-api';

/** Props for the Sidebar component. */
type SidebarProps = {
  /** The Storybook API passed in from the render function. */
  api: API | undefined;
  /** ID to use for tests. */
  'data-testid'?: string | undefined;
  /** The Storybook entry passed in from the render function. */
  item: HashEntry;
  /**
   * Custom forward render function to allow users to have badges AND their
   * own render function.
   */
  renderLabel?: RenderLabelFn | undefined;
};

export type { SidebarProps };
