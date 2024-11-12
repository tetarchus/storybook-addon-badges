import { Header } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Examples/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

const LoggedOut: Story = { tags: ['deprecated'] };

export default meta;
export { LoggedIn, LoggedOut };
