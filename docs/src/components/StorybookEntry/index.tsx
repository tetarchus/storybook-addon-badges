import Link from '@docusaurus/Link';

const StorybookEntry = () => {
  return (
    <li>
      <code>entry</code>: The Storybook data for the story. An object containing:
      <ul>
        <li>
          <code>id</code>: The unique ID of the entry.
        </li>
        <li>
          <code>depth</code>: The depth of the entry in the sidebar tree (how many folders deep -
          including the <code>root</code>).
        </li>
        <li>
          <code>name</code>: The name of the entry, usually displayed in the sidebar.
        </li>
        <li>
          <code>refId</code>: An internal Storybook reference.
        </li>
        <li>
          <code>renderLabel</code>: A function for rendering the label in the sidebar. See the{' '}
          <Link to='https://storybook.js.org/docs/configure/user-interface/features-and-behavior'>
            Storybook docs
          </Link>{' '}
          for more details.
        </li>
        <li>
          <code>type</code>: The <Link to='/configuration/locations#entry-types'>type</Link> of the
          entry.
        </li>
        <li>
          <code>startCollapsed</code>: Whether a <code>root</code> entry is collapsed on initial
          load. (Only available on <code>type: 'root'</code>).
        </li>
        <li>
          <code>children</code>: The contents of a <code>root</code>, <code>group</code>, or{' '}
          <code>component</code> entry. Lists the direct child entry ID's.
        </li>
        <li>
          <code>parent</code>: The parent of a <code>group</code>, <code>component</code>,{' '}
          <code>docs</code> or <code>story</code> entry. The ID of the entry's direct parent entry.
        </li>
        <li>
          <code>tags</code>: The <code>tags</code> of a <code>component</code>, <code>docs</code> or{' '}
          <code>story</code> entry.
        </li>
        <li>
          <code>title</code>: The title of a <code>docs</code> or <code>story</code> entry. Can be
          inferred, or manually entered in the component's <code>meta</code>.
        </li>
        <li>
          <code>prepared</code>: A boolean indicating whether the <code>docs</code>/
          <code>story</code> has been prepared. If <code>false</code>, the <code>args</code>,
          <code>argTypes</code>,<code>initialArgs</code> and <code>parameters</code> are unlikely to
          be populated.
        </li>
        <li>
          <code>importPath</code>: The file path for <code>docs</code>/<code>story</code> entries.
          Relates to their story file (<code>*.stories.tsx?</code>).
        </li>
        <li>
          <code>parameters</code>: The <code>parameters</code> of a <code>docs</code>/
          <code>story</code> entry. Only available if the entry is prepared.
        </li>
        <li>
          <code>args</code>: The current <code>args</code> of a <code>story</code> entry, will
          differ to <code>initialArgs</code> if the values have been updated in Storybook but not
          saved. Only available if the entry is prepared.
        </li>
        <li>
          <code>argTypes</code>: The <code>argTypes</code> of a <code>story</code> entry. Only
          available if the entry is prepared.
        </li>
        <li>
          <code>initialArgs</code>: The <code>initialArgs</code> of a <code>story</code> entry. Only
          available if the entry is prepared.
        </li>
      </ul>
    </li>
  );
};

export { StorybookEntry };
