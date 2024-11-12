import { Fragment, useMemo } from 'react';
import { Separator } from 'storybook/internal/components';

import { useAddon } from '@/hooks';

import { Badge } from '../Badge';
import { BadgesWrapper } from './styled';

import type { BadgesProps } from './prop.types';
import type { FC } from 'react';

/**
 * Wrapper component for displaying multiple badges, with or without separators.
 */
const Badges: FC<BadgesProps> = ({ entry, location }: BadgesProps) => {
  const addon = useAddon();
  const { addonConfig } = addon;

  const badges = useMemo(() => addon.getBadgesForStory(entry, location), [addon, entry, location]);

  /** Configuration value for how to display separators. */
  const separators = useMemo(
    () =>
      typeof addonConfig.separators === 'string'
        ? addonConfig.separators
        : addonConfig?.separators[location],
    [addonConfig.separators, location],
  );

  return badges.length > 0 ? (
    <>
      {['all', 'before', 'wrap'].includes(separators) && <Separator />}
      <BadgesWrapper location={location}>
        {badges.map((badge, index) => (
          <Fragment key={badge.badgeId}>
            <Badge
              badgeId={badge.badgeId}
              content={badge.content}
              config={badge.config}
              delimiter={addonConfig.delimiter}
              entry={entry}
            />
            {['all', 'between'].includes(separators) && index != badges.length - 1 && <Separator />}
          </Fragment>
        ))}
      </BadgesWrapper>
      {['after', 'all', 'wrap'].includes(separators) && <Separator />}
    </>
  ) : null;
};

export { Badges };
export type { BadgesProps } from './prop.types';
