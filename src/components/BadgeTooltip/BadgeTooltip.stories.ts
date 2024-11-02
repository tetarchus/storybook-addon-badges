import { BadgeTooltip } from '.';

import { StorybookManagerMock } from '@/decorators/StorybookManagerMock';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

const meta = {
  title: 'Addon/BadgeTooltip',
  component: BadgeTooltip,
  decorators: [StorybookManagerMock],
  tags: ['autodocs', 'meta'],
} satisfies Meta<typeof BadgeTooltip>;

type Story = StoryObj<typeof meta>;

const basicTrigger = 'Basic Tooltip - Hover Me';
const richTrigger = 'Rich Tooltip - Hover Me';
const tooltipTestId = 'tooltip';

const Basic: Story = {
  args: {
    children: basicTrigger,
    tooltip: 'This is a basic string tooltip!',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The tooltip renders outside of the main canvas
    const body = within(canvasElement.ownerDocument.body);
    const componentHasRendered = () => canvas.getByText(basicTrigger);
    const trigger = await waitFor(componentHasRendered);
    await userEvent.hover(trigger);
    const tooltipHasAppeared = () => body.getByTestId(tooltipTestId);
    const tooltip = await waitFor(tooltipHasAppeared);
    expect(tooltip).toBeVisible();
  },
};

const Rich: Story = {
  args: {
    children: richTrigger,
    tooltip: {
      title: 'Rich Tooltip!',
      desc: 'This tooltip has a title, description, and a link!',
      links: [{ href: 'https://storybook.js.org/', title: 'Storybook Website' }],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The tooltip renders outside of the main canvas
    const body = within(canvasElement.ownerDocument.body);
    const componentHasRendered = () => canvas.getByText(richTrigger);
    const trigger = await waitFor(componentHasRendered);
    await userEvent.hover(trigger);
    const tooltipHasAppeared = () => body.getByTestId(tooltipTestId);
    const tooltip = await waitFor(tooltipHasAppeared);
    expect(tooltip).toBeVisible();
  },
};

export default meta;
export { Basic, Rich };
