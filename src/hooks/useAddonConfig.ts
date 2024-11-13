import { useAddon } from './useAddon';

import type { FullConfig } from '@/types';

/** Convenience hook to access the addonConfig. */
const useAddonConfig = (): FullConfig => {
  const addon = useAddon();

  return addon.addonConfig;
};

export { useAddonConfig };
