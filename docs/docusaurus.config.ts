import { themes as prismThemes } from 'prism-react-renderer';
import npm2yarn from '@docusaurus/remark-plugin-npm2yarn';

import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { resolve } from 'path';

const config: Config = {
  title: 'Badges - A Storybook that adds badges to your stories.',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/storybook-addon-badges.png',

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
          remarkPlugins: [[npm2yarn, { sync: true }]],
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    async function aliasImports() {
      return {
        name: 'alias-imports',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                '@': resolve(__dirname, '../src'),
              },
            },
          };
        },
      };
    },
  ],

  themeConfig: {
    navbar: {
      title: 'Storybook Addon Badges',
      logo: {
        alt: 'Badges Logo',
        src: 'img/storybook-addon-badges.png',
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
              to: '/',
            },
            {
              label: 'Customising Badges',
              to: '/customisation',
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
            {
              label: 'Storybook Addons',
              href: 'https://storybook.js.org/addons/storybook-addon-badges',
            },
            {
              label: 'Addon Storybook - Chromatic',
              href: 'https://main--67257b0b5ed50f00618a2c1d.chromatic.com/',
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
