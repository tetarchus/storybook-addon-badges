import type { BadgeStyle, FullBadgeConfig } from '@/types';
import type { HashEntry } from 'storybook/internal/manager-api';

/** Props for the StyledBadge. */
type StyledBadgeProps = {
  /** The resolved badge style configuration. */
  badgeStyle: Required<BadgeStyle>;
  /** Whether the badge has a tooltip - used to control the cursor. */
  hasTooltip: boolean;
  /** The name of the theme from `addon-themes` or dark/light mode. */
  uiTheme: string | undefined;
};

/** Props for the Badge component. */
type BadgeProps = {
  /** The ID of the badge being used. */
  badgeId: string;
  /** The resolved configuration object for the badge. */
  config: FullBadgeConfig;
  /** The text to display. */
  content: string;
  /** Delimiter used to split the ID from the content. */
  delimiter: string;
  /** The {@link HashEntry} item from Storybook. */
  entry: HashEntry;
};

export type { StyledBadgeProps, BadgeProps };
