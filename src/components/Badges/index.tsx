import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Separator } from 'storybook/internal/components';
import { addons } from 'storybook/internal/manager-api';

import { EVENTS } from '@/constants';
import { useAddon } from '@/hooks';

import { Badge } from '../Badge';
import { BadgesWrapper } from './styled';

import type { BadgesProps } from './prop.types';
import type { FC } from 'react';

/**
 * Wrapper component for displaying multiple badges, with or without separators.
 */
const Badges: FC<BadgesProps> = ({ 'data-testid': dataTestId, entry, location }: BadgesProps) => {
  const [shouldRerender, setShouldRerender] = useState(false);
  const addon = useAddon();
  const { addonConfig } = addon;

  const channel = addons.getChannel();

  const handleIndexed = useCallback(() => {
    setShouldRerender(true);
  }, []);

  useEffect(() => {
    channel.on(EVENTS.INDEX_COMPLETE, handleIndexed);
  }, [channel, handleIndexed]);

  const badges = useMemo(() => {
    if (shouldRerender) {
      setShouldRerender(false);
    }
    return addon.getBadgesForEntry(entry, location);
  }, [addon, entry, location, shouldRerender]);

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
      <BadgesWrapper data-testid={dataTestId} location={location}>
        {badges.map((badge, index) => (
          <Fragment key={badge.badgeId}>
            <Badge
              badgeId={badge.badgeId}
              content={badge.content}
              data-testid={dataTestId ? `${dataTestId}-badge` : undefined}
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
