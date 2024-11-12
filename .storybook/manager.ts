import { addons } from 'storybook/internal/manager-api';

addons.setConfig({
  badgesConfig: {
    badgeMap: {
      version: {
        backgroundColor: '#00C700',
        title: ({ content }) => `v${content}`,
      },
    },
    useTags: true,
  },
});
