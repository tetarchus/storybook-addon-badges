import { defaultBadgesConfig } from '@/config';

import { getBadgeConfig } from './getBadgeConfig';
import { getBaseStyle } from './getBaseStyle';
import { isNewBadgesConfig } from './typeguards';

import type { BadgesConfig, FullConfig, NewBadgesConfig } from '@/types';

/**
 * Merges the base configuration with a custom config to give a the full addon
 * config.
 * @param customConfig A custom configuration object to merge.
 * @returns The merged config with default values.
 */
const getBadgesConfig = (customBadgesConfig?: BadgesConfig): FullConfig => {
  const customConfig: Partial<NewBadgesConfig> = isNewBadgesConfig(customBadgesConfig)
    ? customBadgesConfig
    : { badges: customBadgesConfig ?? {} };

  const badgesConfig = {
    badges: { ...defaultBadgesConfig.badges, ...customConfig?.badges },
    baseStyle: getBaseStyle(customConfig?.baseStyle ?? defaultBadgesConfig.baseStyle),
    excludeTags: customConfig?.excludeTags ?? defaultBadgesConfig.excludeTags,
    locations: [...new Set([...defaultBadgesConfig.locations, ...(customConfig?.locations ?? [])])],
    useTags: customConfig?.useTags ?? defaultBadgesConfig.useTags,
  };

  return {
    ...badgesConfig,
    getBadgeConfig: (badge: string) => getBadgeConfig(badge, badgesConfig),
  };
};

export { getBadgesConfig };
