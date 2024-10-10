import { useMemo } from 'react';

import { BadgeTooltipWrapper } from '@/components/BadgeTooltipWrapper';

import { StyledBadge } from './styled';

import type { BadgeProps } from './prop.types';
import type { FC } from 'react';

/**
 * A single badge component.
 */
const Badge: FC<BadgeProps> = ({ badge }: BadgeProps) => {
  const Component = useMemo(() => <StyledBadge config={badge}>{badge.title}</StyledBadge>, [badge]);

  return badge.tooltip ? (
    <BadgeTooltipWrapper tooltip={badge.tooltip}>{Component}</BadgeTooltipWrapper>
  ) : (
    Component
  );
};

export { Badge };
