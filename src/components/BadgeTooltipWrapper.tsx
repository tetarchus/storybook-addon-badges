import { TooltipMessage, WithTooltip } from 'storybook/internal/components';

import type { TooltipConfig } from '@/types';
import type { FC, ReactNode } from 'react';

type BadgeTooltipWrapperProps = {
  children: ReactNode;
  tooltip: TooltipConfig;
};

const BadgeTooltipWrapper: FC<BadgeTooltipWrapperProps> = ({
  children,
  tooltip,
}: BadgeTooltipWrapperProps) => {
  const tooltipMessageProps = typeof tooltip === 'string' ? { desc: tooltip } : tooltip;

  const tooltipMessage = <TooltipMessage {...tooltipMessageProps} />;

  return <WithTooltip tooltip={tooltipMessage}>{children}</WithTooltip>;
};

export { BadgeTooltipWrapper };
