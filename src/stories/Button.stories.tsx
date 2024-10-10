import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { BADGE } from '../constants';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    badges: [BADGE.BETA],
  },
  tags: ['autodocs', 'custom-tag'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const AllBadges: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  parameters: {
    badgesConfig: {
      badges: {
        new: { title: 'new', style: { backgroundColor: '#FF0000' } },
      },
      baseStyle: 'default',
    },
    badges: [
      BADGE.DEFAULT,
      BADGE.BETA,
      BADGE.STABLE,
      BADGE.NEEDS_REVISION,
      BADGE.OBSOLETE,
      BADGE.EXPERIMENTAL,
      BADGE.DEPRECATED,
      'new',
    ],
  },
};

export const JustCustom: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  parameters: { badges: ['MyCustomBadge', 'Token'] },
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
