import { ManagerContext } from 'storybook/internal/manager-api';

import { mockApi } from '@/__test__/__fixtures__';
import { BadgesAddon } from '@/classes';
import { BadgesAddonProvider } from '@/contexts';

import type { Decorator } from '@storybook/react';
import type { API, State } from 'storybook/internal/manager-api';

const MockDecorator: Decorator = StoryFn => (
  <ManagerContext.Provider
    value={{ api: mockApi, state: { docsOptions: {} } } as { api: API; state: State }}
  >
    <BadgesAddonProvider state={new BadgesAddon(mockApi)}>{StoryFn()}</BadgesAddonProvider>
  </ManagerContext.Provider>
);

export { MockDecorator };
