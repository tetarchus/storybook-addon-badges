import { Button } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Examples/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  tags: ['beta'],
};

const Secondary: Story = {
  args: {
    label: 'Button',
  },
  tags: ['deprecated'],
};

const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

export default meta;
export { Primary, Secondary, Large, Small };
