import type { BadgeLocations, LocationMap } from './location.types';
import type { BadgeStyleOrFn, FullBadgeStyleFn } from './style.types';
import type { TooltipConfig } from './tooltip.types';
import type { getBadgeParts } from '@/utils';
import type { HashEntry } from 'storybook/internal/manager-api';

/** Function for dynamically creating the badge content. */
type BadgeTitleFn = (params: BadgeFnParameters) => string;

/** Parts of a badge's ID string. */
type BadgeParts = {
  /** The part before the delimiter. Used as the badge ID. */
  badgeId: string;
  /** The part after the delimiter. Used as the badge content. */
  content: string | undefined;
};

/** Parameters passed in to dynamic badge functions. */
type BadgeFnParameters = {
  /** The ID of the badge (pre-delimiter). */
  badgeId: string;
  /**
   * The content of the badge. The content generated depends on config options, but may be:
   * - The text after the delimiter
   * - The whole tag
   * - The title field from the badge configuration.
   */
  content: string;
  /** The {@link HashEntry} item from Storybook that the badge relates to. */
  entry: HashEntry;
  /** Function for getting both parts of the badge (pre and post delimiter). */
  getBadgeParts: ReturnType<typeof getBadgeParts>;
  /** The content of the tags/badges array before splitting. */
  rawContent: string;
};

/** A basic badge definition/configuration object. */
type Badge = {
  /**
   * Whether to display just the 'content' of the badge (after the delimiter).
   * Set to `false` to display the whole string.
   */
  displayContentOnly?: boolean;
  /** Delimiter to use for the badge. */
  delimiter?: string;
  /** The locations that the badge should display. */
  locations?: BadgeLocations;
  /**
   * How to order the badge. Lower numbers appear left of higher numbers.
   * @default 99
   */
  priority?: number;
  /** The style of the badge. */
  style?: BadgeStyleOrFn;
  /** @deprecated - use `style`. */
  styles?: BadgeStyleOrFn;
  /** The text to display on the badge. */
  title?: string | BadgeTitleFn;
  /** Tooltip to display on hover. */
  tooltip?: TooltipConfig;
};

/** Fully resolved badge configuration. */
type FullBadgeConfig = Required<Omit<Badge, 'location' | 'style' | 'styles' | 'tooltip'>> & {
  /** Normalized locations map. */
  locations: Required<LocationMap<true>>;
  /** Function to return the full badge style. */
  style: FullBadgeStyleFn;
  /** Optional tooltip content. */
  tooltip?: TooltipConfig | undefined;
};

/**
 * Badge definition object, containing its ID, config and the text to display.
 */
type BadgeDefinition = {
  /** The ID of the badge being used. */
  badgeId: string;
  /** The fully resolved configuration for the badge. */
  config: FullBadgeConfig;
  /** The text content of the badge. */
  content: string;
};

export type {
  Badge,
  BadgeDefinition,
  BadgeFnParameters,
  BadgeParts,
  BadgeTitleFn,
  FullBadgeConfig,
};
