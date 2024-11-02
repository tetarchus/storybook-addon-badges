import { ThemeProvider } from '@storybook/theming';
import { ManagerContext } from 'storybook/internal/manager-api';

import { api, mockedTheme, mockedThemeVars } from '@/__test__/__fixtures__';
import { BadgesAddon } from '@/classes';
import { BadgesAddonProvider } from '@/contexts';

import type { Decorator } from '@storybook/react';
import type { API, State } from 'storybook/internal/manager-api';

/**
 * A decorator for use with our internal stories to allow access to
 * mocked Storybook's Manager APIs within the preview window.
 * @param StoryFn The wrapped story.
 * @returns The story wrapped in mock providers.
 */
const StorybookManagerMock: Decorator = StoryFn => (
  <ManagerContext.Provider
    value={
      {
        api,
        state: { docsOptions: {}, theme: mockedThemeVars },
      } as { api: API; state: State }
    }
  >
    <ThemeProvider theme={mockedTheme}>
      <BadgesAddonProvider state={new BadgesAddon(api)}>{StoryFn()}</BadgesAddonProvider>
    </ThemeProvider>
  </ManagerContext.Provider>
);

export { StorybookManagerMock };
