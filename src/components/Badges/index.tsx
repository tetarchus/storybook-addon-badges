import { Separator } from 'storybook/internal/components';

import { Badge } from '@/components/Badge';

import { BadgesWrapper } from './styled';

import type { BadgesProps } from './prop.types';
import type { FC } from 'react';

/**
 * Collection of all badges for a story.
 */
const Badges: FC<BadgesProps> = ({ badges, placement = 'toolbar' }: BadgesProps) =>
  badges.length > 0 ? (
    <>
      {placement === 'toolbar' && <Separator />}
      <BadgesWrapper placement={placement}>
        {badges.map(badge => (
          <Badge badge={badge} key={badge.title} />
        ))}
      </BadgesWrapper>
    </>
  ) : null;

export { Badges };
