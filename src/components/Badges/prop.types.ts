import type { BadgeLocation, FullBadgeConfig } from '@/types';

/** Props for the BadgesWrapper. */
type BadgesWrapperProps = {
  /** Where the component is being rendered. */
  location: BadgeLocation;
};

/** Props for the Badges component. */
type BadgesProps = {
  /** The array of badges to display. */
  badges: FullBadgeConfig[];
  /** Where the component is being rendered. */
  location?: BadgeLocation;
};

export type { BadgesProps, BadgesWrapperProps };
