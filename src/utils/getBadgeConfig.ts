import { defaultBadgeConfig } from '@/config';

import type { FullBadgeConfig, FullConfig } from '@/types';

/**
 * Extracts the configuration for a badge from the addon config.
 * @param badge The badge ID to get the config for.
 * @param badgesConfig The addon configuration.
 * @returns The full configuration for the given badge ID.
 */
const getBadgeConfig = (
  badge: string,
  badgesConfig: Omit<FullConfig, 'getBadgeConfig'>,
): FullBadgeConfig => {
  const badgeConfig = badgesConfig.badgeMap[badge];
  const baseConfig = badgeConfig ?? defaultBadgeConfig;

  return {
    location: baseConfig.location ?? badgesConfig.locations,
    styles: {
      ...badgesConfig.baseStyle,
      ...baseConfig.styles,
    },
    title: badgeConfig?.title ?? badge,
    tooltip: baseConfig.tooltip,
  };
};

export { getBadgeConfig };
