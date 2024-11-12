import { arrayIncludes } from '@tetarchus/utils';

import { baseStyles, defaultBadgeStyle } from '@/config';

import type { Badge, BadgeMap, BadgesConfig, BadgeStyle, FullConfig, TooltipConfig } from '@/types';
import type { RequiredDeep } from 'type-fest';

const styleKeys = Object.keys(defaultBadgeStyle);

/**
 * Typeguard to check whether an item is a {@link TooltipConfig}.
 * @param config The expected tooltip configuration.
 * @returns A boolean indicating whether the passed argument is a
 * {@link TooltipConfig}
 */
const isTooltipDefinition = (config: unknown): config is TooltipConfig => {
  if (typeof config === 'string') return true;
  if (typeof config === 'object' && !Array.isArray(config) && config != null) {
    const hasKeys = Object.keys(config).length > 0;
    const hasDesc = 'desc' in config;
    const hasTitle = 'title' in config;
    const hasLinks = 'links' in config && Array.isArray(config.links);

    return !hasKeys || hasDesc || hasTitle || hasLinks;
  }
  return false;
};

/**
 * Typeguard to check if an object contains badge styles.
 * @param obj The object to check.
 * @returns A boolean indicating whether the given `config` contains badge
 * styles.
 */
const isValidStyles = (obj: unknown): obj is RequiredDeep<BadgeStyle> => {
  // Assume it's a style function - badge map does not accept a function
  if (typeof obj === 'function') return true;
  // Otherwise check whether it has style keys
  if (typeof obj === 'object' && obj != null) {
    if (Object.keys(obj).length === 0) return true;

    for (const key of styleKeys) {
      if (
        key in obj &&
        (typeof obj[key as keyof typeof obj] === 'string' ||
          typeof obj[key as keyof typeof obj] === 'number')
      ) {
        return true;
      }
    }

    if ('base' in obj && arrayIncludes(baseStyles, obj.base)) {
      return true;
    }
  }
  return false;
};

/**
 * Typeguard to check whether an object contains a badge configuration.
 * @param config The object to check.
 * @returns A boolean indicating whether the given `config` contains a badge
 * configuration.
 */
const isBadgeConfig = (config: unknown): config is Badge => {
  if (typeof config !== 'object' || config == null) {
    return false;
  }
  const keyLength = Object.keys(config).length;
  const hasKeys = keyLength > 0;
  const hasDisplayContentOnly =
    'displayContentOnly' in config && typeof config.displayContentOnly === 'boolean';
  const hasLocations = 'locations' in config;
  const hasPriority = 'priority' in config && typeof config.priority === 'number';
  const hasValidStyles =
    ('styles' in config && isValidStyles(config.styles)) ||
    ('style' in config && isValidStyles(config.style));
  const hasValidTitle = 'title' in config && typeof config.title === 'string';
  const hasValidTooltip = 'tooltip' in config && isTooltipDefinition(config.tooltip);

  return (
    !Array.isArray(config) &&
    (!hasKeys ||
      hasValidStyles ||
      hasValidTitle ||
      hasValidTooltip ||
      hasPriority ||
      (keyLength === 1 && hasDisplayContentOnly) ||
      (keyLength === 1 && hasLocations))
  );
};

/**
 * Typeguard to check whether a config object is a BadgeMap.
 * @param maybeMap A config object that may be a {@link BadgeMap}.
 * @returns A boolean indicating whether the given object is a {@link BadgeMap}.
 */
const isBadgeMap = (
  maybeMap: Partial<BadgesConfig> | BadgeMap | FullConfig | undefined,
): maybeMap is BadgeMap =>
  maybeMap != null && Object.entries(maybeMap).some(([, value]) => isBadgeConfig(value));

export { isBadgeMap };
