import { CodeLink, Links } from '../CodeLink';
import { StorybookEntry } from '../StorybookEntry';

const BadgeFunction = () => {
  return (
    <p>
      The function accepts the following parameters:
      <ul>
        <li>
          <code>badgeId</code>: The ID used to look up the badge's configuration
        </li>
        <li>
          <code>content</code>: The parsed `content` of the badge
        </li>
        <StorybookEntry />
        <li>
          <code>getBadgeParts</code>: A function that accepts a string, and splits it into `badgeId`
          and `content` based on the <code>delimiter</code> from the{' '}
          <CodeLink href='/configuration/matchers'>matcher</CodeLink> or {Links.Addon}.
        </li>
        <li>
          <code>rawContent</code>: The string that was passed in to the <code>tags</code>/
          <code>badges</code> array.
        </li>
      </ul>
    </p>
  );
};

export { BadgeFunction };
