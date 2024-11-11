import { within, userEvent } from '@storybook/test';

import { Page } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Examples/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

type Story = StoryObj<typeof Page>;

const LoggedOut: Story = {};

const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole('button', {
      name: /Log in/i,
    });
    await userEvent.click(loginButton);
  },
};

export default meta;
export { LoggedIn, LoggedOut };
