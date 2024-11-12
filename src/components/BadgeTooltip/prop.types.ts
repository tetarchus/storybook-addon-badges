import type { TooltipConfig } from '@/types';
import type { ReactNode } from 'react';

/** Props for the BadgeTooltip component. */
type BadgeTooltipProps = {
  /** The contents of the badge. */
  children: ReactNode;
  /** Props to pass to Storybook's TooltipMessage component. */
  tooltip: TooltipConfig;
};

export type { BadgeTooltipProps };
