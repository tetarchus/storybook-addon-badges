import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    badgesConfig: {
      badges: {
        MyCustomBadge: {
          title: 'My Custom Badge',
          styles: {
            backgroundColor: '#00C7AC',
            borderColor: 'red',
            color: '#FFFFFF',
          },
          location: ['sidebar', 'toolbar', 'toolbar-end'],
        },
        Token: {
          title: 'PH-CO-CMS-BTN-001',
          location: ['sidebar', 'toolbar', 'toolbar-end'],
        },
      },
      baseStyle: 'github',
      useTags: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
