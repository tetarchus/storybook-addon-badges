import { fn } from '@storybook/test';

import { Button } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/ButtonBadges',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: fn(),
  },
  parameters: {
    badges: ['solo'],
    badgesConfig: {
      autobadges: 'new',
    },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  parameters: { badges: ['primary', 'deprecated'] },
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

// const XSmall: Story = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// };

export default meta;
export { Primary, Secondary, Large, Small };
