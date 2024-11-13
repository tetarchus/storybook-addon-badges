import { Sidebar } from '.';

import { storyEntry } from '@/__test__/__fixtures__';
import { StorybookManagerMock } from '@/decorators/StorybookManagerMock';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Addon/Sidebar',
  component: Sidebar,
  decorators: [StorybookManagerMock],
  tags: ['autodocs', 'meta'],
} satisfies Meta<typeof Sidebar>;

type Story = StoryObj<typeof meta>;

const Base: Story = {
  args: {
    api: undefined,
    item: storyEntry,
  },
};

export default meta;
export { Base };
