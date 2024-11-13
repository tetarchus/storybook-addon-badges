import { createContext, useMemo } from 'react';

import type { BadgesAddonContextValue, BadgesAddonProviderProps } from './context.types';
import type { FC } from 'react';

const BadgesAddonContext = createContext<BadgesAddonContextValue | null>(null);
BadgesAddonContext.displayName = 'BadgesAddonContext';

const BadgesAddonProvider: FC<BadgesAddonProviderProps> = ({
  children,
  state,
}: BadgesAddonProviderProps) => {
  const contextValue = useMemo(() => state, [state]);

  return <BadgesAddonContext.Provider value={contextValue}>{children}</BadgesAddonContext.Provider>;
};

export { BadgesAddonContext, BadgesAddonProvider };
export type { BadgesAddonContextValue, BadgesAddonProviderProps } from './context.types';
