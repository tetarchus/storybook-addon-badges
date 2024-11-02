import { memo, useMemo } from 'react';

import { BADGE_LOCATION } from '@/constants';

import { Badges } from '../Badges';
import { Label } from './styled';

import type { SidebarProps } from './prop.types';
import type { FC } from 'react';

const location = BADGE_LOCATION.SIDEBAR;

/**
 * Display component for rendering labels in the Sidebar alongside badges.
 */
const AddonSidebar: FC<SidebarProps> = ({ api, 'data-testid': dataTestId, item, renderLabel }) => {
  /** The text portion of the label - allowing for custom renderLabel from the user. */
  const label = useMemo(() => renderLabel?.(item, api) ?? item.name, [api, item, renderLabel]);

  return (
    <Label data-testid={dataTestId}>
      {label}
      <Badges
        data-testid={dataTestId ? `${dataTestId}-badges` : undefined}
        entry={item}
        location={location}
      />
    </Label>
  );
};

/** Memoised component for rendering labels in the Sidebar alongside badges. */
const Sidebar = memo(AddonSidebar);

export { Sidebar };
export type { SidebarProps } from './prop.types';
