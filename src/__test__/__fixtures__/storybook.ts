import type { StoryEntry } from 'storybook/internal/manager-api';

/** Example simple StoryEntry config for use in tests. */
const storyEntry: StoryEntry = {
  depth: 2,
  id: 'example-story--entry',
  importPath: './__tests__/__fixtures__/storybook.ts',
  name: 'ExampleStory',
  parent: 'Example',
  prepared: false,
  tags: ['new', 'autodocs'],
  title: 'Test',
  type: 'story',
};

export { storyEntry };
