import { Separator } from 'storybook/internal/components';
import { styled } from '@storybook/theming';

import { Badge } from './Badge';

import type { FC } from 'react';

type BadgesToolbarProps = {
  badges: string[];
};

const BadgesWrapper = styled.div(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.layoutMargin,
  paddingInline: theme.layoutMargin / 2,
}));

const BadgesToolbar: FC<BadgesToolbarProps> = ({ badges }: BadgesToolbarProps) =>
  badges.length > 0 ? (
    <>
      <Separator />
      <BadgesWrapper>
        {badges.map(badge => (
          <Badge badge={badge} key={badge} />
        ))}
      </BadgesWrapper>
    </>
  ) : null;

export { BadgesToolbar };
