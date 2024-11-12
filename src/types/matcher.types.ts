import type { Badge, BadgeFnParameters } from './badge.types';
import type { BadgeLocations } from './location.types';

/**
 * Pattern type options. A pattern may be a:
 * - `string`: Matches the whole text
 * - `RegExp`: Matches based on the `String.prototype.match()`.
 */
type Pattern = string | RegExp;
/** Available matching options for a single match. */
type MatchPattern = Pattern | { prefix?: Pattern; suffix?: Pattern };
/** A single pattern, or an array of patterns. */
type MatchPatterns = MatchPattern | MatchPattern[];

/** A matcher definition for more complex badge mapping. Allows mapping from
 * badge names to one of the pre-defined badges, or an in-line badge definition.
 */
type Matcher = {
  /**
   * The badge config to return. May be:
   * - A badge ID relating to a badge from the `badgeMap` (if not present will match default).
   * - An object containing a badge ID, and a dynamic title function.
   * - An inline {@link Badge} configuration.
   */
  badge: string | { id: string; title: (params: BadgeFnParameters) => string | Badge };
  /** The delimiter to use when parsing the matched content. */
  delimiter?: string;
  /** Whether to display only the content portion of a badge. */
  displayContentOnly?: boolean;
  /** The {@link BadgeLocations} that the badge may be placed. */
  locations?: BadgeLocations;
  /**
   * The matcher functions. If the given tag/badge string matches ANY of these,
   * it will be considered a match.
   */
  match: MatchPatterns;
};

export type { Matcher, MatchPatterns };
