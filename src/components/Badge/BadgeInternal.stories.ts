import { Badge } from '.';

import { fullBadgeConfig, storyEntry } from '@/__test__/__fixtures__';
import { StorybookManagerMock } from '@/decorators/StorybookManagerMock';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Addon/Internal/Badge',
  component: Badge,
  decorators: [StorybookManagerMock],
  tags: ['autodocs', 'meta'],
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

const Base: Story = {
  args: {
    badgeId: 'beta',
    config: fullBadgeConfig,
    content: 'beta',
    delimiter: ':',
    entry: storyEntry,
  },
};

const Characters: Story = {
  args: {
    badgeId: 'language',
    config: fullBadgeConfig,
    content: '日本後',
    delimiter: ':',
    entry: storyEntry,
  },
};

export default meta;
export { Base, Characters };
