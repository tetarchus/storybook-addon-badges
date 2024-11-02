import type { BadgeFnParameters, BadgeParts, FullBadgeConfig, FullConfig } from '@/types';
import { normalizeLocations } from './locations';
import { defaultBadgeConfig } from '@/config';

/**
 * Internal function for splitting the badge into parts.
 * @param badgeText The badge text to split into parts.
 * @param delimiter The delimiter string to split on.
 * @returns A {@link BadgeParts} object containing the parts of the badge.
 */
const getBadgePartsInternal = (badgeText: string, delimiter: string): BadgeParts => {
  const [prefix, ...rest] = badgeText.split(delimiter);

  return {
    badgeId: prefix,
    content: rest.join(delimiter),
  };
};

/**
 * Internal function for getting the badge ID.
 * @param badgeText The badge text to split into parts.
 * @param delimiter The delimiter string to split on.
 * @returns The ID part of the badge.
 */
const getBadgeIdInternal = (badgeText: string, delimiter: string): string =>
  getBadgePartsInternal(badgeText, delimiter).badgeId;

/**
 * Internal function for getting the badge content.
 * @param badgeText The badge text to split into parts.
 * @param delimiter The delimiter string to split on.
 * @returns The content of the badge, or undefined if there is no delimiter present.
 */
const getBadgeContentInternal = (badgeText: string, delimiter: string): string | undefined =>
  getBadgePartsInternal(badgeText, delimiter).content;

/**
 * Function for splitting the badge into parts. The delimiter is assigned based
 * on the config options, but may be overridden when the returned function is used.
 * @param defaultDelimiter The default delimiter to use.
 * @returns A function that only requires the badgeText to be passed.
 */
const getBadgeParts =
  (defaultDelimiter: string) =>
  (badgeText: string, delimiter: string = defaultDelimiter): BadgeParts =>
    getBadgePartsInternal(badgeText, delimiter);

/**
 * Function for returning the badge content. The delimiter is assigned based
 * on the config options, but may be overridden when the returned function is used.
 * @param defaultDelimiter The default delimiter to use.
 * @returns A function that only requires the badgeText to be passed.
 */
const getBadgeContent =
  (defaultDelimiter: string) =>
  (badgeText: string, delimiter: string = defaultDelimiter): string | undefined =>
    getBadgeContentInternal(badgeText, delimiter);

/**
 * Function for returning the badge ID. The delimiter is assigned based
 * on the config options, but may be overridden when the returned function is used.
 * @param defaultDelimiter The default delimiter to use.
 * @returns A function that only requires the badgeText to be passed.
 */
const getBadgeId =
  (defaultDelimiter: string) =>
  (badgeText: string, delimiter: string = defaultDelimiter): string =>
    getBadgeIdInternal(badgeText, delimiter);

/**
 * Creates a {@link FullBadgeConfig} for a given badge ID. Uses partial configs
 * from the `badgeMap` and the addon config.
 * @param badgeName The name of the badge to generate the config for.
 * @param config The addon configuration to use when assigning defaults.
 * @returns The fully resolved Badge config.
 */
const getFullBadgeConfig = (badgeName: string, config: FullConfig): FullBadgeConfig => {
  const badgeConfig = config.badgeMap[badgeName];
  const baseConfig = badgeConfig ?? defaultBadgeConfig;

  const baseStyle = baseConfig.styles ?? baseConfig.style;

  const style = (params: BadgeFnParameters) => {
    const baseStyleResolved = typeof baseStyle === 'function' ? baseStyle(params) : baseStyle;
    const configBaseStyle =
      typeof config.baseStyle === 'function' ? config.baseStyle(params) : config.baseStyle;
    return { ...configBaseStyle, ...baseStyleResolved };
  };

  return {
    displayContentOnly: baseConfig.displayContentOnly ?? config.displayContentOnly,
    locations: normalizeLocations(baseConfig.location, config.locations, config.locations),
    priority: baseConfig.priority ?? 99,
    style,
    title: badgeConfig?.title ?? (({ content }) => content),
    tooltip: baseConfig.tooltip,
  };
};

export {
  getBadgeContent,
  getBadgeContentInternal,
  getBadgeId,
  getBadgeIdInternal,
  getBadgeParts,
  getBadgePartsInternal,
  getFullBadgeConfig,
};
