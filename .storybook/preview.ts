import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    badgesConfig: {
      MyCustomBadge: {
        title: 'My Custom Badge',
        styles: {
          backgroundColor: '#00C7AC',
          borderColor: 'red',
          color: '#FFFFFF',
        },
      },
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
