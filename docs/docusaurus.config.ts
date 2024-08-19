import { themes as prismThemes } from 'prism-react-renderer';

import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';

const config: Config = {
  title: 'Badges - A Storybook that adds badges to your stories.',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/icon.svg',

  url: 'https://tetarchus.github.io',
  baseUrl: '/storybook-addon-badges/',
  organizationName: 'tetarchus',
  projectName: 'storybook-addon-badges',
  trailingSlash: true,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        blog: false,
        docs: {
          remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]],
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Storybook Addon Badges',
      logo: {
        alt: 'Badges Logo',
        src: 'img/icon.svg',
      },
      items: [
        {
          href: 'https://github.com/tetarchus/storybook-addon-badges',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Customising Badges',
              to: '/docs/customisation',
            },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'NPM',
              href: 'https://www.npmjs.com/package/storybook-addon-badges',
            },
            {
              label: 'Github',
              href: 'https://github.com/tetarchus/storybook-addon-badges',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} tetarchus`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.okaidia,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
