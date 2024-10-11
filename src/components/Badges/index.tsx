import { Separator } from 'storybook/internal/components';

import { Badge } from '@/components/Badge';
import { BADGE_LOCATION } from '@/constants';

import { BadgesWrapper } from './styled';

import type { BadgesProps } from './prop.types';
import type { FC } from 'react';

/**
 * Collection of all badges for a story.
 */
const Badges: FC<BadgesProps> = ({ badges, location = BADGE_LOCATION.TOOLBAR }: BadgesProps) =>
  badges.length ? (
    <>
      {(location === BADGE_LOCATION.TOOLBAR || location === BADGE_LOCATION.TOOLBAR_END) && (
        <Separator />
      )}
      <BadgesWrapper location={location}>
        {badges.map(badge => (
          <Badge badge={badge} key={badge.title} />
        ))}
      </BadgesWrapper>
      {location === BADGE_LOCATION.TOOLBAR && <Separator />}
    </>
  ) : null;

export { Badges };
