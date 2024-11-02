import { useMemo } from 'react';
import { TooltipMessage, WithTooltip } from 'storybook/internal/components';

import type { FC } from 'react';
import type { BadgeTooltipProps } from './prop.types';

/**
 * Convenience wrapper around Storybook's Tooltip components. Allows
 * passing a tooltip as a simple string, or with rich-content.
 */
const BadgeTooltip: FC<BadgeTooltipProps> = ({ children, tooltip }: BadgeTooltipProps) => {
  /** The content of the tooltip. */
  const tooltipMessage = useMemo(() => {
    const tooltipMessageProps = typeof tooltip === 'string' ? { desc: tooltip } : tooltip;
    return <TooltipMessage {...tooltipMessageProps} />;
  }, [tooltip]);

  return (
    <WithTooltip
      closeOnTriggerHidden
      delayHide={100}
      interactive
      tooltip={tooltipMessage}
      trigger={['click', 'hover']}
    >
      {children}
    </WithTooltip>
  );
};

export { BadgeTooltip };
export type { BadgeTooltipProps } from './prop.types';
