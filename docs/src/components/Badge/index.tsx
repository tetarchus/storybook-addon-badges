import { getFullBadgeConfig, getFullConfig } from '@/utils';

import type { BadgeProps } from './prop.types';
import type { FC } from 'react';

/** Displays an example badge in the documentation. */
const Badge: FC<BadgeProps> = ({ badge, baseStyle = 'default', content }: BadgeProps) => {
  const badgeConfig = getFullBadgeConfig(badge, getFullConfig({ baseStyle }));

  return (
    <div
      style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(badgeConfig.style({} as any) as any),
        display: 'inline',
      }}
    >
      {content ?? (badgeConfig.title as string)}
    </div>
  );
};

export { Badge };
export { BADGE } from '@/constants';
