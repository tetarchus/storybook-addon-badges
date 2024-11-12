import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from '.';

const meta = {
  title: 'Example/ButtonTag',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: fn(),
  },
  tags: ['autodocs', 'version:1.0.0', 'old'],
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  tags: ['deprecated'],
};

const Secondary: Story = {
  args: {
    label: 'Button',
  },
  tags: ['ancient'],
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
