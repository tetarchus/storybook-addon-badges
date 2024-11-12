import type { RenderLabelFn } from '@/types';
import type { API, HashEntry } from 'storybook/internal/manager-api';

type SidebarProps = {
  api: API | undefined;
  item: HashEntry;
  renderLabel?: RenderLabelFn | undefined;
};

export type { SidebarProps };
