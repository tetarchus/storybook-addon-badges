import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { BADGE } from '../constants';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    badges: [BADGE.BETA],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const AllBadges: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  parameters: {
    badges: [
      BADGE.DEFAULT,
      BADGE.BETA,
      BADGE.STABLE,
      BADGE.NEEDS_REVISION,
      BADGE.OBSOLETE,
      BADGE.EXPERIMENTAL,
      BADGE.DEPRECATED,
    ],
  },
};

export const JustCustom: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  parameters: { badges: ['MyCustomBadge'] },
};

export const Deprecated: Story = {
  args: {
    label: 'Button',
  },
  parameters: { badges: [BADGE.DEPRECATED] },
};

export const Fallback: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};
