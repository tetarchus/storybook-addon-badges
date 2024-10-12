import { getBadgeConfig, getBadgesConfig } from '@/utils';

import { BadgeProps } from './prop.types';
import type { FC } from 'react';

/** Displays an example badge in the documentation. */
const Badge: FC<BadgeProps> = ({ badge, baseStyle = 'default' }: BadgeProps) => {
  const badgeConfig = getBadgeConfig(badge, getBadgesConfig({ baseStyle }));

  return (
    <div
      style={{
        ...badgeConfig.styles,
        display: 'inline',
      }}
    >
      {badgeConfig.title}
    </div>
  );
};

export { Badge };
export { BADGE } from '@/constants';
