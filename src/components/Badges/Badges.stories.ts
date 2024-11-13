import { Badges } from '.';

import { storyEntry } from '@/__test__/__fixtures__';
import { StorybookManagerMock } from '@/decorators/StorybookManagerMock';

import type { Meta, StoryObj } from '@storybook/react';

// TODO: Do we want a wrapper here too, to allow viewing stories with different separator values?

const meta = {
  title: 'Addon/Badges',
  component: Badges,
  decorators: [StorybookManagerMock],
  tags: ['autodocs', 'meta'],
} satisfies Meta<typeof Badges>;

type Story = StoryObj<typeof meta>;

const Base: Story = {
  args: {
    entry: storyEntry,
    location: 'toolbar',
  },
};

export default meta;
export { Base };
