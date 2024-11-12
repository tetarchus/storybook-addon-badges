import type { BadgeLocation } from '@/types';
import type { HashEntry } from 'storybook/internal/manager-api';

/** Props for the styled wrapper component. */
type BadgesWrapperProps = {
  /** The location that the badges are being displayed. */
  location: BadgeLocation;
};

/** Props for the Badges component. */
type BadgesProps = {
  // TODO: Remove
  // /** Array of badges to display. */
  // badges: BadgeConfig[];
  /** The {@link HashEntry} item from Storybook that the badges relate to. */
  entry: HashEntry;
  /** The location of the badges. */
  location: BadgeLocation;
};

export type { BadgesProps, BadgesWrapperProps };
