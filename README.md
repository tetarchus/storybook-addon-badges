# Storybook Addon Badges

> Add badges to your stories

[![npm version](https://badge.fury.io/js/tetarchus%2Fstorybook-addon-badges.svg)](https://www.npmjs.com/package/tetarchus/storybook-addon-badges)


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

## Configuration

`storybook-addon-badges` comes with several pre-configured badge styles that can either be extended from or overwritten.