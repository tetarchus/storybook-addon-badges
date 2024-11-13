import type { BadgesAddon } from '@/classes';
import type { ReactNode } from 'react';

type BadgesAddonContextValue = BadgesAddon;

type BadgesAddonProviderProps = {
  children: ReactNode;
  state: BadgesAddon;
};

export type { BadgesAddonContextValue, BadgesAddonProviderProps };
