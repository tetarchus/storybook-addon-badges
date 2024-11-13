import type { ComponentProps } from 'react';
import type { TooltipMessage } from 'storybook/internal/components';
import type { HashEntry } from 'storybook/internal/manager-api';

/** Custom `renderLabel` function. */
type RenderLabelFn = ((item: HashEntry, api: unknown) => unknown) | undefined;
/** Props to pass to the TooltipMessage component from storybook. */
type TooltipMessageProps = Omit<ComponentProps<typeof TooltipMessage>, 'children'>;
/** Badge tooltip configuration for a badge. */
type TooltipConfig = TooltipMessageProps | string;

export type { RenderLabelFn, TooltipConfig, TooltipMessageProps };
