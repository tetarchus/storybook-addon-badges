import type { TooltipConfig } from '@/types';
import type { ReactNode } from 'react';

/** Props for the BadgeTooltipWrapper component. */
type BadgeTooltipWrapperProps = {
  /** The contents of the badge. */
  children: ReactNode;
  /** Props to pass to Storybook's TooltipMessage component. */
  tooltip: TooltipConfig;
};

export type { BadgeTooltipWrapperProps };
