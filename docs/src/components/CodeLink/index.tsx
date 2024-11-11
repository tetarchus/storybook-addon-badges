import Link from '@docusaurus/Link';

import type { PropsWithChildren } from 'react';

const CodeLink = ({ children, href }: PropsWithChildren<{ href: string }>) => (
  <Link to={href}>
    <code>{children}</code>
  </Link>
);

const Addon = <CodeLink href='/configuration/addon#options'>badgesConfig</CodeLink>;
const BadgeMap = <CodeLink href='/configuration/badge-map'>badgeMap</CodeLink>;
const BaseStyle = <CodeLink href='/configuration/base-style'>baseStyle</CodeLink>;

const PredefinedBadges = <Link to='/getting-started/predefined-badges'>pre-defined badges</Link>;
const StorybookManager = (
  <Link to='https://storybook.js.org/docs/configure/user-interface/features-and-behavior'>
    manager
  </Link>
);
const StorybookParameters = (
  <Link to='https://storybook.js.org/docs/api/parameters'>parameters</Link>
);
const StorybookPreview = (
  <Link to='https://storybook.js.org/docs/configure#configure-story-rendering'>preview</Link>
);
const StorybookTags = (
  <CodeLink href='https://storybook.js.org/docs/writing-stories/tags'>tags</CodeLink>
);

const Links = {
  Addon,
  BadgeMap,
  BaseStyle,
  PredefinedBadges,
  StorybookManager,
  StorybookParameters,
  StorybookPreview,
  StorybookTags,
} as const;

export { CodeLink, Links };
