import { useMemo } from 'react';
import { TooltipMessage, WithTooltip } from 'storybook/internal/components';

import type { BadgeTooltipWrapperProps } from './prop.types';
import type { FC } from 'react';

const BadgeTooltipWrapper: FC<BadgeTooltipWrapperProps> = ({
  children,
  tooltip,
}: BadgeTooltipWrapperProps) => {
  const tooltipMessage = useMemo(() => {
    const tooltipMessageProps = typeof tooltip === 'string' ? { desc: tooltip } : tooltip;
    return <TooltipMessage {...tooltipMessageProps} />;
  }, [tooltip]);

  return <WithTooltip tooltip={tooltipMessage}>{children}</WithTooltip>;
};

export { BadgeTooltipWrapper };
export type { BadgeTooltipWrapperProps } from './prop.types';
