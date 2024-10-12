import { BADGE } from '@/constants';

import { Button } from './Button';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    badges: [BADGE.BETA],
  },
  tags: ['autodocs', 'custom-tag'],
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

const AllBadges: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  parameters: {
    badgesConfig: {
      badgeMap: {
        new: { title: 'new', styles: { backgroundColor: '#FF0000' } },
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

const JustCustom: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  parameters: { badges: ['MyCustomBadge', 'Token'] },
  tags: ['extra-custom-tag'],
};

const Deprecated: Story = {
  args: {
    label: 'Button',
  },
  parameters: { badges: [BADGE.DEPRECATED] },
  tags: ['deprecated-tag'],
};

const Fallback: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export default meta;
export { AllBadges, Deprecated, Fallback, JustCustom };
