import type { BADGE_LOCATION } from '@/constants';
import type { HashEntry } from 'storybook/internal/manager-api';
import type { FullBadgeConfig } from './badge.types';
import type { FullConfig } from './config.types';

/** Available locations to display badges. */
type BadgeLocation = (typeof BADGE_LOCATION)[keyof typeof BADGE_LOCATION];
/** Available sidebar entry types. */
type EntryType = HashEntry['type'];

/** Parameters for `shouldDisplayBadge`. */
type ShouldDisplayBadgeParameters = {
  /** The resolved badge config object. */
  badgeConfig: FullBadgeConfig;
  /** The resolved addon config object. */
  config: FullConfig;
  /** A set of fallback location values. */
  defaults: Required<BadgeLocations>;
  /** The {@link BadgeLocation} to check if the badge should display in. */
  location: BadgeLocation;
  /** The type of entry the badges are for. */
  type: EntryType;
};

/**
 * Display options for where to display badges based on the {@link EntryType}.
 * For each {@link BadgeLocation}, can be `true` to include all types,
 * `false` to not display for any type, or an array of the entry types to
 * display in that location only for the specified types.
 */
type LocationOption<T, Strict extends boolean = false> = Strict extends true
  ? T[]
  : boolean | T | T[];

/**
 * The types of {@link HashEntry|HashEntries} for which badges will be displayed
 * in different parts of the Storybook UI.
 */
type LocationMap<Strict extends boolean = false> = {
  /** Controls the display of badges in the sidebar. */
  [BADGE_LOCATION.SIDEBAR]?: LocationOption<Exclude<EntryType, 'root'>, Strict>;
  /** Controls the display of badges in the toolbar. */
  [BADGE_LOCATION.TOOLBAR]?: LocationOption<
    Exclude<EntryType, 'root' | 'component' | 'group'>,
    Strict
  >;
  /** Controls the display of badges in the toolbar-extra location. */
  [BADGE_LOCATION.TOOLBAR_END]?: LocationOption<
    Exclude<EntryType, 'root' | 'component' | 'group'>,
    Strict
  >;
};

/**
 * Options for specifying location in the config. Accepts either a granular
 * {@link LocationMap}, or a simple array of locations (which will display for
 * all {@link HashEntry} types.
 */
type BadgeLocations = BadgeLocation[] | LocationMap;

export type {
  BadgeLocation,
  BadgeLocations,
  EntryType,
  LocationMap,
  LocationOption,
  ShouldDisplayBadgeParameters,
};
