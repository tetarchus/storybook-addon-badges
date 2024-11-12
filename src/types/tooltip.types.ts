import type { ComponentProps, ReactNode } from 'react';
import type { TooltipMessage } from 'storybook/internal/components';
import type { API, HashEntry } from 'storybook/internal/manager-api';

/** Custom `renderLabel` function. */
type RenderLabelFn = (item: HashEntry | undefined, api: API | undefined) => ReactNode;
/** Props to pass to the TooltipMessage component from storybook. */
type TooltipMessageProps = Omit<ComponentProps<typeof TooltipMessage>, 'children'>;
/** Badge tooltip configuration for a badge. */
type TooltipConfig = TooltipMessageProps | string;

export type { RenderLabelFn, TooltipConfig };
