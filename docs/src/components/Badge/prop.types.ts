import type { BaseBadgeStyleOrFn } from '@/types/style.types';

/** Props for the docs Badge component. */
type BadgeProps = {
  /** The badge */
  badge: string;
  /** The base style to use for the badge. */
  baseStyle?: BaseBadgeStyleOrFn;
  /** Content of the badge. */
  content?: string | undefined;
};

export type { BadgeProps };
