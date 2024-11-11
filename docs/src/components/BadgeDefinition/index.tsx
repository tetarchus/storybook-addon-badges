import Link from '@docusaurus/Link';

import { CodeLink, Links } from '../CodeLink';

const BadgeDefinition = () => (
  <table>
    <thead>
      <td>Property</td>
      <td>Description</td>
      <td>Default</td>
    </thead>
    <tbody>
      <tr>
        <td>
          <CodeLink href='/customisation/badge-content'>displayContentOnly</CodeLink>
        </td>
        <td>An override for the addon setting with the same name.</td>
        <td>defaults to the value from {Links.Addon}</td>
      </tr>
      <tr>
        <td>
          <CodeLink href='/configuration/badge-locations'>locations</CodeLink>
        </td>
        <td>Override the locations that this badge can appear in.</td>
        <td>defaults to the value from {Links.Addon}</td>
      </tr>
      <tr>
        <td>
          <CodeLink href='/configuration/badge-map#badge-ordering'>priority</CodeLink>
        </td>
        <td>This setting is used to control the order of badges.</td>
        <td>
          <code>99</code>
        </td>
      </tr>
      <tr>
        <td>
          <CodeLink href='/customisation/badge-style'>style</CodeLink>
        </td>
        <td>
          The style options for the badge. Any values not defined will use the addon's{' '}
          {Links.BaseStyle}.
        </td>
        <td>defaults to the {Links.BaseStyle}</td>
      </tr>
      <tr>
        <td>
          <CodeLink href='/customisation/badge-content'>title</CodeLink>
        </td>
        <td>
          The text to display on the badge. Can be a string, or a{' '}
          <Link to='@todo'>badge function</Link>
        </td>
        <td>
          defaults to the <CodeLink href='/customisation/badge-content'>content</CodeLink> portion
          of the badge (or the whole badge/tag string)
        </td>
      </tr>
      <tr>
        <td>
          <CodeLink href=''>tooltip</CodeLink>
        </td>
        <td>A tooltip to display on hover.</td>
        <td>
          <code>null</code>
        </td>
      </tr>
    </tbody>
  </table>
);

export { BadgeDefinition };
