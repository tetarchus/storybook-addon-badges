import type { FullBadgeConfig } from '@/types';

/** Props for the StyledBadge. */
type StyledBadgeProps = {
  /** The configuration object for the badge. */
  config: FullBadgeConfig;
};

/** Props for the Badge component. */
type BadgeProps = {
  /** The name of the badge. */
  badge: FullBadgeConfig;
};

export type { StyledBadgeProps, BadgeProps };
