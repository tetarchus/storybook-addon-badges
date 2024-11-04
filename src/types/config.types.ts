import type { AUTOBADGES } from '@/constants';
import type { Badge } from './badge.types';
import type { BadgeLocation, BadgeLocations, LocationMap } from './location.types';
import type { Matcher } from './matcher.types';
import type { BaseBadgeStyleOrFn, FullBadgeStyle, FullBadgeStyleFn } from './style.types';
import type { HashEntry } from 'storybook/internal/manager-api';

/** Available built-in options for autobadges. */
type AutobadgesOptions = (typeof AUTOBADGES)[keyof typeof AUTOBADGES];
/** Custom function for automatically assigning badges. */
type AutobadgesFn = (params: AutobadgesFnParameters) => string[];
/** Parameters for a custom autobadges function. */
type AutobadgesFnParameters = { entry: HashEntry; isNew: boolean; isUpdated: boolean };
/** Map of badge configurations to their IDs. */
type BadgeMap<Keys extends string = string> = Record<Keys, Badge>;
/** Available positions for the separators in the sidebar/toolbar. */
type Separators = 'after' | 'all' | 'before' | 'between' | 'none' | 'wrap';

/** The full configuration that can be passed in to `addon.setConfig`. */
type BadgesConfig = {
  /**
   * Autobadges configuration. Can be:
   * - A single {@link AutobadgeOptions|Autobadge} type to display.
   * - An array of {@link AutobadgeOptions|Autobadge}s to display.
   * - A custom function that is called on an individual story to which badges
   * to display.
   * - `false` to disable autobadges.
   */
  autobadges: AutobadgesOptions | AutobadgesOptions[] | AutobadgesFn | false;
  /** Mapping object of badge IDs to their their configuration. */
  badgeMap: BadgeMap;
  /**
   * The fallback style to use. Applies to non-defined badges, as well as providing
   * fallback values for all styles. Can be:
   * - The name of a built-in style
   * - A partial style that extends a built-in style.
   * - A full style
   * - A style function that returns any of the above.
   */
  baseStyle: BaseBadgeStyleOrFn;

  /** The standard delimiter for badges - used to separate the badge ID from content. */
  delimiter: string;
  /**
   * Whether to display the content part of the badge only. If `false` the output text
   * will include the badgeId. Can be overridden on a per-badge basis.
   */
  displayContentOnly: boolean;
  /**
   * Array of tag names to exclude. Applies only to Storybook's tags. By default this
   * excludes all built-in tags allowing only custom tags to display.
   */
  excludeTags: string[];
  /** The default locations for badges to display. */
  locations: Required<BadgeLocations>;
  /** Array of {@link Matcher}s to use when determining badges. */
  matchers: Matcher[];
  /** Whether to override the default badge map when defining a custom badge map. */
  replaceDefaultBadgeMap: boolean;
  /**
   * Where to display separators in the UI. Can be:
   * - A single {@link Separators} value to apply in all locations.
   * - A map of {@link BadgeLocation}s and what separators to display in that location.
   */
  separators: Separators | Record<BadgeLocation, Separators>;
  /**
   * The number of badges to display in the sidebar. If `all` will display all
   * badges that have `sidebar` defined as a location. If set to a number, will
   * set the maximum number of badges to display in the sidebar, sorted by the
   * badge's `priority`.
   */
  sidebarDisplayBadges: number | 'all';
  /** Whether to fall back to the default badge if there is no badge defined in the map/matcher. */
  useBadgeFallback: boolean;
  /** Whether to generate badges from tags. */
  useTags: boolean;
  /**
   * Whether to display a warning when using old-style configuration (parameters).
   * Although the warning will only show once in most cases, this will prevent the
   * warning from displaying at all and can be useful for deployed storybooks.
   */
  warnOnLegacy: boolean;
};

/** The fully resolved Addon configuration, including fallback values. */
type FullConfig = Required<Omit<BadgesConfig, 'baseStyle' | 'locations'>> & {
  /** The base style as a fully-resolved style. */
  baseStyle: FullBadgeStyle | FullBadgeStyleFn;
  // TODO: Do the same with separators?
  /** Normalized location map, so we only have to deal with a single definition type. */
  locations: Required<LocationMap<true>>;
};

export type {
  AutobadgesFn,
  AutobadgesFnParameters,
  BadgesConfig,
  BadgeMap,
  FullConfig,
  Separators,
};
