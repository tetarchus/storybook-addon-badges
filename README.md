<div align='center'>
  <h1>Storybook Addon Badges</h1>
  <h4>Add badges to your stories</h4>
  <!-- Badges -->
  <div>
    <a href='https://www.npmjs.com/package/storybook-addon-badges'><img alt='Latest Version' src='https://img.shields.io/npm/v/storybook-addon-badges' /></a>
    <a href='https://github.com/tetarchus/storybook-addon-badges/issues/'><img alt='Open Issues' src='https://img.shields.io/github/issues/tetarchus/storybook-addon-badges' /></a>
    <a href="https://github.com/tetarchus/storybook-addon-badges/actions/workflows/github-code-scanning/codeql"><img src="https://github.com/tetarchus/storybook-addon-badges/actions/workflows/github-code-scanning/codeql/badge.svg?branch=main" alt="CodeQL status" /></a>
    <a href="https://codecov.io/gh/tetarchus/storybook-addon-badges" > 
 <img src="https://codecov.io/gh/tetarchus/storybook-addon-badges/graph/badge.svg?token=AWMAJ5U7B5"/> 
 </a>
  </div>
</div>

> [!TIP]
>
> For more detailed documentation please see the
> [Docs](https://tetarchus.github.io/storybook-addon-badges).

## Version 3 is out!

Version 3 allows for more customization, as well as
[autobadges](https://tetarchus.github.io/storybook-addon-badges/configuration/autobadges), and can
now show
[sidebar badges](https://tetarchus.github.io/storybook-addon-badges/configuration/locations#sidebar)
for any story, using `tags` or a custom `badges` parameter.

## Installation

Install and register the addon with `storybook add`:

```sh
npx storybook add storybook-addon-badges
```

Or, install manually:

```sh
npm i -D storybook-addon-badges
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

## Adding Badges

Adding badges is as simple as adding global, component-level, or story-level tags or parameters.

For details on the methods available to add badges, please see the
[documentation](https://tetarchus.github.io/storybook-addon-badges/getting-started/add-badges).

## Contributing

If there's a feature that you'd like to see, please raise a
[feature request](https://github.com/tetarchus/storybook-addon-badges/issues/new?assignees=&labels=needs+triage%2Cfeature+request&projects=&template=feature_request.yml&title=%5BFeature%5D%3A+)
