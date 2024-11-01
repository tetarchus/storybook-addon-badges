import type { BadgeParts } from '@/types';

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

export {
  getBadgeContent,
  getBadgeContentInternal,
  getBadgeId,
  getBadgeIdInternal,
  getBadgeParts,
  getBadgePartsInternal,
};
