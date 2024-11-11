import { StorybookEntry } from '../StorybookEntry';

const AutobadgeFunction = () => {
  return (
    <p>
      This function receives an object with the following properties:
      <ul>
        <li>
          <code>a11yStatus</code>: Can be one of <code>'pass'</code>, <code>'fail'</code> or{' '}
          <code>'incomplete'</code>, or <code>null</code> if no data exists for the story.
        </li>
        <StorybookEntry />
        <li>
          <code>isNew</code>: Whether the `new` badge would be applied when using the array option.
        </li>
        <li>
          <code>isUpdated</code>: Whether the `updated` badge would be applied when using the array
          option.
        </li>
      </ul>
    </p>
  );
};

export { AutobadgeFunction };
