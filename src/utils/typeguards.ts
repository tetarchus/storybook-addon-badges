import { defaultBadgeStyle } from '@/config';

import type {
  BadgeConfig,
  BadgesConfig,
  BadgeStyle,
  NewBadgesConfig,
  TooltipConfig,
} from '@/types';
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
  if (typeof config === 'object' && config != null) {
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
  if (typeof obj === 'object' && obj != null) {
    if (Object.keys(obj).length > 0) return true;

    for (const key of styleKeys) {
      if (
        key in obj &&
        (typeof obj[key as keyof typeof obj] === 'string' ||
          typeof obj[key as keyof typeof obj] === 'number')
      ) {
        return true;
      }
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
const isBadgeConfig = (config: unknown): config is BadgeConfig => {
  if (typeof config !== 'object' || config == null) {
    return false;
  }
  const hasKeys = Object.keys(config).length > 0;
  const hasValidTitle = 'title' in config && typeof config.title === 'string';
  const hasValidTooltip = 'tooltip' in config && isTooltipDefinition(config.tooltip);
  const hasValidStyles = 'styles' in config && isValidStyles(config.styles);

  return !hasKeys || hasValidStyles || hasValidTitle || hasValidTooltip;
};

/**
 * Typeguard to check whether a configuration uses the new style config.
 * @param config The configuration object.
 * @returns A boolean indicating whether the configuration is in the new style.
 */
const isNewBadgesConfig = (config?: BadgesConfig): config is Partial<NewBadgesConfig> => {
  if (!config || (config?.badgeMap != null && !isBadgeConfig(config.badgeMap))) {
    return true;
  }
  for (const configValue of Object.values(config)) {
    if (isBadgeConfig(configValue)) {
      return false;
    }
  }
  return true;
};

export { isNewBadgesConfig };
