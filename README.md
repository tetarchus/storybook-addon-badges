# Storybook Addon Badges

> Add badges to your stories

[![npm version](https://badge.fury.io/js/storybook-addon-badges.svg)](https://www.npmjs.com/package/storybook-addon-badges)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

> [!TIP]
>
> For more detailed documentation please see the
> [Docs](https://tetarchus.github.io/storybook-addon-badges).

## Installation

First, install the package.

```sh
npm i storybook-addon-badges
```

Then, register it as an addon in `.storybook/main.js`.

```js
// .storybook/main.ts

// Replace [your-framework] with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/[your-framework]';

const config: StorybookConfig = {
  // ...rest of config
  addons: [
    '@storybook/addon-essentials'
    'storybook-addon-badges', // 👈 register the addon here
  ],
};

export default config;
```

You can add badges globally, to a single component, or to an individual story. Simply add an array
of strings containing the badge text as a parameter to the preview file (for global badges):

```ts
// .storybook/preview.ts
// Replace `[your-framework]` with the name of your framework
import type { Preview } from '@storybook/[your-framework]';

const preview: Preview = {
  //...other preview config
  parameters: {
    //...other parameters
    badges: ['beta'],
  },
};

export default preview;
```

Or at the component/story level:

```ts
// MyComponent.stories.ts
// Replace your-framework with the name of your framework
import type { Meta } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta = {
  title: 'Path/To/MyComponent',
  component: MyComponent,
  parameters: {
    badges: ['beta'], // <= Add component badges here
    //...other parameters
  },
} satisfies Meta<typeof MyComponent>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    //...component props
  },
  parameters: {
    badges: ['beta'], // <= Add story badges here
  },
};

export default meta;
export { Default };
```

> [!WARNING]
>
> Badges can currently only be read from a single set of `parameters`, so story badges overwrite
> global and component level badges, and component badges overwrite global badges.

For information about adding custom badge styles, tooltips and more, please see the
[full documentation](https://tetarchus.github.io/storybook-addon-badges)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/tetarchus"><img src="https://avatars.githubusercontent.com/u/8436118?v=4?s=100" width="100px;" alt=""/><br /><sub><b>tetarchus</b></sub></a><br /><a href="#infra-tetarchus" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/tetarchus/storybook-addon-badges/commits?author=tetarchus" title="Code">💻</a> <a href="https://github.com/tetarchus/storybook-addon-badges/commits?author=tetarchus" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
