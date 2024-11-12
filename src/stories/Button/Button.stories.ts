import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from '.';

const meta = {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: fn(),
  },
  parameters: {
    badges: ['solo'],
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

const XSmall: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
const XXSmall: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};
const XLarge: Story = {
  args: {
    backgroundColor: 'red',
    size: 'large',
    label: 'Button',
  },
};
const XXLarge: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

const XXXLarge: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export default meta;
export { Primary, Secondary, Large, Small, XLarge, XSmall, XXSmall, XXLarge, XXXLarge };
