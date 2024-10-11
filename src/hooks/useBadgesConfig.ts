import { useStorybookApi } from 'storybook/internal/manager-api';

import { DOCS_URL, PARAM_CONFIG_KEY } from '@/constants';
import { getBadgesConfig, isNewBadgesConfig } from '@/utils';

import type { BadgesConfig, FullConfig } from '@/types';

/** Whether a warning has been displayed to the user. */
let hasWarned = false;

/**
 * Convenience hook for getting the addon configuration.
 * @returns An object containing the full addon configuration, and a function
 * for fetching a single badge's config.
 */
const useBadgesConfig = (): FullConfig => {
  const api = useStorybookApi();
  const customBadgesConfig = api.getCurrentParameter<BadgesConfig>(PARAM_CONFIG_KEY) ?? {};
  const badgesConfig = getBadgesConfig(customBadgesConfig);

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

  return badgesConfig;
};

export { useBadgesConfig };
