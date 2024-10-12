import { useBadgesConfig } from './useBadgesConfig';

import type { FullBadgeConfig } from '@/types';

/**
 * Hook to get the full configuration object of a badge.
 * @param badge The badge to fetch the config for.
 * @returns The full configuration of the badge.
 */
const useBadgeConfig = (badge: string): FullBadgeConfig => {
  const config = useBadgesConfig();

  return config.getBadgeConfig(badge);
};

export { useBadgeConfig };
