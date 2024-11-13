import { useContext } from 'react';

import { BadgesAddonContext } from '@/contexts';
import { injectAddonPrefix } from '@/utils';

import type { BadgesAddon } from '@/classes';

/**
 * Provides access to the {@link BadgesAddon} instance. Throwing if one is not
 * present.
 * @returns The BadgesAddon instance from the provider.
 */
const useAddon = (): BadgesAddon => {
  const addon = useContext(BadgesAddonContext);

  if (!addon) {
    throw new Error(
      injectAddonPrefix('`useAddon` can only be accessed from within a <BadgesAddonProvider>.'),
    );
  }

  return addon;
};

export { useAddon };
