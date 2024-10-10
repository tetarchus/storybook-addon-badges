import type { BadgeLocation, FullBadgeConfig } from '@/types';

/** Where the badges component is located. */
type Placement = Exclude<BadgeLocation, 'toolbar-end'>;

/** Props for the BadgesWrapper. */
type BadgesWrapperProps = {
  /** Where the component is being rendered. */
  placement: Placement;
};

/** Props for the Badges component. */
type BadgesProps = {
  /** The array of badges to display. */
  badges: FullBadgeConfig[];
  /** Where the component is being rendered. */
  placement?: Placement;
};

export type { BadgesProps, BadgesWrapperProps };
