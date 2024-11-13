import type { TooltipConfig } from '@/types';
import type { ReactNode } from 'react';

/** Props for the BadgeTooltip component. */
type BadgeTooltipProps = {
  /** The contents of the badge. */
  children: ReactNode;
  /** ID to use for tests. */
  'data-testid'?: string | undefined;
  /** Props to pass to Storybook's TooltipMessage component. */
  tooltip: TooltipConfig;
};

export type { BadgeTooltipProps };
