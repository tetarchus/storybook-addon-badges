import { BadgeTooltip } from '.';

import { StorybookManagerMock } from '@/decorators/StorybookManagerMock';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Addon/BadgeTooltip',
  component: BadgeTooltip,
  decorators: [StorybookManagerMock],
  tags: ['autodocs', 'meta'],
} satisfies Meta<typeof BadgeTooltip>;

type Story = StoryObj<typeof meta>;

const Basic: Story = {
  args: {
    children: 'Basic Tooltip - Hover Me',
    tooltip: 'This is a basic string tooltip!',
  },
};

const Rich: Story = {
  args: {
    children: 'Rich Tooltip - Hover Me',
    tooltip: {
      title: 'Rich Tooltip!',
      desc: 'This tooltip has a title, description, and a link!',
      links: [{ href: 'https://storybook.js.org/', title: 'Storybook Website' }],
    },
  },
};

export default meta;
export { Basic, Rich };
