import Link from '@docusaurus/Link';

import type { PropsWithChildren } from 'react';

const CodeLink = ({ children, href }: PropsWithChildren<{ href: string }>) => (
  <Link to={href}>
    <code>{children}</code>
  </Link>
);

const Addon = <CodeLink href='/configuration/addon'>badgesConfig</CodeLink>;
const BadgeMap = <CodeLink href='/configuration/badge-map'>badgeMap</CodeLink>;
const BaseStyle = <CodeLink href='/configuration/base-style'>baseStyle</CodeLink>;

const PredefinedBadges = <Link to='/getting-started/predefined-badges'>pre-defined badges</Link>;

const Links = {
  Addon,
  BadgeMap,
  BaseStyle,
  PredefinedBadges,
} as const;

export { CodeLink, Links };
