import { useMemo } from 'react';
import { useStorybookApi } from 'storybook/internal/manager-api';

import { DOCS_URL, PARAM_CONFIG_KEY } from '@/constants';
import { defaultBadgesConfig } from '@/config';
import { getBadgeConfig, getBaseStyle, isNewBadgesConfig } from '@/utils';

import type { BadgesConfig, FullBadgeConfig, FullConfig, NewBadgesConfig } from '@/types';

/** Whether a warning has been displayed to the user. */
let hasWarned = false;

/**
 * Convenience hook for getting the addon configuration.
 * @returns An object containing the full addon configuration, and a function
 * for fetching a single badge's config.
 */
const useBadgesConfig = (): FullConfig & {
  getBadgeConfig: (badge: string) => FullBadgeConfig;
} => {
  const api = useStorybookApi();
  const customBadgesConfig = useMemo(
    () => api.getCurrentParameter<BadgesConfig>(PARAM_CONFIG_KEY) ?? {},
    [api],
  );

  if (
    !isNewBadgesConfig(customBadgesConfig) &&
    Object.keys(customBadgesConfig).length > 0 &&
    !hasWarned
  ) {
    console.warn(
      `Passing a 'BadgesMap' directly to '${PARAM_CONFIG_KEY}' is deprecated and will be removed in the next major version. Please migrate your code to the new config. Migration instructions can be found at: ${DOCS_URL}/migration/v1-to-v2`,
    );
    hasWarned = true;
  }

  const customConfig: Partial<NewBadgesConfig> = useMemo(() => {
    return isNewBadgesConfig(customBadgesConfig)
      ? customBadgesConfig
      : { badges: customBadgesConfig };
  }, [customBadgesConfig]);

  const badgesConfig: FullConfig = useMemo(
    () => ({
      badges: { ...defaultBadgesConfig.badges, ...customConfig.badges },
      baseStyle: getBaseStyle(customConfig.baseStyle ?? defaultBadgesConfig.baseStyle),
      excludeTags: customConfig.excludeTags ?? defaultBadgesConfig.excludeTags,
      locations: [
        ...new Set([...defaultBadgesConfig.locations, ...(customConfig.locations ?? [])]),
      ],
      useTags: customConfig.useTags ?? defaultBadgesConfig.useTags,
    }),
    [
      customConfig.badges,
      customConfig.baseStyle,
      customConfig.excludeTags,
      customConfig.locations,
      customConfig.useTags,
    ],
  );

  return {
    ...badgesConfig,
    getBadgeConfig: (badge: string) => getBadgeConfig(badge, badgesConfig),
  };
};

export { useBadgesConfig };
