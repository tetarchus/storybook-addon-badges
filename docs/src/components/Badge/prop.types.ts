import type { BadgeStyleBase } from '@/types';

/** Props for the docs Badge component. */
type BadgeProps = {
  /** The badge */
  badge: string;
  /** The base style to use for the badge. */
  baseStyle?: BadgeStyleBase;
};

export type { BadgeProps };
