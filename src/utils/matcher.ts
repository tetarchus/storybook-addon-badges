import { getBadgePartsInternal, getFullBadgeConfig } from './badge';

import type { BadgeDefinition, FullConfig, Matcher, MatchPattern } from '@/types';

/**
 * Checks whether a string matches the given `pattern` which may be:
 * - A RegExp
 * - A string
 * - An object for matching the split {@link BadgeParts}
 * @param badge The badge string to match.
 * @param pattern The pattern to match using.
 * @param delimiter The delimiter to use.
 * @returns A boolean indicating whether the `pattern` matches the `badge`.
 */
const matchPattern = (badge: string, pattern: MatchPattern, delimiter: string): boolean => {
  if (pattern instanceof RegExp) {
    if (badge.match(pattern)) {
      return true;
    }
  } else if (typeof pattern === 'string') {
    if (badge === pattern) {
      return true;
    }
  } else {
    const matchAny = /.+/iu;
    const { badgeId, content } = getBadgePartsInternal(badge, delimiter);
    const idPattern = pattern.badgeId ?? matchAny;
    const contentPattern = pattern.content ?? matchAny;

    const idMatches = matchPattern(badgeId, idPattern, delimiter);
    const contentMatches = content ? matchPattern(content, contentPattern, delimiter) : true;

    if (idMatches && contentMatches) {
      return true;
    }
  }
  return false;
};

/**
 * Works through a {@link Matcher}'s patterns to check whether the badge string
 * matches any.
 * @param badge The badge string to match.
 * @param matcher The {@link Matcher} configuration.
 * @param delimiter The global delimiter to fall back to.
 * @returns A boolean indicating whether a match was found.
 */
const matchBadge = (badge: string, matcher: Matcher, delimiter: string): boolean => {
  const matchPatterns = [matcher.match].flat();
  for (const pattern of matchPatterns) {
    const isMatch = matchPattern(badge, pattern, matcher.delimiter ?? delimiter);
    if (isMatch) {
      return true;
    }
  }
  return false;
};

/**
 * Get the badge configuration based on the information defined in a {@link Matcher}.
 * @param matcher The {@link Matcher} to generate a config from.
 * @param config The addon config to use.
 * @param badgeId Option badge ID to use in the case of an inline custom config.
 * @returns An object containing the badgeId, and a {@link FullBadgeConfig}.
 */
const getMatcherBadge = (
  matcher: Matcher,
  config: FullConfig,
  badgeId?: string,
): Omit<BadgeDefinition, 'content'> => {
  const { badge, locations } = matcher;

  if (typeof badge === 'string') {
    // Badge ID only - get config and return
    return { badgeId: badge, config: getFullBadgeConfig(badge, config, { locations }) };
  }

  // Match a badge ID with custom title function
  if ('id' in badge) {
    return {
      badgeId: badge.id,
      config: getFullBadgeConfig(badge.id, config, { locations, title: badge.title }),
    };
  }

  const fullConfig = getFullBadgeConfig(badge, config, { locations });

  return {
    badgeId: badgeId ?? 'custom', // TODO: Another fallback?
    config: fullConfig,
  };
};

export { getMatcherBadge, matchBadge };
