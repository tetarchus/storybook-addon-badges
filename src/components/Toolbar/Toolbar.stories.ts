import { Toolbar } from '.';

import { StorybookManagerMock } from '@/decorators/StorybookManagerMock';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Addon/Toolbar',
  component: Toolbar,
  decorators: [StorybookManagerMock],
  tags: ['autodocs', 'meta'],
} satisfies Meta<typeof Toolbar>;

type Story = StoryObj<typeof meta>;

const Base: Story = {
  args: {},
};

export default meta;
export { Base };
